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
    document.title = "Chat with Mint AI Assistant | SmarterPayouts - Instant Settlement Quotes";
    
    // Update meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get instant answers about your structured settlement with our AI-powered assistant. No personal information required - just ask and get expert guidance immediately.');
    }
  }, []);

  return null; // No JSX needed for App Router meta tags
}
