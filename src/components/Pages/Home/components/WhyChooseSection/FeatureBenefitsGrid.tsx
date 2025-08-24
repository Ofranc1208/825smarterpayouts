/**
 * Feature Benefits Grid Component
 * 
 * Responsive grid layout for feature benefit cards with loading
 * states, error handling, and animation support. Manages the display
 * and layout of feature benefits.
 * 
 * @component FeatureBenefitsGrid
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useEffect, useMemo } from 'react';
import FeatureBenefitCard from './FeatureBenefitCard';
import type { FeatureGridProps } from '../../types';

/**
 * Loading skeleton for feature benefit cards
 */
const FeatureBenefitSkeleton = ({ index }: { index: number }): JSX.Element => (
  <div
    style={{
      textAlign: 'center',
      padding: '24px',
      borderRadius: '12px',
      background: '#f8fafc',
      height: '280px',
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
      margin: "0 auto 1rem"
    }} />
    
    {/* Title Skeleton */}
    <div style={{
      height: "1.5rem",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px",
      marginBottom: "0.75rem",
      width: "80%",
      margin: "0 auto 0.75rem"
    }} />
    
    {/* Description Skeleton */}
    <div style={{
      height: "4rem",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px",
      marginBottom: "1.5rem"
    }} />
    
    {/* Button Skeleton */}
    <div style={{
      height: "2rem",
      width: "60%",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "20px",
      margin: "0 auto"
    }} />
  </div>
);

/**
 * Error component for feature benefits grid
 */
const FeatureBenefitsError = ({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry?: () => void;
}): JSX.Element => (
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
      Unable to Load Features
    </h3>
    <p style={{
      color: "#6b7280",
      marginBottom: onRetry ? "1.5rem" : "0"
    }}>
      {error}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
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
 * Feature benefits grid component
 * 
 * @param {FeatureGridProps} props - Component props
 * @returns {JSX.Element} Responsive feature benefits grid
 */
export default function FeatureBenefitsGrid({
  features,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  isLoading = false,
  error = null
}: FeatureGridProps): JSX.Element {
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
          transform: translateY(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px'
  }), []);

  // Error State
  if (error) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        <FeatureBenefitsError 
          error={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div style={gridStyles}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <FeatureBenefitSkeleton key={`skeleton-${i}`} index={i} />
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
        color: '#6b7280',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          No Features Available
        </h3>
        <p>Our feature benefits will be displayed here soon!</p>
      </div>
    );
  }

  // Content State
  return (
    <div 
      style={gridStyles}
      role="grid"
      aria-label="Feature benefits"
    >
      {features.map((feature, index) => (
        <div
          key={`feature-${index}`}
          role="gridcell"
        >
          <FeatureBenefitCard
            feature={feature}
            index={index}
            enableAnimations={mounted}
          />
        </div>
      ))}
    </div>
  );
}
