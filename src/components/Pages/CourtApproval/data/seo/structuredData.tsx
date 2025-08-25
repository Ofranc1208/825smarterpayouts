// Structured data schemas for Court Approval page
import type { WebPageSchema, FAQPageSchema, ServiceSchema } from '../../types/seoTypes';

// Structured Data - WebPage Schema
export const webPageSchema: WebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Court Approval Process for Structured Settlements",
  description: "Comprehensive guide to the court approval process for structured settlement transfers, including timeline, requirements, and expert support.",
  url: "https://smarterpayouts.com/court-approval",
  mainEntity: {
    "@type": "Organization",
    name: "SmarterPayouts",
    url: "https://smarterpayouts.com",
    logo: "https://smarterpayouts.com/images/logo.png",
    description: "Leading structured settlement company providing instant quotes and court approval assistance nationwide",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-PAYOUT",
      contactType: "Customer Service",
      availableLanguage: "English"
    },
    sameAs: [
      "https://www.facebook.com/smarterpayouts",
      "https://twitter.com/smarterpayouts",
      "https://www.linkedin.com/company/smarterpayouts",
      "https://www.youtube.com/c/smarterpayouts"
    ]
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://smarterpayouts.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Court Approval Process",
        item: "https://smarterpayouts.com/court-approval"
      }
    ]
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      ".hero-title",
      ".process-steps-title",
      ".faq-questions"
    ]
  }
};

// FAQ Page Schema
export const faqPageSchema: FAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I have to appear in court for structured settlement approval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, most states require you to appear briefly before the judge. This is typically a short, straightforward hearing where the judge asks a few questions to ensure you understand your decision and that the transfer is in your best interest."
      }
    },
    {
      "@type": "Question",
      name: "How long does the court approval process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The entire court approval process typically takes 30-60 days from filing to final approval. This includes time for document preparation, judge review, scheduling the hearing, and processing the final order."
      }
    },
    {
      "@type": "Question",
      name: "What questions will the judge ask during the hearing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Judges typically ask about your current financial situation, why you need the money now, whether you understand you're giving up future payments, if anyone pressured you into this decision, and how you plan to use the funds."
      }
    },
    {
      "@type": "Question",
      name: "What documents are required for court approval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need your original structured settlement agreement, recent bank statements, proof of income, government-issued identification, and any supporting documentation for your financial need. We help gather and prepare all necessary documentation."
      }
    }
  ]
};
