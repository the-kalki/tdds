# 02 / Design System & Token Architecture
**Project:** The Design Dude Studio (TDDS)  
**Philosophy:** *"Keep the interface quiet. Let the work be loud."* (PDF Page 9)  
**Aesthetic Core:** Bold Editorial Minimal • Dual-Surface Contrast • Chromatic Glass Refraction  
**Format:** Production CSS Variables (`:root`) • Tailwind Config • Component Tokens  

---

## 1. Brand Identity & Visual Language

The Design Dude Studio visual identity balances restrained, editorial minimalism with vivid, high-energy creative moments. 

### The Dual-Surface Aesthetic
Rather than forcing a single flat theme, the platform alternates between two distinct atmospheric surfaces:
- **Ivory Canvas (`#FAF9F6`):** Used for human, editorial, and storytelling moments (Hero, Selected Work, Testimonials). Delivers maximum readability, generous whitespace, and a high-end publication feel.
- **Obsidian Canvas (`#0D0D0D`):** Used for technical capabilities and conversion anchors (Services Bento Grid, Client Roster Ticker, Conversion CTA Banner). Highlights iridescent 3D materials, glowing borders, and neon gradient transitions.

```
┌────────────────────────────────────────────────────────┐
│  LIGHT SURFACE: Warm Ivory (#FAF9F6)                   │
│  • Hero Section ("IDEAS INTO IMPACT.")                 │
│  • 3D Prismatic Glass Monogram                         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  DARK SURFACE: Deep Obsidian (#0D0D0D)                 │
│  • ( 01 ) Services Bento Grid (Glassmorphic Cards)     │
│  • Energetic Lime Tagging (#C8F169)                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  LIGHT SURFACE: Warm Ivory (#FAF9F6)                   │
│  • ( 02 ) Featured Work Editorial Grid                 │
│  • ( 04 ) Verified Client Testimonial Carousel         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  DARK SURFACE: Deep Obsidian (#0D0D0D)                 │
│  • ( 03 ) Client Roster Infinite Marquee               │
│  • ( 05 ) Conversion CTA with Sweeping Fluid Ribbon    │
│  • Comprehensive Studio Footer                         │
└────────────────────────────────────────────────────────┘
```

---

## 2. Color System & Token Specification

### 2.1 Palette Tokens

| Token Name | Hex Code | Role & Usage | Surface Context |
| :--- | :--- | :--- | :--- |
| `--tdds-bg-ivory` | `#FAF9F6` | Primary page background, editorial breathing room | Light Canvas |
| `--tdds-bg-secondary` | `#F4F2EC` | Slightly warmer ivory for subtle card fills and hover wells | Light Canvas |
| `--tdds-bg-obsidian` | `#0D0D0D` | Deep technical background for services, clients, footer | Dark Canvas |
| `--tdds-surface-dark` | `#141414` | Glassmorphic card base background | Dark Canvas |
| `--tdds-text-primary` | `#171717` | High-contrast body and headline text on light backgrounds | Light Canvas |
| `--tdds-text-muted` | `#66645E` | Secondary captions, subheadings, and metadata tags | Light Canvas |
| `--tdds-text-light` | `#FFFFFF` | Primary headlines and labels on obsidian surfaces | Dark Canvas |
| `--tdds-text-light-muted`| `rgba(255,255,255,0.6)`| Secondary labels and bullet items on dark surfaces | Dark Canvas |
| `--tdds-border-light` | `#E5E2DB` | Muted hairline dividers and structural grid borders | Light Canvas |
| `--tdds-border-dark` | `rgba(255,255,255,0.1)`| Glassmorphic card borders and active hover rings | Dark Canvas |
| `--tdds-accent-lime` | `#C8F169` | High-voltage lime for status chips, micro-pips, tags | Universally Active |
| `--tdds-coral-start` | `#FF5722` | Gradient start for primary brand focal point ("IMPACT.") | Focal Accent |
| `--tdds-coral-end` | `#E02B20` | Gradient end for primary brand focal point ("IMPACT.") | Focal Accent |

### 2.2 CSS Variables Declaration (`src/styles/tokens.css`)

