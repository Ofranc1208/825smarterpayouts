/**
 * YouTube Channel Page Components
 * 
 * Modular components for the YouTube channel page, broken down for maintainability
 * and reusability. Each component handles a specific section of the page.
 * 
 * @module YouTubeChannelComponents
 * @author SmarterPayouts Team
 * @since 2024
 */

export { default as SEOHead } from './SEOHead';
export { default as HeroSection } from './HeroSection';
export { default as VideoGallerySection } from './VideoGallerySection';
export { default as CTASection } from './CTASection';

// Re-export VideoGallerySection sub-components for advanced usage
export {
  VideoCard,
  VideoCardSkeleton,
  VideoGalleryError,
  VideoGalleryGrid
} from './VideoGallerySection/index';
