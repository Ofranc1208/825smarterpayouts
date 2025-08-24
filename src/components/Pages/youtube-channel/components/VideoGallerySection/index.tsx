/**
 * Video Gallery Section Module
 * 
 * Modular video gallery components broken down for maximum maintainability.
 * Each component handles a specific aspect of the video gallery functionality.
 * 
 * @module VideoGallerySection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main video gallery section component
export { default as VideoGallerySection } from './VideoGallerySection';
export { default } from './VideoGallerySection';

// Individual sub-components for flexibility
export { default as VideoCard } from './VideoCard';
export { default as VideoCardSkeleton } from './VideoCardSkeleton';
export { default as VideoGalleryError } from './VideoGalleryError';
export { default as VideoGalleryGrid } from './VideoGalleryGrid';

// Types and interfaces
export type { VideoData, VideoGallerySectionProps } from './types';