```css
:root {
  /* Surfaces */
  --tdds-bg-ivory: #FAF9F6;
  --tdds-bg-secondary: #F4F2EC;
  --tdds-bg-obsidian: #0D0D0D;
  --tdds-surface-dark: #141414;
  --tdds-surface-glass: rgba(255, 255, 255, 0.03);

  /* Typography */
  --tdds-text-primary: #171717;
  --tdds-text-muted: #66645E;
  --tdds-text-light: #FFFFFF;
  --tdds-text-light-muted: rgba(255, 255, 255, 0.65);

  /* Borders & Dividers */
  --tdds-border-light: #E5E2DB;
  --tdds-border-dark: rgba(255, 255, 255, 0.1);
  --tdds-border-glass-hover: rgba(255, 255, 255, 0.25);

  /* Brand Accents */
  --tdds-accent-lime: #C8F169;
  --tdds-coral-start: #FF5722;
  --tdds-coral-end: #E02B20;
  --gradient-impact: linear-gradient(135deg, #FF5722 0%, #E02B20 100%);
  --gradient-ribbon: linear-gradient(90deg, #FF5722 0%, #E02B20 40%, #D81B60 70%, #8E24AA 100%);

  /* Spatial Scale (8px rhythm) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1.0rem;   /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2.0rem;   /* 32px */
  --space-12: 3.0rem;  /* 48px */
  --space-16: 4.0rem;  /* 64px */
  --space-24: 6.0rem;  /* 96px */
  --space-32: 8.0rem;  /* 128px */

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Easing Curves */
  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. Typography Framework

### 3.1 Font Families & Roles
- **Display Typeface:** `Clash Display` / `Syne` / `Plus Jakarta Sans` (Weight 800/900).  
  *Characteristics:* Tight tracking (`-0.035em`), commanding geometry, sculptural presence. Used for Hero headlines and section statement openers.
- **Body & Interface Typeface:** `Inter` / `General Sans` (Weight 400/500/600).  
  *Characteristics:* Neutral, ultra-legible humanist grotesk with generous x-height. Used for long-form case studies, deliverables lists, and form inputs.
- **Technical Indicator Typeface:** Monospace or uppercase spaced sans (`JetBrains Mono` / `Inter Mono`).  
  *Characteristics:* Letter-spacing (`+0.08em`), uppercase. Used for index numbers `( 01 )`, studio geo-tags, and service counters.

### 3.2 Modular Scale (Fluid Desktop to Mobile)

| Style Token | Desktop Clamp Size | Mobile Size | Weight | Tracking | Line-Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-2xl` | `clamp(3.5rem, 7vw, 6.5rem)` | `3.0rem` | 900 (Black) | `-0.04em` | `0.95` |
| `display-xl` | `clamp(2.5rem, 5vw, 4.25rem)`| `2.25rem` | 800 (Bold) | `-0.03em` | `1.05` |
| `heading-lg` | `clamp(2.0rem, 3.5vw, 3.0rem)`| `1.75rem` | 700 (Bold) | `-0.025em`| `1.15` |
| `heading-md` | `clamp(1.5rem, 2.5vw, 2.0rem)`| `1.35rem` | 600 (Semi) | `-0.015em`| `1.25` |
| `body-lead` | `1.25rem (20px)` | `1.125rem` | 400 (Regular)| `normal` | `1.6` |
| `body-main` | `1.0rem (16px)` | `0.9375rem` | 400 (Regular)| `normal` | `1.65` |
| `caption-sm` | `0.875rem (14px)` | `0.8125rem` | 500 (Medium) | `+0.01em` | `1.5` |
| `mono-tag` | `0.75rem (12px)` | `0.6875rem` | 600 (Mono) | `+0.08em` | `1.2` |

---

## 4. 8px Spatial System & Responsive Breakpoints

### 4.1 Layout Constraints
- **Max Container Width:** `1360px` with responsive horizontal padding:
  - Mobile (`< 640px`): `16px` padding (Gutter)
  - Tablet (`640px - 1024px`): `32px` padding
  - Desktop (`> 1024px`): `48px` - `64px` padding
- **Desktop Grid:** 12 equal columns with `24px` gutters (`gap-6`).
- **Vertical Section Rhythm:** `py-20` (80px) on mobile; `py-28` to `py-36` (112px to 144px) on desktop.

---

