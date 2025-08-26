/**
 * SEO Utilities
 * 
 * Enterprise-grade SEO optimization utilities for the About Us page.
 * Provides structured data, meta tags, and performance optimizations
 * for search engine visibility and ranking.
 * 
 * @module SEOUtils
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * About Us page metadata interface
 */
export interface AboutUsMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  lastModified: string;
}

/**
 * Structured data for organization
 */
export interface OrganizationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  foundingDate: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    contactType: string;
    url: string;
  };
  sameAs: string[];
}

/**
 * Generate About Us page metadata
 * 
 * Creates comprehensive metadata for SEO optimization
 * with enterprise-grade structured data.
 * 
 * @returns {AboutUsMetadata} Complete page metadata
 */
export function generateAboutUsMetadata(): AboutUsMetadata {
  return {
    title: 'About SmarterPayouts - AI-Powered Structured Settlement Solutions',
    description: 'Learn about SmarterPayouts, the first AI-powered structured settlement company revolutionizing the industry with instant quotes, transparent pricing, and cutting-edge technology.',
    keywords: [
      'structured settlements',
      'AI-powered settlements',
      'instant quotes',
      'settlement company',
      'financial technology',
      'transparent pricing',
      'court-approved settlements',
      'settlement calculator',
      'structured settlement buyers',
      'settlement advance'
    ],
    canonicalUrl: 'https://smarterpayouts.com/about',
    ogImage: 'https://smarterpayouts.com/assets/images/about-og-image.jpg',
    lastModified: new Date().toISOString()
  };
}

/**
 * Generate organization structured data
 * 
 * Creates JSON-LD structured data for enhanced
 * search engine understanding and rich snippets.
 * 
 * @returns {OrganizationStructuredData} Organization structured data
 */
export function generateOrganizationStructuredData(): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'SmarterPayouts',
    description: 'AI-powered structured settlement company providing instant quotes and transparent pricing for structured settlement recipients.',
    url: 'https://smarterpayouts.com',
    logo: 'https://smarterpayouts.com/assets/images/logo.png',
    foundingDate: '2017',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Florida',
      addressRegion: 'FL',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://smarterpayouts.com/contact'
    },
    sameAs: [
      'https://www.linkedin.com/company/smarterpayouts',
      'https://twitter.com/smarterpayouts',
      'https://www.facebook.com/smarterpayouts'
    ]
  };
}

/**
 * Generate breadcrumb structured data
 * 
 * Creates breadcrumb navigation structured data
 * for enhanced search result display.
 * 
 * @returns {Object} Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData() {
  return {
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
        name: 'About Us',
        item: 'https://smarterpayouts.com/about'
      }
    ]
  };
}

/**
 * Generate FAQ structured data
 * 
 * Creates FAQ structured data for potential
 * rich snippet display in search results.
 * 
 * @returns {Object} FAQ structured data
 */
export function generateFAQStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes SmarterPayouts different from other settlement companies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SmarterPayouts is the first AI-powered structured settlement company, offering instant quotes, transparent pricing, and cutting-edge technology. We provide 24/7 intelligent assistance through Mint AI and maintain complete transparency with no hidden fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'How quickly can I get a quote for my structured settlement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our AI-powered quote engine provides accurate quotes in seconds. Simply use our online calculator to get an instant estimate of your structured settlement value.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is SmarterPayouts licensed and regulated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SmarterPayouts is a BBB Accredited Business, Florida State Licensed, and fully compliant in all 50 states. All transactions are court-approved and regulated for your protection.'
        }
      }
    ]
  };
}

/**
 * Security headers configuration
 * 
 * Defines security headers for enterprise-grade
 * protection against common web vulnerabilities.
 * 
 * @returns {Object} Security headers configuration
 */
export function getSecurityHeaders() {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://api.smarterpayouts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  };
}

/**
 * Performance optimization hints
 * 
 * Provides resource hints for improved loading performance
 * and Core Web Vitals optimization.
 * 
 * @returns {Object} Performance optimization configuration
 */
export function getPerformanceHints() {
  return {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ],
    prefetch: [
      '/pricing-calculator',
      '/mint-intelligent-chat'
    ],
    preload: [
      {
        href: '/assets/images/mint-mascot.webp',
        as: 'image'
      }
    ]
  };
}
