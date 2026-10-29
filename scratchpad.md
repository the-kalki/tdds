# Codebase Simplification & De-Bloat Scratchpad

> **Objective:** Execute repository-wide de-bloating across 5 phases to cut ~1,000+ lines of code, eliminate 2 runtime dependencies, remove WebGL/DOM-render bottlenecks, and standardize on native web platform primitives.

---

## 📋 Execution Checklist

### Phase 1: Critical Quick Wins & Dead Code Purge
- [ ] **1.1 Remove Dead Runtime Dependencies**
  - Run `npm rm caniuse-lite`
  - Verify `package.json` and `package-lock.json`
- [ ] **1.2 Delete Dead Boilerplate Files**
  - Delete `src/App.css` (184 lines of dead starter CSS)
  - Delete `src/components/common/Button.tsx` (55 lines, 0 repo imports)
  - Delete `src/components/common/Badge.tsx` (32 lines, 0 repo imports)
  - Delete `public/icons.svg` (Unreferenced starter SVG sprite)
  - Delete `src/assets/react.svg` and `src/assets/vite.svg`
- [ ] **1.3 Remove Dead Prop Drilling**
  - Remove unused `onOpenLeadDrawer` prop from `ConversionCtaSection.tsx`
  - Remove unused prop pass `<ConversionCtaSection onOpenLeadDrawer={...} />` in `src/App.tsx`

---

### Phase 2: High-Impact Architectural Simplifications
- [ ] **2.1 Replace WebGL Shader with CSS Gradient (`FluidImpactText.tsx`)**
  - Replace 407 lines of GLSL, offscreen canvas, and RAF loops with pure semantic `<span>` using `.text-gradient-coral`
  - Verify visual parity, responsive letterform containment, and zero GPU overhead
- [ ] **2.2 Align `TestimonialSlider.tsx` with Native CSS Scroll-Snap**
  - Eliminate 3x array duplication (`[...data, ...data, ...data]`)
  - Remove window resize DOM style polling (`getComputedStyle`)
  - Remove double `requestAnimationFrame` boundary jump hacks
  - Implement container `overflow-x-auto snap-x snap-mandatory` with simple `scrollBy` arrow handlers (mirroring `PortfolioMatrix`)
- [ ] **2.3 Eliminate 60fps Re-render Thrashing (`useTilt.ts` & `useReducedMotion.ts`)**
  - Remove mousemove `setState` loops from `BentoServiceGrid.tsx` and `TestimonialSlider.tsx`
  - Replace with CSS `:hover` transformations or direct CSS custom property updates
  - Delete `src/hooks/useTilt.ts` and `src/hooks/useReducedMotion.ts`

---

### Phase 3: Tooling & Platform Upgrades
- [ ] **3.1 Drop `zod` in Favor of Native Form Validation**
  - Replace `zod` schema in `src/types/content.ts` with a lightweight 12-line vanilla validator or native HTML5 validation
  - Update `LeadCaptureDrawer.tsx` form submission logic
  - Run `npm rm zod`
- [ ] **3.2 Adopt Native HTML5 `<details name="faq">` in `FaqSection.tsx`**
  - Replace `useState<number | null>(0)` and manual toggle logic with standard `<details name="faq">` and `<summary>`
  - Verify keyboard accessibility and CSS accordion styling
- [ ] **3.3 Fix Google Fonts Network Waterfall**
  - Remove `@import url('https://fonts.googleapis.com/...')` from `src/styles/index.css`
  - Place font stylesheet `<link rel="stylesheet">` directly into `<head>` in `index.html` alongside preconnect tags
- [ ] **3.4 Eliminate Main-Thread Layout Thrashing in `Navbar.tsx`**
  - Replace unthrottled `getBoundingClientRect()` on scroll with an `IntersectionObserver` or throttled observer

---

### Phase 4: Schema & Data Model Pruning (YAGNI)
- [ ] **4.1 Prune Unused Fields in `src/types/content.ts` & `src/content/siteContent.ts`**
  - Remove unreferenced `ServiceCategory` type
  - Prune unrendered `CaseStudy` fields: `industry`, `category`, `deliverables`, `verifiedResult`, `featured`, `index`
  - Prune unrendered `Testimonial` fields: `clientName`, `clientRole`
  - Prune unrendered `ServiceCompartment` fields: `numberTag`, `actionLabel`
  - Prune unused `heroContent` fields: `headline`, `secondaryCta`, `scrollText`

---

### Phase 5: Verification & Bundle Audit
- [ ] **5.1 Typecheck & Build Validation**
  - Run `npm run build` (`tsc -b && vite build`)
  - Run `npm run lint` (`oxlint`)
- [ ] **5.2 Measure Bundle Delta**
  - Baseline JS: `378.40 kB` (gzip: `113.85 kB`)
  - Target JS: `< 260 kB` (gzip: `< 80 kB`)
  - Net code line delta: `-1,000+ lines`

