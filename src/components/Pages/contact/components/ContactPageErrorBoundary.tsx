'use client';
import React from 'react';

interface ContactPageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ContactPageErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export default class ContactPageErrorBoundary extends React.Component<
  ContactPageErrorBoundaryProps,
  ContactPageErrorBoundaryState
> {
  constructor(props: ContactPageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ContactPageErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Contact Page Error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          margin: "2rem auto",
          maxWidth: "600px"
        }}>
          <div style={{
            fontSize: "3rem",
            marginBottom: "1rem"
          }}>
            ⚠️
          </div>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#991b1b",
            marginBottom: "1rem"
          }}>
            Something went wrong
          </h2>
          <p style={{
            color: "#7f1d1d",
            marginBottom: "2rem"
          }}>
            We're sorry, but there was an error loading the contact page. Please try refreshing the page or contact us directly.
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#dc2626",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Refresh Page
            </button>
            <a
              href="tel:+1-800-555-0123"
              style={{
                background: "#059669",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Call Us Instead
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
