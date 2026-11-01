# TDDS Site Content & Branding Refresh Plan

> **Task Slug:** `site-content-refresh.md`  
> **Status:** PENDING APPROVAL  
> **Target Branch:** `feature/content-branding-refresh`  
> **Project Type:** WEB (Vite + React 18 + TypeScript + Tailwind CSS)

---

## 1. Overview & Context

This plan outlines the surgical update of The Design Dude Studio (TDDS) website to elevate brand identity, align typography consistency, revamp services copy into high-retention editorial narrative, strip redundant navigation, and populate the real-world client roster (14 active clients).

*Engine room reality:* A creative studio website cannot afford generic corporate boilerplate or mismatched visual tokens. Socho aise ki website studio ka sabse bada live portfolio piece hai — har headline, card description, aur logo placement mein craft aur weight dikhna chahiye.

---

## 2. Project Architecture & Affected Topology

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TDDS FRONTEND APPLICATION                       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌─────────────────┐        ┌──────────────────┐       ┌─────────────────┐
│   NAV & FOOTER  │        │   HERO & WORK    │       │ SERVICES & PROOF│
│  Navbar.tsx     │        │  HeroSection.tsx │       │ ServicesBento...│
│  Footer.tsx     │        │  FluidImpact...  │       │ siteContent.ts  │
│  LogoMark.tsx   │        │  FeaturedWork... │       │ ClientMarquee...│
└─────────────────┘        └──────────────────┘       └─────────────────┘
         │                          │                          │
         ▼                          ▼                          ▼
[Replace Monogram SVG      [Harmonize Display        [Engage 4 Service  │
 with Dual Logo Assets]     Typeface & Metrics]       Cards, Drop Button│
                                                      & Swap 14 Clients]
