# 01 / Platform Architecture & Technical Blueprint
**Project:** The Design Dude Studio (TDDS) — Web Platform  
**Location:** Ahmedabad, Gujarat, India  
**Target Environment:** Antigravity IDE (Vite + React 18+ + TypeScript + Tailwind CSS)  
**Standard:** Enterprise Creative Studio • Zero-Layout-Shift • Sub-1.2s LCP  

---

## 1. Executive Summary & Core Objective

The Design Dude Studio (TDDS) is an Ahmedabad-based multidisciplinary creative agency combining high-impact content creation, video production, social media management, brand design, and performance advertising.

### Primary Goal
Convert visitors into qualified client enquiries via a dual-route conversion engine (progressive lead capture form + one-click WhatsApp deep link) while making the studio's visual work the undisputed hero.

### Core Experience Flow
```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│       01. HERO          │ ──> │    02. SELECTED WORK    │ ──> │      03. SERVICES       │
│  "IDEAS INTO IMPACT."   │     │    Editorial Case Grid  │     │   4 Dark Bento Cards    │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
             │                                                               │
             ▼                                                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│     06. CONVERSION      │ <── │    05. TESTIMONIALS     │ <── │    04. CLIENT ROSTER    │
│  Dual Lead / WhatsApp   │     │   Verified Client Trust │     │ Infinite Brand Marquee  │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

## 2. Target Audience Profiles

| Audience Segment | Primary Need | Decision Trigger | Conversion Path |
| :--- | :--- | :--- | :--- |
| **Retail & Luxury Brands**<br>*(e.g., Zanzar Jewellers, Sun Furniture)* | High-end visual identity, commercial reels, in-store launch campaigns. | Visual polish, premium aesthetics, verified brand client list. | Hero → Work Grid → Case Study → WhatsApp Chat |
| **D2C & Fashion Founders**<br>*(e.g., Swag Fashion Hub, Loyal Greens)* | High-volume social reels, creative testing, performance ads (Meta/Google). | Content turnaround speed, creative hooks, measurable ROAS. | Services Bento → Content & Video Drawer → Project Estimator |
| **High-End Events & Weddings**<br>*(e.g., Bluekrit Weddings)* | Cinematic storytelling, documentary event films, teaser cutdowns. | Cinematic colour grading, sound design, emotional narrative. | Showreel Modal → Case Study Gallery → "Start a Project" Form |

---

## 3. Technology Stack & Runtime Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                            │
│  React 18 (Strict Mode) • TypeScript • Tailwind CSS • Lucide Icons     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER (VITE)                       │
│  • Fast Client-Side Router (Clean Path Structure)                      │
│  • Schema-Driven Content Store (`src/content/siteContent.ts`)          │
│  • Zod Validation Layer (Form submissions & Schema Guard)              │
│  • Custom Interaction Hooks (Video Modal, Perspective Tilt, Slider)    │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     ASSET & MEDIA PIPELINE (ZERO-CLS)                  │
│  • WebP / AVIF Responsive Media Containers with Aspect-Ratio Locks     │
│  • Poster Frames for all Video Hooks (No Autoplay Sound)               │
│  • Lazy Loading for all Below-the-Fold Imagery                         │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DUAL CONVERSION ROUTERS                         │
│  1. In-App Lead Drawer (Zod Schema Validation → API / Webhook Payload) │
│  2. Direct WhatsApp API Gateway (Pre-formatted URL Encoded Message)    │
└────────────────────────────────────────────────────────────────────────┘
```

### Stack Selection Rationale
- **Vite 5+ + React 18+:** Instant sub-50ms HMR in Antigravity IDE, zero cold-start delay, and tiny bundle footprint (< 95KB compressed first load).
- **TypeScript (Strict Mode):** Guarantees zero runtime null-pointer exceptions across portfolio data, client quotes, and enquiry schemas.
- **Tailwind CSS v3/v4:** Compiles to minimal atomic CSS, eliminates runtime CSS-in-JS overhead, and ensures seamless design token mapping.
- **Lucide React:** Lightweight, tree-shakeable iconography preserving 60fps animations.
- **Zod:** Client-side runtime schema validation for user enquiries before submission.

---

## 4. Workspace Directory Topology

