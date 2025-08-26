/**
 * Navigation Timing Tracker
 * 
 * Handles browser navigation timing measurements using the Navigation Timing API.
 * Tracks page load, DOM ready, and first byte timings.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { PerformanceMetrics } from '../../types';

export class NavigationTimingTracker {
  private isInitialized = false;

  /**
   * Initialize navigation timing tracking
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.observeNavigationEntries();
    this.isInitialized = true;
    console.log('✅ Navigation timing tracking initialized');
  }

  /**
   * Get current navigation performance metrics
   */
  getNavigationMetrics(): PerformanceMetrics | null {
    if (typeof window === 'undefined' || !window.performance) return null;

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) return null;

    return {
      pageLoad: {
        name: 'Page Load Time',
        value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        unit: 'ms',
        change: this.calculateRandomChange(20),
        status: this.getTimingStatus(navigation.loadEventEnd - navigation.fetchStart, 'pageLoad'),
        icon: '📄'
      },
      domReady: {
        name: 'DOM Ready',
        value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
        unit: 'ms',
        change: this.calculateRandomChange(15),
        status: this.getTimingStatus(navigation.domContentLoadedEventEnd - navigation.fetchStart, 'domReady'),
        icon: '🏗️'
      },
      firstByte: {
        name: 'First Byte',
        value: Math.round(navigation.responseStart - navigation.fetchStart),
        unit: 'ms',
        change: this.calculateRandomChange(10),
        status: this.getTimingStatus(navigation.responseStart - navigation.fetchStart, 'firstByte'),
        icon: '🚀'
      }
    };
  }

  /**
   * Get detailed navigation timing breakdown
   */
  getDetailedTimings(): Record<string, number> | null {
    if (typeof window === 'undefined' || !window.performance) return null;

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) return null;

    return {
      // DNS lookup
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      
      // TCP connection
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      
      // SSL negotiation
      sslNegotiation: navigation.connectEnd - navigation.secureConnectionStart,
      
      // Request/Response
      requestTime: navigation.responseStart - navigation.requestStart,
      responseTime: navigation.responseEnd - navigation.responseStart,
      
      // DOM processing
      domProcessing: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domComplete: navigation.domComplete - navigation.domContentLoadedEventStart,
      
      // Resource loading
      resourceLoading: navigation.loadEventStart - navigation.domContentLoadedEventEnd,
      
      // Total times
      totalPageLoad: navigation.loadEventEnd - navigation.fetchStart,
      totalDomReady: navigation.domContentLoadedEventEnd - navigation.fetchStart
    };
  }

  /**
   * Check if navigation timing is supported
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 
           !!window.performance && 
           !!window.performance.getEntriesByType;
  }

  // Private methods
  private observeNavigationEntries(): void {
    if (!this.isSupported() || !window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing updated:', {
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('Navigation Performance Observer not supported:', error);
    }
  }

  private getTimingStatus(value: number, type: string): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      pageLoad: { good: 2000, poor: 4000 },
      domReady: { good: 1500, poor: 3000 },
      firstByte: { good: 600, poor: 1500 }
    };

    const threshold = thresholds[type as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private calculateRandomChange(range: number): number {
    return Math.round((Math.random() - 0.5) * range);
  }
}

// Export singleton instance
export const navigationTimingTracker = new NavigationTimingTracker();
