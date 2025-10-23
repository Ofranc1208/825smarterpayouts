/**
 * Comprehensive Structured Data Schema Library
 * Centralized JSON-LD schema generation for all page types
 * Optimized for Google Rich Snippets and SEO
 * 
 * @module StructuredDataSchemas
 * @author SmarterPayouts Team
 * @since 2024
 */

const BASE_URL = 'https://smarterpayouts.com';
const ORGANIZATION_NAME = 'Smarter Payouts';
const LOGO_URL = `${BASE_URL}/assets/images/logo.png`;

// ============================================================================
// ORGANIZATION SCHEMA (Global - Use on all pages)
// ============================================================================

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: ORGANIZATION_NAME,
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: '600',
    height: '60'
  },
  description: 'Leading digital platform for structured settlement transfers with AI-powered calculators and instant quotes.',
  foundingDate: '2017',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'FL'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-561-583-1280',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English'],
    contactOption: 'TollFree'
  },
  sameAs: [
    'https://youtube.com/@smarterpayouts',
    'https://facebook.com/smarterpayouts',
    'https://x.com/smarterpayouts',
    'https://instagram.com/smarterpayouts',
    'https://linkedin.com/company/smarterpayouts',
    'https://www.bbb.org/',
    'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName'
  ]
};

// ============================================================================
// WEBSITE SCHEMA (Homepage)
// ============================================================================

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: ORGANIZATION_NAME,
  url: BASE_URL,
  description: 'Instant structured settlement quotes with AI-powered calculators. No sales calls, no pressure - just transparent pricing.',
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
};

// ============================================================================
// CALCULATOR SCHEMAS (SoftwareApplication)
// ============================================================================

export const pricingCalculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Structured Settlement Pricing Calculator',
  description: 'Advanced calculator for structured settlement present value calculations with AI assistance. Get instant, accurate quotes for your settlement payments.',
  url: `${BASE_URL}/pricing-calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free instant settlement quote calculator'
  },
  creator: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  },
  featureList: [
    'Instant NPV calculations',
    'AI-powered guidance',
    'No personal information required',
    'Guaranteed payment calculator',
    'Life-contingent payment calculator',
    'Transparent pricing',
    'No hidden fees'
  ],
  softwareVersion: '2.0',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '250',
    bestRating: '5',
    worstRating: '1'
  }
};

export const lumpSumCalculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lump Sum Settlement Calculator',
  description: 'Simple calculator to estimate your lump sum payout for structured settlements. Get instant cash offer estimates.',
  url: `${BASE_URL}/lump-sum-calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  creator: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  },
  featureList: [
    'Quick lump sum estimates',
    'No registration required',
    'Instant results',
    'Free to use'
  ]
};

export const guaranteedCalculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Guaranteed Payment Calculator',
  description: 'Calculate present value of guaranteed structured settlement payments with advanced NPV algorithms.',
  url: `${BASE_URL}/calculations/guaranteed`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  creator: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  }
};

export const lcpCalculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Life-Contingent Payment Calculator',
  description: 'Advanced calculator for life-contingent structured settlement payments with mortality adjustments.',
  url: `${BASE_URL}/calculations/lcp`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  creator: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  }
};

// ============================================================================
// MINT AI SCHEMA (ChatBot / SoftwareApplication)
// ============================================================================

export const mintAISchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mint AI Assistant',
  description: 'AI-powered chatbot providing instant answers about structured settlements with no personal information required.',
  url: `${BASE_URL}/mint-chat-active`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free AI assistant for structured settlement questions'
  },
  creator: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL
  },
  featureList: [
    'Instant settlement question answers',
    'No personal information required',
    '24/7 availability',
    'AI-powered responses',
    'Structured settlement expertise',
    'Free consultation'
  ],
  softwareVersion: '2.0',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1'
  }
};

// ============================================================================
// EDUCATIONAL CONTENT SCHEMAS (Article / HowTo)
// ============================================================================

export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    author: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL
      }
    },
    datePublished: params.datePublished || '2024-01-01',
    dateModified: params.dateModified || new Date().toISOString().split('T')[0],
    articleSection: 'Structured Settlements',
    keywords: params.keywords || ['structured settlement', 'settlement transfer', 'lump sum payout'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url
    }
  };
}

export function generateHowToSchema(params: {
  name: string;
  description: string;
  url: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    url: params.url,
    totalTime: params.totalTime || 'PT30M',
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url || params.url
    })),
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME
    }
  };
}

// ============================================================================
// LEGAL SERVICE SCHEMA (State/County Pages)
// ============================================================================

export function generateLegalServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  areaServed: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: params.serviceType || 'Structured Settlement Transfer',
    provider: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: BASE_URL
    },
    areaServed: {
      '@type': 'State',
      name: params.areaServed
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: params.url,
      serviceType: 'Online Service'
    }
  };
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// ============================================================================
// FAQ SCHEMA
// ============================================================================

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// ============================================================================
// REVIEW / TESTIMONIAL SCHEMA
// ============================================================================

export function generateReviewSchema(params: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url: BASE_URL
    },
    author: {
      '@type': 'Person',
      name: params.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: params.rating,
      bestRating: '5',
      worstRating: '1'
    },
    reviewBody: params.reviewBody,
    datePublished: params.datePublished || new Date().toISOString().split('T')[0]
  };
}

