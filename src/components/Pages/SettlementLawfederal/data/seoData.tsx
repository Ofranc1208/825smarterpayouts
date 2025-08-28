// Settlement Law Federal SEO Data
// Following enterprise patterns from Home and CourtApproval pages

import { SEOMetaData, LegalArticleSchema, LegalServiceSchema, BreadcrumbSchema, WebPageSchema } from '../types';

export const seoMetaData: SEOMetaData = {
  title: 'Structured Settlement Federal Law | SmarterPayouts',
  description: 'Learn about the key federal laws, tax rules, and court approval process governing structured settlements in the United States.',
  keywords: [
    'structured settlement federal law',
    'periodic payment settlement act',
    'structured settlement protection act',
    'IRC 104',
    'IRC 130',
    'IRC 5891',
    'court approval process',
    'structured settlement tax implications',
    'federal structured settlement laws',
    'structured settlement transfers',
    'qualified assignments',
    'structured settlement taxation'
  ],
  canonical: 'https://smarterpayouts.com/structured-settlement-laws',
  robots: 'index, follow',
  openGraph: {
    title: 'Structured Settlement Federal Law Guide | SmarterPayouts',
    description: 'Comprehensive guide to federal laws governing structured settlements, including tax implications and court approval processes.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-laws',
    image: 'https://smarterpayouts.com/images/structured-settlement-federal-law-og.jpg',
    siteName: 'SmarterPayouts'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structured Settlement Federal Law Guide',
    description: 'Understanding federal laws, tax rules, and court processes for structured settlements.',
    image: 'https://smarterpayouts.com/images/structured-settlement-federal-law-twitter.jpg',
    creator: '@SmarterPayouts'
  },
  legal: {
    jurisdiction: 'United States Federal Law',
    lastUpdated: new Date().toISOString(),
    disclaimer: 'This information is for educational purposes only and should not be considered legal advice.'
  }
};

export const legalArticleSchema: LegalArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Structured Settlement Federal Law: Complete Guide to Legal Framework',
  description: 'Comprehensive analysis of federal laws governing structured settlements, including the Periodic Payment Settlement Act, court approval processes, and tax implications.',
  author: {
    '@type': 'Organization',
    name: 'SmarterPayouts Legal Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'SmarterPayouts',
    logo: {
      '@type': 'ImageObject',
      url: 'https://smarterpayouts.com/images/logo.png'
    }
  },
  datePublished: '2024-01-01T00:00:00Z',
  dateModified: new Date().toISOString(),
  mainEntityOfPage: 'https://smarterpayouts.com/structured-settlement-laws',
  about: {
    '@type': 'Thing',
    name: 'Structured Settlement Federal Law'
  },
  keywords: [
    'structured settlement law',
    'federal regulations',
    'tax implications',
    'court approval',
    'IRC 104',
    'IRC 130',
    'periodic payments'
  ]
};

export const legalServiceSchema: LegalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Structured Settlement Legal Information Service',
  description: 'Comprehensive legal information and guidance on federal structured settlement laws and regulations.',
  provider: {
    '@type': 'Organization',
    name: 'SmarterPayouts'
  },
  serviceType: 'Legal Information Service',
  areaServed: 'United States',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://smarterpayouts.com/structured-settlement-laws',
    serviceSmsNumber: '+1-855-582-3506'
  }
};

export const breadcrumbSchema: BreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://smarterpayouts.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Legal Information',
      item: 'https://smarterpayouts.com/legal'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Federal Law',
      item: 'https://smarterpayouts.com/structured-settlement-laws'
    }
  ]
};

export const webPageSchema: WebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Structured Settlement Federal Law Guide',
  description: 'Complete guide to federal laws governing structured settlements in the United States.',
  url: 'https://smarterpayouts.com/structured-settlement-laws',
  mainEntity: {
    '@type': 'Article',
    headline: 'Federal Laws Governing Structured Settlements'
  },
  breadcrumb: breadcrumbSchema,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.legal-summary', '.key-provisions']
  }
};
