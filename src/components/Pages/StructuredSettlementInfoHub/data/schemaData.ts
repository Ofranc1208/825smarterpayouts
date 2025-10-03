/**
 * Schema Data Templates
 * Reusable schema generators for maximum SEO impact
 */

// Generate Article Schema
export const generateArticleSchema = (data: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "image": data.image || "https://smarterpayouts.com/assets/images/social-preview.jpg",
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
        "url": "https://smarterpayouts.com/assets/images/logo.png"
      }
    },
    "datePublished": data.datePublished || "2024-01-01",
    "dateModified": data.dateModified || new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    }
  };
};

// Generate FAQ Schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
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
};

// Generate Breadcrumb Schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Generate LegalService Schema for maximum SEO
export const generateLegalServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "SmarterPayouts - Structured Settlement Services",
    "description": "Expert structured settlement purchasing services with transparent pricing, court approval assistance, and maximum payouts for your settlement payments.",
    "url": "https://smarterpayouts.com",
    "logo": "https://smarterpayouts.com/assets/images/logo.png",
    "priceRange": "$$",
    "areaServed": "United States",
    "availableLanguage": "English"
  };
};

