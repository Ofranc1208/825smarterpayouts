/**
 * Gallery Grid Module - YouTube Channel
 * 
 * Exports all gallery grid components for the YouTube Channel VideoGallery section.
 * Provides clean, modular access to video cards, skeletons, and grid layout.
 * 
 * @module GalleryGrid
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main container component (default export)
export { default } from './VideoGrid';

// Individual components for granular access
export { default as VideoCard } from './VideoCard';
export { default as VideoCardSkeleton } from './VideoCardSkeleton';
export { default as VideoGrid } from './VideoGrid';

// Export types
export type { VideoData } from './VideoGrid';
