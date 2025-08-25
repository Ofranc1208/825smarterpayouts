// Social media SEO utilities
import type { OpenGraphData, TwitterCardData } from '../../types/seoTypes';
import { generateCanonicalUrl } from './metaUtils';

// Generate Open Graph data
export const generateOpenGraphData = (
  title: string,
  description: string,
  path: string,
  imageUrl?: string
): OpenGraphData => {
  return {
    title,
    description,
    type: 'website',
    url: generateCanonicalUrl(path),
    image: {
      url: imageUrl || 'https://smarterpayouts.com/images/court-approval-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Court Approval Process - SmarterPayouts'
    },
    siteName: 'SmarterPayouts',
    locale: 'en_US'
  };
};

// Generate Twitter Card data
export const generateTwitterCardData = (
  title: string,
  description: string,
  imageUrl?: string
): TwitterCardData => {
  return {
    card: 'summary_large_image',
    site: '@smarterpayouts',
    creator: '@smarterpayouts',
    title,
    description,
    image: imageUrl || 'https://smarterpayouts.com/images/court-approval-twitter.jpg',
    imageAlt: 'Court Approval Process - SmarterPayouts'
  };
};

// Generate hreflang attributes for international SEO
export const generateHreflangAttributes = (currentLocale: string = 'en-US') => {
  const supportedLocales = [
    { code: 'en-US', url: 'https://smarterpayouts.com' },
    { code: 'es-US', url: 'https://es.smarterpayouts.com' },
    { code: 'x-default', url: 'https://smarterpayouts.com' }
  ];
  
  return supportedLocales.map(locale => ({
    hreflang: locale.code,
    href: locale.url
  }));
};
