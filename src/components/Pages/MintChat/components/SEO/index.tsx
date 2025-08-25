/**
 * SEO Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular SEO implementation for MintChat.
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
 * │   ├── OrganizationSchema.tsx
 * │   ├── ChatBotSchema.tsx
 * │   └── index.tsx
 * ├── seo-section/          ← Main SEO orchestrator
 * │   ├── MintChatSEOSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatSEOSection from '@/components/Pages/MintChat/components/SEO';
 * 
 * // Named import (alternative)
 * import { MintChatSEOSection } from '@/components/Pages/MintChat/components/SEO';
 * 
 * // Granular imports for customization
 * import { MetaTags, OrganizationSchema } from '@/components/Pages/MintChat/components/SEO';
 * ```
 * 
 * @module SEO
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main SEO section component export
export { default } from './seo-section';
export { default as MintChatSEOSection } from './seo-section';

// Sub-module exports for granular access
export { MetaTags, PreloadLinks } from './seo-meta';
export { OrganizationSchema, ChatBotSchema } from './seo-structured';
