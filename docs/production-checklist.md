# Production Readiness & Client Asset Handoff Plan

> **Slug:** `production-checklist`  
> **Target Project:** The Design Dude Studio (TDDS) Web Platform  
> **Mode:** Production Planning & Asset Handoff Requisition  
> **Status:** APPROVED FOR EXECUTION  

---

## 1. Overview & Problem Framing

The frontend architecture and design system for **The Design Dude Studio (TDDS)** are established (React 19, TypeScript, Tailwind CSS, Vite, Liquid Shader canvas, interactive Bento drawers, and dual-conversion routes). 

However, inspecting the codebase reveals that the site is currently operating on **placeholder media, dummy video feeds, unverified contact links, mock social handles, and browser-only form persistence**. To transition from a local staging environment to a live, production-grade creative studio platform, the client must deliver specific commercial assets, legal authorizations, service credentials, and infrastructure access.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CURRENT STAGING STATE (SIMULATED)                    │
│  • Videos: w3schools Big Buck Bunny placeholder                        │
│  • Logos: Vector font fallbacks & SVG text mocks                       │
│  • Inquiries: LocalStorage dump + Unverified WhatsApp routing          │
│  • Socials: Generic linkedin.com & unverified handles                  │
│  • Legal: Boilerplate DPDP / IT Act terms without client sign-off      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         ASSET HANDOFF REQUISITION
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   PRODUCTION LIVE STATE (HARDENED)                     │
│  • 4K/1080p Stream-Ready Showreel + 4 Verified Client Case Studies     │
│  • Master SVG / WebP Brand Vector Package + Custom Favicon Suite       │
│  • Resend / Webhook Dual Lead Dispatch + Verified WhatsApp Business    │
│  • Production DNS / SSL + Cloudflare CDN + Google Analytics (GA4)      │
│  • Client-Signed NDA / IP Terms + GSTIN Tax-Compliant Disclosures      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Project Metadata

- **Project Type:** WEB (Creative Agency Portfolio & Conversion Engine)
- **Primary Agent:** `frontend-specialist`
- **Supporting Agents:** `security-auditor`, `devops-engineer`, `seo-specialist`
- **Core Framework:** React 19 + TypeScript + Vite + Tailwind CSS

---

## 3. Success Criteria

1. **Zero Mock Media:** 100% elimination of placeholder videos (`mov_bbb.mp4`) and dummy portfolio thumbnails.
2. **Deterministic Lead Capture:** Inquiries delivered reliably via both WhatsApp Business API and automated email notification (webhook/Resend).
3. **SEO & Performance Invariants:** Sub-1.2s LCP, 0.00 CLS, complete OpenGraph social cards, valid `sitemap.xml`, and Google Search Console verification.
4. **Legal & Compliance Defense:** Client-signed Terms of Engagement, DPDP Act 2023 aligned Privacy Policy, and verified GSTIN/address details.
5. **Brand Integrity:** High-fidelity vector logos and client clearances for all featured brand marks.

---

## 4. Master Client Handoff Requisition Checklist

Below is the definitive, categorized inventory of items required from the client:

### Category A: Brand Identity & Vector Assets
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| A1 | **Primary Master Logo** | Vector `.SVG`, `.AI`, or `.EPS` (Transparent background) | Avoids pixelated raster blur on Retina 4K displays. |
| A2 | **Dark & Light Logo Variants** | 2 SVG files (One for `#FAF9F6` Ivory, one for `#0D0D0D` Obsidian) | The site uses alternating dark/light canvas sections. |
| A3 | **Monogram / 3D Mark Asset** | 3D render (`.PNG` with alpha / high-res `.WebP`, min 1200x1200px) | Replaces `hero-3d-monogram.webp` in the hero section. |
| A4 | **Favicon Suite** | Master 512x512 PNG or SVG | Required to generate Apple Touch Icon (180x180), Favicon (32x32, 16x16), and Web App Manifest. |
| A5 | **OpenGraph Social Preview Card** | 1200 × 630px PNG/WebP (under 300KB) | Displayed whenever the website URL is shared on WhatsApp, LinkedIn, iMessage, and X. |

