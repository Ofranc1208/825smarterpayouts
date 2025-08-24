/**
 * Recognition Section - Main Component
 * 
 * Streamlined main component that orchestrates the recognition section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component RecognitionSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import RecognitionHeader from './RecognitionHeader';
import RecognitionGrid from './RecognitionGrid';
import { RECOGNITION_ITEMS, RECOGNITION_CONFIG } from './data';
import type { LoadingState, ErrorState } from '../../types';

/**
 * Props for RecognitionSection component
 */
interface RecognitionSectionProps {
  /** Custom section ID */
  id?: string;
  /** Loading state override */
  loading?: LoadingState;
  /** Error state override */
  error?: ErrorState;
  /** Show header section */
  showHeader?: boolean;
}

/**
 * Main recognition section component
 * 
 * Orchestrates the display of recognition content with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {RecognitionSectionProps} props - Component props
 * @returns {JSX.Element} Complete recognition section
 */
export default function RecognitionSection({
  id = RECOGNITION_CONFIG.sectionId,
  loading,
  error,
  showHeader = true
}: RecognitionSectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    // Retry attempt for recognition section loading
    
    // In a real application, this would trigger a refetch
    // For now, we'll reload the section
    window.location.reload();
  }, [retryCount]);

  /**
   * Memoized section styles
   */
  const sectionStyles = useMemo(() => ({
    background: "#f9fafb",
    padding: "4rem 0",
    position: "relative" as const,
    overflow: "hidden" as const
  }), []);

  /**
   * Memoized container styles
   */
  const containerStyles = useMemo(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px'
  }), []);

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

  return (
    <section 
      id={id}
      style={sectionStyles}
      aria-labelledby={`${id}-title`}
      role="region"
    >
      {/* Subtle Background Pattern */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.02) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.02) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={containerStyles}>
        {/* Section Header */}
        {showHeader && !loading?.isLoading && !error?.hasError && (
          <RecognitionHeader
            title={RECOGNITION_CONFIG.title}
            subtitle={RECOGNITION_CONFIG.subtitle}
            description={RECOGNITION_CONFIG.description}
            align="center"
            maxWidth="800px"
          />
        )}
        
        {/* Recognition Grid */}
        <RecognitionGrid
          recognitions={RECOGNITION_ITEMS}
          loading={loading}
          error={enhancedError}
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 4
          }}
        />
      </div>
    </section>
  );
}
