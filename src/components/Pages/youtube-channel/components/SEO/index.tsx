/**
 * SEO Module - YouTube Channel Enterprise Edition
 * 
 * Complete ultra-modular SEO implementation for YouTube Channel.
 * Provides enterprise-grade SEO optimization with clean separation
 * of concerns and optimal search engine performance.
 * 
 * ## Module Structure
 * ```
 * SEO/
 * ├── seo-meta/             ← Meta tags and preload links
 * │   ├── MetaTags.tsx
 * │   ├── PreloadLinks.tsx
 * │   └── index.tsx
 * ├── seo-structured/       ← Structured data (Schema.org)
 * │   ├── VideoGallerySchema.tsx
 * │   ├── OrganizationSchema.tsx
 * │   └── index.tsx
 * ├── seo-section/          ← Main SEO orchestrator
 * │   ├── YouTubeSEOSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import YouTubeSEOSection from '@/components/Pages/youtube-channel/components/SEO';
 * 
 * // Named import (alternative)
 * import { YouTubeSEOSection } from '@/components/Pages/youtube-channel/components/SEO';
 * 
 * // Granular imports for customization
 * import { MetaTags, VideoGallerySchema } from '@/components/Pages/youtube-channel/components/SEO';
 * ```
 * 
 * @module SEO
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main SEO section component export
export { default } from './seo-section';
export { default as YouTubeSEOSection } from './seo-section';

// Sub-module exports for granular access
export { MetaTags, PreloadLinks } from './seo-meta';
export { VideoGallerySchema, OrganizationSchema } from './seo-structured';
