// Settlement Law Federal SEO Types
// Following enterprise patterns from Home and CourtApproval pages

export interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    creator: string;
  };
  legal: {
    jurisdiction: string;
    lastUpdated: string;
    disclaimer: string;
  };
}

export interface StructuredDataSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface LegalArticleSchema extends StructuredDataSchema {
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: string;
  about: {
    '@type': 'Thing';
    name: string;
  };
  keywords: string[];
}

export interface LegalServiceSchema extends StructuredDataSchema {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  serviceType: string;
  areaServed: string;
  availableChannel: {
    '@type': 'ServiceChannel';
    serviceUrl: string;
    serviceSmsNumber: string;
  };
}

export interface BreadcrumbSchema extends StructuredDataSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPageSchema extends StructuredDataSchema {
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

export interface WebPageSchema extends StructuredDataSchema {
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  mainEntity: {
    '@type': 'Article';
    headline: string;
  };
  breadcrumb: BreadcrumbSchema;
  speakable: {
    '@type': 'SpeakableSpecification';
    cssSelector: string[];
  };
}
