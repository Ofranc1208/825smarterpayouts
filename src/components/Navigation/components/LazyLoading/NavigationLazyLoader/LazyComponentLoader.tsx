/**
 * Lazy Component Loader
 * 
 * Handles dynamic imports and lazy loading of navigation components
 * 
 * @module LazyComponentLoader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import { lazy } from 'react';
import { track } from '@vercel/analytics';

/**
 * Lazy load navigation components with analytics tracking
 */
export const LazyComponentLoader = {
  
  /**
   * Desktop Navigation Component
   */
  DesktopNav: lazy(() => 
    import('../../../Desktop').then(module => {
      track('navigation_component_loaded', { 
        component: 'DesktopNav',
        timestamp: Date.now(),
        loadTime: performance.now()
      });
      return module;
    }).catch((error) => {
      console.error('Failed to load DesktopNav:', error);
      track('navigation_component_load_error', { 
        component: 'DesktopNav',
        error: error.message 
      });
      // Return fallback component
      return { 
        default: ({ isMobile }: { isMobile: boolean }) => (
          <div style={{ 
            padding: '1rem', 
            color: '#dc2626', 
            fontSize: '0.875rem',
            display: isMobile ? 'none' : 'block'
          }}>
            Failed to load desktop navigation
          </div>
        )
      };
    })
  ),

  /**
   * Mobile Navigation Component
   */
  MobileNav: lazy(() => 
    import('../../../Mobile').then(module => {
      track('navigation_component_loaded', { 
        component: 'MobileNav',
        timestamp: Date.now(),
        loadTime: performance.now()
      });
      return module;
    }).catch((error) => {
      console.error('Failed to load MobileNav:', error);
      track('navigation_component_load_error', { 
        component: 'MobileNav',
        error: error.message 
      });
      // Return fallback component
      return { 
        default: ({ isMobile }: { isMobile: boolean }) => (
          <div style={{ 
            padding: '1rem', 
            color: '#dc2626', 
            fontSize: '0.875rem',
            display: isMobile ? 'block' : 'none'
          }}>
            Failed to load mobile navigation
          </div>
        )
      };
    })
  ),

  /**
   * Navigation Analytics Component (Placeholder)
   */
  NavigationAnalytics: lazy(() => {
    // Track analytics component load attempt
    track('navigation_component_loaded', { 
      component: 'NavigationAnalytics',
      timestamp: Date.now(),
      note: 'placeholder_component'
    });
    
    // Return placeholder component
    return Promise.resolve({ 
      default: () => null 
    });
  })
};

/**
 * Preload specific component
 */
export const preloadComponent = async (componentName: keyof typeof LazyComponentLoader) => {
  try {
    const startTime = performance.now();
    
    switch (componentName) {
      case 'DesktopNav':
        await import('../../../Desktop');
        break;
      case 'MobileNav':
        await import('../../../Mobile');
        break;
      case 'NavigationAnalytics':
        // No actual component to preload
        break;
    }
    
    const loadTime = performance.now() - startTime;
    
    track('navigation_component_preloaded', {
      component: componentName,
      loadTime,
      timestamp: Date.now()
    });
    
    console.log(`Preloaded ${componentName} in ${loadTime.toFixed(2)}ms`);
    
  } catch (error) {
    console.error(`Failed to preload ${componentName}:`, error);
    track('navigation_component_preload_error', {
      component: componentName,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Check if component is already loaded
 */
export const isComponentLoaded = (componentName: keyof typeof LazyComponentLoader): boolean => {
  // This is a simplified check - in a real implementation you might
  // want to track loaded state more precisely
  return typeof window !== 'undefined' && 
         (window as any).__navigationComponentsLoaded?.[componentName] === true;
};

/**
 * Mark component as loaded (for tracking)
 */
export const markComponentLoaded = (componentName: keyof typeof LazyComponentLoader) => {
  if (typeof window !== 'undefined') {
    (window as any).__navigationComponentsLoaded = (window as any).__navigationComponentsLoaded || {};
    (window as any).__navigationComponentsLoaded[componentName] = true;
  }
};

export default LazyComponentLoader;
