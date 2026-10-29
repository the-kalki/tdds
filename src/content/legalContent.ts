export interface LegalPoint {
  heading?: string;
  body: string;
  highlight?: string;
}

export interface LegalTable {
  headers: string[];
  rows: string[][];
}

export interface LegalCallout {
  type: 'note' | 'important' | 'warning';
  title: string;
  text: string;
}

export interface LegalSection {
  id: string;
  title: string;
  summary?: string;
  points: LegalPoint[];
  table?: LegalTable;
  callout?: LegalCallout;
}

export interface LegalDocument {
  id: 'privacy' | 'terms';
  title: string;
  badge: string;
  lastUpdated: string;
  jurisdiction: string;
  governingLaws: string[];
  intro: string;
  sections: LegalSection[];
}

export const legalDocuments: Record<'privacy' | 'terms', LegalDocument> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    badge: 'DPDP Act 2023 & IT Act 2000 Aligned',
    lastUpdated: 'October 2026',
    jurisdiction: 'Ahmedabad, Gujarat, India',
    governingLaws: [
      'Digital Personal Data Protection Act 2023',
      'Information Technology Act 2000',
      'Global GDPR Alignment for International Clients',
    ],
    intro:
      'The Design Dude Studio ("TDDS") respects your personal data and commercial privacy. We operate on a strict Data Minimization principle: we only collect information necessary to prepare creative proposals, execute production contracts, and deliver digital media.',
    sections: [
      {
        id: 'data-collection',
        title: '1. Personal & Project Data We Collect',
        summary: 'Only essential contact details and commissioned production assets are collected.',
        points: [
          {
            heading: 'Identity & Inquiries',
            body: 'Full name, company name, business email, and phone/WhatsApp number submitted via our lead forms or click-to-chat triggers.',
          },
          {
            heading: 'Client Media Assets',
            body: 'Raw video footage, vector logos, 3D meshes, brand decks, and campaign briefs supplied for project execution.',
          },
          {
            heading: 'Zero Financial Data Stored',
            body: 'We never store bank cards or payment credentials. All payments are settled via corporate wire transfers (NEFT/RTGS/IMPS) or authorized enterprise gateways.',
          },
        ],
        table: {
          headers: ['Data Type', 'Source', 'Legal Purpose'],
          rows: [
            ['Contact Details', 'Lead Drawer & WhatsApp', 'Project scoping & commercial proposals'],
            ['Client Media Files', 'Drive / Frame.io / Cloud Uploads', 'Execution of commissioned creative work'],
            ['Invoicing Records', 'Direct Client Provision', 'Indian GST & statutory tax audits'],
          ],
        },
      },
      {
        id: 'asset-confidentiality',
        title: '2. Asset Confidentiality & NDA Standards',
        summary: 'Enterprise-grade operational hygiene for pre-launch and embargoed campaigns.',
        points: [
          {
            heading: 'Siloed Production Access',
            body: 'Your unreleased media is restricted strictly to the designated creative director and production team members assigned to your project.',
          },
          {
            heading: '180-Day Archival Window',
            body: 'Production work is retained in our secure cold storage for 180 days post-completion for emergency retrieval, after which raw project files may be securely purged.',
          },
        ],
        callout: {
          type: 'important',
          title: 'Zero Data Brokerage Guarantee',
          text: 'TDDS never sells, rents, or licenses your contact records or creative assets to advertising brokers, third-party data aggregators, or marketing firms.',
        },
      },
      {
        id: 'cookies-tracking',
        title: '3. Tracking & Cookie Architecture',
        summary: 'Anti-bloat web engineering with zero surveillance pixels.',
        points: [
          {
            heading: 'No Cross-Site Surveillance',
            body: 'We do not embed Facebook, TikTok, or third-party ad tracking pixels on this website.',
          },
          {
            heading: 'Essential Session Memory Only',
            body: 'Browser storage is used solely to remember UI interactions like active menu state and reduced-motion preferences.',
          },
        ],
      },
      {
        id: 'grievance-contact',
        title: '4. Grievance Redressal & Contact Officer',
        summary: 'Direct access to our designated legal & privacy officer.',
        points: [
          {
            heading: 'Grievance Desk',
            body: 'The Design Dude Studio, Ahmedabad, Gujarat, India (380001). Email: thedesigndudestudio@gmail.com | Phone: +91 92270 09709',
          },
          {
            heading: 'Resolution SLA',
            body: 'All statutory privacy requests are acknowledged within 48 business hours and resolved within 15 business days.',
          },
        ],
      },
    ],
  },
  terms: {
    id: 'terms',
    title: 'Terms of Engagement',
    badge: 'Master Services Terms (Indian Contract Act 1872)',
    lastUpdated: 'October 2026',
    jurisdiction: 'Ahmedabad, Gujarat, India',
    governingLaws: [
      'Indian Contract Act 1872',
      'Copyright Act 1957',
      'Arbitration and Conciliation Act 1996',
    ],
    intro:
      'These Terms govern all commissioned engagements with The Design Dude Studio ("TDDS"), including commercial video editing, CGI/VFX advertisements, brand identity design, motion graphics, and web application development.',
    sections: [
      {
        id: 'scope-boundary',
        title: '1. Scope of Work & Change Orders',
        summary: 'Clear boundaries protecting timelines and delivery fidelity.',
        points: [
          {
            heading: 'Written SOW Rule',
            body: 'Only deliverables explicitly listed in your approved estimate or Statement of Work (SOW) are included in the fixed fee.',
          },
          {
            heading: 'Out-of-Scope Change Orders',
            body: 'New scenes, script rewrites after voiceover, additional aspect ratios, or extra revision rounds require an approved Change Order at prevailing studio rates.',
          },
        ],
      },
      {
        id: 'revisions-sla',
        title: '2. Revision Policy & Silent Acceptance',
        summary: 'Two structured rounds included per milestone with an anti-stall feedback SLA.',
        points: [
          {
            heading: '2-Round Structured Revision Cycle',
            body: 'Round 1 covers structural and narrative flow; Round 2 covers typographic and aesthetic micro-refinement within the approved concept.',
          },
          {
            heading: '5-Day Silent Acceptance Rule',
            body: 'Clients have 5 business days to provide consolidated written notes on milestone cuts. If no notes arrive within 5 days, the deliverable is deemed accepted and approved.',
          },
        ],
        callout: {
          type: 'warning',
          title: 'Scope Creep vs. Revision',
          text: 'Midway changes to approved scripts, completely new concepts, or altering 3D camera angles after scene rendering are billed as new work, not standard revisions.',
        },
      },
      {
        id: 'ip-transfer',
        title: '3. Intellectual Property Rights & Source Files',
        summary: 'Commercial licensing conditional on full invoice payment.',
        points: [
          {
            heading: 'Conditional IP Assignment',
            body: 'All commercial copyright and usage licenses for final master deliverables transfer to the Client strictly upon 100% full invoice settlement.',
          },
          {
            heading: 'Studio Native Working Files',
            body: 'Native project files (.aep, .blend, custom node graphs, shaders) remain Studio IP. Source files require a separate Source File Buyout Agreement.',
          },
          {
            heading: 'Portfolio & Showcase Rights',
            body: 'TDDS reserves the perpetual right to showcase finalized deliverables in showreels, awards submissions, and digital portfolios unless an NDA embargo is executed.',
          },
        ],
        table: {
          headers: ['Deliverable Tier', 'Client Rights (Post 100% Payment)', 'Studio Retained Rights'],
          rows: [
            ['Master Render Exports', 'Exclusive Commercial License', 'Portfolio showcase rights'],
            ['Working Files (.aep, .blend)', 'Not included by default (Buyout option)', 'Proprietary studio toolkits & nodes'],
            ['Unselected Concept Pitches', 'Zero Rights', '100% Studio Ownership'],
          ],
        },
      },
      {
        id: 'commercial-terms',
        title: '4. Commercial Terms & Cancellation Fee',
        summary: 'Milestone billing structure and dormancy safeguards.',
        points: [
          {
            heading: 'Billing Split',
            body: 'Standard 50% mobilization advance prior to kickoff + 50% upon final milestone approval before unwatermarked master exports are released.',
          },
          {
            heading: 'Monthly Retainers',
            body: 'Retainer invoices are payable in advance on or before the 1st of every calendar month. Unused hours do not roll over.',
          },
          {
            heading: 'Cancellation & Kill Fee',
            body: 'Early project termination requires payment for all WIP completed to date plus a 25% Kill Fee on the remaining contract balance.',
          },
        ],
      },
      {
        id: 'governing-law',
        title: '5. Governing Law & Dispute Resolution',
        summary: 'Exclusive territorial jurisdiction in Ahmedabad, Gujarat, India.',
        points: [
          {
            heading: 'Amicable Consultation',
            body: 'Parties agree to a 14-day good-faith executive discussion period before initiating formal legal proceedings.',
          },
          {
            heading: 'Arbitration Seat',
            body: 'Unresolved disputes shall be resolved via binding arbitration under the Arbitration and Conciliation Act, 1996 in Ahmedabad, Gujarat, India.',
          },
        ],
      },
    ],
  },
};
