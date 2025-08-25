import { NavigationSEOConfig, MetaTagConfig } from '../types';

export const NAVIGATION_SEO_CONFIG: NavigationSEOConfig = {
  siteName: 'SmarterPayouts',
  baseUrl: 'https://smarterpayouts.com',
  defaultTitle: 'SmarterPayouts - Get Cash for Your Structured Settlement',
  titleTemplate: '%s | SmarterPayouts',
  defaultDescription: 'Turn your structured settlement into cash today with SmarterPayouts. Get a free quote in minutes, transparent pricing, and cash in as little as 30 days.',
  keywords: [
    'structured settlement',
    'cash for settlement',
    'sell structured settlement',
    'settlement buyer',
    'structured settlement company',
    'cash advance',
    'settlement funding',
    'smarterpayouts'
  ],
  canonicalUrl: 'https://smarterpayouts.com'
};

export const PAGE_META_CONFIGS: Record<string, MetaTagConfig> = {
  '/': {
    title: 'SmarterPayouts - Get Cash for Your Structured Settlement | Free Quote',
    description: 'Turn your structured settlement into cash today. Free quotes, transparent pricing, and cash in as little as 30 days. Trusted by 10,000+ customers.',
    keywords: 'structured settlement, cash for settlement, free quote, settlement buyer',
    canonical: 'https://smarterpayouts.com',
    openGraph: {
      title: 'SmarterPayouts - Get Cash for Your Structured Settlement',
      description: 'Free quotes, transparent pricing, cash in 30 days. Trusted by 10,000+ customers.',
      url: 'https://smarterpayouts.com',
      type: 'website',
      image: 'https://smarterpayouts.com/images/home-og.jpg'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Get Cash for Your Structured Settlement - SmarterPayouts',
      description: 'Free quotes, transparent pricing, cash in 30 days.',
      image: 'https://smarterpayouts.com/images/home-twitter.jpg'
    }
  },
  '/about': {
    title: 'About SmarterPayouts - Trusted Structured Settlement Company',
    description: 'Learn about SmarterPayouts, the trusted structured settlement company helping customers access their money when they need it most.',
    keywords: 'about smarterpayouts, structured settlement company, settlement experts',
    canonical: 'https://smarterpayouts.com/about'
  },
  '/contact': {
    title: 'Contact SmarterPayouts - Get Expert Settlement Advice | Free Consultation',
    description: 'Contact SmarterPayouts for expert structured settlement advice. Get your free consultation today.',
    keywords: 'contact structured settlement, settlement consultation, free consultation',
    canonical: 'https://smarterpayouts.com/contact'
  },
  '/pricing-calculator': {
    title: 'Settlement Calculator - Get Your Free Quote | SmarterPayouts',
    description: 'Calculate your structured settlement value instantly with our free calculator. Get a personalized quote in minutes.',
    keywords: 'settlement calculator, free quote, structured settlement value',
    canonical: 'https://smarterpayouts.com/pricing-calculator'
  },
  '/mint-intelligent-chat': {
    title: 'Mint AI Chat - Instant Settlement Answers | SmarterPayouts',
    description: 'Chat with Mint AI for instant answers about your structured settlement. Available 24/7 to help with your questions.',
    keywords: 'mint ai chat, settlement questions, ai assistant, 24/7 support',
    canonical: 'https://smarterpayouts.com/mint-intelligent-chat'
  },
  '/youtube-channel': {
    title: 'SmarterPayouts YouTube Channel - Settlement Education Videos',
    description: 'Watch educational videos about structured settlements, cash advances, and financial planning on our YouTube channel.',
    keywords: 'settlement videos, youtube channel, financial education, settlement guides',
    canonical: 'https://smarterpayouts.com/youtube-channel'
  }
};

export const DEFAULT_STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'SmarterPayouts',
    url: 'https://smarterpayouts.com',
    telephone: '+1-800-555-0123',
    email: 'info@smarterpayouts.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Financial Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.facebook.com/smarterpayouts',
      'https://www.twitter.com/smarterpayouts',
      'https://www.linkedin.com/company/smarterpayouts',
      'https://www.youtube.com/channel/smarterpayouts'
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
};
