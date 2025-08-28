'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Section-Level Error Boundary
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Isolates errors to individual sections without breaking the entire page
 */
export default class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { sectionName } = this.props;
    
    // Log section-specific error
    console.error(`Settlement Law ${sectionName} Section Error:`, error, errorInfo);
    
    // Track section error with analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `${sectionName} Section Error: ${error.message}`,
        fatal: false,
        error_boundary: 'SectionErrorBoundary',
        section: sectionName.toLowerCase().replace(/\s+/g, '-'),
        page: 'settlement-law-federal'
      });
    }

    // Store error for debugging
    this.setState({ error });
  }

  private handleSectionRetry = () => {
    this.setState({ hasError: false, error: undefined });
    
    // Track section retry
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'error_recovery', {
        event_category: 'Settlement Law Federal',
        event_label: `${this.props.sectionName} Section Retry`
      });
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default section error UI
      return (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.75rem',
          padding: '2rem',
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '0.75rem'
          }}>
            {this.props.sectionName} Section Error
          </h3>
          
          <p style={{
            color: '#7f1d1d',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            This section encountered an error and couldn't load properly. 
            The rest of the page should still work normally.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '0.375rem',
              padding: '0.75rem',
              marginBottom: '1rem',
              textAlign: 'left'
            }}>
              <h4 style={{ 
                color: '#dc2626', 
                marginBottom: '0.5rem', 
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Development Error:
              </h4>
              <pre style={{
                fontSize: '0.625rem',
                color: '#7f1d1d',
                overflow: 'auto',
                maxHeight: '100px',
                margin: 0
              }}>
                {this.state.error.message}
              </pre>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              onClick={this.handleSectionRetry}
              style={{
                background: '#dc2626',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Retry Section
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Refresh Page
            </button>
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#fef3c7',
            borderRadius: '0.375rem',
            border: '1px solid #fbbf24'
          }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#92400e',
              margin: 0
            }}>
              <strong>Section:</strong> {this.props.sectionName}<br />
              <strong>Impact:</strong> This section only - other content should work normally
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
