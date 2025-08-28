// Settlement Law Federal - Analytics Utilities
// Following enterprise patterns - centralized analytics functions

import { ANALYTICS_CONFIG, PERFORMANCE_THRESHOLDS } from './constants';

/**
 * Analytics Utility Functions
 * Centralized analytics logic for Settlement Law Federal page
 */
export class SettlementLawAnalytics {
  /**
   * Track page view with enhanced context
   */
  static trackPageView(additionalData?: Record<string, any>) {
    const eventData = {
      page: 'settlement-law-federal',
      category: ANALYTICS_CONFIG.category,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      ...additionalData
    };

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', ANALYTICS_CONFIG.events.pageView, {
        event_category: ANALYTICS_CONFIG.category,
        event_label: 'Federal Law Page View',
        custom_parameters: eventData
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', ANALYTICS_CONFIG.events.pageView, eventData);
    }

    // Performance Dashboard integration
    this.reportToPerformanceDashboard('pageView', eventData);

    return eventData;
  }

  /**
   * Track section interactions
   */
  static trackSectionView(sectionName: string, additionalData?: Record<string, any>) {
    const eventData = {
      section: sectionName,
      page: 'settlement-law-federal',
      category: ANALYTICS_CONFIG.category,
      timestamp: new Date().toISOString(),
      ...additionalData
    };

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', ANALYTICS_CONFIG.events.sectionView, {
        event_category: ANALYTICS_CONFIG.category,
        event_label: `Section: ${sectionName}`,
        section_name: sectionName
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', ANALYTICS_CONFIG.events.sectionView, eventData);
    }

    this.reportToPerformanceDashboard('sectionView', eventData);
    return eventData;
  }

  /**
   * Track user interactions (clicks, downloads, etc.)
   */
  static trackInteraction(
    interactionType: 'link_click' | 'download' | 'cta_click' | 'form_submit',
    target: string,
    additionalData?: Record<string, any>
  ) {
    const eventData = {
      interaction_type: interactionType,
      target,
      page: 'settlement-law-federal',
      category: ANALYTICS_CONFIG.category,
      timestamp: new Date().toISOString(),
      ...additionalData
    };

    const eventName = interactionType === 'link_click' 
      ? ANALYTICS_CONFIG.events.linkClick
      : interactionType === 'download'
      ? ANALYTICS_CONFIG.events.downloadClick
      : ANALYTICS_CONFIG.events.ctaClick;

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: ANALYTICS_CONFIG.category,
        event_label: target,
        interaction_type: interactionType
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', eventName, eventData);
    }

    this.reportToPerformanceDashboard('interaction', eventData);
    return eventData;
  }

  /**
   * Track performance metrics
   */
  static trackPerformance(metrics: {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
    pageLoadTime?: number;
    domContentLoaded?: number;
  }) {
    const eventData = {
      ...metrics,
      page: 'settlement-law-federal',
      category: ANALYTICS_CONFIG.category,
      timestamp: new Date().toISOString(),
      
      // Performance scoring
      lcpScore: this.getPerformanceScore(metrics.lcp, PERFORMANCE_THRESHOLDS.lcp),
      fidScore: this.getPerformanceScore(metrics.fid, PERFORMANCE_THRESHOLDS.fid),
      clsScore: this.getPerformanceScore(metrics.cls, PERFORMANCE_THRESHOLDS.cls, true),
      overallScore: this.calculateOverallPerformanceScore(metrics)
    };

    // Google Analytics - Performance event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: 'Settlement Law Federal',
        custom_parameters: eventData
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'performance_metrics', eventData);
    }

    // Performance Dashboard integration
    this.reportToPerformanceDashboard('performance', eventData);
    return eventData;
  }

  /**
   * Track errors with context
   */
  static trackError(
    error: Error | string,
    context?: {
      component?: string;
      section?: string;
      action?: string;
      severity?: 'low' | 'medium' | 'high' | 'critical';
    }
  ) {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;

    const eventData = {
      error_message: errorMessage,
      error_stack: errorStack,
      page: 'settlement-law-federal',
      category: ANALYTICS_CONFIG.category,
      timestamp: new Date().toISOString(),
      ...context,
      
      // Browser context
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      
      // Performance context
      memory: typeof window !== 'undefined' && (window.performance as any).memory 
        ? {
            usedJSHeapSize: (window.performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (window.performance as any).memory.totalJSHeapSize
          }
        : null
    };

    // Google Analytics - Error event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', ANALYTICS_CONFIG.events.errorOccurred, {
        event_category: 'Error',
        event_label: errorMessage,
        fatal: context?.severity === 'critical',
        custom_parameters: eventData
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', ANALYTICS_CONFIG.events.errorOccurred, eventData);
    }

    // Performance Dashboard integration
    this.reportToPerformanceDashboard('error', eventData);
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Settlement Law Federal Error:', eventData);
    }

    return eventData;
  }

  /**
   * Calculate performance score (0-100)
   */
  private static getPerformanceScore(
    value: number | undefined, 
    threshold: number, 
    isReverse: boolean = false
  ): number {
    if (value === undefined) return 0;
    
    if (isReverse) {
      // For CLS - lower is better
      return Math.max(0, Math.min(100, (1 - (value / threshold)) * 100));
    } else {
      // For LCP, FID, etc. - lower is better
      return Math.max(0, Math.min(100, (1 - (value / threshold)) * 100));
    }
  }

  /**
   * Calculate overall performance score
   */
  private static calculateOverallPerformanceScore(metrics: {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
  }): number {
    const scores = [
      this.getPerformanceScore(metrics.lcp, PERFORMANCE_THRESHOLDS.lcp),
      this.getPerformanceScore(metrics.fid, PERFORMANCE_THRESHOLDS.fid),
      this.getPerformanceScore(metrics.cls, PERFORMANCE_THRESHOLDS.cls, true),
      this.getPerformanceScore(metrics.fcp, PERFORMANCE_THRESHOLDS.fcp),
      this.getPerformanceScore(metrics.ttfb, PERFORMANCE_THRESHOLDS.ttfb)
    ].filter(score => score > 0);

    return scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0;
  }

  /**
   * Report to Performance Dashboard
   * Integrates with existing performance monitoring system
   */
  private static reportToPerformanceDashboard(
    eventType: string, 
    data: Record<string, any>
  ) {
    try {
      // Check if Performance Dashboard is available
      if (typeof window !== 'undefined' && (window as any).PerformanceDashboard) {
        (window as any).PerformanceDashboard.reportEvent({
          type: eventType,
          page: 'settlement-law-federal',
          data,
          timestamp: new Date().toISOString()
        });
      }

      // Alternative: Store in sessionStorage for dashboard pickup
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const existingData = JSON.parse(
          window.sessionStorage.getItem('performance-dashboard-events') || '[]'
        );
        
        existingData.push({
          type: eventType,
          page: 'settlement-law-federal',
          data,
          timestamp: new Date().toISOString()
        });

        // Keep only last 100 events to prevent memory issues
        if (existingData.length > 100) {
          existingData.splice(0, existingData.length - 100);
        }

        window.sessionStorage.setItem(
          'performance-dashboard-events', 
          JSON.stringify(existingData)
        );
      }
    } catch (error) {
      console.warn('Failed to report to Performance Dashboard:', error);
    }
  }

  /**
   * Get analytics summary for dashboard
   */
  static getAnalyticsSummary(): {
    totalEvents: number;
    pageViews: number;
    interactions: number;
    errors: number;
    performanceScore: number;
  } {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const events = JSON.parse(
          window.sessionStorage.getItem('performance-dashboard-events') || '[]'
        );

        const federalLawEvents = events.filter((event: any) => 
          event.page === 'settlement-law-federal'
        );

        return {
          totalEvents: federalLawEvents.length,
          pageViews: federalLawEvents.filter((e: any) => e.type === 'pageView').length,
          interactions: federalLawEvents.filter((e: any) => e.type === 'interaction').length,
          errors: federalLawEvents.filter((e: any) => e.type === 'error').length,
          performanceScore: this.getLatestPerformanceScore(federalLawEvents)
        };
      }
    } catch (error) {
      console.warn('Failed to get analytics summary:', error);
    }

    return {
      totalEvents: 0,
      pageViews: 0,
      interactions: 0,
      errors: 0,
      performanceScore: 0
    };
  }

  /**
   * Get latest performance score from events
   */
  private static getLatestPerformanceScore(events: any[]): number {
    const performanceEvents = events
      .filter((e: any) => e.type === 'performance')
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return performanceEvents.length > 0 
      ? performanceEvents[0].data.overallScore || 0
      : 0;
  }
}
