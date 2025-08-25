// FAQ data for Court Approval page
import type { FAQItem } from '../../types/courtApprovalTypes';

// FAQ Data
export const faqData: FAQItem[] = [
  {
    id: "court-appearance",
    question: "Do I have to appear in court?",
    answer: "Yes, most states require you to appear briefly before the judge. This is typically a short, straightforward hearing where the judge asks a few questions to ensure you understand your decision.",
    category: "court_process"
  },
  {
    id: "approval-time",
    question: "How long does court approval take?",
    answer: "The entire court approval process typically takes 30-60 days from filing to final approval. This includes time for document preparation, judge review, scheduling the hearing, and processing the final order.",
    category: "timeline"
  },
  {
    id: "judge-questions",
    question: "What will the judge ask me?",
    answer: "Judges typically ask about your financial situation, why you need the money now, whether you understand you're giving up future payments, and if anyone pressured you into this decision.",
    category: "court_process"
  },
  {
    id: "required-documents",
    question: "What documents do I need?",
    answer: "You'll need your original structured settlement agreement, recent bank statements, proof of income, and identification. We'll help you gather and prepare all necessary documentation.",
    category: "documentation"
  }
];

export const faqContent = {
  title: "Frequently Asked Questions",
  description: "Get answers to common questions about the court approval process.",
  mintCTA: {
    text: "Ask Mint AI",
    href: "/mint-chat",
    description: "Get instant answers to your specific questions"
  },
  viewAllLink: {
    text: "View All FAQs",
    href: "/faqs"
  }
};
