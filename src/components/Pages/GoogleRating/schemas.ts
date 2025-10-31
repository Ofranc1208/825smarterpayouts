/**
 * Google Rating Page Structured Data Schemas
 * 
 * JSON-LD schemas for SEO optimization
 */

const BASE_URL = 'https://smarterpayouts.com';
const ORGANIZATION_NAME = 'Smarter Payouts';

// AboutPage Schema
export const googleRatingPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Google 4.9★ Finance Rating',
  description: 'Learn how SmarterPayouts earned Google\'s 4.9★ Free · Finance badge for transparency and trust in structured settlement tools.',
  url: `${BASE_URL}/google-rating`,
  mainEntity: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    description: 'SmarterPayouts is recognized by Google with a 4.9★ Free · Finance rating for transparent, accurate structured settlement calculators.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '250'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free structured settlement calculator'
    }
  }
};

// WebPage Schema
export const googleRatingWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Our Google 4.9★ Finance Rating',
  description: 'Learn how SmarterPayouts earned Google\'s 4.9★ Free · Finance badge for transparency and trust in structured settlement tools.',
  url: `${BASE_URL}/google-rating`,
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  },
  about: {
    '@type': 'Thing',
    name: 'Google Rating Badge',
    description: 'Google\'s algorithmic recognition of SmarterPayouts as a trusted free finance application'
  },
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  }
};

