// Performance tracking utilities
import { trackEvent } from './eventTracking';

// Initialize analytics tracking
export const initializeAnalytics = (): (() => void) => {
  const cleanupFunctions: (() => void)[] = [];
  
  // Track page load performance
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          trackEvent(
            'page_performance',
            'performance',
            'load_time',
            'court_approval',
            Math.round(perfData.loadEventEnd - perfData.navigationStart),
            {
              dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
              first_paint: Math.round(perfData.responseEnd - perfData.navigationStart),
              page_size: document.documentElement.innerHTML.length
            }
          );
        }
      }, 1000);
    });
  }
  
  // Return cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};

// Track Core Web Vitals
export const trackWebVitals = (metric: any): void => {
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
};

// Track resource loading performance
export const trackResourcePerformance = (resourceName: string, loadTime: number): void => {
  if (loadTime > 1000) {
    trackEvent(
      'slow_resource',
      'performance',
      'slow_load',
      resourceName,
      Math.round(loadTime),
      {
        resource_name: resourceName,
        load_time: loadTime,
        threshold_exceeded: true
      }
    );
  }
};
