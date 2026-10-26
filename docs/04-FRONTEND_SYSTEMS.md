# 04 / Frontend Systems & Interactive Modules Architecture
**Project:** The Design Dude Studio (TDDS)  
**Target Environment:** Antigravity IDE (React 18+ • TypeScript • Tailwind CSS)  
**Functional Objective:** Implement responsive, zero-layout-shift interactive modules with state machines and keyboard accessibility.  

---

## 1. Functional System Overview & Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE APPLICATION STATE STORE                    │
│   • activeFilter: ('All' | 'Video & Reels' | 'Social' | 'Ads' | 'Brand')│
│   • activeVideoModal: { isOpen: boolean, videoUrl: string, title: string }│
│   • activeDrawer: { isOpen: boolean, serviceId?: string }               │
│   • leadFormData: ZodValidated<EnquiryPayload>                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  PORTFOLIO MATRIX    │ │  BENTO SERVICES GRID │ │  LEAD CONVERSION     │
│  & VIDEO LIGHTBOX    │ │  & DELIVERABLE DRAWER│ │  & WHATSAPP ROUTER   │
│  Instant filtering,  │ │  3D mouse tilt,      │ │  Progressive multi-  │
│  zero CLS, focus trap│ │  slide-over panel    │ │  step Zod form + URL │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

---

## 2. Interactive Module 1: Filterable Portfolio Matrix & Video Lightbox

### 2.1 State Machine Logic
```
       ┌───────────┐
       │   IDLE    │ <──────────────────────┐
       └─────┬─────┘                        │
             │                              │
     [Click Filter Chip]            [Filter Applied]
             │                              │
             ▼                              │
       ┌───────────┐                        │
       │ FILTERING │ ───────────────────────┘
       └─────┬─────┘
             │
     [Click Project Tile]
             │
             ▼
     ┌───────────────┐               ┌───────────────┐
     │  MODAL_OPEN   │ ────────────> │  MODAL_CLOSED │
     │  (Focus Trap) │ [Click X/Esc] │ (Focus Return)│
     └───────────────┘               └───────────────┘
```

### 2.2 Component Interface & Implementation Outline
```typescript
// src/types/portfolio.ts
export interface CaseStudyItem {
  id: string;
  slug: string;
  index: string;
  title: string;
  client: string;
  category: 'Video & Reels' | 'Social Media' | 'Advertising' | 'Branding & Design';
  coverImage: string;
  videoUrl?: string;
  aspectRatio: 'aspect-[4/5]' | 'aspect-[16/9]';
}

// Custom Hook: usePortfolioFilter.ts
export function usePortfolioFilter(items: CaseStudyItem[], initialCategory = 'All') {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return { selectedCategory, setSelectedCategory, filteredItems };
}
```

### 2.3 Video Lightbox Accessibility Invariants
1. **Focus Trapping:** On modal trigger, focus shifts to the modal close button (`aria-label="Close video player"`).
2. **Keyboard Escape Listener:** Pressing `Escape` closes the modal immediately and restores focus to the invoking card trigger.
3. **Muted Preview Invariant:** Previews on the main grid never output sound (PDF Page 5). Unmuted audio is only permitted inside the explicit modal player.

---

## 3. Interactive Module 2: Dynamic Project Scope & Budget Estimator

### 3.1 Functional Purpose
Allows prospective clients to configure custom project scopes, calculate estimated timelines, and immediately forward structured scope parameters to the lead capture drawer.

### 3.2 State Structure & Calculation Model
```typescript
export interface ScopeDeliverable {
  id: string;
  label: string;
  category: 'content' | 'social' | 'ads' | 'branding';
  baseDays: number;
  weightTier: 1 | 2 | 3;
}

export const AVAILABLE_DELIVERABLES: ScopeDeliverable[] = [
  { id: 'brand-film', label: 'Cinematic Brand Film (60s)', category: 'content', baseDays: 14, weightTier: 3 },
  { id: 'reels-pack', label: '12 Monthly Short-Form Reels', category: 'content', baseDays: 10, weightTier: 2 },
  { id: 'social-mgmt', label: 'Daily Social Media Curation', category: 'social', baseDays: 30, weightTier: 2 },
  { id: 'meta-ads', label: 'Meta Performance Ads Setup & Scaling', category: 'ads', baseDays: 7, weightTier: 2 },
  { id: 'brand-identity', label: 'Complete Logo & Visual Identity', category: 'branding', baseDays: 14, weightTier: 3 },
];

export function calculateEstimatedScope(selectedIds: string[]) {
  const selected = AVAILABLE_DELIVERABLES.filter(d => selectedIds.includes(d.id));
  const estimatedDays = selected.reduce((acc, curr) => acc + curr.baseDays, 0);
  const totalWeight = selected.reduce((acc, curr) => acc + curr.weightTier, 0);

  let budgetRange = "Custom Scope";
  if (totalWeight <= 2) budgetRange = "₹50,000 - ₹1,00,000";
  else if (totalWeight <= 5) budgetRange = "₹1,00,000 - ₹2,50,000";
  else budgetRange = "₹2,50,000 - ₹5,00,000+";

  return { estimatedDays: Math.min(estimatedDays, 45), budgetRange, count: selected.length };
}
```

