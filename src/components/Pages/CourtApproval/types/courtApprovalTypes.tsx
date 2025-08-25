// Core Court Approval Page Types
export interface CourtApprovalPageProps {
  className?: string;
  id?: string;
}

// Hero Section Types
export interface HeroSectionProps {
  className?: string;
}

export interface HeroStatsData {
  value: string;
  label: string;
  description?: string;
}

export interface HeroCTAProps {
  primary: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondary: {
    text: string;
    href: string;
    onClick?: () => void;
  };
}

// Process Steps Types
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
  status?: 'pending' | 'active' | 'completed';
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  currentStep?: number;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  isOpen?: boolean;
}

export interface FAQSectionProps {
  items: FAQItem[];
  showSearch?: boolean;
  maxVisible?: number;
}

// Mint AI Support Types
export interface MintFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface MintAISupportProps {
  features: MintFeature[];
  ctaText?: string;
  ctaHref?: string;
}

// Testimonial Types
export interface TestimonialData {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
  date?: string;
}

// Compliance Types
export interface ComplianceInfo {
  badgeText: string;
  description: string;
  link: string;
  certifications?: string[];
}

// Final CTA Types
export interface FinalCTAProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  notice?: string;
}
