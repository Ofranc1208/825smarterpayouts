/**
 * Smart Preloader
 * 
 * Intelligent preloading based on device capabilities and connection quality
 * 
 * @module SmartPreloader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import { track } from '@vercel/analytics';

interface PreloadConfig {
  strategy?: 'immediate' | 'interaction' | 'idle' | 'viewport';
  delay?: number;
  components?: Array<'DesktopNav' | 'MobileNav' | 'NavigationAnalytics'>;
  enableAnalytics?: boolean;
}

/**
 * Detect device and connection capabilities
 */
export const detectCapabilities = () => {
  if (typeof window === 'undefined') {
    return {
      connectionType: 'unknown',
      effectiveType: 'unknown',
      saveData: false,
      deviceMemory: 'unknown',
      prefersReducedMotion: false
    };
  }

  // Check connection quality
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;

  return {
    connectionType: connection?.type || 'unknown',
    effectiveType: connection?.effectiveType || 'unknown',
    saveData: connection?.saveData || false,
    deviceMemory: deviceMemory || 'unknown',
    prefersReducedMotion,
    downlink: connection?.downlink || 'unknown',
    rtt: connection?.rtt || 'unknown'
  };
};

/**
 * Determine optimal preload strategy based on capabilities
 */
export const determineOptimalStrategy = (capabilities: ReturnType<typeof detectCapabilities>) => {
  let strategy: PreloadConfig['strategy'] = 'interaction';
  let delay = 3000;

  // Base strategy on connection quality
  if (capabilities.effectiveType === '4g' && !capabilities.saveData) {
    strategy = 'immediate';
    delay = 1000;
  } else if (capabilities.effectiveType === '3g') {
    strategy = 'idle';
    delay = 5000;
  } else if (capabilities.saveData || capabilities.effectiveType === '2g') {
    strategy = 'interaction';
    delay = 10000;
  }

  // Adjust for user preferences
  if (capabilities.prefersReducedMotion) {
    delay += 2000; // Add extra delay for users who prefer reduced motion
  }

  // Adjust for device memory
  if (typeof capabilities.deviceMemory === 'number' && capabilities.deviceMemory < 4) {
    // Low memory device - be more conservative
    strategy = 'interaction';
    delay += 3000;
  }

  // Adjust for slow connections
  if (typeof capabilities.downlink === 'number' && capabilities.downlink < 1.5) {
    strategy = 'interaction';
    delay += 5000;
  }

  // Adjust for high latency
  if (typeof capabilities.rtt === 'number' && capabilities.rtt > 300) {
    strategy = 'interaction';
    delay += 2000;
  }

  return { strategy, delay };
};

/**
 * Smart preloader that adapts based on connection and device
 */
export const smartPreload = (
  preloadFn: (config: PreloadConfig) => void,
  customConfig: Partial<PreloadConfig> = {}
) => {
  if (typeof window === 'undefined') return;

  const capabilities = detectCapabilities();
  const { strategy, delay } = determineOptimalStrategy(capabilities);

  const config: PreloadConfig = {
    strategy,
    delay,
    components: ['DesktopNav', 'MobileNav'],
    enableAnalytics: true,
    ...customConfig
  };

  // Execute preload with determined strategy
  preloadFn(config);

  // Track smart preload decision
  if (config.enableAnalytics) {
    track('navigation_smart_preload', {
      strategy,
      delay,
      connectionType: capabilities.connectionType,
      effectiveType: capabilities.effectiveType,
      saveData: capabilities.saveData,
      deviceMemory: capabilities.deviceMemory,
      prefersReducedMotion: capabilities.prefersReducedMotion,
      downlink: capabilities.downlink,
      rtt: capabilities.rtt,
      timestamp: Date.now()
    });
  }

  return { strategy, delay, capabilities };
};

/**
 * Get performance recommendations based on capabilities
 */
export const getPerformanceRecommendations = (capabilities: ReturnType<typeof detectCapabilities>) => {
  const recommendations: string[] = [];

  if (capabilities.saveData) {
    recommendations.push('User has data saver enabled - minimize preloading');
  }

  if (capabilities.effectiveType === '2g' || capabilities.effectiveType === 'slow-2g') {
    recommendations.push('Slow connection detected - use interaction-based preloading');
  }

  if (typeof capabilities.deviceMemory === 'number' && capabilities.deviceMemory < 2) {
    recommendations.push('Low memory device - avoid aggressive preloading');
  }

  if (capabilities.prefersReducedMotion) {
    recommendations.push('User prefers reduced motion - add delays to preloading');
  }

  if (typeof capabilities.downlink === 'number' && capabilities.downlink < 1) {
    recommendations.push('Very slow download speed - consider disabling preloading');
  }

  if (typeof capabilities.rtt === 'number' && capabilities.rtt > 500) {
    recommendations.push('High latency connection - increase preload delays');
  }

  return recommendations;
};

/**
 * Check if preloading should be disabled entirely
 */
export const shouldDisablePreloading = (capabilities: ReturnType<typeof detectCapabilities>) => {
  // Disable preloading in extreme cases
  return (
    capabilities.saveData ||
    capabilities.effectiveType === 'slow-2g' ||
    (typeof capabilities.deviceMemory === 'number' && capabilities.deviceMemory < 1) ||
    (typeof capabilities.downlink === 'number' && capabilities.downlink < 0.5)
  );
};

export default {
  detectCapabilities,
  determineOptimalStrategy,
  smartPreload,
  getPerformanceRecommendations,
  shouldDisablePreloading
};
