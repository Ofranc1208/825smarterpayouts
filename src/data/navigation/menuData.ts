import { DropdownMenus } from './types';

/**
 * Navigation Menu Data
 * 
 * Central configuration for all navigation menus, routes, and search mappings.
 * This data drives the entire navigation system across desktop and mobile.
 * 
 * @module NavigationMenuData
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Process routes that should be highlighted as a group
 * These represent the main customer journey steps in "How It Works"
 */
export const processRoutes = [
  '/get-a-quote',
  '/review-offer',
  '/how-fast-can-i-get-my-money',
  '/court-approval',
  '/get-your-cash',
];

/**
 * Dropdown menu configuration - Updated to match new navigation structure
 * Each key represents a dropdown section with its associated menu items
 * Updated section names and content organization for better UX
 */
export const dropdownMenus: DropdownMenus = {
  howItWorks: [
    { href: '/get-a-quote', label: 'Get a Quote', icon: '📝' },
    { href: '/review-offer', label: 'Review Your Offer', icon: '🔍' },
    { href: '/how-fast-can-i-get-my-money', label: 'How Fast Can I Get Paid?', icon: '⚡' },
    { href: '/court-approval', label: 'Court Approval', icon: '⚖️' },
    { href: '/get-your-cash', label: 'Get Your Cash', icon: '💰' },
  ],
  whyChooseUs: [
    { href: '/about', label: 'About Us', icon: '🏢' },
    { href: '/platform-rating', label: 'Platform Rating', icon: '⭐' },
    { href: '/contact', label: 'Contact Us', icon: '✉️' },
    { href: '/faqs', label: 'FAQs', icon: '❓' },
    { href: '/social-media', label: 'Social Media', icon: '🌐' },
    { href: '/credentials', label: 'Our Credentials', icon: '🛡️' },
    { href: '/resources', label: 'Insurance Companies', icon: '🏢' },
  ],
  resources: [
    { href: '/structured-settlement-info-hub', label: 'Knowledge Hub', icon: '📚' },
    { href: '/articles', label: 'Articles', icon: '📖' },
    { href: '/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/youtube-channel', label: 'YouTube Channel', icon: '📺' },
  ],
  legal: [
    { href: '/structured-settlement-laws', label: 'Federal Laws', icon: '🏛️' },
    { href: '/state-laws-overview', label: 'State Laws Overview', icon: '📜' },
    { href: '/structured-settlement-laws-by-state', label: 'Laws by State', icon: '🗺️' },
    { href: '/terms', label: 'Terms of Service', icon: '📋' },
    { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
  ],
};

/**
 * Search keyword mapping
 * Maps search terms to their corresponding routes for intelligent search
 */
export const searchMap: { [key: string]: string } = {
  'faq': '/faqs',
  'faqs': '/faqs',
  'testimonials': '/testimonials',
  'contact': '/contact',
  'contact us': '/contact',
  'quote': '/get-a-quote',
  'resources': '/resources',
  'about': '/about',
  'about us': '/about',
  'privacy': '/privacy',
  'terms': '/terms',
  'calculator': '/mint-chat-active?type=calculate&source=search-calc',
  'early payout calculator': '/mint-chat-active?type=calculate&source=search-early',
  'payout calculator': '/mint-chat-active?type=calculate&source=search-payout',
  'pricing calculator': '/mint-chat-active?type=calculate&source=search-pricing',
  'structured settlement': '/main',
  'main': '/main',
  'home': '/main',
  'offer': '/review-offer',
  'court': '/court-approval',
  'cash': '/get-your-cash',
  'how fast': '/how-fast-can-i-get-my-money',
  'how fast can i get paid': '/how-fast-can-i-get-my-money',
  'fast payout': '/how-fast-can-i-get-my-money',
  'payout timeline': '/how-fast-can-i-get-my-money',
  'articles': '/articles',
  'youtube': '/youtube-channel',
  'state laws': '/state-laws-overview',
  'laws': '/state-laws-overview',
  'knowledge hub': '/structured-settlement-info-hub',
  'hub': '/structured-settlement-info-hub',
  'info hub': '/structured-settlement-info-hub',
  'federal law': '/structured-settlement-laws',
  'federal laws': '/structured-settlement-laws',
  'laws by state': '/structured-settlement-laws-by-state',
  'state specific laws': '/structured-settlement-laws-by-state',
  'insurance companies': '/resources',
  'companies': '/resources',
  'insurers': '/resources',
  'credentials': '/credentials',
  'social media': '/social-media',
  'platform rating': '/platform-rating',
  'rating': '/platform-rating',
  'user rating': '/platform-rating',
  '4.9 rating': '/platform-rating',
  'free finance': '/platform-rating',
  '4.9': '/platform-rating',
  'rating on google': '/platform-rating',
  'mint': '/mint-chat-active?type=calculate&source=search-mint',
  'mint ai': '/mint-chat-active?type=calculate&source=search-mint-ai',
  'ai chat': '/mint-chat-active?type=calculate&source=search-ai-chat',
  'chat': '/mint-chat-active?type=calculate&source=search-chat',
  'intelligent chat': '/mint-chat-active?type=calculate&source=search-intelligent',
  'ai assistant': '/mint-chat-active?type=calculate&source=search-assistant',
  'assistant': '/mint-chat-active?type=calculate&source=search-assistant-alt',
};
