'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analytics } from '../utils/analytics';

/**
 * Error Boundary Component for MintChat
 * 
 * Provides comprehensive error handling and fault tolerance for the
 * MintChat page with graceful degradation and error reporting.
 * 
 * @component ErrorBoundary
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 * 
 * ## Features
 * - ✅ Comprehensive error catching
 * - ✅ Graceful error UI fallback
 * - ✅ Error reporting and analytics
 * - ✅ Recovery mechanisms
 * - ✅ Development error details
 * - ✅ Production-safe error handling
 * 
 * @example
 * ```tsx
 * import ErrorBoundary from './ErrorBoundary';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <ErrorBoundary>
 *       <MintChatSections />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);

    // Track error in analytics
    analytics.trackError(error, 'MintChat ErrorBoundary');

    // Store error info in state
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error monitoring service (Sentry, Bugsnag, etc.)
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToService(error, errorInfo);
    }
  }

  /**
   * Report error to external monitoring service
   */
  private reportErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Example: Sentry error reporting
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        },
        tags: {
          component: 'MintChat',
          boundary: 'ErrorBoundary'
        }
      });
    }

    // Custom error reporting endpoint
    if (process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name
          },
          errorInfo: {
            componentStack: errorInfo.componentStack
          },
          timestamp: Date.now(),
          page: 'mint-chat',
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(reportError => {
        console.warn('[ErrorBoundary] Failed to report error:', reportError);
      });
    }
  }

  /**
   * Retry mechanism - attempt to recover from error
   */
  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    
    // Track recovery attempt
    analytics.trackInteraction('error-boundary', 'retry_clicked', 'error-recovery');
  };

  /**
   * Render error fallback UI
   */
  private renderErrorFallback() {
    const { error, errorInfo } = this.state;
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
      <div style={{
        padding: '2rem',
        margin: '2rem auto',
        maxWidth: '600px',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        textAlign: 'center'
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
          Oops! Something went wrong with Mint AI
        </h2>
        
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          Don't worry! Our AI assistant encountered a temporary issue. 
          You can try refreshing the page or contact our support team.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: isDevelopment ? '2rem' : '0'
        }}>
          <button
            onClick={this.handleRetry}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9ca3af';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            Refresh Page
          </button>
        </div>

        {/* Development error details */}
        {isDevelopment && error && (
          <details style={{
            textAlign: 'left',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <summary style={{
              cursor: 'pointer',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Error Details (Development Only)
            </summary>
            
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              background: '#ffffff',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #e5e7eb',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              <strong>Error:</strong> {error.message}
              {error.stack && (
                <>
                  <br /><br />
                  <strong>Stack Trace:</strong><br />
                  {error.stack}
                </>
              )}
              {errorInfo?.componentStack && (
                <>
                  <br /><br />
                  <strong>Component Stack:</strong><br />
                  {errorInfo.componentStack}
                </>
              )}
            </div>
          </details>
        )}
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error fallback
      return this.renderErrorFallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
