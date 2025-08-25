import React from 'react';
import { MetaTags, PreloadLinks } from '../seo-meta';
import { VideoGallerySchema, OrganizationSchema } from '../seo-structured';

/**
 * YouTube SEO Section Component
 * 
 * Main orchestrator component for the YouTube Channel SEO optimization.
 * Combines meta tags, preload links, and structured data with
 * enterprise-grade SEO implementation.
 * 
 * @component YouTubeSEOSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * YouTube SEO Section Component
 * 
 * ## Architecture
 * - **MetaTags**: Primary meta tags, Open Graph, Twitter Cards
 * - **PreloadLinks**: YouTube-specific resource preloading and performance hints
 * - **VideoGallerySchema**: Video gallery structured data
 * - **OrganizationSchema**: Organization structured data with YouTube integration
 * 
 * ## Features
 * - ✅ Complete meta tag optimization
 * - ✅ YouTube-specific social media sharing optimization
 * - ✅ Video gallery structured data for rich snippets
 * - ✅ Organization structured data with YouTube channel integration
 * - ✅ Performance optimization hints
 * - ✅ Mobile and accessibility optimization
 * - ✅ Search engine compliance
 * 
 * ## SEO Benefits
 * - **Rich Snippets**: Enhanced search results with video thumbnails and metadata
 * - **Social Sharing**: Optimized previews on social platforms
 * - **Performance**: Faster loading with YouTube resource preloading
 * - **Mobile**: Optimized for mobile search results
 * - **Video SEO**: Specialized optimization for video content discovery
 * 
 * @example
 * ```tsx
 * import YouTubeSEOSection from './YouTubeSEOSection';
 * 
 * export default function YouTubeChannelPage() {
 *   return (
 *     <>
 *       <YouTubeSEOSection />
 *       <HeroSection />
 *       // Other sections
 *     </>
 *   );
 * }
 * ```
 */
export default function YouTubeSEOSection() {
  return (
    <>
      <MetaTags />
      <PreloadLinks />
      <VideoGallerySchema />
      <OrganizationSchema />
    </>
  );
}
