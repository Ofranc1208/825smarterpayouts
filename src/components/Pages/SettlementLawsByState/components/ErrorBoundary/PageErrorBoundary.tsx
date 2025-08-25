// Page-level error boundary
// Medium complexity component - under 150 lines per rule

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to analytics service
    if (typeof window !== 'undefined') {
      console.error('Settlement Laws Page Error:', error, errorInfo);
      
      // Track error in analytics
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: `Settlement Laws Error: ${error.message}`,
          fatal: true,
          page_title: 'Settlement Laws by State'
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#f9fafb'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              ⚖️
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              Settlement Laws Page Error
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              We're experiencing technical difficulties with the Settlement Laws page. 
              Our team has been notified and is working to resolve this issue.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#059669',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
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
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                🏠 Go Home
              </a>
              <a
                href="tel:8555823506"
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                📞 Call Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
