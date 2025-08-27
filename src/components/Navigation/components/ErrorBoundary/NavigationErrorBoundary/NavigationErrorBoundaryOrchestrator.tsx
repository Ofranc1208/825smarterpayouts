/**
 * Navigation Error Boundary Orchestrator - Enterprise Edition
 * 
 * Main orchestrator that coordinates error handling, reporting, and UI fallback
 * 
 * @module NavigationErrorBoundaryOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorReportingService, defaultErrorReporter } from './ErrorReportingService';
import { RetryHandler } from './RetryHandler';
import { ErrorFallbackUI } from './ErrorFallbackUI';
import type { NavigationError } from '../../../types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: NavigationError) => void;
  showErrorDetails?: boolean;
  enableRetry?: boolean;
  componentName?: string;
  maxRetries?: number;
  enableAnalytics?: boolean;
  enableDashboard?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  errorId: string;
}

/**
 * Navigation Error Boundary Orchestrator
 * 
 * Coordinates all error boundary functionality using modular services
 */
export class NavigationErrorBoundaryOrchestrator extends Component<Props, State> {
  private errorReporter: ErrorReportingService;
  private retryHandler: RetryHandler;

  constructor(props: Props) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      errorId: ''
    };

    // Initialize services
    this.errorReporter = new ErrorReportingService({
      enableAnalytics: props.enableAnalytics,
      enableDashboard: props.enableDashboard
    });

    this.retryHandler = new RetryHandler({
      maxRetries: props.maxRetries || 3
    });
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: ErrorReportingService.generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Create navigation error object
    const navigationError = ErrorReportingService.createNavigationError(
      error,
      this.props.componentName || 'NavigationComponent'
    );

    // Report error
    this.errorReporter.reportError(navigationError, errorInfo, this.state.retryCount);

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(navigationError);
    }
  }

  /**
   * Handle retry attempt
   */
  private handleRetry = () => {
    const { retryCount } = this.state;
    const componentName = this.props.componentName || 'NavigationComponent';

    const success = this.retryHandler.executeRetry(
      retryCount,
      () => {
        // Reset error state and increment retry count
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          retryCount: retryCount + 1
        });
      },
      (delay) => {
        // Report retry attempt
        this.errorReporter.reportRetry(componentName, retryCount + 1, delay);
      }
    );

    if (!success) {
      console.warn(`Cannot retry: maximum attempts reached for ${componentName}`);
    }
  };

  /**
   * Handle error boundary reset
   */
  private handleReset = () => {
    const componentName = this.props.componentName || 'NavigationComponent';

    // Clear retry timeouts
    this.retryHandler.clearTimeouts();

    // Reset state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      errorId: ''
    });

    // Report reset
    this.errorReporter.reportReset(componentName);
  };

  componentWillUnmount() {
    // Cleanup resources
    this.retryHandler.cleanup();
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use modular fallback UI
      return (
        <ErrorFallbackUI
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          retryCount={this.state.retryCount}
          componentName={this.props.componentName || 'NavigationComponent'}
          showErrorDetails={this.props.showErrorDetails}
          enableRetry={this.props.enableRetry}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default NavigationErrorBoundaryOrchestrator;
