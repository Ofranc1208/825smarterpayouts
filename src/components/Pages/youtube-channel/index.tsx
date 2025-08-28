/**
 * YouTube Channel Page Module
 * 
 * Enterprise-ready YouTube channel page implementation with modular architecture.
 * Moved from app/youtube-channel/page.tsx to maintain clean separation between 
 * routing (app/) and page logic (src/).
 * 
 * This module contains:
 * - Modular component architecture for maintainability
 * - Enterprise features: error handling, loading states, accessibility
 * - SEO optimization with comprehensive meta tags and structured data
 * - Performance optimizations: lazy loading, memoization
 * - Responsive design with hover effects and animations
 * - Video gallery with interactive cards
 * - Call-to-action sections with Mint AI integration
 * 
 * @module YouTubeChannel
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main YouTube channel page component (modular)
export { default as YouTubeChannelPage } from './YouTubeChannelPage';
export { default } from './YouTubeChannelPage';

// Legacy page component (DEPRECATED - disabled and safe to delete)
// export { default as YouTubeChannelPageLegacy } from './page';

// Individual section components for flexibility
export {
  SEOHead as YouTubeSEOHead,
  HeroSection as YouTubeHeroSection,
  VideoGallerySection as YouTubeVideoGallerySection,
  CTASection as YouTubeCTASection
} from './components';
