/**
 * Technology Section - Main Component
 * 
 * Streamlined main component that orchestrates the technology section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component TechnologySection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import TechnologyHeader from './TechnologyHeader';
import TechnologyGrid from './TechnologyGrid';
import TechnologyCTA from './TechnologyCTA';
import { TECHNOLOGY_FEATURES, TECHNOLOGY_CONFIG } from './data';
import type { LoadingState, ErrorState } from '../../types';

/**
 * Props for TechnologySection component
 */
interface TechnologySectionProps {
  /** Custom section ID */
  id?: string;
  /** Loading state override */
  loading?: LoadingState;
  /** Error state override */
  error?: ErrorState;
  /** Show CTA section */
  showCTA?: boolean;
}

/**
 * Main technology section component
 * 
 * Orchestrates the display of technology content with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {TechnologySectionProps} props - Component props
 * @returns {JSX.Element} Complete technology section
 */
export default function TechnologySection({
  id = 'technology',
  loading,
  error,
  showCTA = true
}: TechnologySectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    // Retry attempt for technology section loading
    
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
      {/* Background Pattern */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.03) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={containerStyles}>
        {/* Section Header */}
        <TechnologyHeader
          title={TECHNOLOGY_CONFIG.title}
          subtitle={TECHNOLOGY_CONFIG.subtitle}
          description={TECHNOLOGY_CONFIG.description}
          align="center"
          maxWidth="800px"
        />
        
        {/* Technology Features Grid */}
        <TechnologyGrid
          features={TECHNOLOGY_FEATURES}
          loading={loading}
          error={enhancedError}
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 2
          }}
        />
        
        {/* Call-to-Action Section */}
        {showCTA && !loading?.isLoading && !error?.hasError && (
          <TechnologyCTA
            text={TECHNOLOGY_CONFIG.ctaText}
            primaryButtonText={TECHNOLOGY_CONFIG.ctaButtonText}
            primaryButtonLink={TECHNOLOGY_CONFIG.ctaButtonLink}
            secondaryButtonText="Check Your State Laws"
            secondaryButtonLink="/structured-settlement-laws-by-state"
            theme="gradient"
          />
        )}
      </div>
    </section>
  );
}
