'use client';

import { ErrorInfo } from 'react';

/**
 * Error Analytics Module
 * Following enterprise patterns - focused on error tracking and analytics only
 */
export class ErrorAnalytics {
  static trackPageError(error: Error, errorInfo: ErrorInfo) {
    // Log error for monitoring
    console.error('Settlement Law Federal Page Error:', error, errorInfo);
    
    // Track error with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `Settlement Law Page Error: ${error.message}`,
        fatal: false,
        error_boundary: 'PageErrorBoundary',
        page: 'settlement-law-federal',
        error_type: error.name,
        error_stack: error.stack?.substring(0, 100) // Truncate for analytics
      });
    }

    // Track with Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Page Error', {
        error_message: error.message,
        error_type: error.name,
        page: 'settlement-law-federal'
      });
    }

    // Report to production error monitoring
    if (process.env.NODE_ENV === 'production') {
      ErrorAnalytics.reportProductionError(error, errorInfo);
    }
  }

  static trackErrorRecovery(recoveryType: 'retry' | 'home' | 'report') {
    // Track recovery attempt with analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'error_recovery', {
        event_category: 'Settlement Law Federal',
        event_label: `Page Error Boundary ${recoveryType}`,
        recovery_type: recoveryType
      });
    }

    // Track with Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Error Recovery', {
        recovery_type: recoveryType,
        page: 'settlement-law-federal'
      });
    }

    // Log recovery attempt
    console.log(`Settlement Law Page Error Recovery: ${recoveryType}`);
  }

  private static reportProductionError(error: Error, errorInfo: ErrorInfo) {
    // Integration point for error monitoring services (Sentry, LogRocket, etc.)
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      page: 'settlement-law-federal',
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    };

    console.error('Production error in Settlement Law Federal page:', errorReport);

    // TODO: Integrate with actual error monitoring service
    // Example integrations:
    // - Sentry.captureException(error, { extra: errorReport });
    // - LogRocket.captureException(error);
    // - Bugsnag.notify(error, { metaData: errorReport });
  }

  static getErrorMetrics() {
    // Return error metrics for monitoring dashboard
    return {
      page: 'settlement-law-federal',
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      viewport: typeof window !== 'undefined' ? {
        width: window.innerWidth,
        height: window.innerHeight
      } : null
    };
  }
}
