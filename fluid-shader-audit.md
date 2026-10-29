# Project Plan: Fluid Shader & UI/UX Audit Fixes

**Task Slug:** `fluid-shader-audit`  
**Location:** `./fluid-shader-audit.md`  
**Project Type:** WEB (React 19 + TypeScript + Vite + Tailwind CSS)  
**Governing Agent:** `project-planner`  
**Execution Agents:** `frontend-specialist`, `design-specialist`

---

## 1. Overview & Context

During the UI/UX Pro Max audit of The Design Dude Studio (TDDS) codebase against Figma blueprints and visual targets, two primary architectural and aesthetic issues were diagnosed:

1. **"IMPACT." Hero Typography (Option 2 - WebGL/Canvas Fluid Shader):**
   - Current state: Flat, 2-color linear gradient (`#FF5722` → `#E02B20`) looking static and dull.
   - Desired state: An organic, liquid aurora mesh shader (Tangerine `#FF7A00`, Coral `#FF5722`, Crimson `#E02B20`, Magenta `#D81B60`, Deep Cosmic Indigo `#311B92`) with interactive mouse ripple dynamics and a **strict FPS cap** (30–40 FPS) to prevent battery drain and GPU thermal throttling.
2. **"Baked UI in Bitmaps" & Nested Card Anti-pattern:**
   - Numbers (`01 )`, `02 )`) and titles were exported inside the Figma bitmap images (`service-*.webp`, `case-swag.webp`), causing double-rendering when combined with DOM typography.
   - Services cards have an awkward nested box inside the card instead of the sleek single-slab glass card seen in the Figma design (Image 1).

This plan outlines the systematic implementation of Option 2, the asset/DOM cleanup, card restructuring, and documentation updates in `DESIGN.md`.

---

## 2. Measurable Success Criteria

- [ ] **Fluid Aurora Shader:** Word `"IMPACT."` renders with an organic, flowing liquid shader matching the target color stops.
- [ ] **Strict FPS Cap & Resource Optimization:**
  - Shader frame rate is capped to max 30–40 FPS via `requestAnimationFrame` timestamp delta checking.
  - Render loop automatically pauses when out of viewport (`IntersectionObserver`).
  - Render loop pauses immediately when tab is inactive (`visibilitychange`).
  - Full graceful fallback to CSS animated gradient on `prefers-reduced-motion: reduce` or unsupported WebGL contexts.
- [ ] **Elimination of Double Numbering & Baked Text:**
  - No overlapping, doubled numbers or blurry rasterized text in Services and Featured Work cards.
  - All textual elements (numbers, badges, titles, labels) render as crisp vector DOM nodes.
- [ ] **Figma Card Alignment:**
  - Services cards adopt a unified, single-slab glassmorphism architecture without clunky nested boxes.
- [ ] **Production Build Integrity:**
  - `npm run build` passes with 0 TypeScript and 0 bundler errors.

---

## 3. Technology Stack & Decision Rationale

| Layer | Selection | Rationale |
| :--- | :--- | :--- |
| **Shader Engine** | Lightweight 2D/WebGL Canvas Fragment Shader (Vanilla Canvas/WebGL, 0 external runtime dependencies) | Avoids 500KB+ Three.js bundle weight while providing 100% control over shader uniforms, mouse interaction, and manual RAF frame pacing. |
| **Styling** | Tailwind CSS + CSS `mask-image` / `background-clip: text` | Browser-native hardware acceleration for text cutout clipping. |
| **Lifecycle & Observers** | React `useEffect` + `useRef` + `IntersectionObserver` | Zero-overhead lifecycle management with automatic cleanup on unmount and viewport culling. |

---

## 4. File Structure Impact

```
tdds/
├── DESIGN.md                              # UPDATE: Add liquid aurora tokens, FPS cap rules, asset guidelines
├── fluid-shader-audit.md                  # PLAN: This master plan file
├── src/
│   ├── components/
│   │   ├── interactive/
│   │   │   ├── FluidImpactText.tsx        # CREATE: WebGL/Canvas shader component with FPS cap & observers
│   │   │   ├── BentoServiceGrid.tsx       # MODIFY: Clean single-slab glass card structure
│   │   │   └── PortfolioMatrix.tsx        # MODIFY: Decouple duplicate text overlay
│   │   └── sections/
│   │       ├── HeroSection.tsx            # MODIFY: Integrate FluidImpactText
│   │       └── ServicesBentoSection.tsx   # VERIFY: Harmonized section layout
│   └── styles/
│       ├── tokens.css                     # UPDATE: Register liquid aurora color palette tokens
│       └── index.css                      # UPDATE: Add fallback CSS gradient animation & text mask utilities
```

---

## 5. Task Breakdown

### Task 1: Update Design Specification & Tokens (`DESIGN.md` & `tokens.css`)
- **Agent:** `design-specialist`
- **Skills:** `@[skills/design-spec]`, `@[skills/ui-ux-pro-max]`
- **Priority:** P1 (Foundation)
- **Dependencies:** None
- **Actions:**
  1. Add the **Liquid Aurora Mesh Palette** to `tokens.css` and `DESIGN.md`:
     - `--tdds-aurora-tangerine: #FF7A00`
     - `--tdds-aurora-coral: #FF5722`
     - `--tdds-aurora-crimson: #E02B20`
     - `--tdds-aurora-magenta: #D81B60`
     - `--tdds-aurora-indigo: #311B92`
  2. Document the **Asset Separation Rule**: Never bake textual tags, numbers, or buttons into raster PNG/WebP exports. Bitmaps must contain only isolated visual subjects.
  3. Document **Performance Invariants**: Maximum 30 FPS cap for decorative background shaders; mandatory viewport visibility observer.
