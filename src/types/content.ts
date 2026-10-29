export interface CaseStudy {
  id: string;
  slug?: string;
  title: string;
  client: string;
  coverImage: string;
  videoPreviewUrl?: string;
  videoFullUrl?: string;
}

export interface ServiceCompartment {
  id: 'content-video' | 'social-media' | 'advertising-growth' | 'branding-design';
  title: string;
  shortDescription: string;
  deliverables: string[];
  imageAsset: string;
}

export interface ClientBrand {
  name: string;
  tagline?: string;
  industry?: string;
  style?: 'bold' | 'serif' | 'modern' | 'monogram' | 'accent';
  isAccent?: boolean;
}

export interface Testimonial {
  id: string;
  brandName: string;
  quote: string;
  monogram: string;
  rating?: number;
  industry?: string;
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

export interface EnquiryPayload {
  name: string;
  brand?: string;
  emailOrPhone: string;
  serviceNeeded:
    | "Content & Video"
    | "Social Media"
    | "Advertising & Growth"
    | "Branding & Design"
    | "Full-Stack Creative"
    | "Other";
  estimatedBudget:
    | "Under ₹50,000"
    | "₹50,000 - ₹1,50,000"
    | "₹1,50,000 - ₹5,00,000"
    | "₹5,00,000+"
    | "Not sure yet";
  projectDetails?: string;
}

export function validateEnquiry(data: Partial<EnquiryPayload>): {
  success: boolean;
  errors: Record<string, string>;
  data?: EnquiryPayload;
} {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  if (!data.emailOrPhone || data.emailOrPhone.trim().length < 5) {
    errors.emailOrPhone = "Valid email or phone number required";
  }
  if (!data.serviceNeeded) {
    errors.serviceNeeded = "Please pick a service";
  }
  if (data.projectDetails && data.projectDetails.length > 1000) {
    errors.projectDetails = "Project details must be under 1000 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    errors: {},
    data: data as EnquiryPayload,
  };
}
