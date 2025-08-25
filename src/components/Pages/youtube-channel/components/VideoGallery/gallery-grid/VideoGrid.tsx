import React from 'react';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';

/**
 * Video Grid Component for YouTube Channel
 * 
 * Responsive grid layout for displaying video cards with loading states,
 * error handling, and accessibility features.
 * 
 * @component VideoGrid
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
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

interface VideoGridProps {
  /** Array of video data */
  videos: VideoData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Maximum number of videos to display */
  maxVideos?: number;
  /** Custom click handler for videos */
  onVideoClick?: (video: VideoData) => void;
}

/**
 * Video Grid Component
 * 
 * ## Features
 * - ✅ Responsive CSS Grid layout
 * - ✅ Loading skeleton states
 * - ✅ Error handling and fallbacks
 * - ✅ Accessibility compliance
 * - ✅ Performance optimization
 * 
 * @param props - Component props
 * @returns JSX element for video grid
 * 
 * @example
 * ```tsx
 * <VideoGrid 
 *   videos={videoData}
 *   isLoading={false}
 *   maxVideos={6}
 *   onVideoClick={(video) => handleVideoClick(video)}
 * />
 * ```
 */
export default function VideoGrid({
  videos,
  isLoading = false,
  error = null,
  maxVideos = 6,
  onVideoClick
}: VideoGridProps) {
  // Handle error state
  if (error) {
    return (
      <div 
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          background: '#fef2f2',
          borderRadius: '12px',
          border: '1px solid #fecaca'
        }}
        role="alert"
        aria-live="polite"
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#dc2626',
          marginBottom: '0.5rem'
        }}>
          Unable to Load Videos
        </h3>
        <p style={{
          color: '#6b7280',
          marginBottom: '1rem'
        }}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b91c1c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Limit videos if maxVideos is specified
  const displayVideos = maxVideos ? videos.slice(0, maxVideos) : videos;

  // Handle loading state
  if (isLoading) {
    return (
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          padding: '0 1rem'
        }}
        aria-label="Loading videos..."
      >
        {Array.from({ length: maxVideos || 6 }).map((_, index) => (
          <VideoCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Handle empty state
  if (!videos || videos.length === 0) {
    return (
      <div 
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          background: '#f9fafb',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📺</div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          No Videos Available
        </h3>
        <p style={{ color: '#6b7280' }}>
          Check back later for new educational content.
        </p>
      </div>
    );
  }

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        padding: '0 1rem'
      }}
      role="grid"
      aria-label={`Video gallery with ${displayVideos.length} videos`}
    >
      {displayVideos.map((video, index) => (
        <div key={`video-${index}`} role="gridcell">
          <VideoCard 
            video={video}
            onClick={onVideoClick}
            isLoading={false}
          />
        </div>
      ))}
    </div>
  );
}
