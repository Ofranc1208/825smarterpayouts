'use client';

import { useEffect, useCallback } from 'react';
import type { PerformanceMetrics } from '../types/analyticsTypes';

export function useCourtApprovalPerformance() {
  // Report Web Vitals
  const reportWebVitals = useCallback((metric: any) => {
    const performanceData: Partial<PerformanceMetrics> = {};
    
    switch (metric.name) {
      case 'FCP':
        performanceData.first_contentful_paint = metric.value;
        break;
      case 'LCP':
        performanceData.largest_contentful_paint = metric.value;
        break;
      case 'CLS':
        performanceData.cumulative_layout_shift = metric.value;
        break;
      case 'FID':
        performanceData.first_input_delay = metric.value;
        break;
      case 'TTI':
        performanceData.time_to_interactive = metric.value;
        break;
    }
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_parameter_1: metric.id,
        custom_parameter_2: metric.delta
      });
    }
    
    console.log('⚡ Web Vital:', metric.name, metric.value);
  }, []);

  // Monitor page load performance
  const monitorPageLoad = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const loadTime = navEntry.loadEventEnd - navEntry.navigationStart;
          
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              event_category: 'performance',
              event_label: 'court_approval',
              value: Math.round(loadTime)
            });
          }
          
          console.log('📊 Page Load Time:', loadTime + 'ms');
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
    
    return () => observer.disconnect();
  }, []);

  // Monitor resource loading
  const monitorResourceLoading = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
          
          // Track slow resources (>1000ms)
          if (loadTime > 1000) {
            if (window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'performance',
                event_label: resourceEntry.name,
                value: Math.round(loadTime)
              });
            }
            
            console.warn('🐌 Slow Resource:', resourceEntry.name, loadTime + 'ms');
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    return () => observer.disconnect();
  }, []);

  // Monitor memory usage
  const monitorMemoryUsage = useCallback(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return;
    
    const checkMemory = () => {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
      
      // Alert if memory usage is high (>80% of limit)
      if (usedMB > limitMB * 0.8) {
        if (window.gtag) {
          window.gtag('event', 'high_memory_usage', {
            event_category: 'performance',
            event_label: 'court_approval',
            value: usedMB
          });
        }
        
        console.warn('🧠 High Memory Usage:', {
          used: usedMB + 'MB',
          total: totalMB + 'MB',
          limit: limitMB + 'MB'
        });
      }
    };
    
    // Check memory every 30 seconds
    const interval = setInterval(checkMemory, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    const cleanupPageLoad = monitorPageLoad();
    const cleanupResourceLoading = monitorResourceLoading();
    const cleanupMemoryUsage = monitorMemoryUsage();
    
    return () => {
      cleanupPageLoad?.();
      cleanupResourceLoading?.();
      cleanupMemoryUsage?.();
    };
  }, [monitorPageLoad, monitorResourceLoading, monitorMemoryUsage]);

  return {
    reportWebVitals,
    monitorPageLoad,
    monitorResourceLoading,
    monitorMemoryUsage
  };
}
