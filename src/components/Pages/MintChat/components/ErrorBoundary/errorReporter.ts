'use client';

import { ErrorInfo } from 'react';

/**
 * Error reporting utilities
 * Handles error logging, analytics, and external reporting
 */

interface ErrorReport {
  error: Error;
  errorInfo: ErrorInfo;
  userAgent: string;
  url: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

/**
 * Report error to analytics and external services
 */
export function reportError(error: Error, errorInfo: ErrorInfo, additionalContext?: Record<string, any>) {
  const errorReport: ErrorReport = {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack || 'No stack trace available'
    } as Error,
    errorInfo,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
    timestamp: new Date().toISOString(),
    ...additionalContext
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Full Report:', errorReport);
    console.groupEnd();
  }

  // Report to analytics (if available)
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          component_stack: errorInfo.componentStack
        }
      });
    }
  } catch (analyticsError) {
    console.warn('Failed to report error to analytics:', analyticsError);
  }

  // Report to external error tracking service (Sentry, LogRocket, etc.)
  try {
    // Example: Sentry integration
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.withScope((scope: any) => {
        scope.setTag('errorBoundary', 'MintChat');
        scope.setContext('errorInfo', errorInfo);
        scope.setContext('additionalContext', additionalContext);
        (window as any).Sentry.captureException(error);
      });
    }
  } catch (sentryError) {
    console.warn('Failed to report error to Sentry:', sentryError);
  }

  // Report to custom error endpoint
  try {
    if (typeof window !== 'undefined') {
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      }).catch(fetchError => {
        console.warn('Failed to report error to custom endpoint:', fetchError);
      });
    }
  } catch (fetchError) {
    console.warn('Failed to setup error reporting fetch:', fetchError);
  }
}

/**
 * Get error severity based on error type and context
 */
export function getErrorSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
  // Critical errors that break core functionality
  if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
    return 'critical';
  }
  
  // High severity for component rendering errors
  if (error.name === 'TypeError' && error.stack?.includes('render')) {
    return 'high';
  }
  
  // Medium severity for network errors
  if (error.name === 'NetworkError' || error.message.includes('fetch')) {
    return 'medium';
  }
  
  // Default to medium severity
  return 'medium';
}

/**
 * Check if error should trigger user notification
 */
export function shouldNotifyUser(error: Error): boolean {
  const severity = getErrorSeverity(error);
  
  // Only notify for high and critical errors
  return severity === 'high' || severity === 'critical';
}
