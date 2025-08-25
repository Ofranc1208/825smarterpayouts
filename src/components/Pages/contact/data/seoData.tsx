import { SEOConfiguration } from '../types';

export const CONTACT_SEO_CONFIG: SEOConfiguration = {
  metadata: {
    title: 'Contact SmarterPayouts - Get Expert Settlement Advice | Free Consultation',
    description: 'Contact SmarterPayouts for expert structured settlement advice. Get your free consultation today and maximize your settlement value with our trusted team.',
    keywords: 'contact structured settlement, settlement consultation, SmarterPayouts contact, settlement experts, free consultation, structured settlement help',
    canonicalUrl: 'https://smarterpayouts.com/contact',
    imageUrl: 'https://smarterpayouts.com/images/contact-og-image.jpg',
    siteName: 'SmarterPayouts',
    twitterSite: '@smarterpayouts'
  },
  openGraph: {
    type: 'website',
    title: 'Contact SmarterPayouts - Expert Settlement Consultation',
    description: 'Get expert structured settlement advice with our free consultation. Contact our trusted team today to maximize your settlement value.',
    url: 'https://smarterpayouts.com/contact',
    siteName: 'SmarterPayouts',
    image: {
      url: 'https://smarterpayouts.com/images/contact-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Contact SmarterPayouts for Settlement Consultation'
    },
    locale: 'en_US'
  },
  twitterCard: {
    card: 'summary_large_image',
    site: '@smarterpayouts',
    title: 'Contact SmarterPayouts - Expert Settlement Advice',
    description: 'Get your free consultation today. Expert structured settlement advice to maximize your value.',
    image: 'https://smarterpayouts.com/images/contact-twitter-card.jpg',
    imageAlt: 'Contact SmarterPayouts for Settlement Help'
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmarterPayouts',
    url: 'https://smarterpayouts.com',
    telephone: '+1-800-555-0123',
    email: 'contact@smarterpayouts.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Settlement Street',
      addressLocality: 'Financial District',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-0123',
      contactType: 'customer service',
      availableLanguage: 'English'
    }
  }
};
