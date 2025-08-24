/**
 * Video Gallery Grid Component
 * 
 * Responsive grid layout component that handles the display of video cards,
 * loading states, error states, and empty states. Manages the grid layout
 * and orchestrates the display of different UI states.
 * 
 * @component VideoGalleryGrid
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useMemo } from 'react';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';
import VideoGalleryError from './VideoGalleryError';
import type { VideoGalleryGridProps } from './types';

/**
 * Video gallery grid component
 * 
 * Handles the responsive grid layout and different states (loading, error, empty, content).
 * Provides consistent spacing and responsive behavior across different screen sizes.
 * 
 * @param {VideoGalleryGridProps} props - Component props
 * @returns {JSX.Element} Responsive video grid with state management
 */
export default function VideoGalleryGrid({
  videos,
  isLoading = false,
  error = null,
  onRetry
}: VideoGalleryGridProps): JSX.Element {

  /**
   * Memoized grid styles for performance
   */
  const gridStyles = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  }), []);

  /**
   * Memoized empty state styles
   */
  const emptyStateStyles = useMemo(() => ({
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    color: '#6b7280',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    margin: '2rem 0'
  }), []);

  // Error State
  if (error && onRetry) {
    return <VideoGalleryError error={error} onRetry={onRetry} />;
  }

  // Loading State
  if (isLoading) {
    return (
      <div style={gridStyles}>
        {[1, 2, 3].map((i) => (
          <VideoCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // Empty State
  if (!videos || videos.length === 0) {
    return (
      <div style={emptyStateStyles}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}>
          📹
        </div>
        
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#374151',
          margin: '0 0 1rem 0'
        }}>
          No Videos Available
        </h3>
        
        <p style={{ 
          fontSize: '1.125rem',
          lineHeight: '1.6',
          maxWidth: '400px',
          margin: '0 auto 2rem',
          color: '#6b7280'
        }}>
          Check back soon for new educational content about structured settlements and financial planning!
        </p>

        {/* Suggested Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '2rem'
        }}>
          <a 
            href="https://www.youtube.com/@smarterpayouts" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span role="img" aria-hidden="true">📺</span>
            Visit YouTube Channel
          </a>
          
          <a 
            href="/mint-intelligent-chat"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span role="img" aria-hidden="true">💬</span>
            Chat with Mint AI
          </a>
        </div>
      </div>
    );
  }

  // Content State - Display Video Grid
  return (
    <div 
      style={gridStyles}
      role="grid"
      aria-label="Video gallery"
    >
      {videos.map((video, index) => (
        <div 
          key={`${video.url}-${index}`}
          role="gridcell"
        >
          <VideoCard 
            video={video} 
            index={index} 
          />
        </div>
      ))}
    </div>
  );
}
