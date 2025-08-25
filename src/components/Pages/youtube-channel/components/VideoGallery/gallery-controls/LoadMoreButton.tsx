'use client';

import React, { useState, useCallback } from 'react';

/**
 * Load More Button Component for YouTube Channel
 * 
 * Interactive button for loading additional videos with hover effects,
 * loading states, and accessibility features.
 * 
 * @component LoadMoreButton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface LoadMoreButtonProps {
  /** Click handler for load more action */
  onClick?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button text */
  text?: string;
  /** Show button */
  show?: boolean;
}

/**
 * Load More Button Component
 * 
 * ## Features
 * - ✅ Interactive hover effects
 * - ✅ Loading state with spinner
 * - ✅ Accessibility compliance
 * - ✅ Keyboard navigation support
 * 
 * @param props - Component props
 * @returns JSX element for load more button
 * 
 * @example
 * ```tsx
 * <LoadMoreButton 
 *   onClick={handleLoadMore}
 *   isLoading={isLoading}
 *   show={hasMoreVideos}
 * />
 * ```
 */
export default function LoadMoreButton({
  onClick,
  isLoading = false,
  disabled = false,
  text = "Load More Videos",
  show = true
}: LoadMoreButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  }, [disabled, isLoading, onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  if (!show) {
    return null;
  }

  const buttonStyles: React.CSSProperties = {
    background: isHovered && !disabled && !isLoading
      ? 'linear-gradient(135deg, #047857 0%, #065f46 100%)'
      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    transform: isHovered && !disabled && !isLoading ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered && !disabled && !isLoading 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
      : 'none',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '160px',
    justifyContent: 'center'
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        style={buttonStyles}
        onClick={handleClick}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        aria-label={isLoading ? 'Loading more videos...' : text}
      >
        {isLoading ? (
          <>
            <div 
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            />
            Loading...
          </>
        ) : (
          <>
            <span role="img" aria-hidden="true">📺</span>
            {text}
          </>
        )}
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}
