import { YouTubeSEOConfig } from '../types';

export const YOUTUBE_SEO_CONFIG: YouTubeSEOConfig = {
  title: 'SmarterPayouts YouTube Channel - Educational Videos & Customer Stories',
  description: 'Watch educational videos about structured settlements, real customer testimonials, and learn how SmarterPayouts can help you access your money when you need it most.',
  keywords: [
    'structured settlement videos',
    'customer testimonials',
    'settlement education',
    'smarterpayouts youtube',
    'cash for settlement',
    'settlement process',
    'mint ai videos',
    'financial education'
  ],
  canonicalUrl: 'https://smarterpayouts.com/youtube-channel',
  ogImage: 'https://smarterpayouts.com/images/youtube/youtube-og-image.jpg',
  twitterImage: 'https://smarterpayouts.com/images/youtube/youtube-twitter-image.jpg',
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com',
      logo: 'https://smarterpayouts.com/images/logo.png',
      sameAs: [
        'https://youtube.com/@smarterpayouts',
        'https://facebook.com/smarterpayouts',
        'https://twitter.com/smarterpayouts',
        'https://linkedin.com/company/smarterpayouts'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-800-555-0123',
        contactType: 'Customer Service'
      }
    },
    videoGallery: {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'SmarterPayouts Educational Video Gallery',
      description: 'Educational videos and customer testimonials about structured settlements',
      url: 'https://smarterpayouts.com/youtube-channel',
      thumbnailUrl: 'https://smarterpayouts.com/images/youtube/gallery-thumbnail.jpg',
      uploadDate: '2024-01-15',
      duration: 'PT8M45S',
      contentUrl: 'https://youtube.com/watch?v=structured-settlements-101',
      embedUrl: 'https://youtube.com/embed/structured-settlements-101',
      publisher: {
        '@type': 'Organization',
        name: 'SmarterPayouts',
        logo: {
          '@type': 'ImageObject',
          url: 'https://smarterpayouts.com/images/logo.png'
        }
      }
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
            name: 'YouTube Channel',
            item: 'https://smarterpayouts.com/youtube-channel'
          }
        ]
      }
    ]
  }
};

export const META_TAGS_CONFIG = {
  title: 'SmarterPayouts YouTube Channel - Educational Videos & Customer Stories',
  description: 'Watch educational videos about structured settlements, real customer testimonials, and learn how SmarterPayouts can help you access your money when you need it most.',
  keywords: 'structured settlement videos, customer testimonials, settlement education, smarterpayouts youtube, cash for settlement, settlement process, mint ai videos, financial education',
  robots: 'index, follow',
  canonical: 'https://smarterpayouts.com/youtube-channel',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8'
};

export const OPEN_GRAPH_CONFIG = {
  title: 'SmarterPayouts YouTube Channel - Educational Videos & Customer Stories',
  description: 'Watch educational videos about structured settlements, real customer testimonials, and learn how our process works.',
  url: 'https://smarterpayouts.com/youtube-channel',
  type: 'website',
  image: 'https://smarterpayouts.com/images/youtube/youtube-og-image.jpg',
  imageAlt: 'SmarterPayouts YouTube Channel featuring educational videos and customer testimonials',
  siteName: 'SmarterPayouts',
  locale: 'en_US'
};

export const TWITTER_CARD_CONFIG = {
  card: 'summary_large_image',
  title: 'SmarterPayouts YouTube Channel - Educational Videos & Customer Stories',
  description: 'Watch educational videos about structured settlements and real customer testimonials.',
  image: 'https://smarterpayouts.com/images/youtube/youtube-twitter-image.jpg',
  imageAlt: 'SmarterPayouts YouTube Channel featuring educational videos and customer testimonials',
  site: '@smarterpayouts',
  creator: '@smarterpayouts'
};

export const PRELOAD_LINKS = [
  {
    rel: 'preload',
    href: '/images/youtube/youtube-hero-bg.jpg',
    as: 'image',
    type: 'image/jpeg'
  },
  {
    rel: 'preload',
    href: '/images/youtube/structured-settlements-101.jpg',
    as: 'image',
    type: 'image/jpeg'
  },
  {
    rel: 'preconnect',
    href: 'https://youtube.com'
  },
  {
    rel: 'preconnect',
    href: 'https://img.youtube.com'
  }
];
