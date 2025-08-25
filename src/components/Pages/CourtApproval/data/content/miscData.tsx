// Miscellaneous content data for Court Approval page
import type { TestimonialData, ComplianceInfo, FinalCTAProps } from '../../types/courtApprovalTypes';

// Testimonial Data
export const testimonialData: TestimonialData = {
  id: "sarah-testimonial",
  name: "Sarah M.",
  role: "Structured Settlement Recipient",
  company: "Texas",
  content: "The court approval process seemed scary at first, but the team guided me through every step. The judge was very understanding, and I got my money exactly when they said I would.",
  rating: 5,
  date: "2024-01-15"
};

// Compliance Information
export const complianceData: ComplianceInfo = {
  badgeText: "Better Business Bureau A+ Rating",
  description: "Fully licensed and regulated structured settlement company",
  link: "https://www.bbb.org/smarterpayouts",
  certifications: [
    "Licensed in all 50 states",
    "BBB A+ Rating",
    "NSSTA Member",
    "Bonded & Insured"
  ]
};

// Final CTA Data
export const finalCTAData: FinalCTAProps = {
  title: "Ready to Start Your Court Approval Process?",
  description: "Get your instant offer and begin the court approval process today. Our team will handle all the legal work while Mint AI guides you through every step.",
  primaryCTA: {
    text: "Get Your Instant Offer",
    href: "/quote"
  },
  secondaryCTA: {
    text: "Chat with Mint AI",
    href: "/mint-chat"
  },
  notice: "Mint AI is available 24/7 to answer questions about the court approval process"
};
