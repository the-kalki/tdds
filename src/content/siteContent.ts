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
    title: "Content & Video",
    shortDescription: "Cinematic commercial films, high-retention reels, and post-production that command attention.",
    deliverables: [
      "Videography",
      "Video Editing",
      "Reels & Shorts",
      "Documentary Films",
      "Event Coverage",
      "CGI & VFX",
    ],
    imageAsset: "/images/service-camera.webp",
  },
  {
    id: 'social-media',
    title: "Social Media Management",
    shortDescription: "Complete handling of your social platforms, daily curation, and systematic community growth.",
    deliverables: [
      "Content Strategy",
      "Page Management",
      "Reels & Short Form Content",
      "Captions & Hashtags",
      "Trend Research",
      "Community Engagement",
    ],
    imageAsset: "/images/service-phone.webp",
  },
  {
    id: 'advertising-growth',
    title: "Advertising & Digital Marketing",
    shortDescription: "Bring your ideas to life with high-impact ads, lead generation, and performance marketing.",
    deliverables: [
      "Meta & Google Ads",
      "Campaign Strategy",
      "Lead Generation",
      "Performance Marketing",
      "Analytics & Reporting",
      "Growth Consulting",
    ],
    imageAsset: "/images/service-spheres.webp",
  },
  {
    id: 'branding-design',
    title: "Branding & Design",
    shortDescription: "Sculpted visual identities, eye-catching posters, packaging, and digital UI direction.",
    deliverables: [
      "Logo Design",
      "Brand Identity",
      "Graphics & Motion Design",
      "Packaging Design",
      "Web UI / UX",
      "Print & Collateral Design",
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
  { name: "SWAG", tagline: "FASHION HUB", industry: "Fashion & Lifestyle Retail", style: "bold" },
  { name: "SÚN", tagline: "FURNITURE MALL", industry: "Interior & Living Spaces", style: "modern" },
  { name: "ZANZAR", tagline: "JEWELLERS", industry: "Fine Diamond & Gold", style: "serif" },
  { name: "BLUEKRIT", tagline: "WEDDINGS", industry: "Luxury Wedding Production", style: "monogram" },
  { name: "PAKWAN", tagline: "FINE DINE", industry: "Culinary & Hospitality", style: "serif" },
  { name: "LOYAL GREENS", tagline: "WELLNESS & D2C", industry: "Luxury Fragrance & Wellness", style: "bold" },
  { name: "H.M. SHAH", tagline: "EDUCATION", industry: "Chartered Accountancy", style: "modern" },
  { name: "BALAJI", tagline: "INTERIOR ARCHITECTURE", industry: "Bespoke Spatial Design", style: "bold" },
  { name: "AND MORE", tagline: "PARTNERS ↗", industry: "Creative Partnerships", style: "accent", isAccent: true },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    brandName: "Zanzar Jewellers",
    quote: "Professional, creative and super easy to work with. Our social media has grown like never before.",
    monogram: "Z",
  },
  {
    id: "test-02",
    brandName: "Swag Fashion Hub",
    quote: "The team understands our vision perfectly. Highly recommended!",
    monogram: "S",
  },
  {
    id: "test-03",
    brandName: "Sun Furniture Mall",
    quote: "On-time delivery and great results. They are now our go-to team.",
    monogram: "S",
  },
  {
    id: "test-04",
    brandName: "BJ Realty",
    quote: "The Design Dude Studio elevated our architectural presentation. Their CGI visuals and branding brought immense trust to our buyers.",
    monogram: "B",
  },
  {
    id: "test-05",
    brandName: "Pakwan Palanpur",
    quote: "From cinematic commercial films to daily social curation, TDDS is our trusted creative and growth partner.",
    monogram: "P",
  },
  {
    id: "test-06",
    brandName: "H.M. Shah Classes",
    quote: "The team understands student attention and educational branding. Our digital presence and enrolments saw substantial growth.",
    monogram: "H",
  },
  {
    id: "test-07",
    brandName: "Balaji Interior",
    quote: "Exceptional aesthetics and spatial walkthroughs. They captured the true essence of luxury interior design.",
    monogram: "B",
  },
  {
    id: "test-08",
    brandName: "Loyal Greens",
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
