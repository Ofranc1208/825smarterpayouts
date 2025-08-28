// Settlement Law Federal - Resource Optimizer Module
// Following enterprise patterns - resource optimization utilities

import { FEATURE_FLAGS } from '../constants';

/**
 * Resource Optimizer Module
 * Handles resource optimization and preloading
 */
export class ResourceOptimizer {
  private static observers: Map<string, IntersectionObserver> = new Map();

  /**
   * Create intersection observer for lazy loading
   */
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver | null {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return null;
    }

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  /**
   * Optimize images for performance
   */
  static optimizeImages() {
    if (typeof document === 'undefined') return;

    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;

    const imageObserver = this.createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver?.unobserve(img);
          }
        }
      });
    });

    if (imageObserver) {
      images.forEach((img) => imageObserver.observe(img));
      this.observers.set('images', imageObserver);
    }
  }

  /**
   * Preload critical resources
   */
  static preloadCriticalResources() {
    if (typeof document === 'undefined') return;

    // Preload critical fonts
    const fontPreloads = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-bold.woff2'
    ];

    fontPreloads.forEach((fontUrl) => {
      if (!document.head.querySelector(`link[href="${fontUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Prefetch likely next pages
    const prefetchUrls = [
      '/',
      '/contact',
      '/pricing-calculator',
      '/structured-settlement-laws-by-state'
    ];

    prefetchUrls.forEach((url) => {
      if (!document.head.querySelector(`link[href="${url}"][rel="prefetch"]`)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    });

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log('🚀 Critical resources preloaded for Settlement Law Federal');
    }
  }

  /**
   * Optimize CSS delivery
   */
  static optimizeCSSDelivery() {
    if (typeof document === 'undefined') return;

    // Find non-critical CSS and make it non-blocking
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    stylesheets.forEach((stylesheet) => {
      const link = stylesheet as HTMLLinkElement;
      
      // Skip critical CSS (fonts, etc.)
      if (link.href.includes('fonts.googleapis.com') || 
          link.href.includes('fonts.gstatic.com')) {
        return;
      }

      // Make non-critical CSS non-blocking
      if (!link.media || link.media === 'all') {
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
      }
    });
  }

  /**
   * Preload next page resources based on user behavior
   */
  static preloadNextPageResources() {
    if (typeof document === 'undefined') return;

    // Preload resources when user hovers over links
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach((link) => {
      const href = (link as HTMLAnchorElement).href;
      
      link.addEventListener('mouseenter', () => {
        this.prefetchPage(href);
      }, { once: true });
    });
  }

  /**
   * Prefetch a page
   */
  private static prefetchPage(url: string) {
    if (typeof document === 'undefined') return;

    // Check if already prefetched
    if (document.head.querySelector(`link[href="${url}"][rel="prefetch"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);

    if (FEATURE_FLAGS.enableVerboseLogging) {
      console.log(`🔗 Prefetched: ${url}`);
    }
  }

  /**
   * Optimize third-party scripts
   */
  static optimizeThirdPartyScripts() {
    if (typeof document === 'undefined') return;

    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    
    scripts.forEach((script) => {
      const src = (script as HTMLScriptElement).src;
      
      // Skip critical scripts
      if (src.includes('vercel') || 
          src.includes('analytics') || 
          src.includes('gtag')) {
        return;
      }

      // Add defer attribute to non-critical scripts
      if (!(script as HTMLScriptElement).defer && 
          !(script as HTMLScriptElement).async) {
        (script as HTMLScriptElement).defer = true;
      }
    });
  }

  /**
   * Monitor resource loading performance
   */
  static monitorResourcePerformance() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      return;
    }

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // Log slow resources
          if (resource.duration > 1000) {
            console.warn(`🐌 Slow resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
          }

          // Log failed resources
          if (resource.transferSize === 0 && resource.decodedBodySize === 0) {
            console.warn(`❌ Failed resource: ${resource.name}`);
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resources', resourceObserver);

    } catch (error) {
      console.warn('Failed to setup resource performance monitoring:', error);
    }
  }

  /**
   * Clean up unused resources
   */
  static cleanupUnusedResources() {
    if (typeof document === 'undefined') return;

    // Remove unused preload links after they've been used
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    
    preloadLinks.forEach((link) => {
      const href = (link as HTMLLinkElement).href;
      
      // Check if resource has been loaded
      const isLoaded = document.querySelector(`link[href="${href}"][rel="stylesheet"]`) ||
                      document.querySelector(`script[src="${href}"]`) ||
                      document.querySelector(`img[src="${href}"]`);
      
      if (isLoaded) {
        // Remove preload link after a delay to ensure it's no longer needed
        setTimeout(() => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        }, 5000);
      }
    });
  }

  /**
   * Cleanup observers and resources
   */
  static cleanup() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}
