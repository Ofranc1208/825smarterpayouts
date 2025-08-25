import React from 'react';

/**
 * Organization Schema Component for MintChat SEO
 * 
 * Provides structured data markup for organization information
 * to enhance search engine understanding and rich snippets.
 * 
 * @component OrganizationSchema
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Organization Schema Component
 * 
 * ## Features
 * - ✅ Organization structured data (Schema.org)
 * - ✅ Contact information and social profiles
 * - ✅ Service area and business type
 * - ✅ Rich snippet optimization
 * 
 * @example
 * ```tsx
 * import OrganizationSchema from './OrganizationSchema';
 * 
 * export default function SEOStructured() {
 *   return <OrganizationSchema />;
 * }
 * ```
 */
export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SmarterPayouts",
    "description": "AI-powered structured settlement marketplace providing transparent pricing and instant quotes",
    "url": "https://smarterpayouts.com",
    "logo": "https://smarterpayouts.com/images/logo.png",
    "image": "https://smarterpayouts.com/images/mint-ai-assistant.jpg",
    "telephone": "+1-800-SMARTER",
    "email": "support@smarterpayouts.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "United States"
    },
    "sameAs": [
      "https://www.linkedin.com/company/smarterpayouts",
      "https://twitter.com/smarterpayouts",
      "https://www.facebook.com/smarterpayouts"
    ],
    "serviceType": "Structured Settlement Services",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Structured Settlement Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Powered Settlement Calculator",
            "description": "Instant structured settlement quotes using AI technology"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mint AI Assistant",
            "description": "24/7 AI chat assistant for settlement questions and guidance"
          }
        }
      ]
    }
  };

  React.useEffect(() => {
    // Add structured data script to head
    const existingScript = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'organization');
      script.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return null; // No JSX needed for App Router structured data
}
