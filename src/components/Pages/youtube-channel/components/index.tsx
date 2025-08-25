/**
 * YouTube Channel Page Components - Enterprise Edition
 * 
 * Ultra-modular enterprise-grade components for the YouTube channel page.
 * Each component follows enterprise architecture principles with comprehensive
 * error handling, accessibility, and performance optimization.
 * 
 * @module YouTubeChannelComponents
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

// ✅ ENTERPRISE-GRADE MODULAR COMPONENTS
export { default as SEOHead } from './SEO'; // Ultra-modular SEO structure ✅
export { default as HeroSection } from './Hero'; // Ultra-modular Hero structure ✅
export { default as VideoGallerySection } from './VideoGallery'; // Ultra-modular VideoGallery structure ✅
export { default as CTASection } from './CTA'; // Ultra-modular CTA structure ✅

// 🎉 ENTERPRISE COMPONENTS READY!

// Re-export VideoGallery sub-components for advanced usage
export {
  VideoCard,
  VideoCardSkeleton,
  VideoGrid,
  LoadMoreButton,
  type VideoData
} from './VideoGallery';

// 📝 DEPRECATED COMPONENTS (Safe to delete after verification)
// - HeroSection.tsx (replaced by Hero/)
// - SEOHead.tsx (replaced by SEO/)
// - VideoGallerySection/ (replaced by VideoGallery/)
// - CTASection.tsx (replaced by CTA/)