### Category B: Video & Motion Media
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| B1 | **Studio Showreel Video** | MP4 (H.264 / AAC) + WebM, 1080p, 60-90s, < 25MB (or Mux/Vimeo/Cloudflare Stream URL) | Currently hardcoded to `mov_bbb.mp4` (Big Buck Bunny). |
| B2 | **Showreel Poster Frame** | 1920 × 1080px WebP image | Prevents blank black box before video plays and preserves 0.00 CLS. |
| B3 | **4 Case Study Video Cuts** | 4 short MP4/WebM vertical reels (1080x1920) or horizontal cuts (1920x1080) | Required for: SWAG, SÚN, BLUEKRIT, LOYAL GREENS. |
| B4 | **4 Case Study Editorial Covers** | 4 high-res stills in 4:5 vertical aspect ratio (min 1200 × 1500px, WebP) | Required for the interactive horizontal work slider. |

### Category C: Case Study Copy & Portfolio Approvals
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| C1 | **Client NDA / Showcase Approvals** | Written email/contract consent from SWAG, SÚN, Zanzar, Bluekrit, Pakwan, Loyal Greens | Protects against copyright infringement or NDA violation claims. |
| C2 | **Project Metrics / Proof Points** | Specific achievements (e.g., "+350% Engagement", "1.2M Reel Plays", "Sold Out in 48h") | Replaces vague placeholders with conversion-driving proof. |
| C3 | **Service Deliverables Breakdown** | Exact scope completed for each client (e.g., "Reels, CGI Ad, Packaging") | Educates incoming leads on project possibilities. |

### Category D: Testimonials & Client Endorsements
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| D1 | **Client Attribution Details** | Client Full Name, Official Designation (e.g. "Managing Director"), Brand Name | Generic/anonymous quotes destroy visitor trust. |
| D2 | **Client Monograms / Photos** | High-res founder portrait or verified brand mark | Displays in the testimonial slider card header. |
| D3 | **Written Consent for Quotes** | Written permission to display quotes publicly | Legal requirement for commercial endorsements. |

### Category E: Business Operations & Contact Coordinates
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| E1 | **Official Business Email** | Dedicated domain email (e.g. `hello@thedesigndudestudio.com`) | Currently using generic `@gmail.com`. Domain email elevates enterprise trust. |
| E2 | **WhatsApp Business Number** | E.164 formatted number with country code (e.g. `+91 92270 09709`) | Confirm if active on WhatsApp Business App for instant response routing. |
| E3 | **Physical Studio Office Address** | Full postal address with landmark and PIN code | Required for Google Maps embedding, Schema.org local business SEO, and footer. |
| E4 | **Verified Social Handles** | Exact URLs for Instagram, LinkedIn Company Page, YouTube, Behance | `Footer.tsx` currently links to generic `linkedin.com`. |

### Category F: Lead Pipeline & Infrastructure Credentials
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| F1 | **Production Domain & DNS Access** | Domain registrar login (GoDaddy, Namecheap, Cloudflare) | Required to point A/CNAME records to Vercel/production host. |
| F2 | **Hosting Account** | Vercel / Netlify / Cloudflare Pages organization seat | For deployment pipeline, automated SSL, and preview environments. |
| F3 | **Form Ingestion Endpoint / Webhook** | Resend API key, Formspree ID, or Airtable/Notion Webhook URL | Currently, leads only open WhatsApp and save to browser localStorage. If client closes WhatsApp, lead is lost forever. |
| F4 | **Google Analytics 4 (GA4)** | Measurement ID (`G-XXXXXXXXXX`) | Tracks traffic sources, conversion rates, and showreel views. |
| F5 | **Google Search Console** | DNS TXT verification record or HTML meta tag | Enables Google bot indexing, sitemap submission, and search ranking tracking. |
| F6 | **Meta Pixel (Optional)** | Meta Pixel ID | Required if TDDS will run Instagram/Facebook ads for client acquisition. |

### Category G: Legal & Statutory Disclosures
| # | Item Required | Exact Format / Specs | Why It's Critical (Engine Room Reality) |
|---|---------------|----------------------|-----------------------------------------|
| G1 | **Registered Commercial Legal Entity** | Registered legal entity name (e.g., "The Design Dude Studio LLP" or Sole Proprietor) | Required in Terms of Engagement and copyright notice. |
| G2 | **GSTIN (Tax ID)** | 15-digit Indian GST number | Required for B2B tax-compliant invoicing in India. |
| G3 | **Commercial Terms Review** | Client review of 50/50 payment split, 2 revision rounds, 5-day silent acceptance rule | Ensures contract clauses match their actual business practice. |

---

## 5. Task Breakdown & Implementation Roadmap

