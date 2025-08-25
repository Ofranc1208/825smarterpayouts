import React from 'react';

/**
 * Organization Schema Component for YouTube Channel SEO
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
 * - ✅ YouTube channel integration
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
    "description": "Educational video content and AI-powered structured settlement marketplace providing transparent pricing and instant quotes",
    "url": "https://smarterpayouts.com",
    "logo": "https://smarterpayouts.com/images/logo.png",
    "image": "https://smarterpayouts.com/images/youtube-channel-hero.jpg",
    "telephone": "+1-800-SMARTER",
    "email": "support@smarterpayouts.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "United States"
    },
    "sameAs": [
      "https://www.youtube.com/@smarterpayouts",
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
      "name": "Educational and Settlement Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Educational Video Content",
            "description": "Comprehensive video library covering structured settlements and financial strategies"
          }
        },
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
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.youtube.com/@smarterpayouts",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };

  React.useEffect(() => {
    // Add structured data script to head
    const existingScript = document.querySelector('script[type="application/ld+json"][data-schema="youtube-organization"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'youtube-organization');
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
