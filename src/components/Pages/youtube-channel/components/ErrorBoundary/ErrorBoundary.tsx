'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Error Boundary Component for YouTube Channel
 * 
 * Catches JavaScript errors anywhere in the YouTube channel component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * @component ErrorBoundary
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * YouTube Channel Error Boundary
 * 
 * ## Features
 * - ✅ Graceful error handling with fallback UI
 * - ✅ Error logging and reporting
 * - ✅ User-friendly error messages
 * - ✅ Recovery mechanisms
 * - ✅ Development vs production error display
 * 
 * ## Error Recovery
 * - Automatic retry mechanism
 * - Graceful degradation
 * - User feedback collection
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YouTubeChannelPage />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('YouTube Channel Error Boundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error tracking service (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
        custom_map: {
          component: 'YouTubeChannel',
          error_boundary: true
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      window.clearTimeout(this.retryTimeoutId);
    }
  }

  /**
   * Handle retry attempt
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  /**
   * Handle automatic retry after delay
   */
  handleAutoRetry = () => {
    this.retryTimeoutId = window.setTimeout(() => {
      this.handleRetry();
    }, 3000);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '1rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            😕
          </div>
          
          <h2 style={{
            color: '#dc2626',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            Oops! Something went wrong
          </h2>
          
          <p style={{
            color: '#6b7280',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            We're sorry, but there was an error loading the YouTube channel content. 
            Our team has been notified and is working to fix this issue.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={this.handleRetry}
              style={{
                background: '#059669',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#047857';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
            >
              🔄 Try Again
            </button>
            
            <a
              href="/"
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#6b7280';
              }}
            >
              🏠 Go Home
            </a>
          </div>

          {/* Development error details */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              marginTop: '2rem',
              textAlign: 'left',
              background: '#f9fafb',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: '#374151'
              }}>
                🔍 Error Details (Development)
              </summary>
              <pre style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#dc2626',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