```
Phase 1: Asset Ingestion & Media Replacement
├── Task 1.1: Master Vector Logo & Favicon Integration (frontend-specialist)
├── Task 1.2: Showreel & Case Study Video Hosting Pipeline (devops-engineer)
└── Task 1.3: High-Res Editorial Portfolio Imagery Processing (frontend-specialist)

Phase 2: Lead Routing & Infrastructure Hardening
├── Task 2.1: Dual-Route Lead Capture (WhatsApp + Resend/Webhook) (backend-specialist)
├── Task 2.2: Production DNS, SSL & Vercel Deployment (devops-engineer)
└── Task 2.3: GA4 & Meta Pixel Telemetry Integration (seo-specialist)

Phase 3: SEO, Social Cards & Legal Finalization
├── Task 3.1: OpenGraph Social Share Card & Schema.org JSON-LD (seo-specialist)
├── Task 3.2: Dynamic Sitemap.xml & Robots.txt Generation (seo-specialist)
└── Task 3.3: Legal Entity, GSTIN & Social Links Update (frontend-specialist)

Phase X: Production Verification & Zero-Defect Audit
└── Task X.1: Multi-Point Verification Suite (Security, UX, Lighthouse, Build)
```

### Detailed Task Specifications

#### Task 1.1: Master Vector Logo & Favicon Integration
- **Agent:** `frontend-specialist`
- **Skills:** `clean-code`, `frontend-design`
- **Priority:** P1
- **Dependencies:** Category A assets provided by client
- **INPUT:** Client SVG logos + 512x512 icon
- **OUTPUT:** Updated `LogoMark.tsx`, `public/favicon.svg`, `public/favicon.ico`, Apple Touch Icon, and `siteContent.ts`
- **VERIFY:** Verify logo crispness on 1x and 2x displays; verify favicon shows correctly in browser tab.

#### Task 1.2: Showreel & Case Study Video Hosting Pipeline
- **Agent:** `devops-engineer` / `frontend-specialist`
- **Skills:** `clean-code`, `performance-profiling`
- **Priority:** P0 (Blocker for launch)
- **Dependencies:** Category B assets provided by client
- **INPUT:** Client MP4 files or external video stream URLs
- **OUTPUT:** Updated `siteContent.ts` with real CDN video URLs and WebP poster thumbnails
- **VERIFY:** Click "Watch Showreel" and case study cards; confirm zero 404s, instant playback, and 0.00 CLS.

#### Task 2.1: Dual-Route Lead Capture Hardening
- **Agent:** `backend-specialist`
- **Skills:** `clean-code`, `api-patterns`
- **Priority:** P0
- **Dependencies:** Category F3 credentials provided by client
- **INPUT:** Ingestion endpoint (Resend / Serverless Webhook)
- **OUTPUT:** Updated `LeadCaptureDrawer.tsx` sending payload asynchronously to email/CRM before opening WhatsApp
- **VERIFY:** Submit test lead; verify lead arrives in studio email inbox AND WhatsApp opens with pre-filled message.

#### Task 3.1: OpenGraph Social Share Card & Schema.org Local SEO
- **Agent:** `seo-specialist`
- **Skills:** `seo-fundamentals`
- **Priority:** P1
- **Dependencies:** Category A5 and E3 data
- **INPUT:** 1200x630 OG image + exact postal address + phone
- **OUTPUT:** Updated `index.html` with canonical URLs, absolute `og:image` URL, and validated LocalBusiness Schema
- **VERIFY:** Test URL in Meta Sharing Debugger and Google Rich Results Test.

---

## 6. Phase X: Production Verification Checklist

| Check # | Verification Area | Validation Command / Tool | Success Standard |
|---------|-------------------|---------------------------|------------------|
| 1 | **Lint & Type Safety** | `npm run lint && npx tsc --noEmit` | 0 errors, 0 warnings |
| 2 | **Security & Secret Audit** | Codebase scan | 0 exposed API keys, no private tokens committed |
| 3 | **Production Build** | `npm run build` | Clean Vite production bundle (< 150KB gzipped) |
| 4 | **Core Web Vitals** | Google Lighthouse / DevTools | LCP < 1.2s, CLS = 0.00, FID/INP < 100ms |
| 5 | **Link Integrity** | Automated href crawl | 0 placeholder links (`w3schools`, generic `linkedin.com`) |
| 6 | **Mobile Responsiveness** | Viewport testing (360px to 1440px) | Horizontal scroll locked, drawer accessible |
| 7 | **Form Reliability** | End-to-end form submission | Submissions logged to email/database and WhatsApp |

