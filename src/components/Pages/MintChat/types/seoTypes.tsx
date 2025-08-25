// MintChat SEO Types

export interface MintChatSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  twitterImage: string;
  structuredData: MintChatStructuredData;
}

export interface MintChatStructuredData {
  organization: OrganizationSchema;
  chatBot: ChatBotSchema;
  faqPage: FAQPageSchema;
  breadcrumbs: BreadcrumbSchema[];
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    availableLanguage: string;
    serviceArea: string;
  };
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: OfferCatalogItem[];
  };
}

export interface OfferCatalogItem {
  '@type': string;
  itemOffered: {
    '@type': string;
    name: string;
    description: string;
  };
}

export interface ChatBotSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  creator: {
    '@type': string;
    name: string;
  };
  featureList: string[];
}

export interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: FAQItem[];
}

export interface FAQItem {
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface MetaTagsConfig {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  viewport: string;
  charset: string;
  author: string;
}

export interface OpenGraphConfig {
  title: string;
  description: string;
  url: string;
  type: string;
  image: string;
  imageAlt: string;
  siteName: string;
  locale: string;
  article?: {
    author: string;
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tag: string[];
  };
}

export interface TwitterCardConfig {
  card: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  site: string;
  creator: string;
}