```
tdds/
├── docs/                                  # Production Specifications
│   ├── 01-PLATFORM_ARCHITECTURE.md        # Technical Blueprint & Data Models
│   ├── 02-DESIGN_SYSTEM.md                # Design Tokens, Typography, Colors
│   ├── 03-CONVERSION_COPY.md              # Full Page-by-Page Content & CTAs
│   └── 04-FRONTEND_SYSTEMS.md             # Functional Logic & Component Specs
├── public/                                # Static Public Assets
│   ├── images/                            # Optimized Portfolio & Client Assets
│   ├── video/                             # Showreel Poster Frames & Clips
│   ├── favicon.svg                        # TDDS Monogram Favicon
│   └── robots.txt                         # Search Engine Directives
├── src/
│   ├── assets/                            # Bundled Vector SVGs & 3D Artwork
│   ├── components/
│   │   ├── common/                        # Atomic Primitives
│   │   │   ├── Button.tsx                 # Pill CTAs, Outlined, Lime actions
│   │   │   ├── Badge.tsx                  # Status and Category Pills
│   │   │   └── SectionTag.tsx             # `( 01 ) SERVICES` Technical Tags
│   │   ├── layout/                        # Structural Layout Components
│   │   │   ├── Navbar.tsx                 # Sticky Pill Header + "Start a Project"
│   │   │   └── Footer.tsx                 # 4-Column Footer + Fluid Ribbon Graphic
│   │   ├── interactive/                   # Dynamic Functional Modules
│   │   │   ├── BentoServiceGrid.tsx       # 4 Dark Cards with 3D Tilt & Drawers
│   │   │   ├── ClientProofMarquee.tsx     # Hardware-Accelerated Logo Loop
│   │   │   ├── LeadCaptureDrawer.tsx      # Multi-Step Enquiry Form
│   │   │   ├── PortfolioMatrix.tsx        # Filterable Work Grid
│   │   │   ├── ProjectScopeEstimator.tsx  # Dynamic Scope & Budget Calculator
│   │   │   ├── TestimonialSlider.tsx      # Accessible Touch-Swipe Slider
│   │   │   └── VideoLightboxModal.tsx     # Keyboard-Accessible Video Player
│   │   └── sections/                      # Homepage Section Assemblies
│   │       ├── HeroSection.tsx            # Left Text Lockup + Right 3D Monogram
│   │       ├── FeaturedWorkSection.tsx    # Editorial Work Showcase
│   │       ├── ServicesBentoSection.tsx   # 4 Core Pillars Container
│   │       ├── ProcessStrip.tsx           # Discover → Plan → Create → Optimise
│   │       ├── TestimonialsSection.tsx    # Client Quotes & Star Ratings
│   │       └── ConversionCtaSection.tsx   # Final Impact Banner & Dual CTAs
│   ├── content/                           # Single Source of Truth Content
│   │   └── siteContent.ts                 # Typed Content Dictionary
│   ├── hooks/                             # Custom React Hooks
│   │   ├── useLeadCapture.ts              # Form State Machine & WhatsApp Router
│   │   ├── usePortfolioFilter.ts          # Instant Category Tag Filtering
│   │   ├── useReducedMotion.ts            # Accessibility Motion Checker
│   │   ├── useTilt.ts                     # Desktop Mouse Perspective Tilt
│   │   └── useVideoModal.ts               # Video Modal Open/Close & Focus Trap
│   ├── styles/                            # Design Tokens & Global CSS
│   │   ├── index.css                      # Global Styles & Typography
│   │   └── tokens.css                     # CSS Custom Properties (:root)
│   ├── types/                             # TypeScript Interface Definitions
│   │   └── content.ts                     # CaseStudy, Service, Testimonial types
│   ├── App.tsx                            # Primary App Container & Routing
│   └── main.tsx                           # React DOM Entrypoint
├── index.html                             # HTML5 Shell & Local Schema Script
├── package.json                           # Dependency Manifest
├── tailwind.config.ts                     # Design Token System Mapping
├── tsconfig.json                          # Strict TypeScript Configuration
└── vite.config.ts                         # Build & Optimization Pipeline
```

---

## 5. Data Architecture & Type Schemas

### 5.1 Case Study Entity
```typescript
export interface CaseStudy {
  id: string;
  slug: string;
  index: string;             // e.g., "01", "02"
  title: string;             // e.g., "Fashion Campaign"
  client: string;            // e.g., "SWAG"
  industry: 'Fashion' | 'Retail' | 'Weddings' | 'Luxury' | 'Fitness';
  category: 'Video & Reels' | 'Social Media' | 'Advertising' | 'Branding & Design';
  coverImage: string;        // WebP image path
  videoPreviewUrl?: string;  // Short looping preview (no audio)
  videoFullUrl?: string;     // High-res modal video
  deliverables: string[];    // e.g., ["12 Short-form Reels", "Brand Guidelines"]
  verifiedResult?: string;   // e.g., "3.4M Views & 220% Growth in Inbound Sales"
  featured: boolean;
}
```

