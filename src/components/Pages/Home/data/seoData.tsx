import { SEOConfiguration } from '../types';

export const HOME_SEO_CONFIG: SEOConfiguration = {
  metadata: {
    title: 'SmarterPayouts - Get Cash for Your Structured Settlement | Free Quote',
    description: 'Turn your structured settlement into cash today with SmarterPayouts. Get a free quote in minutes, transparent pricing, and cash in as little as 30 days. Trusted by 400+ happy clients.',
    keywords: 'structured settlement, cash for settlement, sell structured settlement, settlement buyer, structured settlement company, cash advance, settlement funding',
    canonicalUrl: 'https://smarterpayouts.com',
    imageUrl: 'https://smarterpayouts.com/images/home-og-image.jpg',
    siteName: 'SmarterPayouts',
    twitterSite: '@smarterpayouts'
  },
  openGraph: {
    type: 'website',
    title: 'SmarterPayouts - Get Cash for Your Structured Settlement',
    description: 'Turn your structured settlement into cash today. Free quotes, transparent pricing, and cash in as little as 30 days.',
    url: 'https://smarterpayouts.com',
    siteName: 'SmarterPayouts',
    image: {
      url: 'https://smarterpayouts.com/images/home-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'SmarterPayouts - Structured Settlement Cash Solutions'
    },
    locale: 'en_US'
  },
  twitterCard: {
    card: 'summary_large_image',
    site: '@smarterpayouts',
    title: 'Get Cash for Your Structured Settlement - SmarterPayouts',
    description: 'Free quotes, transparent pricing, cash in 30 days. Trusted by 400+ happy clients.',
    image: 'https://smarterpayouts.com/images/home-twitter-card.jpg',
    imageAlt: 'SmarterPayouts Homepage'
  },
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com',
      telephone: '+1-855-214-3510',
      email: 'info@smarterpayouts.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '15257 Amberly Dr Ste 233',
        addressLocality: 'Tampa',
        addressRegion: 'FL',
        postalCode: '33647',
        addressCountry: 'US'
      },
      sameAs: [
        'https://youtube.com/@smarterpayouts',
        'https://facebook.com/smarterpayouts',
        'https://x.com/smarterpayouts',
        'https://instagram.com/smarterpayouts',
        'https://linkedin.com/company/smarterpayouts'
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://smarterpayouts.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  }
};

export const PRELOAD_RESOURCES = [
  '/videos/hero-background.mp4',
  '/images/hero-background.jpg',
  '/fonts/inter-var.woff2'
];

export const CRITICAL_CSS_RESOURCES = [
  '/styles/critical.css'
];
