// JSON-LD Schema generators for State Laws pages
// Enterprise SEO implementation with structured data

import type { StateLaw, CountyLawDetails } from '../data/types';

export function buildStateJsonLd(name: string, data: StateLaw) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Structured Settlement Laws in ${name}`,
    "areaServed": {
      "@type": "State",
      "name": name,
      "addressCountry": "US"
    },
    "url": `https://www.smarterpayouts.com/state-laws/${data.slug}`,
    "description": `Court approval requirements, ${data.statuteCitation}, and key provisions for structured settlement transfers in ${name}.`,
    "provider": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://www.smarterpayouts.com",
      "description": "Professional structured settlement purchasing services"
    },
    "serviceType": "Structured Settlement Transfer Services",
    "areaServed": {
      "@type": "State",
      "name": name,
      "addressCountry": "US"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Structured Settlement Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Court-Approved Settlement Transfers",
            "description": `Assistance with court-approved structured settlement transfers in ${name}`
          }
        }
      ]
    },
    "legalStatus": "Court approval required for all transfers",
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Statute Citation",
      "value": data.statuteCitation
    }
  };
}

export function buildCountyJsonLd(
  stateName: string,
  stateSlug: string,
  countyData: CountyLawDetails
) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Structured Settlement Laws - ${countyData.court.name}, ${stateName}`,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": countyData.court.jurisdiction || countyData.court.name,
      "containedIn": {
        "@type": "State",
        "name": stateName,
        "addressCountry": "US"
      }
    },
    "url": `https://www.smarterpayouts.com/state-laws/${stateSlug}/${countyData.slug}`,
    "description": `Court procedures, filing requirements, and local rules for structured settlement transfers in ${countyData.court.name}, ${stateName}.`,
    "provider": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://www.smarterpayouts.com"
    },
    "serviceType": "Structured Settlement Transfer Legal Services",
    "address": countyData.court.address ? {
      "@type": "PostalAddress",
      "streetAddress": countyData.court.address,
      "addressLocality": countyData.majorCities?.[0] || countyData.court.jurisdiction,
      "addressRegion": stateName,
      "addressCountry": "US"
    } : undefined,
    "contactPoint": countyData.court.phone ? {
      "@type": "ContactPoint",
      "telephone": countyData.court.phone,
      "contactType": "Court Clerk"
    } : undefined,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Filing Fee",
        "value": countyData.filingFee || "Contact court for current fees"
      },
      {
        "@type": "PropertyValue",
        "name": "Processing Time",
        "value": countyData.processingTime || "Varies by case complexity"
      },
      {
        "@type": "PropertyValue",
        "name": "Transfer Volume",
        "value": countyData.transferVolume || "medium"
      }
    ]
  };
}

export function buildStateLawsIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Structured Settlement Laws by State",
    "description": "Comprehensive guide to structured settlement transfer laws in all 50 US states plus Washington DC. Court approval requirements, statutes, and legal resources.",
    "url": "https://www.smarterpayouts.com/state-laws",
    "provider": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://www.smarterpayouts.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "US State Settlement Laws",
      "numberOfItems": 51,
      "itemListElement": [] // Will be populated dynamically if needed
    },
    "about": {
      "@type": "LegalService",
      "name": "Structured Settlement Transfer Services",
      "description": "Professional assistance with court-approved structured settlement transfers across all US states"
    }
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://www.smarterpayouts.com${item.url}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

export function buildFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// WebPage schema for better indexing
export function buildWebPageSchema(
  name: string,
  description: string,
  url: string,
  lastUpdated?: string
) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": `https://www.smarterpayouts.com${url}`,
    "publisher": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://www.smarterpayouts.com"
    },
    "mainEntity": {
      "@type": "LegalService",
      "name": "Structured Settlement Transfer Services",
      "areaServed": "US"
    }
  };

  if (lastUpdated) {
    schema.dateModified = lastUpdated;
  }

  return schema;
}

// Organization schema for trust signals
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmarterPayouts",
    "url": "https://www.smarterpayouts.com",
    "logo": "https://www.smarterpayouts.com/logo.png",
    "description": "Professional structured settlement purchasing company providing court-approved transfer services across all US states.",
    "foundingDate": "2010",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceArea": {
      "@type": "State",
      "name": "All 50 US States + DC"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Settlement Transfer Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Structured Settlement Transfers",
            "description": "Court-approved structured settlement payment transfers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Annuity Transfers",
            "description": "Court-approved annuity payment transfers"
          }
        }
      ]
    },
    "legalName": "SmarterPayouts LLC",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "1-800-XXXXXXX", // Replace with actual number
      "contactType": "customer service"
    }
  };
}
