/**
 * Hero Section - Main Component
 * 
 * Streamlined main component that orchestrates the hero section display.
 * This component is focused on coordination rather than implementation
 * details, which are handled by specialized sub-components.
 * 
 * @component HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroCTAButtons from './HeroCTAButtons';
import { HERO_CONFIG } from './data';
import type { HeroSectionProps, LoadingState, ErrorState } from '../../types';

/**
 * Extended props for HeroSection component
 */
interface ExtendedHeroSectionProps extends HeroSectionProps {
  /** Custom section ID */
  id?: string;
  /** Loading state override */
  loading?: LoadingState;
  /** Error state override */
  error?: ErrorState;
  /** Enable animations */
  enableAnimations?: boolean;
  /** Minimum height */
  minHeight?: string;
}

/**
 * Main hero section component
 * 
 * Orchestrates the display of hero content with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {ExtendedHeroSectionProps} props - Component props
 * @returns {JSX.Element} Complete hero section
 */
export default function HeroSection({
  id = 'hero',
  title = HERO_CONFIG.title,
  subtitle = HERO_CONFIG.subtitle,
  description = HERO_CONFIG.description,
  primaryButton = HERO_CONFIG.primaryButton,
  secondaryButton = HERO_CONFIG.secondaryButton,
  videoUrl = HERO_CONFIG.videoUrl,
  imageUrl = HERO_CONFIG.imageUrl,
  loading,
  error,
  enableAnimations = true,
  minHeight = '100vh'
}: ExtendedHeroSectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    console.log(`Hero section retry attempt #${retryCount + 1}`);
    
    // In a real application, this would trigger a refetch
    window.location.reload();
  }, [retryCount]);

  /**
   * Memoized section styles
   */
  const sectionStyles = useMemo(() => ({
    position: 'relative' as const,
    minHeight: minHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: '#1a1a1a' // Fallback color
  }), [minHeight]);

  /**
   * Enhanced error state with retry functionality
   */
  const enhancedError = useMemo(() => {
    if (!error?.hasError) return undefined;
    return {
      ...error,
      onRetry: error.onRetry || handleRetry
    };
  }, [error, handleRetry]);

  // Error State
  if (enhancedError?.hasError) {
    return (
      <section 
        id={id}
        style={{
          ...sectionStyles,
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
        }}
        aria-labelledby={`${id}-error-title`}
      >
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '600px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 
            id={`${id}-error-title`}
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#dc2626',
              marginBottom: '1rem'
            }}
          >
            Unable to Load Hero Section
          </h1>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {enhancedError.message || "We encountered an issue loading the hero section."}
          </p>
          {enhancedError.onRetry && (
            <button
              onClick={enhancedError.onRetry}
              style={{
                background: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
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
          )}
        </div>
      </section>
    );
  }

  // Loading State
  if (loading?.isLoading) {
    return (
      <section 
        id={id}
        style={sectionStyles}
        aria-labelledby={`${id}-loading-title`}
      >
        <div style={{
          textAlign: 'center',
          color: 'white',
          zIndex: 10,
          position: 'relative'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }} />
          <h1 
            id={`${id}-loading-title`}
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}
          >
            Loading Hero Section
          </h1>
          {loading.message && (
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {loading.message}
            </p>
          )}
        </div>
        
        {/* Loading Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          zIndex: 1
        }} />

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  // Main Content State
  return (
    <section 
      id={id}
      style={sectionStyles}
      aria-labelledby={`${id}-title`}
      role="banner"
    >
      {/* Background Layer */}
      <HeroBackground
        videoUrl={videoUrl}
        imageUrl={imageUrl}
        overlayOpacity={0.7}
        overlayColor="#000000"
        enableVideo={enableAnimations}
      />

      {/* Content Layer */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
      }}>
        {/* Hero Content */}
        <HeroContent
          title={title}
          subtitle={subtitle}
          description={description}
          enableAnimations={enableAnimations}
          textAlign="center"
        />

        {/* CTA Buttons */}
        <HeroCTAButtons
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          direction="column"
          enableAnimations={enableAnimations}
        />
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        opacity: enableAnimations ? 1 : 0.5,
        animation: enableAnimations ? 'bounce 2s infinite' : 'none'
      }}>
        <div style={{
          width: '2px',
          height: '30px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)',
          margin: '0 auto 0.5rem'
        }} />
        <div style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Scroll
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
