'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  componentName: string;
  fallback?: ReactNode;
  silent?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Component-Level Error Boundary
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides granular error isolation for individual components
 */
export default class ComponentErrorBoundary extends Component<Props, State> {
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
    const { componentName, silent } = this.props;
    
    // Log component-specific error
    if (!silent) {
      console.error(`Settlement Law ${componentName} Component Error:`, error, errorInfo);
    }
    
    // Track component error with analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `${componentName} Component Error: ${error.message}`,
        fatal: false,
        error_boundary: 'ComponentErrorBoundary',
        component: componentName.toLowerCase().replace(/\s+/g, '-'),
        page: 'settlement-law-federal'
      });
    }

    // Store error for debugging
    this.setState({ error });
  }

  private handleComponentRetry = () => {
    this.setState({ hasError: false, error: undefined });
    
    // Track component retry
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'error_recovery', {
        event_category: 'Settlement Law Federal',
        event_label: `${this.props.componentName} Component Retry`
      });
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Silent mode - return minimal placeholder
      if (this.props.silent) {
        return (
          <div style={{
            padding: '0.5rem',
            background: '#f9fafb',
            border: '1px dashed #d1d5db',
            borderRadius: '0.375rem',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.75rem'
          }}>
            Component temporarily unavailable
          </div>
        );
      }

      // Default component error UI
      return (
        <div style={{
          background: '#fffbeb',
          border: '1px solid #fbbf24',
          borderRadius: '0.5rem',
          padding: '1rem',
          margin: '0.5rem 0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
          
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '0.5rem'
          }}>
            {this.props.componentName} Component Error
          </h4>
          
          <p style={{
            color: '#78350f',
            marginBottom: '1rem',
            fontSize: '0.75rem'
          }}>
            This component couldn't load. Other parts of the page should work normally.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div style={{
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '0.25rem',
              padding: '0.5rem',
              marginBottom: '0.75rem',
              textAlign: 'left'
            }}>
              <h5 style={{ 
                color: '#92400e', 
                marginBottom: '0.25rem', 
                fontSize: '0.625rem',
                fontWeight: '600'
              }}>
                Dev Error:
              </h5>
              <pre style={{
                fontSize: '0.5rem',
                color: '#78350f',
                overflow: 'auto',
                maxHeight: '60px',
                margin: 0
              }}>
                {this.state.error.message}
              </pre>
            </div>
          )}

          <button
            onClick={this.handleComponentRetry}
            style={{
              background: '#f59e0b',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Retry
          </button>

          {process.env.NODE_ENV === 'development' && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              background: '#f3f4f6',
              borderRadius: '0.25rem',
              fontSize: '0.625rem',
              color: '#4b5563'
            }}>
              <strong>Component:</strong> {this.props.componentName}<br />
              <strong>Boundary:</strong> Component-level isolation
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
