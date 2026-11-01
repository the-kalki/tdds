import type { CaseStudy, ServiceCompartment, Testimonial, ClientBrand, ProcessStep, FaqItem } from '../types/content';

export const siteMeta = {
  brandName: "THE DESIGN DUDE STUDIO",
  tagline: "Videos, Posters, CGI Ads & Websites crafted to bring your ideas to life.",
  location: "Ahmedabad, Gujarat, India",
  email: "thedesigndudestudio@gmail.com",
  phoneDisplay: "+91 92270 09709",
  whatsappNumber: "919227009709",
  instagram: "https://www.instagram.com/the_designdude_studio/",
};

export const heroContent = {
  locationBadge: "( CREATIVE STUDIO BASED IN AHMEDABAD )",
  subheadline: "We create high-retention videos, posters, CGI ads, and digital experiences that make brands impossible to ignore.",
  primaryCta: "Start a Project ↗",
  philosophyTags: ["IDEAS", "PEOPLE", "BRANDS", "CULTURE"],
  showreelVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
};

export const servicesData: ServiceCompartment[] = [
  {
    id: 'content-video',
    title: "Content & Video Production",
    shortDescription: "High-voltage commercials, scroll-stopping reels, and 3D CGI films engineered to capture attention and refuse to be skipped.",
    deliverables: [
      "Brand Commercial Films",
      "High-Retention Viral Reels",
      "CGI & 3D Motion Ads",
      "Documentary Brand Stories",
      "Full-Scale Event Coverage",
      "Color Grading & Sound Design",
    ],
    imageAsset: "/images/service-camera.webp",
  },
  {
    id: 'social-media',
    title: "Social Media Management",
    shortDescription: "End-to-end algorithmic takeover: trend forecasting, obsessive aesthetic curation, and daily content engines built to turn passive scrollers into brand evangelists.",
    deliverables: [
      "Algorithmic Content Strategy",
      "Full Account & Grid Management",
      "Short-Form Video Production",
      "Trend Forecasting & Audio Hijacks",
      "Community Growth & Engagement",
      "Monthly Performance Analytics",
    ],
    imageAsset: "/images/service-phone.webp",
  },
  {
    id: 'advertising-growth',
    title: "Advertising & Performance",
    shortDescription: "Direct-response ad creative, laser-targeted Meta & Google funnels, and aggressive growth architectures that convert cold traffic into measurable revenue.",
    deliverables: [
      "Meta & Google Ad Management",
      "High-Conversion Creative Hooks",
      "Full-Funnel Lead Generation",
      "Audience Architecture & Retargeting",
      "A/B Testing & Creative Scaling",
      "Real-Time ROAS Optimization",
    ],
    imageAsset: "/images/service-spheres.webp",
  },
  {
    id: 'branding-design',
    title: "Branding & Visual Design",
    shortDescription: "Defiant brand identities, bespoke packaging systems, and digital art direction crafted to dominate your industry category.",
    deliverables: [
      "Brand Identity Systems",
      "Logo Design & Monograms",
      "High-Impact Poster & Print Art",
      "Bespoke Packaging Design",
      "Web UI / UX Art Direction",
      "Comprehensive Brand Guidelines",
    ],
    imageAsset: "/images/service-prism.webp",
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "case-01",
    client: "SWAG",
    title: "Fashion Campaign",
    coverImage: "/images/case-swag.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "case-02",
    client: "SUN",
    title: "Furniture Mall",
    coverImage: "/images/case-sun.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "case-03",
    client: "BLUEKRIT",
    title: "Weddings",
    coverImage: "/images/case-bluekrit.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "case-04",
    client: "LOYAL GREENS",
    title: "Product Campaign",
    coverImage: "/images/case-loyal.webp",
    videoFullUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export const clientBrandsData: ClientBrand[] = [
  { name: "YASHI KHANTED", tagline: "COUTURE & LUXE", industry: "Fashion & Luxury Apparel", style: "serif" },
  { name: "FOXPLAY", tagline: "SPORTS & ENTERTAINMENT", industry: "Sports & Arena Entertainment", style: "bold" },
  { name: "KALPVRIKSHA EVENTS", tagline: "BESPOKE CELEBRATIONS", industry: "Luxury Wedding & Event Planning", style: "modern" },
  { name: "BLUEKRIT EVENTS", tagline: "EXPERIENTIAL WEDDINGS", industry: "Premium Wedding Production", style: "monogram" },
  { name: "HEALINGWALA", tagline: "HOLISTIC WELLNESS", industry: "Healthcare & Integrative Healing", style: "modern" },
  { name: "BALLOONWALA", tagline: "SPATIAL ART & DECOR", industry: "Event Installations & Celebrations", style: "bold" },
  { name: "TIRIMA SALON", tagline: "BY RESHMA PATEL", industry: "Luxury Hair & Aesthetic Salon", style: "serif" },
  { name: "ANCHOR HARDIK", tagline: "LIVE EMCEE & STAGE", industry: "Celebrity Host & Stage Production", style: "bold" },
  { name: "ZANZAR JEWELLERS", tagline: "TIMELESS HERITAGE", industry: "Fine Gold & Diamond Jewellery", style: "serif" },
  { name: "JITEN SHAH", tagline: "FINANCIAL ADVISORY", industry: "Strategic Advisory & Taxation", style: "modern" },
  { name: "IOP EVENTS", tagline: "OUTDOOR PRODUCTIONS", industry: "Mega-Scale Live Events & Concerts", style: "bold" },
  { name: "GLOSS N FLOSS", tagline: "DENTAL HUB", industry: "Modern Aesthetic & Clinical Dentistry", style: "modern" },
  { name: "PAKWAN", tagline: "ROYAL CULINARY", industry: "Heritage Fine Dining & Hospitality", style: "serif" },
  { name: "LIFE DANCE STUDIO", tagline: "HYDERABAD", industry: "Movement & Performing Arts", style: "bold" },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    brandName: "Zanzar Jewellers",
    industry: "Fine Jewellery & Gold",
    quote: "Professional, creative and super easy to work with. Our social media has grown like never before.",
    monogram: "Z",
  },
  {
    id: "test-02",
    brandName: "Swag Fashion Hub",
    industry: "Fashion & Lifestyle Retail",
    quote: "The team understands our vision perfectly. Highly recommended!",
    monogram: "S",
  },
  {
    id: "test-03",
    brandName: "Sun Furniture Mall",
    industry: "Interior & Living Spaces",
    quote: "On-time delivery and great results. They are now our go-to team.",
    monogram: "S",
  },
  {
    id: "test-04",
    brandName: "BJ Realty",
    industry: "Commercial Real Estate & CGI",
    quote: "The Design Dude Studio elevated our architectural presentation. Their CGI visuals and branding brought immense trust to our buyers.",
    monogram: "B",
  },
  {
    id: "test-05",
    brandName: "Pakwan Palanpur",
    industry: "Culinary & Fine Dine",
    quote: "From cinematic commercial films to daily social curation, TDDS is our trusted creative and growth partner.",
    monogram: "P",
  },
  {
    id: "test-06",
    brandName: "H.M. Shah Classes",
    industry: "Chartered Accountancy",
    quote: "The team understands student attention and educational branding. Our digital presence and enrolments saw substantial growth.",
    monogram: "H",
  },
  {
    id: "test-07",
    brandName: "Balaji Interior",
    industry: "Bespoke Spatial Architecture",
    quote: "Exceptional aesthetics and spatial walkthroughs. They captured the true essence of luxury interior design.",
    monogram: "B",
  },
  {
    id: "test-08",
    brandName: "Loyal Greens",
    industry: "Wellness & Luxury Fragrance",
    quote: "High-retention product 3D visuals and ad creatives that boosted our D2C brand presence remarkably.",
    monogram: "L",
  },
];

export const processStepsData: ProcessStep[] = [
  {
    step: "01",
    headline: "Discovery & Direction",
    description: "Deep dive into your brand positioning, core audience, competitors, and growth objectives.",
  },
  {
    step: "02",
    headline: "Creative Architecture",
    description: "Moodboards, visual design tokens, scripts, video shot lists, and campaign hooks tailored for high retention.",
  },
  {
    step: "03",
    headline: "Production & Polish",
    description: "Cinematic filming, 3D CGI rendering, motion graphics, audio mastering, and typography layout execution.",
  },
  {
    step: "04",
    headline: "Launch & Iterate",
    description: "Deployment across digital platforms, analytics monitoring, performance feedback, and continuous creative refinement.",
  },
];

export const faqsData: FaqItem[] = [
  {
    question: "What services does The Design Dude Studio provide?",
    answer: "We offer end-to-end creative solutions across four primary pillars: Content & Video Production (cinematic brand films, reels, event coverage, CGI), Social Media Management (complete page management, content strategies, viral short-form editing), Advertising & Digital Marketing (Meta & Google ads, funnel building, performance campaigns), and Branding & Design (brand identity, logo design, packaging, and digital UI/UX).",
  },
  {
    question: "How long does a typical project take?",
    answer: "Turnaround depends on project scope. Brand identity and graphic packages typically take 1 to 2 weeks. Video production and CGI campaigns range from 7 to 20 days. Ongoing social media management and advertising retainers operate on dedicated monthly sprint cycles.",
  },
  {
    question: "Do you work with brands outside Ahmedabad?",
    answer: "Yes. While our physical studio is based in Ahmedabad, Gujarat, we routinely partner with national brands across Mumbai, Delhi, and Bangalore, as well as international remote clients across the US, UK, and UAE.",
  },
  {
    question: "Who owns the final creative assets and raw footage?",
    answer: "Upon full project completion and final payment, your brand owns 100% of the commercial rights to all delivered assets, polished masters, graphics, and finished campaign videos.",
  },
  {
    question: "How do we get started?",
    answer: "Click the 'Start a Project' button anywhere on this page to share your project details, budget range, and timeline, or reach out to us directly on WhatsApp at +91 92270 09709. We will review your brief and schedule an initial discovery call within 24 hours.",
  },
];
