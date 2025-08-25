import { NavigationItem, DropdownMenu } from '../types';

export const MAIN_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: '🏠'
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
    icon: '👥'
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    icon: '⚙️',
    children: [
      {
        id: 'pricing-calculator',
        label: 'Pricing Calculator',
        href: '/pricing-calculator',
        icon: '💰'
      },
      {
        id: 'mint-chat',
        label: 'Mint AI Chat',
        href: '/mint-intelligent-chat',
        icon: '🤖'
      },
      {
        id: 'youtube-channel',
        label: 'YouTube Channel',
        href: '/youtube-channel',
        icon: '📺'
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: '📚',
    children: [
      {
        id: 'blog',
        label: 'Blog',
        href: '/blog',
        icon: '📝'
      },
      {
        id: 'faq',
        label: 'FAQ',
        href: '/faq',
        icon: '❓'
      },
      {
        id: 'guides',
        label: 'Guides',
        href: '/guides',
        icon: '📖'
      }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: '📞'
  }
];

export const DROPDOWN_MENUS: DropdownMenu[] = [
  {
    id: 'services',
    trigger: 'Services',
    items: [
      {
        id: 'pricing-calculator',
        label: 'Get Your Quote',
        href: '/pricing-calculator',
        icon: '💰'
      },
      {
        id: 'mint-chat',
        label: 'Chat with Mint AI',
        href: '/mint-intelligent-chat',
        icon: '🤖'
      },
      {
        id: 'youtube-channel',
        label: 'Watch Videos',
        href: '/youtube-channel',
        icon: '📺'
      },
      {
        id: 'process',
        label: 'How It Works',
        href: '/how-it-works',
        icon: '🔄'
      }
    ]
  },
  {
    id: 'resources',
    trigger: 'Resources',
    items: [
      {
        id: 'blog',
        label: 'Latest Articles',
        href: '/blog',
        icon: '📝'
      },
      {
        id: 'faq',
        label: 'Frequently Asked Questions',
        href: '/faq',
        icon: '❓'
      },
      {
        id: 'guides',
        label: 'Settlement Guides',
        href: '/guides',
        icon: '📖'
      },
      {
        id: 'calculator',
        label: 'Settlement Calculator',
        href: '/calculator',
        icon: '🧮'
      }
    ]
  }
];

export const MOBILE_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home-mobile',
    label: 'Home',
    href: '/',
    icon: '🏠'
  },
  {
    id: 'get-quote-mobile',
    label: 'Get Your Quote',
    href: '/pricing-calculator',
    icon: '💰'
  },
  {
    id: 'mint-chat-mobile',
    label: 'Chat with Mint AI',
    href: '/mint-intelligent-chat',
    icon: '🤖'
  },
  {
    id: 'about-mobile',
    label: 'About Us',
    href: '/about',
    icon: '👥'
  },
  {
    id: 'youtube-mobile',
    label: 'YouTube Channel',
    href: '/youtube-channel',
    icon: '📺'
  },
  {
    id: 'blog-mobile',
    label: 'Blog',
    href: '/blog',
    icon: '📝'
  },
  {
    id: 'contact-mobile',
    label: 'Contact Us',
    href: '/contact',
    icon: '📞'
  }
];

export const SEARCH_SUGGESTIONS: string[] = [
  'structured settlement',
  'cash for settlement',
  'settlement calculator',
  'how it works',
  'get quote',
  'mint ai chat',
  'contact us',
  'about us',
  'blog articles',
  'settlement guides'
];

export const NAVIGATION_CONSTANTS = {
  COMPANY_NAME: 'SmarterPayouts',
  PHONE: '+1-800-555-0123',
  EMAIL: 'info@smarterpayouts.com',
  LOGO_ALT: 'SmarterPayouts Logo',
  SEARCH_PLACEHOLDER: 'Search...',
  MOBILE_MENU_LABEL: 'Main Menu',
  DROPDOWN_DELAY: 200,
  SEARCH_DEBOUNCE: 300
} as const;
