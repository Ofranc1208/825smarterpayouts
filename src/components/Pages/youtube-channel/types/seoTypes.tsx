// YouTube Channel SEO Types

export interface YouTubeSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  twitterImage: string;
  structuredData: YouTubeStructuredData;
}

export interface YouTubeStructuredData {
  organization: OrganizationSchema;
  videoGallery: VideoGallerySchema;
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
  };
}

export interface VideoGallerySchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl: string;
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
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
