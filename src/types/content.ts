import { z } from 'zod';

export type ServiceCategory =
  | 'All'
  | 'Video & Reels'
  | 'Social Media'
  | 'Advertising'
  | 'Branding & Design';

export interface CaseStudy {
  id: string;
  slug: string;
  index: string;             // e.g. "01", "02"
  title: string;             // e.g. "Fashion Campaign"
  client: string;            // e.g. "SWAG"
  industry: string;          // e.g. "Fashion & Lifestyle Retail"
  category: 'Video & Reels' | 'Social Media' | 'Advertising' | 'Branding & Design';
  coverImage: string;        // WebP asset path
  videoPreviewUrl?: string;  // Light looping preview
  videoFullUrl?: string;     // Full video URL or showreel
  deliverables: string[];    // e.g. ["Brand Film", "18 Short-Form Reels"]
  verifiedResult?: string;   // e.g. "2.8M views & 4x store footfall"
  featured: boolean;
}

export interface ServiceCompartment {
  id: 'content-video' | 'social-media' | 'advertising-growth' | 'branding-design';
  numberTag: string;         // e.g. "01", "02"
  title: string;             // e.g. "Content & Video"
  shortDescription: string;
  deliverables: string[];
  imageAsset: string;
  actionLabel: string;
}

export interface ClientBrand {
  name: string;
  industry: string;
  isAccent?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string;
  brandName: string;
  quote: string;
  rating: number;
  monogram: string;
}

export interface ProcessStep {
  step: string;
  headline: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().optional(),
  emailOrPhone: z.string().min(5, "Valid email or phone number required"),
  serviceNeeded: z.enum([
    "Content & Video",
    "Social Media",
    "Advertising & Growth",
    "Branding & Design",
    "Full-Stack Creative",
    "Other"
  ]),
  estimatedBudget: z.enum([
    "Under ₹50,000",
    "₹50,000 - ₹1,50,000",
    "₹1,50,000 - ₹5,00,000",
    "₹5,00,000+",
    "Not sure yet"
  ]),
  projectDetails: z.string().max(1000).optional(),
});

export type EnquiryPayload = z.infer<typeof EnquirySchema>;
