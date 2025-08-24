/**
 * Video Card Component
 * 
 * Individual video card component with thumbnail, metadata, and interactive
 * elements. Features lazy loading, error handling, hover effects, and
 * comprehensive accessibility support.
 * 
 * @component VideoCard
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import type { VideoCardProps } from './types';

/**
 * Individual video card component
 * 
 * Displays a single video with thumbnail, title, description, and metadata.
 * Includes interactive hover effects, lazy loading, and error handling.
 * 
 * @param {VideoCardProps} props - Component props
 * @returns {JSX.Element} Interactive video card
 */
export default function VideoCard({ video, index }: VideoCardProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle successful image load
   */
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  /**
   * Handle image load error
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
    console.warn(`Failed to load video thumbnail: ${video.img}`);
  }, [video.img]);

  /**
   * Handle card hover state
   */
  const handleCardHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  }, [video.url]);

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer'
      }}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      onFocus={() => handleCardHover(true)}
      onBlur={() => handleCardHover(false)}
      onKeyDown={handleKeyDown}
      role="article"
      tabIndex={0}
      aria-labelledby={`video-title-${index}`}
      aria-describedby={`video-desc-${index}`}
    >
      {/* Video Thumbnail Container */}
      <div style={{ 
        position: 'relative',
        background: '#f3f4f6'
      }}>
        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ 
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Loading...
            </span>
          </div>
        )}
        
        {/* Error State */}
        {imageError ? (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }} role="img" aria-label="Video thumbnail">📹</span>
            <span style={{ fontSize: '0.75rem' }}>Thumbnail unavailable</span>
          </div>
        ) : (
          /* Actual Image */
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            tabIndex={-1} // Parent article handles focus
            aria-label={`Watch: ${video.title}`} 
            style={{ 
              textDecoration: 'none', 
              display: 'block',
              position: 'relative'
            }}
          >
            <img 
              src={video.img} 
              alt={video.alt} 
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ 
                width: '100%', 
                height: 'auto',
                aspectRatio: '16/9',
                objectFit: 'contain', 
                background: '#fff',
                borderBottom: '1px solid #e5e7eb',
                display: imageLoaded ? 'block' : 'none'
              }} 
              loading="lazy"
            />
            
            {/* Play Button Overlay */}
            {imageLoaded && !imageError && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isHovered ? 1 : 0.8,
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)'
              }}>
                <span 
                  style={{ 
                    color: 'white', 
                    fontSize: '1.5rem',
                    marginLeft: '2px' // Optical alignment for play icon
                  }}
                  role="img"
                  aria-label="Play video"
                >
                  ▶️
                </span>
              </div>
            )}
            
            {/* Duration Badge */}
            {video.duration && imageLoaded && !imageError && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {video.duration}
              </div>
            )}
          </a>
        )}
      </div>
      
      {/* Video Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        gap: '0.75rem'
      }}>
        {/* Video Title */}
        <h3 
          id={`video-title-${index}`}
          style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1f2937',
            lineHeight: '1.4',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {video.title}
        </h3>
        
        {/* Video Metadata */}
        {video.views && (
          <div style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span role="img" aria-label="Views">👁️</span>
            {video.views} views
          </div>
        )}
        
        {/* Video Description */}
        <p 
          id={`video-desc-${index}`}
          style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            lineHeight: '1.6',
            flex: '1',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {video.desc}
        </p>
        
        {/* Watch Button */}
        <a 
          href={video.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          tabIndex={-1} // Parent article handles focus
          aria-label={`Open YouTube: ${video.title}`}
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span role="img" aria-hidden="true">📺</span>
          Watch on YouTube
        </a>
      </div>
    </article>
  );
}
