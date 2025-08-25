import React from 'react';
import { MetaTags, PreloadLinks } from '../seo-meta';
import { OrganizationSchema, ChatBotSchema } from '../seo-structured';

/**
 * MintChat SEO Section Component
 * 
 * Main orchestrator component for the MintChat SEO optimization.
 * Combines meta tags, preload links, and structured data with
 * enterprise-grade SEO implementation.
 * 
 * @component MintChatSEOSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * MintChat SEO Section Component
 * 
 * ## Architecture
 * - **MetaTags**: Primary meta tags, Open Graph, Twitter Cards
 * - **PreloadLinks**: Resource preloading and performance hints
 * - **OrganizationSchema**: Organization structured data
 * - **ChatBotSchema**: AI assistant structured data
 * 
 * ## Features
 * - ✅ Complete meta tag optimization
 * - ✅ Social media sharing optimization
 * - ✅ Structured data for rich snippets
 * - ✅ Performance optimization hints
 * - ✅ Mobile and accessibility optimization
 * - ✅ Search engine compliance
 * 
 * ## SEO Benefits
 * - **Rich Snippets**: Enhanced search results with structured data
 * - **Social Sharing**: Optimized previews on social platforms
 * - **Performance**: Faster loading with resource preloading
 * - **Mobile**: Optimized for mobile search results
 * - **Local SEO**: Geographic and business information
 * 
 * @example
 * ```tsx
 * import MintChatSEOSection from './MintChatSEOSection';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <>
 *       <MintChatSEOSection />
 *       <HeroSection />
 *       // Other sections
 *     </>
 *   );
 * }
 * ```
 */
export default function MintChatSEOSection() {
  return (
    <>
      <MetaTags />
      <PreloadLinks />
      <OrganizationSchema />
      <ChatBotSchema />
    </>
  );
}
