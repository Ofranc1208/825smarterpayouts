import React from 'react';

/**
 * Preload Links Component for MintChat SEO
 * 
 * Provides resource preloading for optimal Core Web Vitals
 * and performance optimization.
 * 
 * @component PreloadLinks
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Preload Links Component
 * 
 * ## Features
 * - ✅ Critical resource preloading
 * - ✅ Font preloading for CLS optimization
 * - ✅ DNS prefetching for external resources
 * - ✅ Performance hints for browsers
 * 
 * @example
 * ```tsx
 * import PreloadLinks from './PreloadLinks';
 * 
 * export default function SEOHead() {
 *   return <PreloadLinks />;
 * }
 * ```
 */
export default function PreloadLinks() {
  React.useEffect(() => {
    // Add preload links dynamically to avoid App Router conflicts
    const links = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'prefetch', href: '/pricing-calculator' },
      { rel: 'prefetch', href: '/about' }
    ];

    const addedLinks: HTMLLinkElement[] = [];

    links.forEach(linkConfig => {
      // Check if link already exists
      const existingLink = document.querySelector(`link[href="${linkConfig.href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = linkConfig.rel;
        link.href = linkConfig.href;
        if (linkConfig.crossOrigin) {
          link.crossOrigin = linkConfig.crossOrigin;
        }
        document.head.appendChild(link);
        addedLinks.push(link);
      }
    });

    // Cleanup function
    return () => {
      addedLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return null; // No JSX needed for App Router preload links
}
