/**
 * Video Gallery Section Types
 * 
 * TypeScript interfaces and types for the video gallery components.
 * Centralized type definitions for better maintainability and reusability.
 * 
 * @module VideoGalleryTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Video data interface
 */
export interface VideoData {
  /** Video thumbnail image URL */
  img: string;
  /** Alt text for thumbnail image */
  alt: string;
  /** Video title */
  title: string;
  /** Video description */
  desc: string;
  /** YouTube video URL */
  url: string;
  /** Optional video duration */
  duration?: string;
  /** Optional view count */
  views?: string;
}

/**
 * Props for the VideoGallerySection component
 */
export interface VideoGallerySectionProps {
  /** Array of video data */
  videos?: VideoData[];
  /** Section title */
  title?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Maximum number of videos to display */
  maxVideos?: number;
}

/**
 * Props for the VideoCard component
 */
export interface VideoCardProps {
  /** Video data */
  video: VideoData;
  /** Card index for accessibility */
  index: number;
}

/**
 * Props for the VideoGalleryError component
 */
export interface VideoGalleryErrorProps {
  /** Error message to display */
  error: string;
  /** Retry callback function */
  onRetry: () => void;
}

/**
 * Props for the VideoGalleryGrid component
 */
export interface VideoGalleryGridProps {
  /** Array of video data */
  videos: VideoData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Retry callback function */
  onRetry?: () => void;
}
