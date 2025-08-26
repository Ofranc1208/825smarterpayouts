'use client';

import { useEffect } from 'react';

/**
 * Web Vitals Hook for Performance Monitoring
 * 
 * Tracks Core Web Vitals (LCP, FID, CLS) and reports to analytics
 * for continuous performance optimization.
 * 
 * @hook useWebVitals
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0
 */

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

export function useWebVitals() {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      // Track Cumulative Layout Shift
      onCLS((metric: WebVitalMetric) => {
        trackWebVital('CLS', metric);
      });

      // Track First Input Delay
      onFID((metric: WebVitalMetric) => {
        trackWebVital('FID', metric);
      });

      // Track First Contentful Paint
      onFCP((metric: WebVitalMetric) => {
        trackWebVital('FCP', metric);
      });

      // Track Largest Contentful Paint
      onLCP((metric: WebVitalMetric) => {
        trackWebVital('LCP', metric);
      });

      // Track Time to First Byte
      onTTFB((metric: WebVitalMetric) => {
        trackWebVital('TTFB', metric);
      });
    }).catch(() => {
      // Graceful fallback if web-vitals fails to load
      console.warn('Web Vitals library not available');
    });
  }, []);

  const trackWebVital = (name: string, metric: WebVitalMetric) => {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
        custom_map: {
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta
        }
      });
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          page: 'home',
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        }),
      }).catch(() => {
        // Silently fail - don't break user experience
      });
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Web Vital - ${name}:`, {
        value: metric.value,
        rating: getVitalRating(name, metric.value),
        id: metric.id
      });
    }
  };

  const getVitalRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  return {
    trackWebVital
  };
}
