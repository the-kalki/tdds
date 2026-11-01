# Plan: Client Roster Drawer Architecture (Option A)

**Task Slug:** `client-roster-drawer`  
**File Name:** `client-roster-drawer.md`  
**Target:** Showcase all 14 client partnerships via a high-performance slide-over roster drawer triggered by `View All Clients (14) ↗` in the Featured Work section, preserving the editorial luxury of the 4 flagship hero cards.  
**Mode:** Planning Only (`/plan` - No code changes)  

---

## 1. Executive Summary & Problem Diagnosis

### 1.1 The Challenge
The client requested showcasing all 14 brands on the website. Squeezing 14 full-bleed media cards into the main `#work` section causes:
1. **Visual Exhaustion:** A massive horizontal or vertical scroll track dilutes the perceived exclusivity and craft of the agency.
2. **Payload & Performance Drag:** 14 high-resolution video/image covers increase initial paint payload and memory consumption.
3. **Asset Asymmetry:** Not all 14 clients have equal 4K cinematic showreel assets ready; some are branding, social media, or event clients.

### 1.2 The Solution (Option A)
- **Primary Tier (Homepage):** Preserve the 4 flagship case studies (`SWAG`, `SUN`, `BLUEKRIT`, `LOYAL GREENS`) in the curated hero snap-track.
- **Secondary Tier (Interactive Drawer):** Update the CTA in `FeaturedWorkSection` to `View All Clients (14) ↗`. Clicking opens `ClientRosterDrawer`, an accessible, slide-over directory featuring:
  - Header with `CLIENT ROSTER • 14 PARTNERSHIPS` and quick escape/close triggers.
  - Category pill filter: `ALL (14)`, `FASHION & LUXURY`, `EVENTS & WEDDINGS`, `RETAIL & LIFESTYLE`.
  - Rich client cards/rows displaying brand wordmark, industry, services rendered, and direct Instagram/portfolio links.
  - Drawer footer CTA converting viewers into new project leads via `LeadCaptureDrawer`.

---

## 2. Architecture & Component Topology

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ App.tsx                                                                                │
│  ├── [State] isClientRosterOpen: boolean                                               │
│  │                                                                                     │
│  ├── FeaturedWorkSection                                                               │
│  │    └── Button: "View All Clients (14) ↗" ──[onClick]──> setIsClientRosterOpen(true)  │
│  │                                                                                     │
│  └── Suspense (Lazy Loaded)                                                            │
│       └── ClientRosterDrawer (New Component)                                           │
│            ├── Backdrop blur + Escape key listener + Focus trap                        │
│            ├── Header: Tag "ROSTER DIRECTORY" + Count "14 BRANDS" + [X Close]          │
│            ├── Filter Bar: [ALL (14)] [FASHION] [WEDDINGS] [RETAIL]                    │
│            ├── Search / Quick-find input (Instant fuzzy filtering)                    │
│            ├── Scrollable Roster Grid / List (14 Client Cards)                         │
│            │    ├── Brand Name (styled per identity: serif / bold / modern)            │
│            │    ├── Industry & Tagline                                                 │
│            │    ├── Services Delivered Tags (e.g. Content, Social, Campaigns)          │
│            │    └── Direct Instagram Profile / Video Action Button                     │
│            └── Footer CTA: "Want your brand here? Start a Project ↗"                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Specifications

### 3.1 Data Schema Enhancement (`src/types/content.ts`)
Ensure `ClientBrand` supports structured filtering and metadata:
```typescript
export interface ClientBrand {
  name: string;
  tagline?: string;
  industry?: string;
  category?: 'fashion' | 'weddings' | 'retail' | 'entertainment' | 'all';
  style?: 'bold' | 'serif' | 'modern' | 'monogram' | 'accent';
  isAccent?: boolean;
  instagramUrl?: string;
  servicesDelivered?: string[]; // e.g. ["Viral Reels", "Branding", "Meta Ads"]
}
```

### 3.2 Component Breakdown

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| `ClientRosterDrawer.tsx` | `src/components/interactive/ClientRosterDrawer.tsx` | Modal drawer container with category tabs, search filter, responsive 2-column or list view of all 14 clients. |
| `FeaturedWorkSection.tsx`| `src/components/sections/FeaturedWorkSection.tsx` | Connect CTA button to `onOpenClientRoster` prop with label `View All Clients (14)`. |
| `App.tsx` | `src/App.tsx` | Lazy load `ClientRosterDrawer`, manage open/close state, bridge enquiry CTA to `LeadCaptureDrawer`. |
| `siteContent.ts` | `src/content/siteContent.ts` | Verify all 14 client brands have standardized category and service deliverable tags. |

