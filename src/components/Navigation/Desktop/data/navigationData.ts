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

// Dropdown sections - Updated structure following 2025 best practices
export const dropdownSections: DropdownSection = {
  'How It Works': [
    { href: '/get-a-quote', label: 'Get a Quote', icon: '📝' },
    { href: '/review-offer', label: 'Review Your Offer', icon: '🔍' },
    { href: '/how-fast-can-i-get-my-money', label: 'How Fast Can I Get Paid?', icon: '⚡' },
    { href: '/court-approval', label: 'Court Approval', icon: '⚖️' },
    { href: '/get-your-cash', label: 'Get Your Cash', icon: '💰' },
  ],
  'Why Choose Us?': [
    { href: '/about', label: 'About Us', icon: '🏢' },
    { href: '/google-rating', label: 'Google Rating', icon: '⭐' },
    { href: '/contact', label: 'Contact Us', icon: '✉️' },
    { href: '/faqs', label: 'FAQs', icon: '❓' },
    { href: '/social-media', label: 'Social Media', icon: '🌐' },
    { href: '/credentials', label: 'Our Credentials', icon: '🛡️' },
    { href: '/resources', label: 'Insurance Companies', icon: '🏢' },
  ],
  'Resources & Stories': [
    { href: '/structured-settlement-info-hub', label: 'Knowledge Hub', icon: '📚' },
    { href: '/articles', label: 'Articles', icon: '📖' },
    { href: '/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/youtube-channel', label: 'YouTube Channel', icon: '📺' },
  ],
  'Legal & Compliance': [
    { href: '/structured-settlement-laws', label: 'Federal Laws', icon: '🏛️' },
    { href: '/state-laws-overview', label: 'State Laws Overview', icon: '📜' },
    { href: '/structured-settlement-laws-by-state', label: 'Laws by State', icon: '🗺️' },
    { href: '/terms', label: 'Terms of Service', icon: '📋' },
    { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
  ],
};
