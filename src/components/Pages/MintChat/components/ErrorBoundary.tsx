'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import FallbackUI from './ErrorBoundary/FallbackUI';
import { reportError, shouldNotifyUser } from './ErrorBoundary/errorReporter';

/**
 * Error Boundary Component for MintChat - Refactored
 * 
 * Now uses modular sub-components for better maintainability:
 * - FallbackUI: User-facing error display
 * - errorReporter: Error tracking and analytics
 * 
 * Original 294 lines split into focused modules
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

export default class ErrorBoundary extends Component<Props, State> {
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
    // Store error info in state
    this.setState({
      error,
      errorInfo
    });

    // Report error using modular reporter
    reportError(error, errorInfo, {
      component: 'MintChat',
      userId: this.getUserId(),
      sessionId: this.getSessionId()
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show user notification for critical errors
    if (shouldNotifyUser(error)) {
      this.showErrorNotification(error);
    }
  }

  private getUserId(): string | undefined {
    // Get user ID from localStorage, cookies, or context
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || undefined;
    }
    return undefined;
  }

  private getSessionId(): string | undefined {
    // Get session ID from sessionStorage or generate one
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    }
    return undefined;
  }

  private showErrorNotification(error: Error) {
    // Show browser notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('MintChat Error', {
          body: 'An error occurred in MintChat. Please refresh the page.',
          icon: '/assets/images/mint-mascot.webp'
        });
      }
    }
  }

  private resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use modular FallbackUI component
      return (
        <FallbackUI
          error={this.state.error}
          resetError={this.resetError}
          isDevelopment={process.env.NODE_ENV === 'development'}
        />
      );
    }

    return this.props.children;
  }
}