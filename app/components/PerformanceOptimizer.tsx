'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Performance Optimizer Component
 * 
 * Implements various performance optimizations including:
 * - Resource prefetching
 * - Critical resource prioritization
 * - Service worker registration
 * - Performance monitoring
 * 
 * @component PerformanceOptimizer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0
 */

interface PerformanceOptimizerProps {
  enableServiceWorker?: boolean;
  enableResourceHints?: boolean;
  enableCriticalResourcePriority?: boolean;
}

export default function PerformanceOptimizer({
  enableServiceWorker = false,
  enableResourceHints = true,
  enableCriticalResourcePriority = true,
}: PerformanceOptimizerProps) {
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Defer non-critical optimizations to avoid blocking main thread
    const deferredOptimizations = () => {
      // Optimize resource loading
      if (enableResourceHints && typeof document !== 'undefined') {
        // Prefetch critical pages with requestIdleCallback
        const criticalPages = [
          '/calculations/guaranteed',
          '/calculations/lcp',
          '/mint-intelligent-chat',
          '/get-a-quote'
        ];

        const prefetchPage = (page: string) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        };

        // Use requestIdleCallback to avoid blocking main thread
        if ('requestIdleCallback' in window) {
          criticalPages.forEach(page => {
            requestIdleCallback(() => prefetchPage(page));
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            criticalPages.forEach(prefetchPage);
          }, 100);
        }
      }
    };

    // Defer optimizations to next tick
    setTimeout(deferredOptimizations, 0);

    // Optimize critical resource priority
    if (enableCriticalResourcePriority && typeof document !== 'undefined') {
      // Prioritize critical CSS
      const criticalStyles = document.querySelectorAll('style[data-critical="true"]');
      criticalStyles.forEach(style => {
        (style as HTMLElement).dataset.priority = 'high';
      });

      // Deprioritize non-critical resources
      const nonCriticalImages = document.querySelectorAll('img[loading="lazy"]');
      nonCriticalImages.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
        (img as HTMLImageElement).decoding = 'async';
      });
    }

    // Register service worker for caching
    if (enableServiceWorker && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          if (process.env.NODE_ENV === 'development') {
            console.log('SW registered: ', registration);
          }
        })
        .catch(registrationError => {
          if (process.env.NODE_ENV === 'development') {
            console.log('SW registration failed: ', registrationError);
          }
        });
    }

    // Optimize font loading with error handling
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (process.env.NODE_ENV === 'development') {
          // Fonts loaded - no console logging to reduce noise
        }
      }).catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Font loading error:', error);
        }
      });
    }

    // Preload critical images
    const criticalImages = [
      '/assets/images/og-image.png',
      '/assets/images/mint-mascot.webp'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

  }, [enableServiceWorker, enableResourceHints, enableCriticalResourcePriority]);

  return (
    <>
      {/* Critical CSS inlining - using dangerouslySetInnerHTML to prevent hydration mismatch */}
      <style 
        data-critical="true"
        dangerouslySetInnerHTML={{
          __html: `
        /* Critical above-the-fold styles */
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent layout shift for navigation - only on non-homepage */
        body:not([data-page="/"]) nav {
          height: 64px;
        }
        
        /* Ensure no nav elements on homepage */
        body[data-page="/"] nav {
          display: none !important;
          height: 0 !important;
          visibility: hidden !important;
        }
        
        /* Optimize button rendering */
        button {
          cursor: pointer;
          border: none;
          outline: none;
        }
        
        /* Prevent flash of unstyled content */
        .loading {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .loaded {
          opacity: 1;
        }
      `
        }}
      />

      {/* Enhanced performance monitoring for INP optimization */}
      <Script
        id="performance-monitor"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced performance monitoring for INP optimization
            if (typeof window !== 'undefined') {
              const isDevelopment = ${process.env.NODE_ENV === 'development'};
              
              // INP monitoring disabled to reduce console noise
              // Still tracks maxINP silently for analytics, but no console warnings
              let maxINP = 0;
              if ('PerformanceObserver' in window) {
                const inpObserver = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    maxINP = Math.max(maxINP, entry.processingStart - entry.startTime);
                    // Console warnings disabled - still tracking maxINP silently
                    // Uncomment below if you need to debug very slow interactions (>2000ms):
                    // if (isDevelopment && entry.processingStart - entry.startTime > 2000) {
                    //   console.warn('Extreme slow interaction detected:', Math.round(entry.processingStart - entry.startTime) + 'ms');
                    // }
                  }
                });
                // Try modern API with type and buffered (no warnings)
                // Only use if supported - no fallback to avoid warnings
                try {
                  inpObserver.observe({type: 'event', buffered: true});
                } catch (e) {
                  // Silently skip if browser doesn't support modern API
                  // Don't use entryTypes fallback to avoid "buffered with entryTypes" warning
                }
              }

              // Frame drop monitoring disabled to reduce console noise
              // Uncomment below if you need to debug severe performance issues (>5000ms drops)
              /*
              if (isDevelopment) {
                let lastFrameTime = performance.now();
                function checkFrameRate() {
                  const currentTime = performance.now();
                  const deltaTime = currentTime - lastFrameTime;
                  // Only log critical frame drops (>5000ms) - very rare
                  if (deltaTime > 5000) {
                    console.warn('Critical frame drop detected:', Math.round(deltaTime) + 'ms');
                  }
                  lastFrameTime = currentTime;
                  requestAnimationFrame(checkFrameRate);
                }
                requestAnimationFrame(checkFrameRate);
              }
              */

              // Optimize setTimeout/setInterval for better performance
              const originalSetTimeout = window.setTimeout;
              window.setTimeout = function(callback, delay, ...args) {
                // Reduce timer resolution for better performance
                const alignedDelay = Math.max(delay, 16); // Minimum 60fps
                return originalSetTimeout.call(this, callback, alignedDelay, ...args);
              };
            }
          `
        }}
      />
    </>
  );
}
