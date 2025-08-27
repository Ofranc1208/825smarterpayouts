/**
 * Error Reporting Service
 * 
 * Centralized service for reporting navigation errors to analytics and monitoring
 * 
 * @module ErrorReportingService
 * @author SmarterPayouts Team
 * @since 2024
 */

import { track } from '@vercel/analytics';
import type { NavigationError } from '../../../types';
import type { ErrorInfo } from 'react';

export interface ErrorReportingOptions {
  enableAnalytics?: boolean;
  enableDashboard?: boolean;
  enableConsoleLogging?: boolean;
}

/**
 * Error Reporting Service Class
 */
export class ErrorReportingService {
  private options: Required<ErrorReportingOptions>;

  constructor(options: ErrorReportingOptions = {}) {
    this.options = {
      enableAnalytics: true,
      enableDashboard: true,
      enableConsoleLogging: process.env.NODE_ENV === 'development',
      ...options
    };
  }

  /**
   * Report error to all configured services
   */
  reportError(error: NavigationError, errorInfo: ErrorInfo, retryCount: number = 0): void {
    try {
      // Report to Vercel Analytics
      if (this.options.enableAnalytics) {
        this.reportToAnalytics(error, retryCount);
      }

      // Report to Performance Dashboard
      if (this.options.enableDashboard) {
        this.reportToDashboard(error);
      }

      // Log to console in development
      if (this.options.enableConsoleLogging) {
        this.logToConsole(error, errorInfo);
      }
    } catch (reportingError) {
      console.error('Failed to report navigation error:', reportingError);
    }
  }

  /**
   * Report retry attempt
   */
  reportRetry(componentName: string, retryCount: number, delay: number): void {
    if (!this.options.enableAnalytics) return;

    try {
      track('navigation_error_retry', {
        retry_count: retryCount,
        delay,
        component: componentName,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to report retry attempt:', error);
    }
  }

  /**
   * Report error boundary reset
   */
  reportReset(componentName: string): void {
    if (!this.options.enableAnalytics) return;

    try {
      track('navigation_error_reset', {
        component: componentName,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to report reset:', error);
    }
  }

  /**
   * Report to Vercel Analytics
   */
  private reportToAnalytics(error: NavigationError, retryCount: number): void {
    track('navigation_error', {
      error_code: error.code,
      error_message: error.message,
      component: error.component,
      timestamp: error.timestamp,
      retry_count: retryCount,
      user_agent: error.userAgent || 'Unknown',
      url: error.url || 'Unknown'
    });
  }

  /**
   * Report to Performance Dashboard
   */
  private reportToDashboard(error: NavigationError): void {
    if (typeof window !== 'undefined' && (window as any).navigationDashboard) {
      (window as any).navigationDashboard.reportError(error);
    }
  }

  /**
   * Log to console for development
   */
  private logToConsole(error: NavigationError, errorInfo: ErrorInfo): void {
    console.group('🚨 Navigation Error Boundary');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Navigation Error Object:', error);
    console.groupEnd();
  }

  /**
   * Create navigation error object from native error
   */
  static createNavigationError(
    error: Error, 
    componentName: string = 'NavigationComponent'
  ): NavigationError {
    return {
      code: 'NAVIGATION_COMPONENT_ERROR',
      message: error.message,
      timestamp: Date.now(),
      component: componentName,
      stack: error.stack,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };
  }

  /**
   * Generate unique error ID
   */
  static generateErrorId(): string {
    return `nav_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Default singleton instance
export const defaultErrorReporter = new ErrorReportingService();

export default ErrorReportingService;
