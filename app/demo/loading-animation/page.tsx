"use client";

import React, { useState } from 'react';
import OfferLoadingAnimation from '../../../src/components/calculator/lcpstep/results-components/OfferLoadingAnimation';

/**
 * ============================================================================
 * DEMO PAGE - LOADING ANIMATION PREVIEW
 * ============================================================================
 * Standalone page to preview the offer loading animation
 * Access at: http://localhost:3000/demo/loading-animation
 */
export default function LoadingAnimationDemo() {
  const [showLoading, setShowLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowResults(true);
  };

  const resetDemo = () => {
    setShowResults(false);
    setShowLoading(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f3f4f6',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem auto'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Loading Animation Demo
        </h1>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280',
          marginBottom: '1rem'
        }}>
          Preview the offer calculation animation sequence
        </p>
        <button
          onClick={resetDemo}
          style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
          }}
        >
          🔄 Restart Animation
        </button>
      </div>

      {/* Animation */}
      {showLoading && (
        <OfferLoadingAnimation onComplete={handleLoadingComplete} />
      )}

      {/* Results Message */}
      {showResults && (
        <div style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: '2rem',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#22c55e',
            marginBottom: '1rem'
          }}>
            ✓ Animation Complete!
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            color: '#6b7280',
            marginBottom: '1.5rem'
          }}>
            This is where your offer results would be displayed.
          </p>
          <button
            onClick={resetDemo}
            style={{
              background: '#f3f4f6',
              color: '#1f2937',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Watch Again
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

