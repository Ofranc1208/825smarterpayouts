// Process steps data for Court Approval page
import type { ProcessStep } from '../../types/courtApprovalTypes';

// Process Steps Data
export const processStepsData: ProcessStep[] = [
  {
    id: 1,
    title: "File the Petition",
    description: "We prepare and file all necessary legal documents with the court on your behalf.",
    icon: "📋",
    duration: "1-3 days",
    status: "pending"
  },
  {
    id: 2,
    title: "Judge Reviews",
    description: "The judge examines your case to ensure the transfer is in your best interest.",
    icon: "⚖️",
    duration: "2-4 weeks",
    status: "pending"
  },
  {
    id: 3,
    title: "Court Hearing",
    description: "Attend a brief hearing where the judge asks a few questions about your decision.",
    icon: "🏛️",
    duration: "1 day",
    status: "pending"
  },
  {
    id: 4,
    title: "Approval & Funding",
    description: "Once approved, receive your lump sum payment within 30-60 days.",
    icon: "💰",
    duration: "30-60 days",
    status: "pending"
  }
];

export const processContent = {
  title: "Simple 4-Step Court Approval Process",
  description: "Our streamlined process makes court approval straightforward and stress-free. Here's exactly what to expect:",
  timeline: "Typical completion: 30-60 days",
  successRate: "98% approval rate"
};
