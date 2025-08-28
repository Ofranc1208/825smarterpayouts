'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorAnalytics, ErrorReporting, ErrorUI, ErrorHandlers } from './PageErrorBoundary/';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Page-Level Error Boundary - Main Orchestrator
 * Following enterprise patterns - clean orchestrator under 100 lines
 * 
 * Provides comprehensive error handling by composing focused modules
 */
export default class PageErrorBoundary extends Component<Props, State> {
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

  componentDidMount() {
    // Setup global error handlers
    ErrorHandlers.setupGlobalErrorHandlers();
    
    // Add error UI styles
    ErrorUI.addErrorStyles();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error with analytics
    ErrorAnalytics.trackPageError(error, errorInfo);
    
    // Store error info for UI
    this.setState({
      error,
      errorInfo
    });
  }

  componentWillUnmount() {
    // Cleanup error handlers
    ErrorHandlers.cleanup();
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Create event handlers
      const handleRetry = ErrorHandlers.createRetryHandler(this.setState.bind(this));
      const handleGoHome = ErrorHandlers.createHomeHandler();
      const handleReportError = ErrorHandlers.createReportHandler(this.state.error);

      // Render error UI
      return ErrorUI.renderPageError(
        this.state.error,
        handleRetry,
        handleGoHome,
        handleReportError
      );
    }

    return this.props.children;
  }
}