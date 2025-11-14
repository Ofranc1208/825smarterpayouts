import { MintChatSEOConfig } from '../types';

export const MINT_CHAT_SEO_CONFIG: MintChatSEOConfig = {
  title: 'Mint AI Chat - 24/7 Structured Settlement Assistant | SmarterPayouts',
  description: 'Chat with Mint AI, your intelligent 24/7 structured settlement assistant. Get instant answers, personalized quotes, and expert guidance about your settlement options.',
  keywords: [
    'mint ai chat',
    'ai settlement assistant',
    '24/7 chat support',
    'structured settlement chat',
    'settlement questions',
    'ai customer service',
    'instant settlement help',
    'smarterpayouts chat'
  ],
  canonicalUrl: 'https://smarterpayouts.com/mint-intelligent-chat',
  ogImage: 'https://smarterpayouts.com/images/mint-chat/mint-ai-og-image.jpg',
  twitterImage: 'https://smarterpayouts.com/images/mint-chat/mint-ai-twitter-image.jpg',
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com',
      logo: 'https://smarterpayouts.com/images/logo.png',
      sameAs: [
        'https://facebook.com/smarterpayouts',
        'https://twitter.com/smarterpayouts',
        'https://linkedin.com/company/smarterpayouts',
        'https://youtube.com/@smarterpayouts'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-855-214-3510',
        contactType: 'Customer Service',
        availableLanguage: 'English',
        serviceArea: 'United States'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Structured Settlement Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Chat Support',
              description: '24/7 AI-powered chat assistance for structured settlement questions'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Settlement Quotes',
              description: 'Instant personalized quotes for structured settlement purchases'
            }
          }
        ]
      }
    },
    chatBot: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Mint AI',
      description: '24/7 AI-powered structured settlement assistant providing instant answers and personalized guidance',
      url: 'https://smarterpayouts.com/mint-intelligent-chat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      creator: {
        '@type': 'Organization',
        name: 'SmarterPayouts'
      },
      featureList: [
        '24/7 availability',
        'Instant responses',
        'Personalized guidance',
        'Settlement calculations',
        'Expert knowledge base',
        'Human handoff capability'
      ]
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Mint AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mint AI is your 24/7 structured settlement assistant powered by advanced artificial intelligence. It provides instant answers to your questions about structured settlements, helps you get personalized quotes, and guides you through the process.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Mint AI available 24/7?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Mint AI is available 24 hours a day, 7 days a week, 365 days a year. You can get help with your structured settlement questions anytime, even outside business hours.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Mint AI help me get a quote?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely! Mint AI can guide you through our quote process and help you get a personalized settlement quote in minutes. It can also answer questions about the quote process and required documentation.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is my information secure with Mint AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, your information is completely secure. All conversations with Mint AI are encrypted and protected with bank-level security. We never share your personal information with third parties.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I speak to a human if needed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Of course! While Mint AI can handle most questions, you can always request to speak with a human specialist. Mint AI will seamlessly connect you with one of our licensed settlement professionals.'
          }
        }
      ]
    },
    breadcrumbs: [
      {
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
            name: 'Mint AI Chat',
            item: 'https://smarterpayouts.com/mint-intelligent-chat'
          }
        ]
      }
    ]
  }
};

export const META_TAGS_CONFIG = {
  title: 'Mint AI Chat - 24/7 Structured Settlement Assistant | SmarterPayouts',
  description: 'Chat with Mint AI, your intelligent 24/7 structured settlement assistant. Get instant answers, personalized quotes, and expert guidance about your settlement options.',
  keywords: 'mint ai chat, ai settlement assistant, 24/7 chat support, structured settlement chat, settlement questions, ai customer service, instant settlement help, smarterpayouts chat',
  robots: 'index, follow',
  canonical: 'https://smarterpayouts.com/mint-intelligent-chat',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  author: 'SmarterPayouts'
};

export const OPEN_GRAPH_CONFIG = {
  title: 'Mint AI Chat - 24/7 Structured Settlement Assistant',
  description: 'Chat with Mint AI for instant answers about your structured settlement. Available 24/7 with personalized guidance and expert knowledge.',
  url: 'https://smarterpayouts.com/mint-intelligent-chat',
  type: 'website',
  image: 'https://smarterpayouts.com/images/mint-chat/mint-ai-og-image.jpg',
  imageAlt: 'Mint AI Chat interface showing 24/7 structured settlement assistance',
  siteName: 'SmarterPayouts',
  locale: 'en_US',
  article: {
    author: 'SmarterPayouts Team',
    publishedTime: '2024-01-15T00:00:00Z',
    modifiedTime: '2024-02-15T00:00:00Z',
    section: 'AI Chat Support',
    tag: ['AI', 'Chat Support', 'Structured Settlements', 'Customer Service']
  }
};

export const TWITTER_CARD_CONFIG = {
  card: 'summary_large_image',
  title: 'Mint AI Chat - 24/7 Structured Settlement Assistant',
  description: 'Get instant answers about your structured settlement with Mint AI. Available 24/7 with personalized guidance.',
  image: 'https://smarterpayouts.com/images/mint-chat/mint-ai-twitter-image.jpg',
  imageAlt: 'Mint AI Chat interface for structured settlement assistance',
  site: '@smarterpayouts',
  creator: '@smarterpayouts'
};

export const PRELOAD_LINKS = [
  {
    rel: 'preload',
    href: '/images/mint-chat/hero-bg.jpg',
    as: 'image',
    type: 'image/jpeg'
  },
  {
    rel: 'preload',
    href: '/assets/images/mint-mascot.png',
    as: 'image',
    type: 'image/png'
  },
  {
    rel: 'preconnect',
    href: 'https://api.smarterpayouts.com'
  },
  {
    rel: 'dns-prefetch',
    href: 'https://cdn.smarterpayouts.com'
  }
];
