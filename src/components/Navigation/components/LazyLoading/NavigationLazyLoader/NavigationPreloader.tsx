/**
 * Navigation Preloader - Main Orchestrator
 * 
 * Main orchestrator for navigation component preloading
 * (Simplified version of the original NavigationPreloader.tsx)
 * 
 * @module NavigationPreloader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import { track } from '@vercel/analytics';
import { preloadComponent, markComponentLoaded, isComponentLoaded } from './LazyComponentLoader';
import { executePreloadStrategy } from './preloader/PreloadStrategies';
import { smartPreload as executeSmartPreload } from './preloader/SmartPreloader';

interface PreloadConfig {
  strategy?: 'immediate' | 'interaction' | 'idle' | 'viewport';
  delay?: number;
  components?: Array<'DesktopNav' | 'MobileNav' | 'NavigationAnalytics'>;
  enableAnalytics?: boolean;
}

/**
 * Preload navigation components with different strategies
 */
export const preloadNavigationComponents = (config: PreloadConfig = {}) => {
  const {
    strategy = 'interaction',
    delay = 3000,
    components = ['DesktopNav', 'MobileNav'],
    enableAnalytics = true
  } = config;

  if (typeof window === 'undefined') return;

  const preload = async () => {
    const startTime = performance.now();
    
    try {
      // Preload components in parallel
      const preloadPromises = components.map(async (componentName) => {
        if (!isComponentLoaded(componentName)) {
          await preloadComponent(componentName);
          markComponentLoaded(componentName);
        }
      });

      await Promise.all(preloadPromises);

      const totalTime = performance.now() - startTime;

      if (enableAnalytics) {
        track('navigation_components_preloaded', {
          strategy,
          components: components.join(','), // Convert array to string
          componentCount: components.length,
          totalTime,
          timestamp: Date.now()
        });
      }

      console.log(`Preloaded ${components.length} navigation components in ${totalTime.toFixed(2)}ms`);

    } catch (error) {
      console.error('Failed to preload navigation components:', error);
      
      if (enableAnalytics) {
        track('navigation_preload_error', {
          strategy,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: Date.now()
        });
      }
    }
  };

  // Execute the appropriate preload strategy
  executePreloadStrategy(strategy, preload, delay);
};

/**
 * Preload specific component with custom strategy
 */
export const preloadSpecificComponent = async (
  componentName: 'DesktopNav' | 'MobileNav' | 'NavigationAnalytics',
  strategy: 'immediate' | 'delayed' = 'immediate',
  delay: number = 1000
) => {
  if (isComponentLoaded(componentName)) {
    console.log(`${componentName} is already loaded`);
    return;
  }

  const preloadFn = async () => {
    try {
      await preloadComponent(componentName);
      markComponentLoaded(componentName);
      
      track('navigation_specific_component_preloaded', {
        component: componentName,
        strategy,
        timestamp: Date.now()
      });
      
    } catch (error) {
      console.error(`Failed to preload ${componentName}:`, error);
      
      track('navigation_specific_preload_error', {
        component: componentName,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  if (strategy === 'immediate') {
    await preloadFn();
  } else {
    setTimeout(preloadFn, delay);
  }
};

/**
 * Get preload status for all components
 */
export const getPreloadStatus = () => {
  const components = ['DesktopNav', 'MobileNav', 'NavigationAnalytics'] as const;
  
  return components.reduce((status, component) => {
    status[component] = isComponentLoaded(component);
    return status;
  }, {} as Record<typeof components[number], boolean>);
};

/**
 * Smart preloader that adapts based on connection and device
 */
export const smartPreload = () => {
  executeSmartPreload(preloadNavigationComponents);
};

export default {
  preloadNavigationComponents,
  preloadSpecificComponent,
  getPreloadStatus,
  smartPreload
};