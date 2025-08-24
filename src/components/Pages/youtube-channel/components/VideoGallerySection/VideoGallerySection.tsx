/**
 * Video Gallery Section - Main Component
 * 
 * Streamlined main component that orchestrates the video gallery display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component VideoGallerySection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import VideoGalleryGrid from './VideoGalleryGrid';
import type { VideoGallerySectionProps, VideoData } from './types';

/**
 * Default video data with enhanced metadata
 */
const DEFAULT_VIDEOS: VideoData[] = [
  {
    img: '/assets/images/Self.JPG',
    alt: 'Self Calculate an Early Payout with Smarter Payouts! thumbnail',
    title: 'Self Calculate an Early Payout with Smarter Payouts!',
    desc: "Self-calculate a lump sum offer for your future settlement payments using our real-time tool. It's fast, accurate, and secure.",
    url: 'https://youtu.be/TxFogK2R61o',
    duration: '3:45',
    views: '2.1K'
  },
  {
    img: '/assets/images/why-wait.JPG',
    alt: 'Why wait, see an Early Lump offer in 2 minutes thumbnail',
    title: 'Why wait, see an Early Lump offer in 2 minutes',
    desc: 'Understand the benefit of receiving a lump-sum today versus waiting for monthly checks. A 2-minute video that explains everything.',
    url: 'https://youtu.be/AYFvqQCCSoY',
    duration: '2:15',
    views: '1.8K'
  },
  {
    img: '/assets/images/debt.JPG',
    alt: 'How does it feel to be debt free! thumbnail',
    title: 'How does it feel to be debt free!',
    desc: 'See how settlement payments can be used to pay off high-interest debt and regain financial peace of mind.',
    url: 'https://youtu.be/ur9pB2-xkk4',
    duration: '4:20',
    views: '3.2K'
  },
];

/**
 * Main video gallery section component
 * 
 * Orchestrates the display of video content with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {VideoGallerySectionProps} props - Component props
 * @returns {JSX.Element} Complete video gallery section
 */
export default function VideoGallerySection({
  videos = DEFAULT_VIDEOS,
  title = "Featured Videos",
  isLoading = false,
  error = null,
  maxVideos
}: VideoGallerySectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Memoize filtered videos for performance
   */
  const displayVideos = useMemo(() => {
    if (!videos || videos.length === 0) return [];
    return maxVideos ? videos.slice(0, maxVideos) : videos;
  }, [videos, maxVideos]);

  /**
   * Handle retry functionality with state tracking
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    console.log(`Video gallery retry attempt #${retryCount + 1}`);
    
    // In a real application, this would trigger a refetch
    // For now, we'll reload the page as a fallback
    window.location.reload();
  }, [retryCount]);

  /**
   * Memoized section styles
   */
  const sectionStyles = useMemo(() => ({
    background: '#f8fafc',
    padding: "48px 16px",
    minHeight: '400px'
  }), []);

  /**
   * Memoized container styles
   */
  const containerStyles = useMemo(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto'
  }), []);

  /**
   * Memoized title styles
   */
  const titleStyles = useMemo(() => ({
    fontSize: "2rem",
    fontWeight: "700" as const,
    color: "#1f2937",
    textAlign: "center" as const,
    marginBottom: "3rem",
    margin: "0 0 3rem 0",
    background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }), []);

  return (
    <section 
      style={sectionStyles}
      aria-labelledby="video-gallery-title"
      role="region"
    >
      <div style={containerStyles}>
        {/* Section Title */}
        <h2 
          id="video-gallery-title"
          style={titleStyles}
        >
          {title}
        </h2>
        
        {/* Video Grid - Delegates all rendering logic to sub-component */}
        <VideoGalleryGrid
          videos={displayVideos}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
        />
      </div>
    </section>
  );
}
