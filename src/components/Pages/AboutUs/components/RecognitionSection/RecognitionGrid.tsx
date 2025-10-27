/**
 * Recognition Grid Component
 * 
 * Responsive grid layout for recognition cards with loading
 * states, error handling, and animation support. Manages the display
 * and layout of credentials and recognition items.
 * 
 * @component RecognitionGrid
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useEffect, useMemo } from 'react';
import RecognitionCard from './RecognitionCard';
import type { Recognition, LoadingState, ErrorState } from '../../types';

/**
 * Props for RecognitionGrid component
 */
interface RecognitionGridProps {
  /** Array of recognition items */
  recognitions: Recognition[];
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
 * Loading skeleton for recognition cards
 */
const RecognitionCardSkeleton = ({ index }: { index: number }): JSX.Element => (
  <div
    style={{
      background: "white",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      height: "240px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      animationDelay: `${index * 0.1}s`
    }}
    role="status"
    aria-label="Loading recognition content"
  >
    {/* Icon Skeleton */}
    <div style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      margin: "0 auto 1.5rem"
    }} />
    
    {/* Title Skeleton */}
    <div style={{
      height: "1.25rem",
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
      height: "2.5rem",
      background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 2s infinite",
      borderRadius: "4px"
    }} />
  </div>
);

/**
 * Error component for recognition grid
 */
const RecognitionGridError = ({ error }: { error: ErrorState }): JSX.Element => (
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
      Unable to Load Recognition Items
    </h3>
    <p style={{
      color: "#6b7280",
      marginBottom: error.onRetry ? "1.5rem" : "0"
    }}>
      {error.message || "We encountered an issue loading our credentials and recognition."}
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
 * Recognition grid component
 * 
 * @param {RecognitionGridProps} props - Component props
 * @returns {JSX.Element} Responsive recognition grid
 */
export default function RecognitionGrid({
  recognitions,
  loading,
  error,
  columns = { mobile: 1, tablet: 2, desktop: 4 }
}: RecognitionGridProps): JSX.Element {
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
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.9);
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    alignItems: 'start'
  }), []);

  // Error State
  if (error?.hasError) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        <RecognitionGridError error={error} />
      </div>
    );
  }

  // Loading State
  if (loading?.isLoading) {
    return (
      <div style={gridStyles}>
        {[1, 2, 3, 4].map((i) => (
          <RecognitionCardSkeleton key={`skeleton-${i}`} index={i} />
        ))}
      </div>
    );
  }

  // Empty State
  if (!recognitions || recognitions.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#6b7280',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          No Recognition Items Available
        </h3>
        <p>Our credentials and recognition will be displayed here soon!</p>
      </div>
    );
  }

  // Content State
  return (
    <div 
      style={gridStyles}
      role="grid"
      aria-label="Recognition and credentials"
    >
      {recognitions.map((recognition, index) => (
        <div
          key={`recognition-${index}`}
          style={{
            animation: mounted ? `slideInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
          }}
          role="gridcell"
        >
          <RecognitionCard
            recognition={recognition}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
