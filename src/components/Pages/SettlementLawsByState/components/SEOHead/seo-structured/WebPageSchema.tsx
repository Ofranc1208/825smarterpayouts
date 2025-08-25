// Structured data for main webpage
// Simple component - under 50 lines per complexity rule

import Head from 'next/head';

export default function WebPageSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Structured Settlement Laws by State",
    "description": "Comprehensive guide to structured settlement transfer laws for all 50 states and Washington D.C.",
    "url": "https://smarterpayouts.com/structured-settlement-laws-by-state",
    "mainEntity": {
      "@type": "Article",
      "headline": "Structured Settlement Laws by State - Complete Legal Guide",
      "author": {
        "@type": "Organization",
        "name": "SmarterPayouts",
        "url": "https://smarterpayouts.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SmarterPayouts",
        "logo": {
          "@type": "ImageObject",
          "url": "https://smarterpayouts.com/logo.png"
        }
      },
      "datePublished": "2024-01-15",
      "dateModified": "2024-01-15",
      "articleSection": "Legal Resources"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://smarterpayouts.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Settlement Laws by State",
          "item": "https://smarterpayouts.com/structured-settlement-laws-by-state"
        }
      ]
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
}
