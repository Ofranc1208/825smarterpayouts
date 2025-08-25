import React from 'react';

/**
 * Video Card Skeleton Component for YouTube Channel
 * 
 * Loading skeleton component that displays while video cards are loading.
 * Provides visual feedback and maintains layout stability during loading states.
 * 
 * @component VideoCardSkeleton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Video Card Skeleton Component
 * 
 * ## Features
 * - ✅ Smooth loading animation
 * - ✅ Maintains card layout dimensions
 * - ✅ Accessibility compliance
 * - ✅ Performance optimized
 * 
 * @returns JSX element for video card skeleton
 * 
 * @example
 * ```tsx
 * {isLoading && (
 *   <VideoCardSkeleton />
 * )}
 * ```
 */
export default function VideoCardSkeleton() {
  return (
    <div 
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
      role="status"
      aria-label="Loading video content..."
    >
      {/* Thumbnail Skeleton */}
      <div 
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}
      >
        {/* Play Button Skeleton */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '50%'
          }}
        />

        {/* Duration Badge Skeleton */}
        <div 
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.1)',
            width: '40px',
            height: '20px',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div style={{ padding: '1rem' }}>
        {/* Title Skeleton */}
        <div 
          style={{
            height: '1.25rem',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '4px',
            marginBottom: '0.5rem'
          }}
        />
        <div 
          style={{
            height: '1.25rem',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '4px',
            marginBottom: '0.75rem',
            width: '75%'
          }}
        />

        {/* Description Skeleton */}
        <div 
          style={{
            height: '1rem',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '4px',
            marginBottom: '0.25rem'
          }}
        />
        <div 
          style={{
            height: '1rem',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            width: '60%'
          }}
        />

        {/* Views Skeleton */}
        <div 
          style={{
            height: '0.875rem',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '4px',
            width: '40%'
          }}
        />
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `
      }} />
    </div>
  );
}
