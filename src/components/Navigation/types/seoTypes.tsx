// Navigation SEO Types

export interface NavigationSEOConfig {
  siteName: string;
  baseUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  url: string;
  position: number;
}

export interface NavigationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export interface SiteNavigationElement {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  hasPart?: SiteNavigationElement[];
}

export interface MetaTagConfig {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}
