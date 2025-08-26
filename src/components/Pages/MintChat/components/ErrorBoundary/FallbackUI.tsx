'use client';

import React from 'react';

interface FallbackUIProps {
  error?: Error;
  resetError?: () => void;
  isDevelopment?: boolean;
}

/**
 * Error Fallback UI Component
 * Displays user-friendly error messages with recovery options
 */
export default function FallbackUI({ error, resetError, isDevelopment = false }: FallbackUIProps) {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      margin: '2rem auto',
      maxWidth: '600px'
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem'
      }}>
        🤖💔
      </div>
      
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#dc2626',
        marginBottom: '1rem'
      }}>
        Oops! Mint AI Hit a Snag
      </h2>
      
      <p style={{
        fontSize: '1rem',
        color: '#6b7280',
        marginBottom: '1.5rem',
        lineHeight: 1.6
      }}>
        Don't worry! Our AI is learning from this experience. 
        You can try refreshing the page or contact our support team.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '1.5rem'
      }}>
        {resetError && (
          <button
            onClick={resetError}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '1.5rem',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🔄 Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '1.5rem',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🔄 Refresh Page
        </button>
        
        <a
          href="/contact"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '1.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          💬 Contact Support
        </a>
      </div>
      
      {isDevelopment && error && (
        <details style={{
          textAlign: 'left',
          background: '#f3f4f6',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.875rem'
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
            🔧 Development Error Details
          </summary>
          <pre style={{
            marginTop: '0.5rem',
            whiteSpace: 'pre-wrap',
            color: '#dc2626'
          }}>
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  );
}
