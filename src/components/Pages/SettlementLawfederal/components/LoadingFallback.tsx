'use client';

import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  icon?: string;
  height?: string;
  background?: string;
  showSpinner?: boolean;
}

/**
 * Loading Fallback Component
 * Following enterprise patterns - reusable loading component for lazy-loaded sections
 * 
 * Provides consistent loading experience across all dynamically imported sections
 */
export default function LoadingFallback({
  message = 'Loading content...',
  icon = '⚡',
  height = '300px',
  background = '#f9fafb',
  showSpinner = true
}: LoadingFallbackProps) {
  return (
    <div
      style={{
        minHeight: height,
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        margin: '1rem 0'
      }}
      role="status"
      aria-label={message}
      aria-live="polite"
    >
      <div style={{
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        {/* Loading Icon */}
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          animation: showSpinner ? 'pulse 2s infinite' : 'none'
        }}>
          {icon}
        </div>

        {/* Loading Message */}
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          fontWeight: '500',
          margin: 0,
          marginBottom: showSpinner ? '1.5rem' : 0
        }}>
          {message}
        </p>

        {/* Spinner */}
        {showSpinner && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid #e5e7eb',
                borderTop: '2px solid #059669',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Accessibility text for screen readers */}
        <span className="sr-only">
          Loading Settlement Law Federal content. Please wait.
        </span>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
}

/**
 * Specialized Loading Fallbacks for different section types
 */

export function LegalSectionLoader() {
  return (
    <LoadingFallback
      message="Loading legal information..."
      icon="⚖️"
      height="400px"
      background="linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)"
    />
  );
}

export function ResourceSectionLoader() {
  return (
    <LoadingFallback
      message="Loading resources and references..."
      icon="📚"
      height="350px"
      background="#ffffff"
    />
  );
}

export function TaxSectionLoader() {
  return (
    <LoadingFallback
      message="Loading tax implications..."
      icon="💰"
      height="450px"
      background="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
    />
  );
}

export function CTASectionLoader() {
  return (
    <LoadingFallback
      message="Loading call-to-action..."
      icon="🚀"
      height="200px"
      background="linear-gradient(135deg, #22b455 0%, #1a9a47 100%)"
      showSpinner={false}
    />
  );
}
