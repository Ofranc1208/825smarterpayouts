import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Navigation Error Boundary Component
 * 
 * Catches and handles errors in navigation components gracefully,
 * preventing the entire application from crashing due to navigation issues.
 * 
 * @component NavigationErrorBoundary
 * @author SmarterPayouts Team
 * @since 2024
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Navigation Error Boundary
 * 
 * Provides error handling for navigation components with graceful fallback UI
 */
class NavigationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    console.error('Navigation Error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // Example: errorReportingService.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div 
          style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.375rem',
            color: '#dc2626',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}
          role="alert"
          aria-live="polite"
        >
          <strong>Navigation Error:</strong> Something went wrong with the navigation. 
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginLeft: '0.5rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NavigationErrorBoundary;
