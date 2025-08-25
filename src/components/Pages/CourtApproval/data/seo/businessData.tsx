// Business and article schema data for Court Approval page

// Local Business Schema (if applicable)
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "SmarterPayouts",
  description: "Licensed structured settlement company providing court approval assistance nationwide",
  url: "https://smarterpayouts.com",
  telephone: "+1-800-PAYOUT",
  email: "info@smarterpayouts.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Financial District",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.7128",
    longitude: "-74.0060"
  },
  openingHours: "Mo-Fr 09:00-17:00",
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "247",
    bestRating: "5",
    worstRating: "1"
  }
};

// Article Schema for educational content
export const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Understanding the Court Approval Process for Structured Settlements",
  description: "Complete guide to navigating the court approval process for structured settlement transfers",
  image: "https://smarterpayouts.com/images/court-approval-article.jpg",
  author: {
    "@type": "Organization",
    name: "SmarterPayouts Legal Team"
  },
  publisher: {
    "@type": "Organization",
    name: "SmarterPayouts",
    logo: {
      "@type": "ImageObject",
      url: "https://smarterpayouts.com/images/logo.png"
    }
  },
  datePublished: "2024-01-15T10:00:00-05:00",
  dateModified: "2024-01-15T15:30:00-05:00",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://smarterpayouts.com/court-approval"
  }
};
