// Mint AI features data for Court Approval page
import type { MintFeature } from '../../types/courtApprovalTypes';

// Mint AI Features Data
export const mintAIFeaturesData: MintFeature[] = [
  {
    id: "court-process-guidance",
    title: "Court Process Guidance",
    description: "Get step-by-step guidance through the entire court approval process.",
    icon: "/assets/images/mint-mascot.png",
    benefits: [
      "24/7 availability for questions",
      "Personalized timeline tracking",
      "Document preparation assistance",
      "Hearing preparation tips"
    ]
  },
  {
    id: "hearing-preparation",
    title: "Hearing Preparation",
    description: "Practice common judge questions and prepare for your court appearance.",
    icon: "🎯",
    benefits: [
      "Mock hearing sessions",
      "Common question database",
      "Confidence building exercises",
      "Last-minute preparation tips"
    ]
  },
  {
    id: "legal-requirements",
    title: "Legal Requirements",
    description: "Understand all legal requirements and ensure compliance with state laws.",
    icon: "📚",
    benefits: [
      "State-specific requirements",
      "Compliance checklists",
      "Legal terminology explanations",
      "Risk assessment guidance"
    ]
  }
];

export const mintAIContent = {
  title: "24/7 AI Support Through Every Step",
  description: "Mint AI provides personalized guidance and support throughout your court approval journey.",
  ctaText: "Chat with Mint AI Now",
  ctaHref: "/mint-chat",
  availability: "Available 24/7 to answer your questions"
};
