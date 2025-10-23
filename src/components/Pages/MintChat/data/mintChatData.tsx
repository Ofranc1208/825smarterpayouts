import { ProblemCard, SolutionFeature, BenefitCard, CTAButton, QuickReply } from '../types';

// Industry Problems Data
export const INDUSTRY_PROBLEMS: ProblemCard[] = [
  {
    id: 'complex-process',
    title: 'Complex Settlement Process',
    description: 'Traditional settlement processes are confusing, time-consuming, and filled with legal jargon that\'s hard to understand.',
    icon: '🔄',
    severity: 'high',
    category: 'process'
  },
  {
    id: 'long-wait-times',
    title: 'Long Wait Times',
    description: 'Getting quotes and approvals can take weeks or months, leaving you waiting when you need cash now.',
    icon: '⏰',
    severity: 'high',
    category: 'timing'
  },
  {
    id: 'lack-of-transparency',
    title: 'Lack of Transparency',
    description: 'Hidden fees, unclear terms, and no visibility into the process make it hard to make informed decisions.',
    icon: '🔍',
    severity: 'medium',
    category: 'communication'
  },
  {
    id: 'limited-support',
    title: 'Limited Customer Support',
    description: 'Most companies offer limited support hours, leaving you with questions and no one to help.',
    icon: '📞',
    severity: 'medium',
    category: 'communication'
  },
  {
    id: 'financial-stress',
    title: 'Financial Stress & Uncertainty',
    description: 'Not knowing your options or settlement value creates stress and prevents proper financial planning.',
    icon: '💸',
    severity: 'high',
    category: 'financial'
  },
  {
    id: 'outdated-technology',
    title: 'Outdated Technology',
    description: 'Paper forms, phone calls, and manual processes slow everything down in today\'s digital world.',
    icon: '📄',
    severity: 'medium',
    category: 'process'
  }
];

// Solution Features Data
export const SOLUTION_FEATURES: SolutionFeature[] = [
  {
    id: 'ai-powered-chat',
    title: '24/7 AI-Powered Chat Support',
    description: 'Get instant answers to your questions anytime with Mint AI, your intelligent settlement assistant.',
    icon: '/assets/images/mint-mascot.png',
    benefits: [
      'Available 24/7, never wait for business hours',
      'Instant responses to common questions',
      'Personalized guidance based on your situation',
      'Seamless handoff to human experts when needed'
    ],
    category: 'ai'
  },
  {
    id: 'instant-quotes',
    title: 'Instant Quote Generation',
    description: 'Get your personalized settlement quote in minutes, not weeks, with our advanced calculator.',
    icon: '⚡',
    benefits: [
      'Quote in under 5 minutes',
      'No waiting for callbacks',
      'Transparent pricing breakdown',
      'Multiple payout options'
    ],
    category: 'process'
  },
  {
    id: 'transparent-process',
    title: 'Complete Process Transparency',
    description: 'Track your application status in real-time and understand every step of the process.',
    icon: '📊',
    benefits: [
      'Real-time status updates',
      'Clear timeline expectations',
      'No hidden fees or surprises',
      'Educational resources at every step'
    ],
    category: 'process'
  },
  {
    id: 'expert-support',
    title: 'Expert Human Support',
    description: 'When you need human expertise, our settlement specialists are ready to help.',
    icon: '👥',
    benefits: [
      'Licensed settlement professionals',
      'Personalized consultation',
      'Complex situation handling',
      'Regulatory compliance expertise'
    ],
    category: 'support'
  }
];

