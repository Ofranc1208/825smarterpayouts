/**
 * Desktop Navigation Data
 * 
 * Centralized navigation structure and menu items for desktop navigation
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
  { href: '/mint-intelligent-chat', label: 'Get Instant Offer', icon: '💰' },
  { href: '/mint-chat-active?type=calculate&source=nav-chat', label: 'Chat with Mint AI', icon: '💬' }
];

// Dropdown sections
export const dropdownSections: DropdownSection = {
  'Why Us': [
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/youtube-channel', label: 'YouTube', icon: '📺' },
  ],
  'Company Info': [
    { href: '/about', label: 'About Us', icon: '🏢' },
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
