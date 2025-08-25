import React from 'react';
import GalleryHeaderContainer from '../gallery-header/GalleryHeaderContainer';
import VideoGrid from '../gallery-grid/VideoGrid';
import GalleryControlsContainer from '../gallery-controls/GalleryControlsContainer';

/**
 * YouTube Video Gallery Section Component - Enterprise Edition
 * 
 * Main orchestrator component for the YouTube Channel video gallery section.
 * Combines header, grid, and controls in an ultra-modular architecture.
 * 
 * @component YouTubeVideoGallerySection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

/**
 * Video data interface
 */
export interface VideoData {
  img: string;
  alt: string;
  title: string;
  desc: string;
  url: string;
  duration?: string;
  views?: string;
}

interface YouTubeVideoGallerySectionProps {
  /** Array of video data */
  videos: VideoData[];
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Show description */
  showDescription?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Maximum number of videos to display */
  maxVideos?: number;
  /** Custom video click handler */
  onVideoClick?: (video: VideoData) => void;
  /** Load more functionality */
  onLoadMore?: () => void;
  /** Show load more button */
  showLoadMore?: boolean;
  /** Has more videos to load */
  hasMoreVideos?: boolean;
}

/**
 * YouTube Video Gallery Section Component - Enterprise Edition
 * 
 * ## Architecture
 * - **GalleryHeaderContainer**: Title and optional description
 * - **VideoGrid**: Responsive grid of video cards with loading states
 * - **GalleryControlsContainer**: Load more and future control elements
 * 
 * ## Features
 * - ✅ Ultra-modular component architecture
 * - ✅ Responsive design with mobile optimization
 * - ✅ Loading states and error handling
 * - ✅ Accessibility compliance (WCAG 2.1 AA)
 * - ✅ Performance optimization with lazy loading
 * - ✅ SEO-friendly markup and metadata
 * - ✅ Interactive video cards with hover effects
 * 
 * ## Performance Optimizations
 * - ✅ Efficient video card rendering
 * - ✅ Skeleton loading states
 * - ✅ Lazy loading for images
 * - ✅ Optimized grid layout
 * 
 * @param props - Component props
 * @returns JSX element for complete video gallery section
 * 
 * @example
 * ```tsx
 * <YouTubeVideoGallerySection 
 *   videos={videoData}
 *   title="Featured Videos"
 *   isLoading={false}
 *   maxVideos={6}
 *   onVideoClick={(video) => window.open(video.url, '_blank')}
 * />
 * ```
 */
export default function YouTubeVideoGallerySection({
  videos,
  title = "Featured Videos",
  description = "Explore our educational video content covering structured settlements, financial planning, and expert insights.",
  showDescription = false,
  isLoading = false,
  error = null,
  maxVideos = 6,
  onVideoClick,
  onLoadMore,
  showLoadMore = false,
  hasMoreVideos = false
}: YouTubeVideoGallerySectionProps) {
  const displayedCount = Math.min(videos.length, maxVideos || videos.length);
  const totalCount = videos.length;

  return (
    <section 
      style={{
        padding: '3rem 0',
        background: '#ffffff'
      }}
      aria-labelledby="gallery-title"
    >
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Gallery Header */}
        <GalleryHeaderContainer
          title={title}
          description={description}
          titleId="gallery-title"
          showDescription={showDescription}
        />

        {/* Video Grid */}
        <VideoGrid
          videos={videos}
          isLoading={isLoading}
          error={error}
          maxVideos={maxVideos}
          onVideoClick={onVideoClick}
        />

        {/* Gallery Controls */}
        <GalleryControlsContainer
          onLoadMore={onLoadMore}
          isLoading={isLoading}
          showLoadMore={showLoadMore}
          hasMoreVideos={hasMoreVideos}
          totalVideos={totalCount}
          displayedVideos={displayedCount}
        />
      </div>
    </section>
  );
}
