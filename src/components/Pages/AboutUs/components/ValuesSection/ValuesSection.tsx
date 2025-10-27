/**
 * Values Section - Main Component
 * 
 * Streamlined main component that orchestrates the values section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component ValuesSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import ValuesHeader from './ValuesHeader';
import ValuesGrid from './ValuesGrid';
import { COMPANY_VALUES, VALUES_CONFIG } from './data';
import type { LoadingState, ErrorState } from '../../types';

/**
 * Props for ValuesSection component
 */
interface ValuesSectionProps {
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
 * Main values section component
 * 
 * Orchestrates the display of company values with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {ValuesSectionProps} props - Component props
 * @returns {JSX.Element} Complete values section
 */
export default function ValuesSection({
  id = VALUES_CONFIG.sectionId,
  loading,
  error,
  showHeader = true
}: ValuesSectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    // Retry attempt for values section loading
    
    // In a real application, this would trigger a refetch
    // For now, we'll reload the section
    window.location.reload();
  }, [retryCount]);

  /**
   * Memoized section styles
   */
  const sectionStyles = useMemo(() => ({
    background: "white",
    padding: "3rem 0",
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
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.02) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.02) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={containerStyles}>
        {/* Section Header */}
        {showHeader && !loading?.isLoading && !error?.hasError && (
          <ValuesHeader
            title={VALUES_CONFIG.title}
            subtitle={VALUES_CONFIG.subtitle}
            description={VALUES_CONFIG.description}
            align="center"
            maxWidth="800px"
          />
        )}
        
        {/* Values Grid */}
        <ValuesGrid
          values={COMPANY_VALUES}
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
