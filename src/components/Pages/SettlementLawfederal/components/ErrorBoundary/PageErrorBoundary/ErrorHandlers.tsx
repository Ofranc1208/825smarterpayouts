'use client';

import { ErrorAnalytics } from './ErrorAnalytics';
import { ErrorReporting } from './ErrorReporting';

/**
 * Error Handlers Module
 * Following enterprise patterns - focused on event handlers and recovery logic only
 */
export class ErrorHandlers {
  static createRetryHandler(setState: (state: any) => void) {
    return () => {
      // Reset error state
      setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined 
      });
      
      // Track retry attempt
      ErrorAnalytics.trackErrorRecovery('retry');
      
      // Log retry for debugging
      console.log('Settlement Law Federal: Page error boundary retry attempted');
      
      // Optional: Reload critical resources
      ErrorHandlers.reloadCriticalResources();
    };
  }

  static createHomeHandler() {
    return () => {
      // Track home navigation
      ErrorAnalytics.trackErrorRecovery('home');
      
      // Navigate to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    };
  }

  static createReportHandler(error: Error | undefined) {
    return async () => {
      if (!error) return;
      
      // Track error reporting
      ErrorAnalytics.trackErrorRecovery('report');
      
      try {
        // Attempt to report error
        await ErrorReporting.reportError(error);
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError);
        
        // Fallback: Show simple alert
        if (typeof window !== 'undefined') {
          alert('Unable to copy error details. Please contact support at (855) 582-3506.');
        }
      }
    };
  }

  static createEmailSupportHandler(error: Error | undefined) {
    return async () => {
      if (!error) return;
      
      try {
        await ErrorReporting.sendErrorToSupport(error);
      } catch (emailError) {
        console.error('Failed to create email report:', emailError);
        
        // Fallback to basic reporting
        const fallbackHandler = ErrorHandlers.createReportHandler(error);
        fallbackHandler();
      }
    };
  }

  private static reloadCriticalResources() {
    if (typeof window === 'undefined') return;

    try {
      // Clear any cached data that might be causing issues
      if (window.sessionStorage) {
        // Clear session storage for this page
        const keysToRemove = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const key = window.sessionStorage.key(i);
          if (key && key.includes('settlement-law')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => window.sessionStorage.removeItem(key));
      }

      // Reload any failed stylesheets
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((stylesheet) => {
        const link = stylesheet as HTMLLinkElement;
        if (link.href && !link.href.includes('fonts.googleapis.com')) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.href + '?reload=' + Date.now();
          newLink.onload = () => {
            if (document.head.contains(link)) {
              document.head.removeChild(link);
            }
          };
          document.head.appendChild(newLink);
        }
      });

      // Preload critical resources for the page
      ErrorHandlers.preloadCriticalResources();
      
    } catch (reloadError) {
      console.warn('Failed to reload critical resources:', reloadError);
    }
  }

  private static preloadCriticalResources() {
    if (typeof window === 'undefined') return;

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = '/fonts/inter-var.woff2';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    
    if (!document.head.querySelector(`link[href="${fontPreload.href}"]`)) {
      document.head.appendChild(fontPreload);
    }

    // Prefetch likely recovery pages
    const recoveryPages = ['/', '/contact', '/pricing-calculator'];
    recoveryPages.forEach(page => {
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = page;
      
      if (!document.head.querySelector(`link[href="${page}"][rel="prefetch"]`)) {
        document.head.appendChild(prefetch);
      }
    });
  }

  static setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return;

    // Global unhandled error handler
    window.addEventListener('error', (event) => {
      console.error('Global error in Settlement Law Federal:', event.error);
      
      // Track global errors
      if ((window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `Global Error: ${event.error?.message || 'Unknown error'}`,
          fatal: false,
          error_boundary: 'GlobalHandler',
          page: 'settlement-law-federal'
        });
      }
    });

    // Global unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection in Settlement Law Federal:', event.reason);
      
      // Track promise rejections
      if ((window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `Promise Rejection: ${event.reason?.message || 'Unknown rejection'}`,
          fatal: false,
          error_boundary: 'PromiseHandler',
          page: 'settlement-law-federal'
        });
      }
    });

    // Resource loading error handler
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        const target = event.target as HTMLElement;
        if (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
          console.warn('Resource loading error in Settlement Law Federal:', target);
          
          // Track resource errors
          if ((window as any).gtag) {
            (window as any).gtag('event', 'exception', {
              description: `Resource Error: ${target.tagName} failed to load`,
              fatal: false,
              error_boundary: 'ResourceHandler',
              page: 'settlement-law-federal'
            });
          }
        }
      }
    }, true);
  }

  static cleanup() {
    // Clean up any global handlers or resources when component unmounts
    if (typeof window === 'undefined') return;

    // Remove any temporary elements created by error handlers
    const tempElements = document.querySelectorAll('[data-settlement-law-error]');
    tempElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    // Clear any error-related session storage
    if (window.sessionStorage) {
      const keysToRemove = [];
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const key = window.sessionStorage.key(i);
        if (key && key.includes('settlement-law-error')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => window.sessionStorage.removeItem(key));
    }
  }
}
