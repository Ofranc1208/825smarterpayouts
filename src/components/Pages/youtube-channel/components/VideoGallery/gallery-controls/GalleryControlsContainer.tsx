import React from 'react';
import LoadMoreButton from './LoadMoreButton';

/**
 * Gallery Controls Container Component for YouTube Channel
 * 
 * Orchestrates gallery control elements including load more functionality,
 * filtering, and other interactive controls.
 * 
 * @component GalleryControlsContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface GalleryControlsContainerProps {
  /** Load more click handler */
  onLoadMore?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Show load more button */
  showLoadMore?: boolean;
  /** Has more videos to load */
  hasMoreVideos?: boolean;
  /** Total videos count */
  totalVideos?: number;
  /** Currently displayed videos count */
  displayedVideos?: number;
}

/**
 * Gallery Controls Container Component
 * 
 * ## Architecture
 * - **LoadMoreButton**: Load additional videos functionality
 * - Future: FilterControls, SortControls, etc.
 * 
 * ## Features
 * - ✅ Load more functionality
 * - ✅ Loading state management
 * - ✅ Accessibility compliance
 * - ✅ Extensible for future controls
 * 
 * @param props - Component props
 * @returns JSX element for gallery controls
 * 
 * @example
 * ```tsx
 * <GalleryControlsContainer 
 *   onLoadMore={handleLoadMore}
 *   isLoading={isLoading}
 *   hasMoreVideos={hasMoreVideos}
 * />
 * ```
 */
export default function GalleryControlsContainer({
  onLoadMore,
  isLoading = false,
  showLoadMore = false,
  hasMoreVideos = false,
  totalVideos = 0,
  displayedVideos = 0
}: GalleryControlsContainerProps) {
  // Don't render if no controls are needed
  if (!showLoadMore && !hasMoreVideos) {
    return null;
  }

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem'
      }}
      role="region"
      aria-label="Video gallery controls"
    >
      {/* Video Count Info */}
      {totalVideos > 0 && (
        <div 
          style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            textAlign: 'center'
          }}
          aria-live="polite"
        >
          Showing {displayedVideos} of {totalVideos} videos
        </div>
      )}

      {/* Load More Button */}
      <LoadMoreButton
        onClick={onLoadMore}
        isLoading={isLoading}
        show={showLoadMore && hasMoreVideos}
        text="Load More Videos"
      />

      {/* Future: Add filter controls, sort options, etc. */}
      {/* <FilterControls /> */}
      {/* <SortControls /> */}
    </div>
  );
}
