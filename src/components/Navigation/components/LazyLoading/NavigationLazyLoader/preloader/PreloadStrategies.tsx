/**
 * Preload Strategies
 * 
 * Different strategies for preloading navigation components
 * 
 * @module PreloadStrategies
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

/**
 * Preload on first user interaction
 */
export const preloadOnInteraction = (preloadFn: () => void) => {
  const events = ['mouseenter', 'touchstart', 'focus', 'scroll'];
  let hasPreloaded = false;

  const preloadOnce = () => {
    if (hasPreloaded) return;
    hasPreloaded = true;
    
    preloadFn();
    
    // Remove event listeners
    events.forEach(event => 
      document.removeEventListener(event, preloadOnce)
    );
  };

  // Add event listeners
  events.forEach(event => 
    document.addEventListener(event, preloadOnce, { 
      passive: true, 
      once: true 
    })
  );
};

/**
 * Preload when browser is idle
 */
export const preloadOnIdle = (preloadFn: () => void, delay: number) => {
  if ('requestIdleCallback' in window) {
    // Use requestIdleCallback if available
    (window as any).requestIdleCallback(() => {
      preloadFn();
    }, { timeout: delay });
  } else {
    // Fallback to setTimeout
    setTimeout(preloadFn, delay);
  }
};

/**
 * Preload when navigation comes into viewport
 */
export const preloadOnViewport = (preloadFn: () => void) => {
  const navigationElement = document.querySelector('nav');
  
  if (!navigationElement) {
    // Fallback to immediate preload if nav not found
    preloadFn();
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadFn();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(navigationElement);
  } else {
    // Fallback for browsers without IntersectionObserver
    preloadFn();
  }
};

/**
 * Preload immediately
 */
export const preloadImmediate = (preloadFn: () => void) => {
  preloadFn();
};

/**
 * Execute preload strategy
 */
export const executePreloadStrategy = (
  strategy: 'immediate' | 'interaction' | 'idle' | 'viewport',
  preloadFn: () => void,
  delay: number = 3000
) => {
  switch (strategy) {
    case 'immediate':
      preloadImmediate(preloadFn);
      break;

    case 'interaction':
      preloadOnInteraction(preloadFn);
      break;

    case 'idle':
      preloadOnIdle(preloadFn, delay);
      break;

    case 'viewport':
      preloadOnViewport(preloadFn);
      break;

    default:
      preloadOnInteraction(preloadFn);
  }
};

export default {
  preloadOnInteraction,
  preloadOnIdle,
  preloadOnViewport,
  preloadImmediate,
  executePreloadStrategy
};