// Benefits Data
export const MINT_BENEFITS: BenefitCard[] = [
  {
    id: 'instant-availability',
    title: 'Always Available',
    description: 'Get help 24/7, 365 days a year. Mint AI never sleeps, so you can get answers whenever you need them.',
    icon: '🌙',
    color: 'blue',
    metrics: {
      value: '24/7',
      label: 'Availability'
    }
  },
  {
    id: 'fast-responses',
    title: 'Lightning Fast',
    description: 'Get instant responses to your questions. No more waiting on hold or for email replies.',
    icon: '⚡',
    color: 'orange',
    metrics: {
      value: '< 1 sec',
      label: 'Response Time'
    }
  },
  {
    id: 'expert-knowledge',
    title: 'Expert Knowledge',
    description: 'Mint AI is trained on thousands of settlement cases and regulations to provide accurate guidance.',
    icon: '🧠',
    color: 'purple',
    metrics: {
      value: '99.5%',
      label: 'Accuracy Rate'
    }
  },
  {
    id: 'personalized-help',
    title: 'Personalized Assistance',
    description: 'Get tailored advice based on your specific situation and settlement details.',
    icon: '🎯',
    color: 'green',
    metrics: {
      value: '100%',
      label: 'Personalized'
    }
  },
  {
    id: 'secure-private',
    title: 'Secure & Private',
    description: 'Your information is encrypted and protected. We never share your personal data.',
    icon: '🔒',
    color: 'blue',
    metrics: {
      value: 'Bank-Level',
      label: 'Security'
    }
  },
  {
    id: 'seamless-handoff',
    title: 'Human Handoff',
    description: 'When you need human expertise, Mint AI seamlessly connects you with our specialists.',
    icon: '🤝',
    color: 'green',
    metrics: {
      value: '< 30 sec',
      label: 'Handoff Time'
    }
  }
];

// Hero Section Configuration
export const HERO_CONFIG = {
  title: 'Meet Mint AI',
  subtitle: 'Your 24/7 Settlement Assistant',
  description: 'Get instant answers about your structured settlement, personalized quotes, and expert guidance - all powered by advanced AI technology.',
  ctaButtons: [
    {
      id: 'start-chat',
      text: 'Start Chatting Now',
      variant: 'primary' as const,
      icon: '💬'
    },
    {
      id: 'get-quote',
      text: 'Get Free Quote',
      href: '/pricing-calculator',
      variant: 'secondary' as const,
      icon: '💰'
    }
  ],
  backgroundImage: '/images/mint-chat/hero-bg.jpg'
};

// Quick Reply Templates
export const QUICK_REPLIES: Record<string, QuickReply[]> = {
  greeting: [
    { id: 'get-quote', text: 'Get a Quote', payload: 'QUOTE_REQUEST', icon: '💰' },
    { id: 'how-it-works', text: 'How It Works', payload: 'HOW_IT_WORKS', icon: '❓' },
    { id: 'speak-human', text: 'Speak to Human', payload: 'HUMAN_HANDOFF', icon: '👤' },
    { id: 'learn-more', text: 'Learn More', payload: 'LEARN_MORE', icon: '📚' }
  ],
  quote_process: [
    { id: 'start-quote', text: 'Start My Quote', payload: 'START_QUOTE', icon: '🚀' },
    { id: 'required-docs', text: 'What Documents?', payload: 'REQUIRED_DOCS', icon: '📄' },
    { id: 'how-long', text: 'How Long?', payload: 'TIMELINE', icon: '⏰' },
    { id: 'is-free', text: 'Is It Free?', payload: 'COST_INFO', icon: '💸' }
  ],
  support: [
    { id: 'track-application', text: 'Track Application', payload: 'TRACK_APP', icon: '📊' },
    { id: 'update-info', text: 'Update Info', payload: 'UPDATE_INFO', icon: '✏️' },
    { id: 'contact-specialist', text: 'Contact Specialist', payload: 'SPECIALIST', icon: '👨‍💼' },
    { id: 'faq', text: 'View FAQ', payload: 'FAQ', icon: '❓' }
  ]
};

// Chat Constants
export const MINT_CHAT_CONSTANTS = {
  AI_NAME: 'Mint',
  COMPANY_NAME: 'SmarterPayouts',
  TYPING_DELAY: 1500,
  MESSAGE_DELAY: 500,
  MAX_MESSAGE_LENGTH: 1000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  RECONNECT_ATTEMPTS: 3,
  RECONNECT_DELAY: 2000,
  DEFAULT_AVATAR: '/images/mint-ai-avatar.png',
  USER_AVATAR: '/images/user-avatar.png'
} as const;
