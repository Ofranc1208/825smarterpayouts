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
    // Defer non-critical optimizations to avoid blocking main thread
    const deferredOptimizations = () => {
      // Optimize resource loading
      if (enableResourceHints) {
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
    if (enableCriticalResourcePriority) {
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
    if (enableServiceWorker && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Optimize font loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        console.log('Fonts loaded');
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
        
        /* Prevent layout shift for navigation */
        nav {
          height: 64px;
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

      {/* Lightweight performance monitoring */}
      <Script
        id="performance-monitor"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Lightweight performance monitoring (development only)
            if (typeof window !== 'undefined' && ${process.env.NODE_ENV === 'development'}) {
              // Track page load time (throttled)
              window.addEventListener('load', function() {
                setTimeout(() => {
                  const loadTime = performance.now();
                  if (loadTime > 3000) {
                    console.warn('Slow page load detected:', Math.round(loadTime) + 'ms');
                  }
                }, 1000);
              });
              
              // Monitor only critical long tasks (throttled)
              if ('PerformanceObserver' in window) {
                const longTaskObserver = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.duration > 100) { // Only report tasks > 100ms
                      console.warn('Long task detected:', Math.round(entry.duration) + 'ms');
                    }
                  }
                });
                longTaskObserver.observe({entryTypes: ['longtask']});
              }
            }
          `
        }}
      />
    </>
  );
}
