'use client';
import { MetaTagConfig, BreadcrumbItem, NavigationStructuredData } from '../types';

export const updateMetaTags = (config: MetaTagConfig): void => {
  if (typeof window === 'undefined') return;

  // Update title
  if (config.title) {
    document.title = config.title;
  }

  // Update meta description
  if (config.description) {
    updateMetaTag('description', config.description);
  }

  // Update meta keywords
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }

  // Update canonical URL
  if (config.canonical) {
    updateLinkTag('canonical', config.canonical);
  }

  // Update Open Graph tags
  if (config.openGraph) {
    Object.entries(config.openGraph).forEach(([key, value]) => {
      if (value) {
        updateMetaTag(`og:${key}`, value, 'property');
      }
    });
  }

  // Update Twitter Card tags
  if (config.twitter) {
    Object.entries(config.twitter).forEach(([key, value]) => {
      if (value) {
        updateMetaTag(`twitter:${key}`, value);
      }
    });
  }
};

const updateMetaTag = (name: string, content: string, attribute: string = 'name'): void => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
};

const updateLinkTag = (rel: string, href: string): void => {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
};

export const generateBreadcrumbStructuredData = (breadcrumbs: BreadcrumbItem[]): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

export const generateNavigationStructuredData = (
  siteName: string,
  baseUrl: string
): NavigationStructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

export const injectStructuredData = (data: object): void => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};
