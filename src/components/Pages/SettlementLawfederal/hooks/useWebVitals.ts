// Settlement Law Federal - Web Vitals Hook
// Following enterprise patterns - Core Web Vitals monitoring hook

import { useEffect, useState, useCallback } from 'react';
import { PERFORMANCE_THRESHOLDS, FEATURE_FLAGS } from '../utils/constants';
import { SettlementLawAnalytics } from '../utils/analytics';

interface WebVitalsMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  inp: number | null; // Interaction to Next Paint (new metric)
}

interface WebVitalsScores {
  lcp: 'good' | 'needs-improvement' | 'poor' | null;
  fid: 'good' | 'needs-improvement' | 'poor' | null;
  cls: 'good' | 'needs-improvement' | 'poor' | null;
  fcp: 'good' | 'needs-improvement' | 'poor' | null;
  ttfb: 'good' | 'needs-improvement' | 'poor' | null;
  inp: 'good' | 'needs-improvement' | 'poor' | null;
  overall: number; // 0-100 score
}

interface UseWebVitalsReturn {
  metrics: WebVitalsMetrics;
  scores: WebVitalsScores;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * useWebVitals Hook
 * 
 * Enterprise-grade Core Web Vitals monitoring for Settlement Law Federal page.
 * Integrates with Performance Dashboard and provides real-time metrics.
 * 
 * @returns Web Vitals metrics, scores, and control functions
 */
export function useWebVitals(): UseWebVitalsReturn {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate performance scores based on metrics
  const calculateScores = useCallback((currentMetrics: WebVitalsMetrics): WebVitalsScores => {
    const getScore = (value: number | null, goodThreshold: number, poorThreshold: number): 'good' | 'needs-improvement' | 'poor' | null => {
      if (value === null) return null;
      if (value <= goodThreshold) return 'good';
      if (value <= poorThreshold) return 'needs-improvement';
      return 'poor';
    };

    const getScoreForCLS = (value: number | null): 'good' | 'needs-improvement' | 'poor' | null => {
      if (value === null) return null;
      if (value <= 0.1) return 'good';
      if (value <= 0.25) return 'needs-improvement';
      return 'poor';
    };

    const scores = {
      lcp: getScore(currentMetrics.lcp, 2500, 4000),
      fid: getScore(currentMetrics.fid, 100, 300),
      cls: getScoreForCLS(currentMetrics.cls),
      fcp: getScore(currentMetrics.fcp, 1800, 3000),
      ttfb: getScore(currentMetrics.ttfb, 800, 1800),
      inp: getScore(currentMetrics.inp, 200, 500),
      overall: 0
    };

    // Calculate overall score (0-100)
    const scoreValues = Object.values(scores).filter(score => score !== null && score !== 0);
    const goodCount = scoreValues.filter(score => score === 'good').length;
    const needsImprovementCount = scoreValues.filter(score => score === 'needs-improvement').length;
    const poorCount = scoreValues.filter(score => score === 'poor').length;
    const totalCount = scoreValues.length;

    if (totalCount === 0) {
      scores.overall = 0;
    } else {
      scores.overall = Math.round(
        ((goodCount * 100) + (needsImprovementCount * 60) + (poorCount * 20)) / totalCount
      );
    }

    return scores;
  }, []);

  const [scores, setScores] = useState<WebVitalsScores>(() => calculateScores(metrics));

  // Update scores when metrics change
  useEffect(() => {
    setScores(calculateScores(metrics));
  }, [metrics, calculateScores]);

  // Initialize Web Vitals tracking
  const initializeWebVitals = useCallback(async () => {
    if (!FEATURE_FLAGS.enableWebVitals || typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Dynamic import to avoid blocking initial load
      const webVitalsModule = await import('web-vitals');
      const { getCLS, getFID, getFCP, getLCP, getTTFB, onINP } = webVitalsModule;

      // Track LCP (Largest Contentful Paint)
      getLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }));
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 LCP: ${metric.value.toFixed(2)}ms`);
        }
        
        SettlementLawAnalytics.trackPerformance({ lcp: metric.value });
      });

      // Track FID (First Input Delay)
      getFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }));
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 FID: ${metric.value.toFixed(2)}ms`);
        }
        
        SettlementLawAnalytics.trackPerformance({ fid: metric.value });
      });

      // Track CLS (Cumulative Layout Shift)
      getCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }));
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 CLS: ${metric.value.toFixed(4)}`);
        }
        
        SettlementLawAnalytics.trackPerformance({ cls: metric.value });
      });

      // Track FCP (First Contentful Paint)
      getFCP((metric) => {
        setMetrics(prev => ({ ...prev, fcp: metric.value }));
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 FCP: ${metric.value.toFixed(2)}ms`);
        }
        
        SettlementLawAnalytics.trackPerformance({ fcp: metric.value });
      });

      // Track TTFB (Time to First Byte)
      getTTFB((metric) => {
        setMetrics(prev => ({ ...prev, ttfb: metric.value }));
        
        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 TTFB: ${metric.value.toFixed(2)}ms`);
        }
        
        SettlementLawAnalytics.trackPerformance({ ttfb: metric.value });
      });

      // Track INP (Interaction to Next Paint) - New metric
      if (onINP) {
        onINP((metric) => {
          setMetrics(prev => ({ ...prev, inp: metric.value }));
          
          if (FEATURE_FLAGS.enableVerboseLogging) {
            console.log(`📊 INP: ${metric.value.toFixed(2)}ms`);
          }
          
          SettlementLawAnalytics.trackPerformance({ 
          pageLoadTime: metric.value // Map INP to pageLoadTime for now
        });
        });
      }

      setIsLoading(false);

      if (FEATURE_FLAGS.enableVerboseLogging) {
        console.log('⚡ Web Vitals tracking initialized for Settlement Law Federal');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Web Vitals';
      setError(errorMessage);
      setIsLoading(false);
      
      console.warn('Failed to initialize Web Vitals:', err);
      SettlementLawAnalytics.trackError(errorMessage, {
        component: 'useWebVitals',
        severity: 'medium'
      });
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeWebVitals();
  }, [initializeWebVitals]);

  // Report metrics to Performance Dashboard
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const events = JSON.parse(
          window.sessionStorage.getItem('performance-dashboard-events') || '[]'
        );
        
        events.push({
          type: 'webVitals',
          page: 'settlement-law-federal',
          data: {
            metrics,
            scores,
            timestamp: new Date().toISOString()
          },
          timestamp: new Date().toISOString()
        });

        // Keep only last 100 events
        if (events.length > 100) {
          events.splice(0, events.length - 100);
        }

        window.sessionStorage.setItem(
          'performance-dashboard-events',
          JSON.stringify(events)
        );
      } catch (err) {
        console.warn('Failed to report Web Vitals to Performance Dashboard:', err);
      }
    }
  }, [metrics, scores]);

  const refresh = useCallback(() => {
    setMetrics({
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null,
      inp: null
    });
    initializeWebVitals();
  }, [initializeWebVitals]);

  return {
    metrics,
    scores,
    isLoading,
    error,
    refresh
  };
}

/**
 * useWebVitalsMonitor Hook
 * 
 * Continuous monitoring of Web Vitals with alerts for poor performance.
 */
export function useWebVitalsMonitor(
  onAlert?: (metric: string, value: number, threshold: number) => void
) {
  const { metrics, scores } = useWebVitals();
  const [alerts, setAlerts] = useState<Array<{
    metric: string;
    value: number;
    threshold: number;
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    const checkThresholds = () => {
      const newAlerts: typeof alerts = [];

      // Check LCP
      if (metrics.lcp && metrics.lcp > PERFORMANCE_THRESHOLDS.lcp) {
        const alert = {
          metric: 'LCP',
          value: metrics.lcp,
          threshold: PERFORMANCE_THRESHOLDS.lcp,
          timestamp: new Date()
        };
        newAlerts.push(alert);
        onAlert?.(alert.metric, alert.value, alert.threshold);
      }

      // Check FID
      if (metrics.fid && metrics.fid > PERFORMANCE_THRESHOLDS.fid) {
        const alert = {
          metric: 'FID',
          value: metrics.fid,
          threshold: PERFORMANCE_THRESHOLDS.fid,
          timestamp: new Date()
        };
        newAlerts.push(alert);
        onAlert?.(alert.metric, alert.value, alert.threshold);
      }

      // Check CLS
      if (metrics.cls && metrics.cls > PERFORMANCE_THRESHOLDS.cls) {
        const alert = {
          metric: 'CLS',
          value: metrics.cls,
          threshold: PERFORMANCE_THRESHOLDS.cls,
          timestamp: new Date()
        };
        newAlerts.push(alert);
        onAlert?.(alert.metric, alert.value, alert.threshold);
      }

      if (newAlerts.length > 0) {
        setAlerts(prev => [...prev, ...newAlerts].slice(-10)); // Keep last 10 alerts
      }
    };

    checkThresholds();
  }, [metrics, onAlert]);

  return {
    metrics,
    scores,
    alerts
  };
}

/**
 * Performance thresholds for Web Vitals scoring
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    poor: 4000
  },
  FID: {
    good: 100,
    poor: 300
  },
  CLS: {
    good: 0.1,
    poor: 0.25
  },
  FCP: {
    good: 1800,
    poor: 3000
  },
  TTFB: {
    good: 800,
    poor: 1800
  },
  INP: {
    good: 200,
    poor: 500
  }
} as const;
