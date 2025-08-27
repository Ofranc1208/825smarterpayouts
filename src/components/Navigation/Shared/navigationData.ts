/**
 * Shared Navigation Data
 * 
 * Common navigation structure used by both Desktop and Mobile components
 */

export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
}

export interface DropdownSection {
  [key: string]: NavigationItem[];
}

// Main navigation links (always visible)
export const mainNavLinks: NavigationItem[] = [
  { href: '/main', label: 'Home', icon: '🏠' },
  { href: '/mint-intelligent-chat', label: 'Mint AI Chat', icon: '🤖' },
  { href: '/pricing-calculator', label: 'Early Payout Calculator', icon: '🧮' }
];

// Dropdown sections (shared between desktop and mobile)
export const dropdownSections: DropdownSection = {
  'Company Info': [
    { href: '/about', label: 'About Us', icon: '🏢' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/youtube-channel', label: 'YouTube', icon: '📺' },
    { href: '/faqs', label: 'FAQs', icon: '❓' },
    { href: '/contact', label: 'Contact Us', icon: '✉️' },
    { href: '/social-media', label: 'Social Media', icon: '🌐' },
  ],
  'Resources': [
    { href: '/structured-settlement-info-hub', label: 'Knowledge Hub', icon: '📚' },
    { href: '/articles', label: 'Articles', icon: '📖' },
    { href: '/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/credentials', label: 'Credentials', icon: '🛡️' },
    { href: '/resources', label: 'Insurance Companies', icon: '🏢' },
    { href: '/structured-settlement-laws', label: 'Federal Law', icon: '🏛️' },
    { href: '/structured-settlement-laws-by-state', label: 'Laws by State', icon: '🏛️' },
  ],
  'Process': [
    { href: '/get-a-quote', label: 'Get a Quote', icon: '📝' },
    { href: '/review-offer', label: 'Review Offer', icon: '🔍' },
    { href: '/court-approval', label: 'Court Approval', icon: '⚖️' },
    { href: '/get-your-cash', label: 'Get Your Cash', icon: '💰' },
  ],
  'Legal': [
    { href: '/blog/how-fast-payout', label: 'How Fast?', icon: '⚡' },
    { href: '/state-laws-overview', label: 'State Laws Overview', icon: '📜' },
    { href: '/terms', label: 'Terms', icon: '📋' },
    { href: '/privacy', label: 'Privacy', icon: '🔒' },
  ],
};