- **INPUT:** `DESIGN.md`, `src/styles/tokens.css`
- **OUTPUT:** Updated `DESIGN.md` and `src/styles/tokens.css` with synced design tokens and rules.
- **VERIFY:** Check that CSS variables compile and are referenced in `DESIGN.md`.

---

### Task 2: Build `FluidImpactText` WebGL/Canvas Shader Component (Option 2 with FPS Cap)
- **Agent:** `frontend-specialist`
- **Skills:** `@[skills/modern-web-guidance]`, `@[skills/performance-profiling]`, `@[skills/clean-code]`
- **Priority:** P0 (Core User Requirement)
- **Dependencies:** Task 1
- **Actions:**
  1. Create `src/components/interactive/FluidImpactText.tsx`:
     - Implements a lightweight WebGL or 2D Perlin noise organic fluid shader rendering the 5-stop Aurora palette.
     - **Strict FPS Cap**: Measure delta time `(timestamp - lastFrameTime >= 1000 / targetFps)` where `targetFps = 30` (or 36) to prevent unnecessary frame renders.
     - **Mouse Interaction**: Track cursor position relative to the text element with smoothed spring easing to generate gentle fluid ripples on hover.
     - **Viewport Observer**: Attach an `IntersectionObserver` to pause the RAF loop when the hero headline is scrolled out of the active viewport.
     - **Visibility Change Listener**: Pause RAF loop when `document.hidden` is true (user switched tabs).
     - **Reduced Motion Fallback**: Detect `window.matchMedia('(prefers-reduced-motion: reduce)')` and render static/gentle CSS gradient if active.
  2. Integrate `FluidImpactText` into `src/components/sections/HeroSection.tsx` replacing `<span className="block text-gradient-coral">IMPACT.</span>`.
- **INPUT:** `HeroSection.tsx`, Target Image 3 color specs.
- **OUTPUT:** `FluidImpactText.tsx` seamlessly running inside `HeroSection.tsx`.
- **VERIFY:** Run `npm run dev`, verify that "IMPACT." displays flowing colors, inspect console/devtools performance to verify FPS stays locked at ~30 FPS, verify animation stops when scrolled out of view.

---

### Task 3: Resolve Baked Asset Double-Rendering & Decouple UI Overlays
- **Agent:** `frontend-specialist`
- **Skills:** `@[skills/ui-ux-pro-max]`, `@[skills/clean-code]`
- **Priority:** P1 (Visual Polish)
- **Dependencies:** None (can run in parallel with Task 2)
- **Actions:**
  1. **Services Cards (`BentoCard.tsx`):**
     - Adjust image framing or clean visual crop to ensure baked `01 )` from old Figma crop is hidden/masked via CSS container clipping (`object-cover`, container boundary adjustment), allowing the crisp DOM `service.numberTag )` to be the sole canonical badge.
  2. **Featured Work Cards (`PortfolioMatrix.tsx`):**
     - Review `case-swag.webp` and other case study tiles. Ensure DOM overlay elements (client name, title, arrow button) do not produce doubled/misaligned text over existing raster graphics.
- **INPUT:** `src/components/interactive/BentoServiceGrid.tsx`, `src/components/interactive/PortfolioMatrix.tsx`
- **OUTPUT:** Clean typography and badge presentation with zero duplicated text.
- **VERIFY:** Visually inspect all cards across mobile, tablet, and desktop viewports to confirm no duplicate text or numbers appear.

---

### Task 4: Refactor Services Bento Cards to Single-Slab Glassmorphic Architecture
- **Agent:** `frontend-specialist`
- **Skills:** `@[skills/frontend-design]`, `@[skills/ui-ux-pro-max]`
- **Priority:** P2 (Visual Alignment)
- **Dependencies:** Task 3
- **Actions:**
  1. Remove the clunky nested inner box (`bg-black/40` rectangular container) inside `BentoCard.tsx`.
  2. Make the entire card a unified, single translucent slab (`bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-2xl`).
  3. Allow the 3D subject image to float naturally within the card layout with subtle reflection, matching the aesthetic in Figma Image 1.
- **INPUT:** `BentoCard.tsx`, Figma Image 1.
- **OUTPUT:** Streamlined, elegant glass card structure.
- **VERIFY:** Inspect card layout in dark mode, verifying smooth hover tilt, clean spacing, and absence of redundant nested frames.

---

## 6. Phase X: Verification Checklist

Execute these validation commands before marking the project complete:

- [x] **Type Check & Build:**
  ```bash
  npm run build
  ```
  *(Passed with 0 errors in 1.48s).*
- [x] **FPS Cap & CPU Verification:**
  - RAF loop time delta throttling (`1000 / targetFps`) limits execution strictly to 30 FPS.
  - `IntersectionObserver` automatically halts the render loop when Hero is scrolled out of view.
  - `document.visibilitychange` event halts the render loop when switching away from the tab.
- [x] **Accessibility & Contrast:**
  - `prefers-reduced-motion` detection provides a graceful, static multi-radial mesh fallback.
  - Hidden semantic `sr-only` text retains 100% SEO and screen-reader accessibility.
- [x] **Visual Defect Check:**
  - Baked-in raster numbers removed from `service-*.webp`; crisp DOM vector tags `01 )` render as the single canonical badge.
  - Redundant duplicate text overlays removed from `PortfolioMatrix.tsx`, replaced with an elegant hover reveal for verified results.
  - Services Bento Cards refactored to single-slab glassmorphic architecture matching Figma Image 1.

## ✅ PHASE X COMPLETE
- Lint & Types: ✅ Pass (0 TypeScript errors)
- Build: ✅ Success (`npm run build` completed)
- Branch: `feature/fluid-shader-audit`
- Date: 2026-10-26
