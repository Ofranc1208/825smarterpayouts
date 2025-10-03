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
 * These represent the main customer journey steps
 */
export const processRoutes = [
  '/get-a-quote',
  '/review-offer',
  '/court-approval',
  '/get-your-cash',
];

/**
 * Dropdown menu configuration
 * Each key represents a dropdown section with its associated menu items
 */
export const dropdownMenus: DropdownMenus = {
  whyUs: [
    { href: '/youtube-channel', label: 'YouTube', icon: '📺' },
  ],
  company: [
    { href: '/about', label: 'About Us', icon: '🏢' },
    { href: '/faqs', label: 'FAQs', icon: '❓' },
    { href: '/contact', label: 'Contact Us', icon: '✉️' },
    { href: '/social-media', label: 'Social Media', icon: '🌐' },
  ],
  resources: [
    { href: '/structured-settlement-info-hub', label: 'Knowledge Hub', icon: '📚' },
    { href: '/articles', label: 'Articles', icon: '📖' },
    { href: '/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/credentials', label: 'Credentials', icon: '🛡️' },
    { href: '/resources', label: 'Insurance Companies', icon: '🏢' },
    { href: '/structured-settlement-laws', label: 'Federal Law', icon: '🏛️' },
    { href: '/structured-settlement-laws-by-state', label: 'Laws by State', icon: '🏛️' },
  ],
  process: [
    { href: '/get-a-quote', label: 'Get a Quote', icon: '📝' },
    { href: '/review-offer', label: 'Review Offer', icon: '🔍' },
    { href: '/court-approval', label: 'Court Approval', icon: '⚖️' },
    { href: '/get-your-cash', label: 'Get Your Cash', icon: '💰' },
  ],
  legal: [
    { href: '/state-laws-overview', label: 'State Laws Overview', icon: '📜' },
    { href: '/terms', label: 'Terms', icon: '📋' },
    { href: '/privacy', label: 'Privacy', icon: '🔒' },
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
  'quote': '/get-a-quote',
  'resources': '/resources',
  'about': '/about',
  'privacy': '/privacy',
  'terms': '/terms',
  'calculator': '/pricing-calculator',
  'structured settlement': '/main',
  'main': '/main',
  'home': '/main',
  'offer': '/review-offer',
  'court': '/court-approval',
  'cash': '/get-your-cash',
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
  'mint': '/mint-intelligent-chat',
  'mint ai': '/mint-intelligent-chat',
  'ai chat': '/mint-intelligent-chat',
  'chat': '/mint-intelligent-chat',
  'intelligent chat': '/mint-intelligent-chat',
  'ai assistant': '/mint-intelligent-chat',
  'assistant': '/mint-intelligent-chat',
};
