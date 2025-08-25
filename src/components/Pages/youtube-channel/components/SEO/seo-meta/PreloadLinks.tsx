import React from 'react';

/**
 * Preload Links Component for YouTube Channel SEO
 * 
 * Provides resource preloading for optimal Core Web Vitals
 * and performance optimization with YouTube-specific resources.
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
 * - ✅ YouTube-specific resource preloading
 * - ✅ DNS prefetching for external resources
 * - ✅ Performance hints for browsers
 * - ✅ Video thumbnail optimization
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
      // YouTube-specific preconnections
      { rel: 'preconnect', href: 'https://www.youtube.com' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' },
      { rel: 'dns-prefetch', href: 'https://www.youtube.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
      
      // General performance preconnections
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      
      // Internal page prefetching
      { rel: 'prefetch', href: '/mint-intelligent-chat' },
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
