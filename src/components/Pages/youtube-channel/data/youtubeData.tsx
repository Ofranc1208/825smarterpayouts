import { VideoData, CTAButtonConfig, TrustIndicator } from '../types';

// Mock YouTube Videos Data
export const YOUTUBE_VIDEOS: VideoData[] = [
  {
    id: 'structured-settlements-101',
    title: 'Structured Settlements 101: Everything You Need to Know',
    description: 'Learn the basics of structured settlements, how they work, and when you might need to sell yours for cash.',
    thumbnail: '/images/youtube/structured-settlements-101.jpg',
    duration: '8:45',
    publishedAt: '2024-01-15',
    viewCount: 15420,
    likeCount: 892,
    url: 'https://youtube.com/watch?v=structured-settlements-101',
    embedUrl: 'https://youtube.com/embed/structured-settlements-101',
    category: 'education',
    tags: ['structured settlements', 'education', 'basics', 'cash advance']
  },
  {
    id: 'customer-testimonial-sarah',
    title: 'Sarah\'s Story: How SmarterPayouts Helped in Her Time of Need',
    description: 'Real customer Sarah shares how SmarterPayouts helped her access her settlement money when she needed it most.',
    thumbnail: '/images/youtube/testimonial-sarah.jpg',
    duration: '4:32',
    publishedAt: '2024-01-20',
    viewCount: 8750,
    likeCount: 654,
    url: 'https://youtube.com/watch?v=customer-testimonial-sarah',
    embedUrl: 'https://youtube.com/embed/customer-testimonial-sarah',
    category: 'testimonial',
    tags: ['testimonial', 'customer story', 'success story', 'real experience']
  },
  {
    id: 'how-to-get-quote',
    title: 'How to Get Your Free Quote in Under 5 Minutes',
    description: 'Step-by-step walkthrough of our simple quote process. Get your personalized offer quickly and easily.',
    thumbnail: '/images/youtube/how-to-get-quote.jpg',
    duration: '6:18',
    publishedAt: '2024-01-25',
    viewCount: 12300,
    likeCount: 743,
    url: 'https://youtube.com/watch?v=how-to-get-quote',
    embedUrl: 'https://youtube.com/embed/how-to-get-quote',
    category: 'process',
    tags: ['quote process', 'how to', 'tutorial', 'free quote']
  },
  {
    id: 'mint-ai-demo',
    title: 'Meet Mint AI: Your 24/7 Settlement Assistant',
    description: 'Discover how Mint AI can answer your questions about structured settlements anytime, day or night.',
    thumbnail: '/images/youtube/mint-ai-demo.jpg',
    duration: '5:55',
    publishedAt: '2024-02-01',
    viewCount: 9870,
    likeCount: 567,
    url: 'https://youtube.com/watch?v=mint-ai-demo',
    embedUrl: 'https://youtube.com/embed/mint-ai-demo',
    category: 'education',
    tags: ['mint ai', 'ai assistant', 'technology', 'support']
  },
  {
    id: 'common-questions-answered',
    title: 'Top 10 Questions About Selling Structured Settlements',
    description: 'We answer the most frequently asked questions about selling your structured settlement payments.',
    thumbnail: '/images/youtube/common-questions.jpg',
    duration: '12:20',
    publishedAt: '2024-02-05',
    viewCount: 18650,
    likeCount: 1205,
    url: 'https://youtube.com/watch?v=common-questions-answered',
    embedUrl: 'https://youtube.com/embed/common-questions-answered',
    category: 'faq',
    tags: ['faq', 'questions', 'answers', 'common concerns']
  },
  {
    id: 'market-update-2024',
    title: '2024 Structured Settlement Market Update',
    description: 'Latest trends and insights in the structured settlement industry for 2024.',
    thumbnail: '/images/youtube/market-update-2024.jpg',
    duration: '9:15',
    publishedAt: '2024-02-10',
    viewCount: 6420,
    likeCount: 398,
    url: 'https://youtube.com/watch?v=market-update-2024',
    embedUrl: 'https://youtube.com/embed/market-update-2024',
    category: 'general',
    tags: ['market update', '2024', 'industry trends', 'insights']
  }
];

// Hero Section Configuration
export const HERO_CONFIG = {
  title: 'Educational Videos & Customer Stories',
  description: 'Watch real customer testimonials, learn about structured settlements, and see how our process works.',
  backgroundVideo: '/videos/youtube-hero-bg.mp4',
  ctaButtons: [
    {
      id: 'subscribe-youtube',
      label: 'Subscribe to Channel',
      href: 'https://youtube.com/@smarterpayouts',
      variant: 'primary' as const,
      icon: '📺'
    },
    {
      id: 'chat-with-mint',
      label: 'Chat with Mint AI',
      href: '/mint-intelligent-chat',
      variant: 'secondary' as const,
      icon: '🤖'
    }
  ]
};

// CTA Section Configuration
export const CTA_CONFIG = {
  title: 'Ready to Get Your Quote?',
  description: 'After watching our videos, take the next step and get your personalized settlement quote.',
  buttons: [
    {
      id: 'get-quote-cta',
      label: 'Get Free Quote',
      href: '/pricing-calculator',
      variant: 'primary' as const,
      icon: '💰'
    },
    {
      id: 'mint-chat-cta',
      label: 'Ask Mint AI',
      href: '/mint-intelligent-chat',
      variant: 'outline' as const,
      icon: '🤖'
    }
  ],
  trustIndicators: [
    {
      id: 'customers-served',
      text: '10,000+ Customers Served',
      icon: '👥',
      value: '10,000+'
    },
    {
      id: 'average-rating',
      text: 'Average Customer Rating',
      icon: '⭐',
      value: '4.9/5'
    },
    {
      id: 'response-time',
      text: 'Average Response Time',
      icon: '⚡',
      value: '< 24 hrs'
    }
  ]
};

// Video Categories
export const VIDEO_CATEGORIES = [
  { id: 'all', label: 'All Videos', count: YOUTUBE_VIDEOS.length },
  { id: 'education', label: 'Educational', count: YOUTUBE_VIDEOS.filter(v => v.category === 'education').length },
  { id: 'testimonial', label: 'Testimonials', count: YOUTUBE_VIDEOS.filter(v => v.category === 'testimonial').length },
  { id: 'process', label: 'How It Works', count: YOUTUBE_VIDEOS.filter(v => v.category === 'process').length },
  { id: 'faq', label: 'FAQ', count: YOUTUBE_VIDEOS.filter(v => v.category === 'faq').length }
];

// YouTube Channel Constants
export const YOUTUBE_CONSTANTS = {
  CHANNEL_NAME: 'SmarterPayouts',
  CHANNEL_URL: 'https://youtube.com/@smarterpayouts',
  CHANNEL_ID: 'UC_smarterpayouts_channel',
  VIDEOS_PER_PAGE: 6,
  LOAD_MORE_INCREMENT: 6,
  DEFAULT_THUMBNAIL: '/images/youtube/default-thumbnail.jpg',
  PLACEHOLDER_DURATION: '0:00'
} as const;
