/**
 * Video Card Skeleton Component
 * 
 * Loading skeleton component that displays while video cards are loading.
 * Features smooth shimmer animations and proper aspect ratios to match
 * the actual video card layout.
 * 
 * @component VideoCardSkeleton
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useEffect } from 'react';

/**
 * Loading skeleton component for video cards
 * 
 * Displays animated placeholders while video data is being loaded.
 * Matches the exact dimensions and layout of actual video cards.
 * 
 * @returns {JSX.Element} Animated skeleton placeholder
 */
export default function VideoCardSkeleton(): JSX.Element {
  // Add CSS animations on mount
  useEffect(() => {
    const styleId = 'video-skeleton-animations';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .skeleton-shimmer {
        background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div 
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        height: '400px',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
      role="status"
      aria-label="Loading video content"
    >
      {/* Thumbnail Skeleton */}
      <div 
        className="skeleton-shimmer"
        style={{
          width: '100%',
          height: '200px'
        }}
        aria-hidden="true"
      />
      
      {/* Content Skeleton */}
      <div style={{ padding: '1.5rem' }}>
        {/* Title Skeleton */}
        <div 
          className="skeleton-shimmer"
          style={{
            height: '1.5rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}
          aria-hidden="true"
        />
        
        {/* Description Skeleton */}
        <div 
          className="skeleton-shimmer"
          style={{
            height: '4rem',
            borderRadius: '4px',
            marginBottom: '1.5rem'
          }}
          aria-hidden="true"
        />
        
        {/* Button Skeleton */}
        <div 
          className="skeleton-shimmer"
          style={{
            height: '2.5rem',
            borderRadius: '8px'
          }}
          aria-hidden="true"
        />
      </div>
      
      {/* Screen reader text */}
      <span className="sr-only">Loading video content...</span>
    </div>
  );
}
