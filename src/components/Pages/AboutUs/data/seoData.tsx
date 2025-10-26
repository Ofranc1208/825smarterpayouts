// About Us SEO Configuration Data

export const ABOUT_US_SEO_CONFIG = {
  title: 'About SmarterPayouts - Trusted Structured Settlement Company Since 2015',
  description: 'Learn about SmarterPayouts, the trusted structured settlement company helping 10,000+ customers access their money. Licensed in all 50 states with 4.9/5 customer rating.',
  keywords: [
    'about smarterpayouts',
    'structured settlement company',
    'settlement experts',
    'financial services',
    'trusted settlement buyer',
    'licensed settlement company',
    'settlement industry leader',
    'customer testimonials'
  ],
  canonicalUrl: 'https://smarterpayouts.com/about',
  ogImage: 'https://smarterpayouts.com/images/about/about-us-og-image.jpg',
  twitterImage: 'https://smarterpayouts.com/images/about/about-us-twitter-image.jpg'
} as const;

export const ABOUT_US_STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'SmarterPayouts',
    alternateName: 'SmarterPayouts LLC',
    url: 'https://smarterpayouts.com',
    logo: 'https://smarterpayouts.com/images/logo.png',
    image: 'https://smarterpayouts.com/images/about/company-image.jpg',
    description: 'Trusted structured settlement company helping customers access their settlement funds with transparency and efficiency.',
    foundingDate: '2015',
    numberOfEmployees: '150',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Financial Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-561-583-1280',
        contactType: 'Customer Service',
        availableLanguage: 'English',
        serviceArea: 'United States'
      },
      {
        '@type': 'ContactPoint',
        email: 'info@smarterpayouts.com',
        contactType: 'Customer Support',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://facebook.com/smarterpayouts',
      'https://twitter.com/smarterpayouts',
      'https://linkedin.com/company/smarterpayouts',
      'https://youtube.com/@smarterpayouts'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '2500'
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'State License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'State Insurance Departments'
        }
      }
    ]
  },
  breadcrumbs: {
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
  },
  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long has SmarterPayouts been in business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SmarterPayouts was founded in 2015 and has been helping structured settlement recipients access their funds for over 8 years.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many customers has SmarterPayouts served?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We have successfully served over 400 clients and facilitated more than $50 million in future payment purchases.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is SmarterPayouts licensed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SmarterPayouts is licensed to operate in all 50 US states and maintains all required regulatory compliance.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is SmarterPayouts customer rating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SmarterPayouts maintains a 4.9/5 customer satisfaction rating based on over 2,500 customer reviews.'
        }
      }
    ]
  }
} as const;

export const META_TAGS_CONFIG = {
  title: 'About SmarterPayouts - Trusted Structured Settlement Company Since 2015',
  description: 'Learn about SmarterPayouts, the trusted structured settlement company helping 10,000+ customers access their money. Licensed in all 50 states with 4.9/5 customer rating.',
  keywords: 'about smarterpayouts, structured settlement company, settlement experts, financial services, trusted settlement buyer, licensed settlement company, settlement industry leader',
  robots: 'index, follow',
  canonical: 'https://smarterpayouts.com/about',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  author: 'SmarterPayouts Team'
} as const;

export const OPEN_GRAPH_CONFIG = {
  title: 'About SmarterPayouts - Trusted Structured Settlement Company',
  description: 'Learn about SmarterPayouts, helping 10,000+ customers access their settlement funds. Licensed in all 50 states with 4.9/5 rating.',
  url: 'https://smarterpayouts.com/about',
  type: 'website',
  image: 'https://smarterpayouts.com/images/about/about-us-og-image.jpg',
  imageAlt: 'SmarterPayouts team and office showcasing our trusted structured settlement company',
  siteName: 'SmarterPayouts',
  locale: 'en_US'
} as const;

export const TWITTER_CARD_CONFIG = {
  card: 'summary_large_image',
  title: 'About SmarterPayouts - Trusted Structured Settlement Company',
  description: 'Learn about SmarterPayouts, helping 10,000+ customers access their settlement funds with transparency and trust.',
  image: 'https://smarterpayouts.com/images/about/about-us-twitter-image.jpg',
  imageAlt: 'SmarterPayouts company overview and team',
  site: '@smarterpayouts',
  creator: '@smarterpayouts'
} as const;

export const PRELOAD_LINKS = [
  {
    rel: 'preload',
    href: '/images/about/hero-bg.jpg',
    as: 'image',
    type: 'image/jpeg'
  },
  {
    rel: 'preload',
    href: '/images/about/company-image.jpg',
    as: 'image',
    type: 'image/jpeg'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'dns-prefetch',
    href: 'https://cdn.smarterpayouts.com'
  }
] as const;
