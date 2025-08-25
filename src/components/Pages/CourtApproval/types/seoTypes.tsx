// SEO Types for Court Approval Page
export interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// Open Graph Types
export interface OpenGraphData {
  title: string;
  description: string;
  type: 'website' | 'article';
  url: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  siteName: string;
  locale: string;
}

// Twitter Card Types
export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  site: string;
  creator?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

// Structured Data Types
export interface WebPageSchema {
  '@context': string;
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  mainEntity?: OrganizationSchema;
  breadcrumb?: BreadcrumbSchema;
  speakable?: SpeakableSchema;
}

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    availableLanguage: string;
  };
  sameAs: string[];
}

export interface BreadcrumbSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SpeakableSchema {
  '@type': 'SpeakableSpecification';
  cssSelector: string[];
}

// FAQ Schema Types
export interface FAQPageSchema {
  '@context': string;
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// Service Schema Types
export interface ServiceSchema {
  '@context': string;
  '@type': 'Service';
  name: string;
  description: string;
  provider: OrganizationSchema;
  serviceType: string;
  areaServed: string;
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
}

// Performance Hints Types
export interface PerformanceHints {
  preconnect: string[];
  prefetch: string[];
  preload: Array<{
    href: string;
    as: string;
    type?: string;
  }>;
  dns_prefetch: string[];
}
