/**
 * Why Choose Section - Main Component
 * 
 * Streamlined main component that orchestrates the why choose section display.
 * This component is focused on coordination rather than implementation
 * details, which are handled by specialized sub-components.
 * 
 * @component WhyChooseSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback, useMemo } from 'react';
import WhyChooseHeader from './WhyChooseHeader';
import FeatureBenefitsGrid from './FeatureBenefitsGrid';
import StatisticsBar from './StatisticsBar';
import { FEATURE_BENEFITS, STATISTICS_DATA, WHY_CHOOSE_CONFIG } from './data';
import type { LoadingState, ErrorState } from '../../types';

/**
 * Props for WhyChooseSection component
 */
interface WhyChooseSectionProps {
  /** Custom section ID */
  id?: string;
  /** Loading state override */
  loading?: LoadingState;
  /** Error state override */
  error?: ErrorState;
  /** Show header section */
  showHeader?: boolean;
  /** Show statistics bar */
  showStatistics?: boolean;
  /** Enable animations */
  enableAnimations?: boolean;
}

/**
 * Main why choose section component
 * 
 * Orchestrates the display of feature benefits with proper state management,
 * error handling, and responsive behavior. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {WhyChooseSectionProps} props - Component props
 * @returns {JSX.Element} Complete why choose section
 */
export default function WhyChooseSection({
  id = WHY_CHOOSE_CONFIG.sectionId,
  loading,
  error,
  showHeader = true,
  showStatistics = true,
  enableAnimations = true
}: WhyChooseSectionProps): JSX.Element {
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    console.log(`Why choose section retry attempt #${retryCount + 1}`);
    
    // In a real application, this would trigger a refetch
    window.location.reload();
  }, [retryCount]);

  /**
   * Memoized section styles
   */
  const sectionStyles = useMemo(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 16px',
    position: 'relative' as const
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

  // Error State
  if (enhancedError?.hasError) {
    return (
      <section 
        id={id}
        style={{
          ...sectionStyles,
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderRadius: '16px',
          margin: '2rem auto'
        }}
        aria-labelledby={`${id}-error-title`}
      >
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 
            id={`${id}-error-title`}
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#dc2626',
              marginBottom: '1rem'
            }}
          >
            Unable to Load Why Choose Section
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {enhancedError.message || "We encountered an issue loading the feature benefits."}
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

  // Main Content State
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
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(45, 90, 39, 0.03) 0%, transparent 50%)`,
          pointerEvents: "none",
          borderRadius: "16px"
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        {showHeader && !loading?.isLoading && !error?.hasError && (
          <WhyChooseHeader
            title={WHY_CHOOSE_CONFIG.title}
            subtitle={WHY_CHOOSE_CONFIG.subtitle}
            description={WHY_CHOOSE_CONFIG.description}
            align="center"
            maxWidth="800px"
            titleColor="#2d5a27"
            descriptionColor="#6c757d"
          />
        )}
        
        {/* Feature Benefits Grid */}
        <FeatureBenefitsGrid
          features={FEATURE_BENEFITS}
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3
          }}
          isLoading={loading?.isLoading}
          error={enhancedError?.message || null}
        />
        
        {/* Statistics Bar */}
        {showStatistics && !loading?.isLoading && !error?.hasError && (
          <StatisticsBar
            statistics={STATISTICS_DATA}
            layout="horizontal"
          />
        )}
      </div>

      {/* Floating Action Elements */}
      {enableAnimations && (
        <>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(45, 90, 39, 0.1))',
            animation: 'float 6s ease-in-out infinite',
            opacity: 0.6
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.1), rgba(139, 92, 246, 0.1))',
            animation: 'float 8s ease-in-out infinite reverse',
            opacity: 0.4
          }} />
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
      `}</style>
    </section>
  );
}