### 5.2 Service Compartment Entity (The 4 Pillars from PDF Page 4)
```typescript
export interface ServiceCompartment {
  id: 'content-video' | 'social-media' | 'advertising-growth' | 'branding-design';
  numberTag: string;         // e.g., "01", "02", "03", "04"
  title: string;             // e.g., "Content & Video Production"
  shortDescription: string;  // 1-2 sentences for card face
  deliverables: string[];    // Full 12-16 items from blueprint
  iconType: 'camera' | 'smartphone' | 'spheres' | 'abstract-glass';
  actionLabel: string;       // e.g., "Explore Deliverables ↗"
}
```

### 5.3 Client Testimonial Entity
```typescript
export interface Testimonial {
  id: string;
  clientName: string;        // e.g., "Karan Shah"
  clientRole?: string;       // e.g., "Managing Director"
  brandName: string;         // e.g., "Zanzar Jewellers"
  brandLogo?: string;
  avatarUrl?: string;
  quote: string;             // Verified client quote
  rating: 5;
}
```

### 5.4 Lead Capture Schema (Zod Validation)
```typescript
import { z } from 'zod';

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().optional(),
  emailOrPhone: z.string().min(5, "Valid email or phone number required"),
  serviceNeeded: z.enum([
    "Content & Video",
    "Social Media",
    "Advertising & Growth",
    "Branding & Design",
    "Full-Stack Creative",
    "Other"
  ]),
  estimatedBudget: z.enum([
    "Under ₹50,000",
    "₹50,000 - ₹1,50,000",
    "₹1,50,000 - ₹5,00,000",
    "₹5,00,000+",
    "Not sure yet"
  ]),
  projectDetails: z.string().max(1000).optional(),
});

export type EnquiryPayload = z.infer<typeof EnquirySchema>;
```

---

## 6. Performance Benchmarks & Core Web Vitals SLA

| Metric | Target | Strategy for Achievement |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Preload critical hero fonts; load 3D visual with fallback static high-res WebP image; inline critical hero CSS. |
| **INP (Interaction to Next Paint)** | `< 100ms` | Zero heavy third-party tracker scripts; decoupled state updates for portfolio filtering; CSS-driven animations. |
| **CLS (Cumulative Layout Shift)** | `0.00` | Rigid aspect ratio locks on all project thumbnails (`aspect-[4/5]`); fixed dimensions on video modal triggers and logo tickers. |
| **First Contentful Paint (FCP)** | `< 0.8s` | Atomic Vite bundling; static HTML pre-rendering of initial DOM elements. |
| **Total Page Weight** | `< 1.8MB` | Modern media formats (WebP/AVIF); video assets stream on user click only (no background uncompressed autoplay). |

---

## 7. Search Engine Optimization & Local Entity Graph

### 7.1 Schema.org JSON-LD Specification (Local Creative Agency)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://thedesigndudestudio.com/#organization",
      "name": "The Design Dude Studio",
      "alternateName": "TDDS",
      "url": "https://thedesigndudestudio.com",
      "logo": "https://thedesigndudestudio.com/logo.svg",
      "description": "High-impact creative studio based in Ahmedabad combining content creation, video production, brand design, and digital marketing.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      "areaServed": ["Ahmedabad", "Mumbai", "Delhi", "Global Remote"],
      "sameAs": [
        "https://www.instagram.com/thedesigndudestudio",
        "https://www.linkedin.com/company/thedesigndudestudio"
      ]
    }
  ]
}
</script>
```

---

## 8. Verification & Delivery Criteria

1. **Clean TypeScript Build:** `npm run build` must complete with zero type warnings or errors.
2. **Accessible Keyboard Navigation:** `Tab` order traverses Navbar → Hero CTAs → Bento Cards → Filter Chips → Form Fields → Footer.
3. **Sound Autoplay Invariant:** In accordance with PDF Page 5, no audio plays automatically. All video preview tiles stay muted until the explicit user modal trigger.
4. **WhatsApp Link Encoding:** Ensures UTF-8 URI encoding so prospective client parameters (service chosen, budget) are pre-filled upon clicking the WhatsApp button.
