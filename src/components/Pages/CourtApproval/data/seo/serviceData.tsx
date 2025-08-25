// Service schema data for Court Approval page
import type { ServiceSchema } from '../../types/seoTypes';

// Service Schema
export const serviceSchema: ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Court Approval Assistance for Structured Settlements",
  description: "Professional legal assistance for structured settlement court approval process, including document preparation, hearing support, and expert guidance.",
  provider: {
    "@type": "Organization",
    name: "SmarterPayouts",
    url: "https://smarterpayouts.com",
    logo: "https://smarterpayouts.com/images/logo.png",
    description: "Licensed structured settlement company with 98% court approval success rate",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-PAYOUT",
      contactType: "Customer Service",
      availableLanguage: "English"
    },
    sameAs: [
      "https://www.facebook.com/smarterpayouts",
      "https://twitter.com/smarterpayouts",
      "https://www.linkedin.com/company/smarterpayouts"
    ]
  },
  serviceType: "Legal Services",
  areaServed: "United States",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Court Approval Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Legal Document Preparation",
          description: "Professional preparation of all court documents required for structured settlement transfer approval"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Court Hearing Representation",
          description: "Expert legal representation during court hearings for structured settlement approval"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered Process Guidance",
          description: "24/7 AI assistance through Mint AI for questions and guidance throughout the approval process"
        }
      }
    ]
  }
};
