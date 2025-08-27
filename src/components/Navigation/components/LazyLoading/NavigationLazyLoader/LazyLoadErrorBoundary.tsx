/**
 * Lazy Load Error Boundary
 * 
 * Error boundary specifically for lazy loaded navigation components
 * 
 * @module LazyLoadErrorBoundary
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { Component, ErrorInfo } from 'react';
import { track } from '@vercel/analytics';
import { LazyLoadFallbackUI } from './errorBoundary/LazyLoadFallbackUI';

interface LazyLoadErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName: string;
  enableRetry?: boolean;
  maxRetries?: number;
}

interface LazyLoadErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  errorId: string;
}

/**
 * Error boundary for lazy loaded components with retry functionality
 */
export class LazyLoadErrorBoundary extends Component<
  LazyLoadErrorBoundaryProps,
  LazyLoadErrorBoundaryState
> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: LazyLoadErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<LazyLoadErrorBoundaryState> {
    const errorId = `lazy_load_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName } = this.props;
    
    console.error(`Failed to lazy load ${componentName}:`, error);
    
    // Track error in analytics
    track('navigation_lazy_load_error', {
      component: componentName,
      error: error.message,
      stack: error.stack || 'No stack trace',
      componentStack: errorInfo.componentStack || 'No component stack',
      retryCount: this.state.retryCount,
      timestamp: Date.now()
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Lazy Load Error: ${componentName}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Retry Count:', this.state.retryCount);
      console.groupEnd();
    }
  }

  /**
   * Retry loading the component
   */
  private handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      console.warn(`Maximum retry attempts (${maxRetries}) reached for ${this.props.componentName}`);
      return;
    }

    // Clear previous timeout
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    // Exponential backoff: 1s, 2s, 4s
    const delay = Math.pow(2, retryCount) * 1000;

    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        retryCount: retryCount + 1
      });

      // Track retry attempt
      track('navigation_lazy_load_retry', {
        component: this.props.componentName,
        retryCount: retryCount + 1,
        delay,
        timestamp: Date.now()
      });
    }, delay);
  };

  /**
   * Reset error boundary state
   */
  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      retryCount: 0,
      errorId: ''
    });

    track('navigation_lazy_load_reset', {
      component: this.props.componentName,
      timestamp: Date.now()
    });
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return this.renderDefaultFallback();
    }

    return this.props.children;
  }

  /**
   * Render default fallback UI for lazy load errors
   */
  private renderDefaultFallback() {
    const { componentName, enableRetry = true, maxRetries = 3 } = this.props;
    const { error, retryCount, errorId } = this.state;

    return (
      <LazyLoadFallbackUI
        componentName={componentName}
        error={error}
        retryCount={retryCount}
        errorId={errorId}
        enableRetry={enableRetry}
        maxRetries={maxRetries}
        onRetry={this.handleRetry}
        onReset={this.handleReset}
      />
    );
  }
}

export default LazyLoadErrorBoundary;
