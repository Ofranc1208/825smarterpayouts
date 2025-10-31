/**
 * Platform Rating Page Structured Data Schemas
 * 
 * JSON-LD schemas for SEO optimization
 * Compliant with Google's guidelines for displaying ratings
 */

const BASE_URL = 'https://smarterpayouts.com';
const ORGANIZATION_NAME = 'Smarter Payouts';

// AboutPage Schema
export const platformRatingPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our 4.9★ Finance Rating on Google',
  description: 'Learn about SmarterPayouts\' 4.9★ Free · Finance rating on Google and what it means for users seeking structured settlement transparency.',
  url: `${BASE_URL}/platform-rating`,
  mainEntity: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    description: 'SmarterPayouts has a 4.9★ Free · Finance rating on Google based on user reviews for transparent, accurate structured settlement calculators.',
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
export const platformRatingWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Our 4.9★ Finance Rating on Google',
  description: 'Learn about SmarterPayouts\' 4.9★ Free · Finance rating on Google and what it means for users seeking structured settlement transparency.',
  url: `${BASE_URL}/platform-rating`,
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  },
  about: {
    '@type': 'Thing',
    name: 'Platform Rating',
    description: 'SmarterPayouts\' user rating on Google for structured settlement calculator services'
  },
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  }
};

