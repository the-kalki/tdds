import type { CaseStudy, ServiceCompartment, Testimonial, ClientBrand, ProcessStep, FaqItem } from '../types/content';

export const siteMeta = {
  brandName: "THE DESIGN DUDE STUDIO",
  shortName: "TDDS",
  tagline: "Content, design and digital marketing built to make your brand stand out and grow.",
  location: "Ahmedabad, Gujarat, India",
  email: "hello@thedesigndudestudio.com",
  phoneDisplay: "+91 98765 43210",
  whatsappNumber: "919876543210",
  instagram: "https://www.instagram.com/thedesigndudestudio",
  linkedin: "https://www.linkedin.com/company/thedesigndudestudio",
};

export const heroContent = {
  locationBadge: "( CREATIVE STUDIO BASED IN AHMEDABAD )",
  headline: {
    line1: "IDEAS",
    line2: "INTO",
    accent: "IMPACT.",
  },
  subheadline: "We create content, campaigns and digital experiences that make brands impossible to ignore.",
  primaryCta: "Start a Project ↗",
  secondaryCta: "Watch Showreel ▶",
  philosophyTags: ["IDEAS", "PEOPLE", "BRANDS", "CULTURE"],
  scrollText: "SCROLL ↓",
  showreelVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // accessible demonstration showreel
};

export const servicesData: ServiceCompartment[] = [
  {
    id: 'content-video',
    numberTag: "01",
    title: "Content & Video",
    shortDescription: "Cinematic commercial films, viral reels, and studio production that demand attention.",
    deliverables: [
      "Videography & Brand Films",
      "Reels & High-Impact Short Form",
      "Product & Fashion Shoots",
      "Documentary & Event Coverage",
      "CGI, VFX & 3D Ads",
      "Sound Design & Colour Grading"
    ],
    imageAsset: "/images/service-camera.webp",
    actionLabel: "Explore Content ↗",
  },
  {
    id: 'social-media',
    numberTag: "02",
    title: "Social Media Management",
    shortDescription: "Systematic monthly growth, daily curation, and community engagement that builds loyalty.",
    deliverables: [
      "Social Media Growth Strategy",
      "Monthly Creative Content Calendar",
      "Reels & Carousel Curation",
      "Caption Writing & Trend Research",
      "Active Community Management",
      "Monthly ROI & Analytics Reporting"
    ],
    imageAsset: "/images/service-phone.webp",
    actionLabel: "Explore Social ↗",
  },
  {
    id: 'advertising-growth',
    numberTag: "03",
    title: "Advertising & Digital Marketing",
    shortDescription: "High-ROAS Meta and Google ad funnels engineered to convert attention into paying customers.",
    deliverables: [
      "Meta Ads (Instagram & Facebook)",
      "Google Search & YouTube Campaigns",
      "Audience & Competitor Intelligence",
      "A/B Creative Hook Testing",
      "High-Conversion Funnel Architecture",
      "Performance Tracking & CRO"
    ],
    imageAsset: "/images/service-spheres.webp",
    actionLabel: "Explore Ads ↗",
  },
  {
    id: 'branding-design',
    numberTag: "04",
    title: "Branding & Design",
    shortDescription: "Sculpted visual identities, packaging, and digital UI/UX that elevate brand perception.",
    deliverables: [
      "Logo & Visual Identity Design",
      "Comprehensive Brand Guidelines",
      "Packaging & Print Collaterals",
      "Campaign Posters & Promotional Art",
      "Website UI / UX Direction",
      "Pitch Decks & Launch Assets"
    ],
    imageAsset: "/images/service-prism.webp",
    actionLabel: "Explore Branding ↗",
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "case-01",
    slug: "swag-fashion-campaign",
    index: "01",
    client: "SWAG",
    title: "Fashion Campaign",
    industry: "Fashion & Lifestyle Retail",
    category: "Video & Reels",
    coverImage: "/images/case-swag.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    deliverables: ["Brand Film", "18 Short-Form Reels", "Meta Performance Ads"],
    verifiedResult: "30-day viral launch resulting in 2.8M views and 4x store footfall.",
    featured: true,
  },
  {
    id: "case-02",
    slug: "sun-furniture-mall",
    index: "02",
    client: "SUN",
    title: "Furniture Mall",
    industry: "Luxury Living & Interior Spaces",
    category: "Branding & Design",
    coverImage: "/images/case-sun.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    deliverables: ["Showroom Film", "Social Architecture Series", "Print Catalogues"],
    verifiedResult: "Elevating India's largest luxury furniture destination through architectural visuals.",
    featured: true,
  },
  {
    id: "case-03",
    slug: "bluekrit-weddings",
    index: "03",
    client: "BLUEKRIT",
    title: "Weddings",
    industry: "Luxury Wedding Planning & Experiences",
    category: "Video & Reels",
    coverImage: "/images/case-bluekrit.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    deliverables: ["Cinematic Teasers", "Full Documentary Film", "Instagram Curation"],
    verifiedResult: "Capturing monumental Indian weddings through high-emotion cinematic storytelling.",
    featured: true,
  },
  {
    id: "case-04",
    slug: "loyal-greens-product-campaign",
    index: "04",
    client: "LOYAL GREENS",
    title: "Product Campaign",
    industry: "Luxury Fragrance & Wellness",
    category: "Advertising",
    coverImage: "/images/case-loyal.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    deliverables: ["3D CGI Product Renders", "E-Commerce Creative Suite", "Meta Ads"],
    verifiedResult: "D2C product launch blending 3D CGI glass aesthetics with high-converting ads.",
    featured: true,
  },
];

