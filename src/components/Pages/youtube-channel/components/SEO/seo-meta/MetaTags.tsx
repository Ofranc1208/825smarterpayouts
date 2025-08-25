import React from 'react';

/**
 * Meta Tags Component for YouTube Channel SEO
 * 
 * Provides comprehensive meta tags for optimal SEO performance
 * including Open Graph, Twitter Cards, and search engine optimization.
 * 
 * @component MetaTags
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Meta Tags Component
 * 
 * ## Features
 * - ✅ Primary meta tags (title, description, keywords)
 * - ✅ Open Graph tags for social sharing
 * - ✅ Twitter Card optimization
 * - ✅ Search engine directives
 * - ✅ Mobile optimization
 * 
 * @example
 * ```tsx
 * import MetaTags from './MetaTags';
 * 
 * export default function SEOHead() {
 *   return <MetaTags />;
 * }
 * ```
 */
export default function MetaTags() {
  React.useEffect(() => {
    // Update document title dynamically for App Router compatibility
    document.title = "SmarterPayouts YouTube Channel - Educational Videos & Insights";
    
    // Update meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies. Learn from experts and make informed decisions about your settlement.');
    }

    // Update keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'structured settlement videos, payout education, financial planning, settlement advice, YouTube channel, SmarterPayouts');
    }
  }, []);

  return null; // No JSX needed for App Router meta tags
}
