/**
 * Technology Grid Component
 * 
 * Responsive grid layout for technology feature cards with loading
 * states, error handling, and animation support. Manages the display
 * and layout of technology features.
 * 
 * @component TechnologyGrid
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useEffect, useMemo } from 'react';
import TechnologyFeatureCard from './TechnologyFeatureCard';
import type { TechnologyFeature, LoadingState, ErrorState } from '../../types';

/**
 * Props for TechnologyGrid component
 */
interface TechnologyGridProps {
  /** Array of technology features */
  features: TechnologyFeature[];
  /** Loading state */
  loading?: LoadingState;
  /** Error state */
  error?: ErrorState;
  /** Grid columns configuration */
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

/**
 * Loading skeleton for feature cards
 */
const FeatureCardSkeleton = ({ index }: { index: number }): JSX.Element => (
  <div
    style={{
      background: "white",
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
      height: "280px",
      animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      animationDelay: `${index * 0.1}s`
    }}
    role="status"
    aria-label="Loading feature content"
  >
    {/* Icon Skeleton */}
    <div style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      marginBottom: "1.5rem"
    }} />
    
    {/* Title Skeleton */}
    <div style={{
      height: "1.5rem",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px",
      marginBottom: "1rem"
    }} />
    
    {/* Description Skeleton */}
    <div style={{
      height: "4rem",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px",
      marginBottom: "2rem"
    }} />
    
    {/* Button Skeleton */}
    <div style={{
      height: "1.25rem",
      width: "60%",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px"
    }} />
  </div>
);

/**
 * Error component for technology grid
 */
const TechnologyGridError = ({ error }: { error: ErrorState }): JSX.Element => (
  <div style={{
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    gridColumn: "1 / -1"
  }}>
    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
    <h3 style={{
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#dc2626",
      marginBottom: "0.5rem"
    }}>
      Unable to Load Technology Features
    </h3>
    <p style={{
      color: "#6b7280",
      marginBottom: error.onRetry ? "1.5rem" : "0"
    }}>
      {error.message || "We encountered an issue loading the technology features."}
    </p>
    {error.onRetry && (
      <button
        onClick={error.onRetry}
        style={{
          background: "#dc2626",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#b91c1c";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#dc2626";
        }}
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Technology grid component
 * 
 * @param {TechnologyGridProps} props - Component props
 * @returns {JSX.Element} Responsive technology features grid
 */
export default function TechnologyGrid({
  features,
  loading,
  error,
  columns = { mobile: 1, tablet: 2, desktop: 2 }
}: TechnologyGridProps): JSX.Element {
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for animations
  useEffect(() => {
    setMounted(true);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  /**
   * Memoized grid styles for performance
   */
  const gridStyles = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`,
    gap: '2rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: `repeat(${columns.tablet}, 1fr)`
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: `repeat(${columns.desktop}, 1fr)`
    }
  }), [columns]);

  // Error State
  if (error?.hasError) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        <TechnologyGridError error={error} />
      </div>
    );
  }

  // Loading State
  if (loading?.isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <FeatureCardSkeleton key={`skeleton-${i}`} index={i} />
        ))}
      </div>
    );
  }

  // Empty State
  if (!features || features.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          No Technology Features Available
        </h3>
        <p>Check back soon for updates on our latest innovations!</p>
      </div>
    );
  }

  // Content State
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}
      role="grid"
      aria-label="Technology features"
    >
      {features.map((feature, index) => (
        <div
          key={`feature-${index}`}
          style={{
            animation: mounted ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
          }}
          role="gridcell"
        >
          <TechnologyFeatureCard
            feature={feature}
            index={index}
            onClick={() => {
              // Analytics tracking could go here
              // Analytics tracking would go here in production
              // trackEvent('technology_feature_click', { feature: feature.title });
            }}
          />
        </div>
      ))}
    </div>
  );
}
