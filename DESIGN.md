---
name: The Design Dude Studio
colors:
  primary: "#171717"
  secondary: "#FAF9F6"
  tertiary: "#0D0D0D"
  accent: "#FF5722"
  accent-end: "#E02B20"
  lime: "#C8F169"
  surface-light: "#F4F2EC"
  surface-dark: "#141414"
  border-light: "#E5E2DB"
  border-dark: "rgba(255, 255, 255, 0.1)"
  text-primary: "#171717"
  text-muted: "#66645E"
  text-light: "#FFFFFF"
  text-light-muted: "rgba(255, 255, 255, 0.65)"
typography:
  headline-display:
    fontFamily: "Clash Display, Space Grotesk, sans-serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline-lg:
    fontFamily: "Clash Display, Space Grotesk, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline-md:
    fontFamily: "Poppins, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body-lead:
    fontFamily: "Poppins, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Poppins, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  mono-tag:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "+0.08em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
  3xl: "96px"
components:
  button-pill-black:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-pill-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-pill-white:
    backgroundColor: "{colors.text-light}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-pill-outline:
    backgroundColor: "transparent"
    borderColor: "{colors.border-light}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
---

# The Design Dude Studio (TDDS) — Design Specification

## Overview
*Philosophy:* "Keep the interface quiet. Let the work be loud."
The Design Dude Studio is an Ahmedabad-based multidisciplinary creative agency. The visual language balances restrained, editorial minimalism on Warm Ivory (`#FAF9F6`) with dark, high-energy technical capabilities on Deep Obsidian (`#0D0D0D`).

## Colors
- **Warm Ivory (`#FAF9F6`):** Primary editorial background for storytelling, hero, case studies, and testimonials.
- **Deep Obsidian (`#0D0D0D`):** Technical canvas for the Bento Services Grid, Client Roster Marquee, and Conversion Banner.
- **Near-Black Ink (`#171717`):** High-contrast typographic headlines and pill buttons.
- **Liquid Aurora Flow Mesh (`#FF7A00` → `#FF5722` → `#E02B20` → `#D81B60` → `#311B92`):** Organic, flowing multi-stop liquid shader used exclusively for the hero focal point ("IMPACT.") and dynamic accent highlights.
- **Impact Coral Gradient (`#FF5722` → `#E02B20`):** Vibrant secondary focal accent.
- **Energetic Lime (`#C8F169`):** Accent for category pills, live status indicators, and micro-badges.

## Typography
- **Display Headlines:** `Clash Display` / `Space Grotesk` (Master Ink Trap, Weight 700/800, tight tracking `-0.035em` to `-0.04em`).
- **Body & Interface:** `Poppins` (Weight 400/500/600, geometric modern clarity).
- **Technical & Index Indicators:** `JetBrains Mono` (Uppercase, spaced `+0.08em` tracking for technical section markers like `( 01 ) SERVICES`).

## Layout
- **Max Width Container:** 1360px centered with responsive padding (`16px` mobile, `32px` tablet, `48px`–`64px` desktop).
- **12-Column Desktop Grid:** 24px gutters (`gap-6`).
- **Surface Rhythm:** Alternates dynamically between Light Ivory and Deep Obsidian to delineate narrative sections.

## Elevation & Depth
- **Zero Heavy Box Shadows:** Relies on crisp hairlines (`border-light`, `border-dark`) and dark translucent glassmorphism (`backdrop-blur-md` with `rgba(255,255,255,0.05)` borders).
- **Desktop 3D Perspective Tilt:** Max 6° rotation on mouse hover for interactive Bento cards.

## Shapes
- **Pills for Interaction:** All buttons and category chips use `rounded-pill` (9999px) for friendly tactile touchpoints.
- **Architectural Radii for Cards:** `rounded-2xl` (16px–24px) on project case study cards and dark bento compartments.

## Components
- **Pill Buttons:** Four distinct states: `primary` (black fill), `white` (white fill on obsidian), `outline` (thin hairline), `lime` (high-visibility).
- **SectionTag:** Uppercase monospace technical header pill with parenthesis index notation e.g. `( 01 ) SERVICES`.
- **BentoServiceCard:** Dark card with 3D perspective tilt, deliverable items checklist, and floating circular arrow button.
- **PortfolioTile:** Aspect-locked `aspect-[4/5]` editorial image container with zero layout shift and overlay typography.
- **LeadCaptureDrawer:** 3-step slide-over form with Zod schema validation and WhatsApp inbound routing.
- **FluidImpactText:** Interactive Canvas/WebGL fluid shader component for high-impact typography with strict FPS cap.

## Performance & Shader Invariants
- **Strict FPS Cap:** Interactive shaders are capped to max 30–40 FPS using RAF delta timing (`elapsed >= 1000 / targetFps`).
- **Viewport Visibility:** Render loops must automatically pause via `IntersectionObserver` when scrolled out of view.
- **Tab Inactivity Pause:** Render loops must halt when `document.hidden` is true to protect device battery life.
- **Reduced Motion:** If `prefers-reduced-motion` is enabled, disable animation and render a graceful static multi-radial mesh fallback.

## Asset & Visual Rules
- **DO** keep video previews muted by default. Sound only plays inside the explicit modal player.
- **DO** maintain strict aspect ratio locks on all image containers to guarantee 0.00 CLS.
- **DO** keep raster images strictly isolated to visual subjects (no text, numbers, or UI buttons baked into bitmap assets).
- **DON'T** duplicate numbers or titles over images that already contain legacy baked-in assets.
- **DON'T** use purple or generic blue tints for gradients without organic aurora blending.
- **DON'T** use standard SaaS templates or center-aligned generic split layouts.