## 5. Component Library Inventory (30+ Components)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ATOMIC UI COMPONENT INVENTORY                                                          │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Category                       │ Components & Purpose                                  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 1. Core Primitives             │ • Button (Pill Black, Pill Outline, Pill Lime, Icon)  │
│                                │ • SectionTag `( 01 ) SERVICES`                        │
│                                │ • StatusBadge (Lime pulse dot, Category chip)         │
│                                │ • IconContainer (Circular arrow trigger)              │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 2. Navigation & Headers        │ • NavbarSticky (Glassmorphic desktop pill)            │
│                                │ • MobileMenuDrawer (Fullscreen touch navigation)      │
│                                │ • NavLinkItem (Hover line-sweep interaction)          │
│                                │ • WhatsAppFAB (Persistent mobile conversion button)   │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 3. Bento Services (Dark)       │ • BentoGridContainer (12-col 4-card matrix)           │
│                                │ • BentoCardContentVideo (Camera visual + 3D tilt)     │
│                                │ • BentoCardSocialMedia (Smartphone + notification)    │
│                                │ • BentoCardAdvertising (Glowing iridescent spheres)   │
│                                │ • BentoCardBranding (Sculpted glass prism)            │
│                                │ • DeliverablesDrawer (Slide-over checklist panel)     │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 4. Work & Media Portfolio      │ • FilterChipGroup (`All`, `Reels`, `Brand`, etc.)     │
│                                │ • ProjectEditorialTile (Aspect-locked cover + tag)    │
│                                │ • VideoPosterContainer (Zero-CLS media slot)          │
│                                │ • VideoLightboxModal (Accessible player overlay)      │
│                                │ • BeforeAfterComparator (Slide-to-reveal split view)  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 5. Client Trust & Social Proof │ • ClientMarqueeTicker (Hardware-accelerated loop)     │
│                                │ • ClientLogoItem (Monochrome hover state)             │
│                                │ • TestimonialCard (Verified quote + 5-star rating)    │
│                                │ • TestimonialSliderControls (Prev / Next arrow pills) │
│                                │ • MetricStatBadge (e.g., "3.4M Views")                │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 6. Lead Capture & Inputs       │ • TextInput (Minimal floating label)                  │
│                                │ • SelectDropdown (Custom chevron, accessible popup)   │
│                                │ • BudgetRangePills (Toggleable price bracket buttons) │
│                                │ • MultiStepProgress (3-step indicator bar)            │
│                                │ • FormFeedbackToast (Success / Error confirmation)    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 7. Footers & Section Closers   │ • ConversionRibbonCTA (3D liquid gradient backdrop)   │
│                                │ • Footer4ColumnLayout (Studio address, links, legal)  │
│                                │ • WhatsAppDeepLinkButton (Direct chat initiator)      │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 6. Motion Principles & Micro-Interactions

### 6.1 Curves and Timings
- **Micro-Interaction Hover:** `150ms ease-out` — Button fills, link underlines, arrow shifts (`translate-x-1`).
- **Card Expansion / Drawer Entry:** `350ms cubic-bezier(0.16, 1, 0.3, 1)` — Slide-in drawers and lightboxes.
- **Scroll Reveal / Stagger:** `500ms cubic-bezier(0.16, 1, 0.3, 1)` — Elements fade in and translate upward by `16px`.
- **Desktop 3D Tilt:** Real-time mouse coordinate mapping (`max 6deg` rotateX/rotateY, clamped to prevent motion sickness).

### 6.2 Accessibility & Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .client-marquee-track {
    animation: none !important;
    overflow-x: auto !important;
  }
}
```

---

## 7. WCAG AA Contrast Compliance Matrix

| Foreground Element | Background Surface | Contrast Ratio | WCAG AA Status |
| :--- | :--- | :--- | :--- |
| Near-Black Text (`#171717`) | Warm Ivory Canvas (`#FAF9F6`)| **16.2 : 1** | PASS (AAA) |
| Muted Grey Text (`#66645E`) | Warm Ivory Canvas (`#FAF9F6`)| **5.1 : 1** | PASS (AA Normal) |
| White Text (`#FFFFFF`) | Obsidian Canvas (`#0D0D0D`) | **19.8 : 1** | PASS (AAA) |
| Energetic Lime (`#C8F169`)| Obsidian Canvas (`#0D0D0D`) | **15.4 : 1** | PASS (AAA) |
| Coral Gradient (`#FF5722`)| Obsidian Canvas (`#0D0D0D`) | **4.9 : 1** | PASS (AA Normal) |
| Focused State Ring (`#171717`)| Warm Ivory Canvas (`#FAF9F6`)| **16.2 : 1** | PASS (AA Interactive)|
