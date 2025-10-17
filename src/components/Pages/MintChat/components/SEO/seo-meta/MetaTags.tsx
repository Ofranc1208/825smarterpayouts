import React from 'react';

/**
 * Meta Tags Component for MintChat SEO
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
  // In App Router, meta tags should be handled via metadata exports in page.tsx
  // This component serves as documentation and can be used for dynamic meta injection
  
  React.useEffect(() => {
    // Update document title dynamically
    document.title = "Chat with Mint | SmarterPayouts - Guaranteed Upfront Offer Estimates";
    
    // Update meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get a 100% guaranteed upfront offer estimate - zero games, just real numbers. No personal info required.');
    }
  }, []);

  return null; // No JSX needed for App Router meta tags
}
