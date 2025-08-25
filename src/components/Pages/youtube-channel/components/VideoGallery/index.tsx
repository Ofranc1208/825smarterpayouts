/**
 * VideoGallery Module - YouTube Channel Enterprise Edition
 * 
 * Complete ultra-modular VideoGallery implementation for YouTube Channel.
 * Provides enterprise-grade video gallery with clean separation
 * of concerns and optimal user experience.
 * 
 * ## Module Structure
 * ```
 * VideoGallery/
 * ├── gallery-header/       ← Title and description
 * │   ├── GalleryTitle.tsx
 * │   ├── GalleryDescription.tsx
 * │   ├── GalleryHeaderContainer.tsx
 * │   └── index.tsx
 * ├── gallery-grid/         ← Video cards and grid layout
 * │   ├── VideoCard.tsx
 * │   ├── VideoCardSkeleton.tsx
 * │   ├── VideoGrid.tsx
 * │   └── index.tsx
 * ├── gallery-controls/     ← Load more and future controls
 * │   ├── LoadMoreButton.tsx
 * │   ├── GalleryControlsContainer.tsx
 * │   └── index.tsx
 * ├── gallery-section/      ← Main gallery orchestrator
 * │   ├── YouTubeVideoGallerySection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import YouTubeVideoGallerySection from '@/components/Pages/youtube-channel/components/VideoGallery';
 * 
 * // Named import (alternative)
 * import { YouTubeVideoGallerySection } from '@/components/Pages/youtube-channel/components/VideoGallery';
 * 
 * // Granular imports for customization
 * import { VideoCard, LoadMoreButton } from '@/components/Pages/youtube-channel/components/VideoGallery';
 * ```
 * 
 * @module VideoGallery
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main video gallery section component export
export { default } from './gallery-section';
export { default as YouTubeVideoGallerySection } from './gallery-section';

// Sub-module exports for granular access
export { GalleryTitle, GalleryDescription, GalleryHeaderContainer } from './gallery-header';
export { VideoCard, VideoCardSkeleton, VideoGrid, type VideoData } from './gallery-grid';
export { LoadMoreButton, GalleryControlsContainer } from './gallery-controls';
