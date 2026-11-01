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
  primaryCta: "Start a Project",
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
    ],
    imageAsset: "/images/service-camera.webp",
  },
  {
    id: 'web-development',
    title: "Web Development",
    shortDescription: "High-conversion websites, bespoke web applications, and interactive digital experiences engineered for speed, aesthetics, and scale.",
    deliverables: [
      "Custom Business Websites",
      "High-Converting Landing Pages",
      "Full-Stack Web Applications",
      "Interactive Motion & 3D UI",
      "SEO & Speed Optimization",
    ],
    imageAsset: "/images/service-prism.webp",
  },
  {
    id: 'social-media',
    title: "Social Media Management",
    shortDescription: "End-to-end algorithmic takeover: trend forecasting, obsessive aesthetic curation, and daily content engines built to turn passive scrollers into brand evangelists.",
    deliverables: [
      "Algorithmic Content Strategy",
      "Full Account & Grid Management",
      "Short-Form Video Production",
      "Trend Forecasting & Auditing",
      "Community Growth & Engagement",
    ],
    imageAsset: "/images/service-phone.webp",
  },
  {
    id: 'advertising-growth',
    title: "Advertising & Performance",
    shortDescription: "Direct-response ad creative, laser-targeted Meta & Google funnels, and aggressive growth architectures that convert cold traffic into measurable revenue.",
    deliverables: [
      "Meta & Google Ad Management",
      "High-Conversion Creative Strategy",
      "Full-Funnel Lead Generation",
      "Audience Architecture & Targeting",
      "A/B Testing & Creative Scaling",
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
      "High-Impact Poster & Print",
      "Bespoke Packaging Design",
      "Web UI / UX Art Direction",
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
  {
    name: "YASHI KHANTED",
    tagline: "COUTURE & LUXE",
    industry: "Fashion & Luxury Apparel",
    style: "serif",
    instagramUrl: "https://www.instagram.com/yashikhanted?dlrf=MXYxOHh2emhsNzM4Ng==",
  },
  {
    name: "FOXPLAY",
    tagline: "SPORTS & ENTERTAINMENT",
    industry: "Sports & Arena Entertainment",
    style: "bold",
    instagramUrl: "https://www.instagram.com/foxplayclothing?cplk=NnVlZzR5eGNjcWlx",
  },
  {
    name: "KALPVRIKSHA EVENTS",
    tagline: "BESPOKE CELEBRATIONS",
    industry: "Luxury Wedding & Event Planning",
    style: "modern",
    instagramUrl: "https://www.instagram.com/kalpvrikshaevents?dlrf=MTJoMXV0ZjdiYTJiMg==",
  },
  {
    name: "BLUEKRIT EVENTS",
    tagline: "EXPERIENTIAL WEDDINGS",
    industry: "Premium Wedding Production",
    style: "monogram",
    instagramUrl: "https://www.instagram.com/bluekritweddings?dlrf=MXBhc3Iyank4MW9sZQ==",
  },
  {
    name: "HEALINGWALA",
    tagline: "HOLISTIC WELLNESS",
    industry: "Healthcare & Integrative Healing",
    style: "modern",
    instagramUrl: "https://www.instagram.com/healingwala?xtok=aGtxdWtsanBjNGVj",
  },
  {
    name: "BALLOONWALA",
    tagline: "SPATIAL ART & DECOR",
    industry: "Event Installations & Celebrations",
    style: "bold",
    instagramUrl: "https://www.instagram.com/balloonwala_studio?psln=MWN6enNnNnkzenJiNw==",
  },
  {
    name: "TIRIMA SALON",
    tagline: "BY RESHMA PATEL",
    industry: "Luxury Hair & Aesthetic Salon",
    style: "serif",
    instagramUrl: "https://www.instagram.com/tirimasalonbyreshmapatel?dlrf=MjhkZ251bWhra21i",
  },
  {
    name: "ANCHOR HARDIK",
    tagline: "LIVE EMCEE & STAGE",
    industry: "Celebrity Host & Stage Production",
    style: "bold",
    instagramUrl: "https://www.instagram.com/anchorhardik.official?rpxt=YnBxbTViNHZ3d3Jp",
  },
  {
    name: "ZANZAR JEWELLERS",
    tagline: "TIMELESS HERITAGE",
    industry: "Fine Gold & Diamond Jewellery",
    style: "serif",
    instagramUrl: "https://www.instagram.com/zanzarjewellersgurukul?rpxt=MWZsYTBpMDlwZWNnbg==",
  },
  {
    name: "JITEN SHAH",
    tagline: "FINANCIAL ADVISORY",
    industry: "Strategic Advisory & Taxation",
    style: "modern",
    // Graceful fallback verification: client without Instagram profile renders smoothly without dead links
  },
  {
    name: "SWAG FASHION HUB",
    tagline: "FASHION & LIFESTYLE",
    industry: "Fashion & Lifestyle Retail",
    style: "bold",
    instagramUrl: "https://www.instagram.com/swag_fashionhub?xtok=dm02ZWRrbmo2cWsx",
  },
  {
    name: "IOP EVENTS",
    tagline: "OUTDOOR PRODUCTIONS",
    industry: "Mega-Scale Live Events & Concerts",
    style: "bold",
    instagramUrl: "https://www.instagram.com/iop_events?vrfl=NGxicDd6Nm5xdXFu",
  },
  {
    name: "GLOSS N FLOSS",
    tagline: "DENTAL HUB",
    industry: "Modern Aesthetic & Clinical Dentistry",
    style: "modern",
    instagramUrl: "https://www.instagram.com/gloss_n.floss?obrf=amRwd2I5czBxamNn",
  },
  {
    name: "PAKWAN",
    tagline: "ROYAL CULINARY",
    industry: "Heritage Fine Dining & Hospitality",
    style: "serif",
    instagramUrl: "https://www.instagram.com/pakwan_dininghall_palanpur?dlrf=cnY3azZlazJybHc1",
  },
  {
    name: "LIFE DANCE STUDIO",
    tagline: "HYDERABAD",
    industry: "Movement & Performing Arts",
    style: "bold",
    instagramUrl: "https://www.instagram.com/lifedancestudio91?exln=MXZ2OXNqN2N6d2s3",
  },
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
    summary: "We deliver full-spectrum digital creative solutions across five core pillars:",
    bullets: [
      "<strong>Content & Video Production:</strong> Cinematic brand films, viral reels, event coverage, and 3D CGI visuals.",
      "<strong>Web & Digital Experiences:</strong> High-conversion websites, web applications, and interactive digital design.",
      "<strong>Social Media Management:</strong> Algorithmic content strategy, daily page curation, and community growth engines.",
      "<strong>Advertising & Growth:</strong> Meta & Google ad funnels, high-conversion hooks, and scalable performance campaigns.",
      "<strong>Branding & Visual Design:</strong> Definitive visual identities, bespoke packaging systems, and digital art direction.",
    ],
    takeaway: "<strong>Engineered for impact:</strong> Every asset is crafted in-house to make your brand impossible to ignore.",
    answer: "We offer end-to-end creative solutions across five primary pillars: Content & Video Production, Web Development, Social Media Management, Advertising & Growth, and Branding & Visual Design.",
  },
  {
    question: "How long does a typical project take?",
    summary: "Turnaround timelines are calibrated to your specific project scope and sprint requirements:",
    bullets: [
      "<strong>Video Production & 3D CGI Campaigns:</strong> Delivered within <strong>7 to 20 days</strong> depending on shoot logistics and rendering depth.",
      "<strong>Web Development & Brand Identity:</strong> Typically completed in <strong>1 to 2 weeks</strong> from kickoff to final sign-off.",
      "<strong>Social & Performance Retainers:</strong> Executed in <strong>monthly sprint cycles</strong> with weekly asset drops and ongoing optimizations.",
    ],
    takeaway: "<strong>Fast-track available:</strong> Rush timelines can be accommodated for critical launch windows.",
    answer: "Turnaround depends on project scope. Video production and CGI campaigns range from 7 to 20 days. Web development and brand identity packages typically take 1 to 2 weeks. Ongoing retainers operate on monthly sprint cycles.",
  },
  {
    question: "Do you work with brands outside Ahmedabad?",
    summary: "Yes. While our primary studio is based in <strong>Ahmedabad, Gujarat</strong>, our client roster is national and international:",
    bullets: [
      "<strong>Domestic Brands:</strong> Regular on-ground shoots and creative direction across <strong>Mumbai, Delhi, and Bangalore</strong>.",
      "<strong>International Remote Partnerships:</strong> Collaborative remote workflows serving clients across the <strong>US, UK, and UAE</strong>.",
      "<strong>Frictionless Collaboration:</strong> Real-time review sprints via dedicated WhatsApp channels, Drive, and Frame.io.",
    ],
    takeaway: "<strong>Global execution:</strong> Over 60% of our production runs smoothly across remote digital channels.",
    answer: "Yes. While our physical studio is based in Ahmedabad, Gujarat, we routinely partner with national brands across Mumbai, Delhi, and Bangalore, as well as international remote clients across the US, UK, and UAE.",
  },
  {
    question: "Who owns the final creative assets and raw footage?",
    summary: "<strong>Your brand retains 100% commercial ownership</strong> of all finalized assets upon full project settlement:",
    bullets: [
      "<strong>Delivered Assets:</strong> Polished video masters, social-ready cutdowns, color grades, sound masters, and export-ready graphics.",
      "<strong>Working Source Files:</strong> Raw shoot logs, After Effects compositions, and 3D project files are available via source buyout.",
      "<strong>Zero Hidden Fees:</strong> No recurring royalties or unexpected usage license expirations.",
    ],
    takeaway: "<strong>Total transparency:</strong> You receive unconditional commercial usage rights for all commissioned deliverables.",
    answer: "Upon full project completion and final payment, your brand owns 100% of the commercial rights to all delivered assets, polished masters, graphics, and finished campaign videos.",
  },
  {
    question: "How do we get started?",
    summary: "Initiating a project takes less than 2 minutes through our fast-track intake:",
    bullets: [
      "<strong>1. Share Your Brief:</strong> Click <strong>'Start a Project'</strong> to submit your deliverables, budget tier, and launch timeline.",
      "<strong>2. Direct WhatsApp Connect:</strong> Message our creative directors directly at <strong>+91 92270 09709</strong> for immediate response.",
      "<strong>3. 24-Hour Discovery Call:</strong> We review your brief and present an actionable creative roadmap within <strong>24 hours</strong>.",
    ],
    takeaway: "<strong>Zero agency delay:</strong> Direct line to senior creatives without bureaucratic sales friction.",
    answer: "Click the 'Start a Project' button anywhere on this page to share your project details, budget range, and timeline, or reach out to us directly on WhatsApp at +91 92270 09709. We will review your brief and schedule an initial discovery call within 24 hours.",
  },
];