---

## 4. Interactive Module 3: Lead Capture Drawer & WhatsApp Deep-Link Engine

### 4.1 Progressive Multi-Step Architecture
```
┌─────────────────────────────────┐
│ STEP 1: SERVICE & SCOPE SELECTION│
│ Multi-select checkboxes for 4   │
│ compartments (Content, Ads...)  │
└────────────────┬────────────────┘
                 │ [Next / Validation Pass]
                 ▼
┌─────────────────────────────────┐
│ STEP 2: BUDGET & TIMELINE       │
│ Toggleable budget pills +       │
│ Project goal textarea           │
└────────────────┬────────────────┘
                 │ [Next / Validation Pass]
                 ▼
┌─────────────────────────────────┐
│ STEP 3: CONTACT & BRAND DETAILS │
│ Name, Company/Brand, Email/Phone│
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌────────────────┐ ┌────────────────────────┐
│ DIRECT API/JSON│ │ WHATSAPP DEEP-LINK     │
│ Local / Webhook│ │ Auto-opens WhatsApp app│
│ Payload Storage│ │ with pre-typed message │
└────────────────┘ └────────────────────────┘
```

### 4.2 WhatsApp URL-Encoding Engine
```typescript
// src/lib/whatsappRouter.ts
export function buildWhatsAppInboundUrl(data: {
  name: string;
  brand?: string;
  serviceNeeded: string;
  estimatedBudget: string;
  details?: string;
}): string {
  const studioNumber = "919876543210"; // Official TDDS WhatsApp business number

  const message = [
    `*New Project Enquiry — The Design Dude Studio*`,
    `----------------------------------------`,
    `• *Client Name:* ${data.name}`,
    data.brand ? `• *Brand/Company:* ${data.brand}` : null,
    `• *Service Required:* ${data.serviceNeeded}`,
    `• *Estimated Budget:* ${data.estimatedBudget}`,
    data.details ? `• *Brief:* ${data.details}` : null,
    `----------------------------------------`,
    `Sent directly via thedesigndudestudio.com`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${studioNumber}?text=${encodeURIComponent(message)}`;
}
```

---

## 5. Interactive Module 4: 3D Perspective Bento Tilt & Deliverables Drawer

### 5.1 Desktop 3D Cursor Tilt Hook (`useTilt.ts`)
```typescript
import { useState, useRef, MouseEvent } from 'react';

export function useTilt(maxTilt = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    const rotateX = -yPct * maxTilt;
    const rotateY = xPct * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 100ms ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
}
```

---

## 6. Interactive Module 5: Double-Buffered Client Marquee & Accessible Testimonial Slider

### 6.1 Infinite CSS Ticker (Hardware Accelerated)
```css
/* src/styles/marquee.css */
@keyframes tdds-marquee-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.tdds-marquee-container {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}

.tdds-marquee-track {
  display: flex;
  flex-shrink: 0;
  animation: tdds-marquee-scroll 25s linear infinite;
  will-change: transform;
}

.tdds-marquee-container:hover .tdds-marquee-track {
  animation-play-state: paused;
}
```

### 6.2 Testimonial Slider State Machine
```typescript
export function useTestimonialSlider(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);

  return { currentIndex, nextSlide, prevSlide, setCurrentIndex };
}
```

---

## 7. Performance & Zero-Layout-Shift Safeguards

1. **Aspect-Ratio Locks:** All grid tiles enforce explicit CSS ratios (`aspect-[4/5]` for portrait campaigns, `aspect-[16/9]` for wide reels) so the layout does not jump when images load.
2. **Skeleton Preloaders:** While high-res covers are fetching, an animated skeleton pulse with `--tdds-bg-secondary` fills the exact frame dimensions.
3. **No Heavy External Dependencies:** Zero reliance on Framer Motion or Swiper.js; built entirely with native React hooks, CSS hardware transforms (`translate3d`), and Tailwind transitions for maximum execution speed.
