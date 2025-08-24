/**
 * Video Gallery Error Component
 * 
 * Error state component that displays when video gallery fails to load.
 * Provides user-friendly error messaging and retry functionality with
 * proper accessibility and visual feedback.
 * 
 * @component VideoGalleryError
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import type { VideoGalleryErrorProps } from './types';

/**
 * Error component for video gallery
 * 
 * Displays when video gallery encounters loading errors. Provides clear
 * error messaging and retry functionality with loading states.
 * 
 * @param {VideoGalleryErrorProps} props - Component props
 * @returns {JSX.Element} Error state with retry functionality
 */
export default function VideoGalleryError({ 
  error, 
  onRetry 
}: VideoGalleryErrorProps): JSX.Element {
  const [isRetrying, setIsRetrying] = useState(false);

  /**
   * Handle retry with loading state
   */
  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } catch (retryError) {
      console.error('Retry failed:', retryError);
    } finally {
      // Reset loading state after a brief delay
      setTimeout(() => setIsRetrying(false), 1000);
    }
  }, [onRetry]);

  return (
    <div 
      style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        margin: '2rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.03) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Error Icon */}
        <div 
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}
          role="img"
          aria-label="Error icon"
        >
          ⚠️
        </div>

        {/* Error Title */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#dc2626',
          marginBottom: '0.5rem',
          margin: '0 0 0.5rem 0'
        }}>
          Unable to Load Videos
        </h3>

        {/* Error Message */}
        <p style={{
          color: '#6b7280',
          marginBottom: '1.5rem',
          lineHeight: '1.5',
          maxWidth: '400px',
          margin: '0 auto 1.5rem'
        }}>
          {error || 'We encountered an issue while loading the video content. Please try again.'}
        </p>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          style={{
            background: isRetrying 
              ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' 
              : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: isRetrying ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '120px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!isRetrying) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isRetrying) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
          aria-label={isRetrying ? 'Retrying to load videos' : 'Retry loading videos'}
        >
          {isRetrying ? (
            <>
              <span 
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
                aria-hidden="true"
              />
              Retrying...
            </>
          ) : (
            <>
              🔄 Try Again
            </>
          )}
        </button>

        {/* Additional Help Text */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          border: '1px solid rgba(220, 38, 38, 0.1)'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            margin: 0,
            lineHeight: '1.4'
          }}>
            💡 <strong>Tip:</strong> If the problem persists, try refreshing the page or check your internet connection.
          </p>
        </div>
      </div>

      {/* Add spinning animation for loading indicator */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