```

### Affected Files
| File Path | Nature of Change |
| :--- | :--- |
| `src/content/siteContent.ts` | Complete rewrite of 4 service card descriptions + Replace client brands list with 14 new partners |
| `src/components/layout/Navbar.tsx` | Integrate new TDDS logo mark & wordmark assets (`tddsLogo.PNG` / `tddsText.PNG`) |
| `src/components/layout/Footer.tsx` | Update brand lockup in footer to use new official logo |
| `src/components/sections/HeroSection.tsx` | Align headline typography styling with Featured Work ("Real brands. Real work.") section |
| `src/components/interactive/FluidImpactText.tsx` | Synchronize font weight, letter-spacing, and casing with brand display rules |
| `src/components/sections/ServicesBentoSection.tsx` | Remove redundant "View All Services" button and sanitize prop bindings |
| `src/components/interactive/ClientProofMarquee.tsx` | Validate rendering for 14 clients with balanced typographic hierarchy |
| `public/images/` | Verify & optimize logo assets (`tddsLogo.PNG` 3.8MB → WebP optimization recommended) |

---

## 3. Measurable Success Criteria

- [ ] **Dual Logo Integration:** Studio logo and text mark render crisply on both dark and ivory header backdrops with zero layout shifts (CLS < 0.01).
- [ ] **Typographic Harmony:** "IDEAS INTO IMPACT" displays the identical display font family, optical weight, and tracking rhythm as the "Real brands. Real work." section.
- [ ] **High-Conversion Services Copy:** All 4 service cards feature punchy, value-driven, studio-grade copy that eliminates generic fluff.
- [ ] **Clean Section Architecture:** "View All Services" button cleanly removed from Services Bento section without broken styles or orphan handler warnings.
- [ ] **14-Client Marquee Integration:** All 14 client names render with custom-styled typography, category tags, and flawless seamless infinite loop.
- [ ] **Build & Bundle Verification:** `npm run build` succeeds with zero TypeScript errors and zero lint regressions.

---

## 4. Proposed Content Specifications

### 4.1 Service Cards Copy (Current vs. Proposed)

| Service Compartment | Current (Generic / Bald) | Proposed Studio-Grade Copy (Engaging & Punchy) |
| :--- | :--- | :--- |
| **01. Content & Video** | "Cinematic commercial films, high-retention reels, and post-production that command attention." | **"High-voltage commercials, scroll-stopping reels, and 3D CGI films engineered to capture attention and refuse to be skipped."**<br>*Focus: Commercial films, viral reels, event cinematography, CGI ads, post-production.* |
| **02. Social Media Management** | "Complete handling of your social platforms, daily curation, and systematic community growth." | **"End-to-end algorithmic takeover: trend forecasting, obsessive aesthetic curation, and daily content engines built to turn passive scrollers into brand evangelists."**<br>*Focus: Content strategy, daily page management, viral short-form execution, community activation.* |
| **03. Advertising & Digital Marketing** | "Bring your ideas to life with high-impact ads, lead generation, and performance marketing." | **"Direct-response ad creative, laser-targeted Meta & Google funnels, and aggressive growth architectures that convert cold traffic into measurable revenue."**<br>*Focus: Meta & Google ads, full-funnel CRO, performance scaling, lead generation engines.* |
| **04. Branding & Design** | "Sculpted visual identities, eye-catching posters, packaging, and digital UI direction." | **"Defiant brand identities, bespoke packaging systems, and digital art direction crafted to dominate your industry category."**<br>*Focus: Brand identity systems, signature packaging, campaign visual design, UI/UX art direction.* |

---

### 4.2 Client Roster Mapping (14 Partners)

| # | Client Name | Curated Tagline / Badge | Industry Category | Typographic Style |
| :--: | :--- | :--- | :--- | :--- |
| **1** | **YASHI KHANTED** | COUTURE & LUXE | Fashion & Luxury Apparel | `serif` |
| **2** | **FOXPLAY** | SPORTS & TURF | Sports, Arena & Entertainment | `bold` |
| **3** | **KALPVRIKSHA EVENTS** | BESPOKE CELEBRATIONS | Luxury Wedding & Event Planning | `modern` |
| **4** | **BLUEKRIT EVENTS** | EXPERIENTIAL WEDDINGS | Premium Wedding Production | `monogram` |
| **5** | **HEALINGWALA** | INTEGRATIVE HEALTH | Wellness & Holistic Healing | `modern` |
| **6** | **BALLOONWALA** | SPATIAL ART & DECOR | Event Installations & Celebrations | `bold` |
| **7** | **TIRIMA SALON** | BY RESHMA PATEL | Luxury Hair & Aesthetic Salon | `serif` |
| **8** | **ANCHOR HARDIK** | LIVE EMCEE & STAGE | Celebrity Host & Stage Production | `bold` |
| **9** | **ZANZAR JEWELLERS** | TIMELESS HERITAGE | Fine Gold & Diamond Jewellery | `serif` |
| **10** | **JITEN SHAH** | FINANCIAL ARCHITECTURE | Strategic Advisory & Taxation | `modern` |
| **11** | **IOP EVENTS** | OUTDOOR PRODUCTION | Mega-Scale Live Events & Concerts | `bold` |
| **12** | **GLOSS N FLOSS** | DENTAL HUB | Modern Aesthetic & Clinical Dentistry | `modern` |
| **13** | **PAKWAN** | ROYAL CULINARY | Heritage Fine Dining & Hospitality | `serif` |
| **14** | **LIFE DANCE STUDIO** | HYDERABAD | Movement, Choreography & Performing Arts | `accent` |

---

## 5. Architectural & Implementation Decisions (Socratic Resolution)

> [!IMPORTANT]
> **Key Decisions to Lock Down Before Execution:**

### Decision 1: Logo Asset Integration Mechanics
- **Context:** The user saved `tddsLogo.PNG` (icon/monogram) and `tddsText.PNG` (wordmark typography) in `public/images/`.
- **Options:**
  - **Option A (Recommended):** Responsive Dual-Lockup. Use `tddsLogo.PNG` as the mark (w-9 h-9) + `tddsText.PNG` as the wordmark (with CSS filter/invert classes for dark/ivory header states).
  - **Option B:** Single merged emblem or SVG vector tracing to eliminate PNG raster artifacts.
- **Performance Note:** `tddsLogo.PNG` is currently 3.8MB. It must be compressed/converted to WebP (~35KB) during implementation to prevent page load lag.

### Decision 2: Headline Typography Alignment
- **Context:** In `HeroSection.tsx`, headline is currently all-caps: `IDEAS INTO` + `IMPACT.`. In `FeaturedWorkSection.tsx`, the heading is Title Case: `Real brands. Real work.` using `font-display font-black tracking-tight`.
- **Alignment:** Ensure the Hero uses the exact same Clash Display styling, optical kerning, and ink-trap letterforms as the Featured Work header.

---

## 6. Granular Task Breakdown

### Task 1: Optimize & Integrate Studio Logos in Navigation & Footer
- **Agent:** `frontend-specialist`
- **Skills:** `@[frontend-architecture]`, `@[clean-code]`
- **Priority:** P1 (High)
- **Dependencies:** None
- **INPUT:** `public/images/tddsLogo.PNG`, `public/images/tddsText.PNG`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- **OUTPUT:** Compressed WebP derivatives, responsive header lockup with light/dark section theme awareness, footer lockup.
- **VERIFY:** Check Navbar in scrolled/unscrolled states and Footer at desktop (1440px) and mobile (375px) viewports; no pixelation or layout jump.

### Task 2: Align Typography for "Ideas Into Impact" with "Real brands. Real work."
- **Agent:** `frontend-specialist`
- **Skills:** `@[frontend-design]`, `@[modern-web-guidance]`
- **Priority:** P1 (High)
- **Dependencies:** None
- **INPUT:** `src/components/sections/HeroSection.tsx`, `src/components/interactive/FluidImpactText.tsx`, `src/components/sections/FeaturedWorkSection.tsx`
- **OUTPUT:** Typography properties in Hero synchronized with Featured Work header (`font-display font-black tracking-tight`).
- **VERIFY:** Inspect computed styles in Chrome DevTools; verify font family, weight (900/Bold Clash Display), and tracking match across both sections.

### Task 3: Rewrite 4 Service Cards Copy & Enhance Deliverables
- **Agent:** `frontend-specialist`
- **Skills:** `@[clean-code]`
- **Priority:** P1 (High)
- **Dependencies:** None
- **INPUT:** `src/content/siteContent.ts` (`servicesData`)
- **OUTPUT:** Updated `servicesData` array with engaging, studio-style descriptions and deliverables matching Section 4.1.
- **VERIFY:** Read `src/content/siteContent.ts`; inspect Services Bento on page to ensure copy fits cards without text clipping.

### Task 4: Remove "View All Services" Button from Bento Section
- **Agent:** `frontend-specialist`
- **Skills:** `@[clean-code]`
- **Priority:** P2 (Medium)
- **Dependencies:** None
- **INPUT:** `src/components/sections/ServicesBentoSection.tsx`
- **OUTPUT:** Clean removal of the button and unused handler references from the left column lockup.
- **VERIFY:** Verify the left lockup in Services section cleanly renders tag, headline, and subtext; no orphan whitespace or compile warnings.

### Task 5: Replace Client Brands Data with 14-Partner Roster
- **Agent:** `frontend-specialist`
- **Skills:** `@[frontend-architecture]`, `@[clean-code]`
- **Priority:** P1 (High)
- **Dependencies:** None
- **INPUT:** `src/content/siteContent.ts` (`clientBrandsData`), `src/components/interactive/ClientProofMarquee.tsx`
- **OUTPUT:** Updated `clientBrandsData` array with 14 clients, distinct taglines, and aesthetic style tags.
- **VERIFY:** Marquee animates smoothly without stuttering; all 14 names display with balanced spacing and typography.

---

## 7. Phase X: Final Verification Checklist

```bash
# 1. Type Check & Linting
npm run lint && npx tsc --noEmit

# 2. Build Verification
npm run build

# 3. Dev Server Runtime Check
npm run dev
```

- [x] All 14 client brands visible in the infinite marquee.
- [x] No layout shift (CLS) when loading new logo assets.
- [x] 4 service cards contain the new engaging copy.
- [x] "View All Services" button completely removed.
- [x] "Ideas Into Impact" typography matches "Real brands. Real work.".
- [x] All interactive drawer modals (services, lead drawer) continue to function normally.

## ✅ PHASE X COMPLETE
- Branch: `feat/site-content-refresh`
- Lint: ✅ Pass (0 errors)
- TypeScript: ✅ Pass (`npx tsc --noEmit` clean)
- Build: ✅ Success (`npm run build` completed cleanly)
- Assets: ✅ High-DPI WebP & PNG derivatives generated for logos
- Date: 2026-11-01