export const clientBrandsData: ClientBrand[] = [
  { name: "SWAG FASHION HUB", industry: "Apparel & Streetwear" },
  { name: "SUN FURNITURE MALL", industry: "Luxury Furniture" },
  { name: "BLUEKRIT WEDDINGS", industry: "Events & Luxury Weddings" },
  { name: "LOYAL GREENS", industry: "Lifestyle & Wellness" },
  { name: "ZANZAR JEWELLERS", industry: "Fine Gold & Diamonds" },
  { name: "RN MAKEOVER", industry: "Luxury Salon & Beauty" },
  { name: "JV FITNESS", industry: "Athletic Wellness" },
  { name: "AND 100+ MORE ↗", industry: "Regional & Global Brands", isAccent: true },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    clientName: "Karan Shah",
    clientRole: "Managing Director",
    brandName: "Zanzar Jewellers",
    quote: "Professional, creative and super easy to work with. Our social media has grown like never before.",
    rating: 5,
    monogram: "Z",
  },
  {
    id: "test-02",
    clientName: "Prateek Patel",
    clientRole: "Founder & Creative Lead",
    brandName: "Swag Fashion Hub",
    quote: "The team understands our vision perfectly. They took our fashion brand from local presence to national conversations. Highly recommended!",
    rating: 5,
    monogram: "S",
  },
  {
    id: "test-03",
    clientName: "Rajesh Soni",
    clientRole: "Head of Marketing",
    brandName: "Sun Furniture Mall",
    quote: "On-time delivery and great results. From their video production team to ad management, they are now our permanent go-to team.",
    rating: 5,
    monogram: "S",
  },
];

export const processStepsData: ProcessStep[] = [
  {
    step: "01",
    headline: "01 / Discover the brief.",
    description: "We unpack your brand DNA, analyze your competitor blindspots, and establish clear commercial targets.",
  },
  {
    step: "02",
    headline: "02 / Build the direction.",
    description: "We script hooks, map aesthetic moodboards, design production schedules, and lock deliverables.",
  },
  {
    step: "03",
    headline: "03 / Create with intent.",
    description: "Our directors, shooters, and designers execute shoots, edits, graphics, and ad suites with obsession.",
  },
  {
    step: "04",
    headline: "04 / Learn and scale.",
    description: "We track performance metrics, test creative variants, and iterate to maximize inbound returns.",
  },
];

export const faqsData: FaqItem[] = [
  {
    question: "What services does The Design Dude Studio handle in-house?",
    answer: "We are a full-funnel creative studio. Our core in-house capabilities cover Video & Content Production (shoots, reels, CGI/VFX, editing), Social Media Management (calendars, growth, community), Performance Advertising (Meta & Google ad funnels), and Brand Design (logos, packaging, web design).",
  },
  {
    question: "Where are you located, and do you take projects outside Ahmedabad?",
    answer: "Our studio is based in Ahmedabad, Gujarat. While our production team regularly executes on-ground shoots across Gujarat, Mumbai, and Delhi, our digital marketing, branding, and video post-production clients span across India and internationally.",
  },
  {
    question: "How does the project onboarding process work?",
    answer: "We begin with a 20-minute discovery call or WhatsApp chat to define your objectives. Within 48 hours, we share a tailored creative roadmap, production schedule, and deliverable scope. Once approved, production begins immediately.",
  },
  {
    question: "What is your typical turnaround time for video campaigns and reels?",
    answer: "Short-form content batches (12–16 reels) are typically delivered within 7–10 working days post-shoot. Comprehensive brand films and CGI commercial campaigns take between 2 to 4 weeks depending on VFX and grading complexity.",
  },
  {
    question: "Do you offer monthly retainer packages?",
    answer: "Yes. Most of our partner brands work on monthly retainers combining ongoing content creation, reel production, daily social management, and paid ad campaign scaling for consistent growth.",
  },
  {
    question: "Who owns the raw footage and creative assets after project delivery?",
    answer: "You do. Upon project completion and final invoice clearance, 100% of the final assets, brand guidelines, and master video renders belong entirely to your brand.",
  },
  {
    question: "Can you help our brand with Meta and Google advertising from scratch?",
    answer: "Absolutely. We don't just shoot videos — we build high-converting ad creative specifically engineered for Meta (Instagram/Facebook) and Google Ads, managing audience targeting, ad spend optimization, and conversion tracking.",
  },
  {
    question: "What budget range do I need to work with The Design Dude Studio?",
    answer: "We tailor our engagements to ambitious brands at different growth stages, with targeted creative projects starting from ₹50,000 and comprehensive multi-month retainers for scaling enterprises. Share your goals via our enquiry form for an exact scope breakdown.",
  },
];