---

## 4. Task Breakdown & Implementation Steps

### Task 1: Data Audit & Schema Standardization
- **Task ID:** `TASK-01`
- **Agent:** `frontend-specialist`
- **Skills:** `clean-code`, `frontend-architecture`
- **Priority:** P1
- **Dependencies:** None
- **INPUT:** `src/content/siteContent.ts`, `src/types/content.ts`
- **OUTPUT:** Standardized `clientBrandsData` with 14 verified brand entries, category tags (`fashion`, `weddings`, `lifestyle`, `entertainment`), and deliverable pills.
- **VERIFY:** TypeScript compiler validates `clientBrandsData` matches `ClientBrand[]` with 0 type errors.

### Task 2: Build `ClientRosterDrawer` Component
- **Task ID:** `TASK-02`
- **Agent:** `frontend-specialist`
- **Skills:** `clean-code`, `frontend-design`, `tailwind-patterns`
- **Priority:** P1
- **Dependencies:** `TASK-01`
- **INPUT:** Existing drawer pattern from `DeliverablesDrawer.tsx` and `LeadCaptureDrawer.tsx`.
- **OUTPUT:** New component `src/components/interactive/ClientRosterDrawer.tsx` supporting:
  - Accessible dialog (`role="dialog"`, `aria-modal="true"`, focus lock, `Escape` key close).
  - Obsidian luxury aesthetic (`bg-[#141414]`, glass backdrop, hairline white borders).
  - Category filter tabs with active counts.
  - Interactive client cards with typography personality matching their brand style.
  - Direct links to Instagram / portfolio.
  - Bottom CTA button: "Start a Project" (switches to lead drawer).
- **VERIFY:** Component renders cleanly in isolation, handles filter switching with zero layout shifts.

### Task 3: Wire CTA in `FeaturedWorkSection` & `App.tsx`
- **Task ID:** `TASK-03`
- **Agent:** `frontend-specialist`
- **Skills:** `clean-code`, `nextjs-react-expert`
- **Priority:** P2
- **Dependencies:** `TASK-02`
- **INPUT:** `src/components/sections/FeaturedWorkSection.tsx`, `src/App.tsx`
- **OUTPUT:**
  - Add `onOpenClientRoster: () => void` prop to `FeaturedWorkSection`.
  - Update CTA label to `View All Clients (14)`.
  - Add lazy-imported `<ClientRosterDrawer />` in `App.tsx` inside `<Suspense fallback={null}>`.
- **VERIFY:** Clicking `View All Clients (14)` opens the drawer; pressing escape or clicking backdrop closes it smoothly.

### Task 4: Verification & Performance Audit
- **Task ID:** `TASK-04`
- **Agent:** `frontend-specialist`
- **Skills:** `lint-and-validate`, `clean-code`
- **Priority:** P3
- **Dependencies:** `TASK-03`
- **INPUT:** Codebase build tools
- **OUTPUT:** Complete bundle and visual verification
- **VERIFY:**
  - `npx tsc -b` passes with 0 errors.
  - `npm run lint` (`oxlint`) passes with 0 warnings.
  - `npm run build` generates production bundle without bundle size inflation on initial route chunk.
  - Mobile testing (390px) confirms smooth drawer scroll without horizontal clipping.

---

## 5. Verification Phase (Phase X)

```
[ ] Step 1: Run `npx tsc -b` (Zero TypeScript errors)
[ ] Step 2: Run `npm run lint` (Zero oxlint warnings)
[ ] Step 3: Run `npm run build` (Successful production build)
[ ] Step 4: Test in browser across desktop (1440px) and mobile (390px):
    [ ] Click "View All Clients (14)" opens drawer
    [ ] All 14 clients are listed with proper branding
    [ ] Category filter tabs filter cards correctly
    [ ] External Instagram links open safely with rel="noopener noreferrer"
    [ ] "Start a Project" drawer footer opens LeadCaptureDrawer
    [ ] Pressing Escape key closes drawer
```

