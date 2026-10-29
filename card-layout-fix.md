# Plan: Card Layout & Dimension Refinement (Featured Work & Services)

**Task Slug:** `card-layout-fix`  
**Target:** Eliminate card overlap, reduce card dimensions by ~20% (aligning ~1 inch below CTA buttons), enable smooth 3-card view + scroll for congestion prevention, and fix headline text collision in Services.  
**Mode:** Planning Only (`/plan`)  

---

## 1. Executive Summary & Problem Diagnosis

### 1.1 The Problems
1. **Featured Work Card Overlap & Congestion:**
   - On standard laptop displays (1024px – 1366px viewports), forcing 4 columns (`grid-cols-4`) alongside a fixed 280px left sidebar squeezes card track widths down to ~160px–180px while card assets and min-heights force intrinsic expansion.
   - This causes visual congestion, card-on-card overlap, and awkward horizontal cramping.
2. **Excessive Vertical Card Length:**
   - Both Featured Work and Services cards are currently over-extended vertically (`min-h-[470px]` to `min-h-[500px]`), stretching far beyond the natural height of the left headline lockup.
   - User requirement: Reduce card dimensions by ~20% so card bottoms terminate approximately 1 inch (~40px–50px) below the `View All Work` / `View All Services` button.
3. **Services Headline Spilling Into Cards:**
   - In `ServicesBentoSection`, the headline `Everything your brand needs.` with `lg:text-4xl xl:text-5xl` Syne 900 font exceeds the 280px width of the left container.
   - The word `Everything` overflows horizontally, colliding directly with the first card (`Content & Video`).

---

## 2. Architectural Blueprint & Target Geometry

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Container: max-w-site (1360px) px-4 sm:px-6 lg:px-10                                   │
│                                                                                        │
│  [ Left Column Lockup ]        [ Right Column: Responsive 3-Card Carousel Track ]      │
│  Width: lg:w-[300px] xl:w-[340px]    Width: flex-1 min-w-0 overflow-hidden             │
│                                                                                        │
│  Tag: SERVICES / FEATURED WORK  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ──> │
│  H2: Scaled Typography         │ Card 1       │ │ Card 2       │ │ Card 3       │[Peek]│
│  (No horizontal overflow)       │ Width: ~250px│ │ Width: ~250px│ │ Width: ~250px│     │
│  Paragraph: Clean max-w-xs      │              │ │              │ │              │     │
│                                 │              │ │              │ │              │     │
│  [ View All CTA ➔ ]            │              │ │              │ │              │     │
│          │                      │              │ │              │ │              │     │
│          └── ~1 inch (40-50px) ─└──────────────┘ └──────────────┘ └──────────────┘     │
│                                                                                        │
│                                 [ < Prev ] [ Next > ] Nav Arrows / Touch Drag          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Specifications

### 3.1 Dimensions & Vertical Alignment (~20% Reduction)
- **Left Column Height:** Tag (~28px) + H2 (~140px) + Gap (~16px) + Paragraph (~48px) + Gap (~24px) + CTA (~44px) = **~300px**.
- **Card Target Height:** `min-h-[350px] sm:min-h-[370px] lg:min-h-[385px] xl:min-h-[400px]` (down from `500px`, exactly ~20–22% reduction).
- **Visual Rhythm:** Cards terminate cleanly ~40px–50px (~1 inch) below the CTA button baseline.

### 3.2 Responsive 3-Card Layout with Horizontal Scroll
- **Container Architecture:**
  - Right column uses a smooth-scrolling horizontal flex track (`flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar`).
  - Card width is sized so exactly **3 cards** sit comfortably visible on standard desktop viewports (e.g. `w-[calc((100%-2rem)/3)]` or `w-[240px] sm:w-[260px] lg:w-[250px] xl:w-[270px] flex-shrink-0 snap-start`).
  - Card 4 is accessible via smooth horizontal swipe, trackpad drag, or navigation arrows.
  - On ultra-wide screens (`2xl:` >= 1536px), all 4 cards can naturally fit in a 4-col view if width allows.

### 3.3 Fixing Headline Overlap in Services
- Update Left Lockup width: `lg:w-[300px] xl:w-[340px]` with `flex-shrink-0`.
- Scale H2 font size: `text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.6rem] leading-[1.08] tracking-tight text-white break-words`.
- Increase column gap to `gap-8 lg:gap-12 xl:gap-14` to guarantee safe clearance between text and cards.

---

## 4. Phase-by-Phase Execution Plan

### Phase 1: Services Section Geometry & Text Clearance
- **Files Affected:**
  - `src/components/sections/ServicesBentoSection.tsx`
  - `src/components/interactive/BentoServiceGrid.tsx`
- **Actions:**
  1. Expand left lockup container to `lg:w-[300px] xl:w-[340px] flex-shrink-0`.
  2. Scale headline font so `Everything` never clips or bleeds (`lg:text-[2.25rem] xl:text-[2.6rem]`).
  3. Update `BentoServiceGrid` to a 3-card visible horizontal scroll layout with snap points and clean padding.
  4. Reduce card height by 20% to `min-h-[350px] sm:min-h-[370px]` (down from 440px).

### Phase 2: Featured Work Section Geometry & 3-Card Scroll Track
- **Files Affected:**
  - `src/components/sections/FeaturedWorkSection.tsx`
  - `src/components/interactive/PortfolioMatrix.tsx`
- **Actions:**
  1. Update `FeaturedWorkSection` left lockup container and gap matching Services for visual symmetry.
  2. In `PortfolioMatrix.tsx`, transition from rigid `grid-cols-4` to responsive 3-card snap-scroll track (`flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2`).
  3. Reduce card height by ~20%: set `min-h-[360px] sm:min-h-[380px] lg:min-h-[390px] xl:min-h-[410px]` with aspect ratio `aspect-[3/4.2]`.
  4. Ensure bottom overlays (`SWAG`, `SUN`, `BLUEKRIT`, `LOYAL GREENS`) and circular arrow buttons scale proportionately to the new height.
  5. Add optional subtle arrow controls (`<` `>`) or visual pagination dots so users know the 4th card is scrollable.

### Phase 3: Verification & Visual Regression Testing
- **Commands:**
  - `npx tsc --noEmit -p tsconfig.app.json` (Verify zero TypeScript errors)
  - `npm run lint` (Verify clean linting)
  - Browser inspection across viewports: `1024x768`, `1280x800`, `1440x900`, `1920x1080`.
  - Validate that:
    - Zero text overlap occurs in `#services`.
    - Zero card overlap occurs in `#work`.
    - Exactly 3 cards are comfortably visible with the 4th smoothly scrollable.
    - Card bottom baseline terminates ~1 inch (~40px) below the "View All" buttons.

---

## 5. Verification Checklist

- [ ] Headline "Everything your brand needs." has minimum 32px clearance from Card 1 at 1024px, 1280px, and 1440px.
- [ ] Featured Work cards display 3 cards fully without congestion, with Card 4 smoothly scrollable into view.
- [ ] Card vertical height is ~20% shorter, landing ~1 inch below the CTA button.
- [ ] Zero build/lint regressions (`npm run lint` = 0 errors).

