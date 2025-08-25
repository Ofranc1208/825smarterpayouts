// Scroll depth tracking utilities
import { trackEvent } from './eventTracking';

// Track user engagement with scroll depth
export const trackScrollDepth = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const scrollDepthThresholds = [25, 50, 75, 90, 100];
  const trackedDepths = new Set<number>();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
    
    scrollDepthThresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !trackedDepths.has(threshold)) {
        trackedDepths.add(threshold);
        
        trackEvent(
          'scroll_depth',
          'engagement',
          'scroll',
          `${threshold}%`,
          threshold,
          {
            page_location: window.location.href,
            scroll_percentage: scrollPercentage
          }
        );
      }
    });
  };
  
  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
};