// ============================================================================
// AGGREGATE RATING SCHEMA (For testimonials page)
// ============================================================================

export const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: ORGANIZATION_NAME,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '250',
    bestRating: '5',
    worstRating: '1'
  }
};

// ============================================================================
// CONTACT PAGE SCHEMA
// ============================================================================

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact SmarterPayouts',
  description: 'Get in touch with SmarterPayouts for structured settlement questions and quotes.',
  url: `${BASE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-954-764-9750',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English'
    }
  }
};

// ============================================================================
// ABOUT PAGE SCHEMA
// ============================================================================

export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About SmarterPayouts',
  description: 'Learn about SmarterPayouts - the leading digital platform for structured settlement transfers.',
  url: `${BASE_URL}/about`,
  mainEntity: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    description: 'SmarterPayouts is revolutionizing the structured settlement industry with AI-powered calculators and transparent pricing.',
    foundingDate: '2017',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50'
    }
  }
};

// ============================================================================
// SOCIAL MEDIA COLLECTION SCHEMA
// ============================================================================

export const socialMediaCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SmarterPayouts Social Media',
  description: 'Connect with SmarterPayouts across all social media platforms for updates, tips, and community engagement.',
  url: `${BASE_URL}/social-media`,
  mainEntity: {
    '@type': 'ItemList',
    name: 'Social Media Platforms',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'SocialMediaPosting',
        '@id': 'https://youtube.com/@smarterpayouts',
        name: 'YouTube Channel',
        description: 'Educational videos about structured settlements and financial planning',
        url: 'https://youtube.com/@smarterpayouts',
        author: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: BASE_URL
        },
        sharedContent: {
          '@type': 'VideoObject',
          name: 'Structured Settlement Calculator Tutorial',
          description: 'Learn how to use our AI-powered structured settlement calculator'
        }
      },
      {
        '@type': 'SocialMediaPosting',
        '@id': 'https://facebook.com/smarterpayouts',
        name: 'Facebook Page',
        description: 'Community updates and company news',
        url: 'https://facebook.com/smarterpayouts',
        author: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: BASE_URL
        }
      },
      {
        '@type': 'SocialMediaPosting',
        '@id': 'https://x.com/smarterpayouts',
        name: 'X (Twitter) Profile',
        description: 'Real-time updates and industry insights',
        url: 'https://x.com/smarterpayouts',
        author: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: BASE_URL
        }
      },
      {
        '@type': 'SocialMediaPosting',
        '@id': 'https://instagram.com/smarterpayouts',
        name: 'Instagram Account',
        description: 'Behind-the-scenes content and company highlights',
        url: 'https://instagram.com/smarterpayouts',
        author: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: BASE_URL
        }
      },
      {
        '@type': 'SocialMediaPosting',
        '@id': 'https://linkedin.com/company/smarterpayouts',
        name: 'LinkedIn Company Page',
        description: 'Professional updates and business news',
        url: 'https://linkedin.com/company/smarterpayouts',
        author: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: BASE_URL
        }
      }
    ]
  },
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL
    }
  }
};

// ============================================================================
// FAQ SCHEMA
// ============================================================================

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Structured Settlement FAQ',
  description: 'Frequently asked questions about selling structured settlements, court approval process, timing, and SmarterPayouts services.',
  url: `${BASE_URL}/faqs`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it legal to sell my structured settlement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, selling your structured settlement is 100% legal. The process is court-approved to ensure it\'s in your best interest, with all transactions reviewed by a judge.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I get a quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our structured settlement calculator to get an instant, secure quote — no personal data, no phone calls. Just your payment details and timing.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does court approval work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once you accept your quote, we handle the court paperwork. The judge will review your case in a short hearing — typically within 30 days — to ensure everything is fair and legal.'
      }
    },
    {
      '@type': 'Question',
      name: 'How fast can I get paid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many of our clients receive funds in as little as 24–72 hours after court approval. We offer direct deposit, paper check, or secure digital transfer.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of selling my structured settlement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Selling allows you to access your future funds now — to eliminate debt, pay medical bills, invest, or improve your quality of life. Our process is transparent, fast, and court-approved.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need a lawyer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You don\'t need a lawyer to start, but you are always encouraged to seek independent legal or financial advice. We make sure everything is done clearly and transparently.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes SmarterPayouts different?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We\'re the first company to offer 100% digital quoting — no cold calls, no pressure. Built by legal and tech experts, our platform is built for you: fast, safe, and human-first.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between a structured settlement and an annuity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A structured settlement is tax-free and comes from a legal settlement, while annuities are typically taxable investments. Structured settlements offer unique legal protections and are designed for injury compensation.'
      }
    }
  ],
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL
    }
  }
};

// ============================================================================
// HELPER FUNCTION TO INJECT SCHEMA
// ============================================================================

/**
 * Helper to convert schema object to JSON string for injection
 * Use with the StructuredData component from @/src/components/SEO/StructuredData
 * 
 * @example
 * ```tsx
 * import { StructuredData } from '@/src/components/SEO/StructuredData';
 * import { pricingCalculatorSchema } from '@/src/lib/structured-data/schemas';
 * 
 * <StructuredData schema={pricingCalculatorSchema} />
 * ```
 */
export function stringifySchema(schema: object): string {
  return JSON.stringify(schema);
}

