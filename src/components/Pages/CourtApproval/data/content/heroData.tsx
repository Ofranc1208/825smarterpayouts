// Hero section data for Court Approval page
import type { HeroStatsData, HeroCTAProps } from '../../types/courtApprovalTypes';

// Hero Section Data
export const heroStatsData: HeroStatsData[] = [
  {
    value: "98%",
    label: "Approval Rate",
    description: "Successfully approved court petitions"
  },
  {
    value: "30-60",
    label: "Days Average",
    description: "Typical court approval timeline"
  },
  {
    value: "24/7",
    label: "AI Support",
    description: "Mint AI assistance available"
  }
];

export const heroCTAData: HeroCTAProps = {
  primary: {
    text: "Get Your Instant Offer",
    href: "/quote",
    onClick: () => console.log('Primary CTA clicked')
  },
  secondary: {
    text: "Chat with Mint AI",
    href: "/mint-chat",
    onClick: () => console.log('Secondary CTA clicked')
  }
};

export const heroContent = {
  badge: "Court Approval Process",
  title: "Navigate Court Approval with Confidence",
  description: "Get expert guidance through the structured settlement court approval process. Our 98% success rate and 24/7 AI support ensure you're never alone in this journey.",
  backgroundImage: "/images/court-approval-hero-bg.jpg"
};
