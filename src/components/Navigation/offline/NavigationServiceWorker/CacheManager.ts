/**
 * Cache Manager - Service Worker Cache Operations
 * 
 * Handles all caching strategies and cache management operations
 * for the Navigation Service Worker.
 * 
 * @module CacheManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';
import type { OfflineConfig, CacheMetrics } from './types';

export class CacheManager {
  private config: OfflineConfig;
  private metrics: CacheMetrics;

  constructor(config: OfflineConfig, metrics: CacheMetrics) {
    this.config = config;
    this.metrics = metrics;
  }

  /**
   * Cache navigation resources
   */
  async cacheNavigationResources(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    const resourcesToCache = [
      '/navigation/desktop',
      '/navigation/mobile',
      '/navigation/data',
      '/navigation/icons',
      '/api/navigation/config'
    ];

    try {
      const cache = await caches.open('navigation-v1');
      await cache.addAll(resourcesToCache);
      
      console.log('Navigation resources cached successfully');
      
      if (this.config.enableAnalytics) {
        track('navigation_resources_cached', {
          resources_count: resourcesToCache.length,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Failed to cache navigation resources:', error);
    }
  }

  /**
   * Clear navigation cache
   */
  async clearCache(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
      
      await Promise.all(
        navigationCaches.map(name => caches.delete(name))
      );

      console.log('Navigation cache cleared');
      
      if (this.config.enableAnalytics) {
        track('navigation_cache_cleared', {
          caches_cleared: navigationCaches.length,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Failed to clear navigation cache:', error);
    }
  }

  /**
   * Generate cache strategy functions for service worker script
   */
  generateCacheStrategyFunctions(): string {
    return `
async function cacheFirst(cache, request) {
  const cached = await cache.match(request);
  if (cached) {
    postMessage({ type: 'CACHE_HIT', url: request.url });
    return cached;
  }
  
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    postMessage({ type: 'CACHE_MISS', url: request.url });
    return response;
  } catch (error) {
    postMessage({ type: 'OFFLINE_FALLBACK', resource: request.url });
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(cache, request) {
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      postMessage({ type: 'CACHE_HIT', url: request.url });
      return cached;
    }
    postMessage({ type: 'OFFLINE_FALLBACK', resource: request.url });
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(cache, request) {
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    postMessage({ type: 'CACHE_UPDATED', url: request.url });
    return response;
  }).catch(() => {
    if (!cached) {
      postMessage({ type: 'OFFLINE_FALLBACK', resource: request.url });
    }
  });
  
  return cached || fetchPromise;
}

async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  if (CACHE_STRATEGY === 'cache-first') {
    return cacheFirst(cache, request);
  } else if (CACHE_STRATEGY === 'network-first') {
    return networkFirst(cache, request);
  } else {
    return staleWhileRevalidate(cache, request);
  }
}`.trim();
  }

  /**
   * Handle cache update notifications
   */
  handleCacheUpdate(data: any): void {
    console.log('Navigation cache updated:', data);
    
    // Notify components about cache updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navigation-cache-updated', {
        detail: data
      }));
    }
  }

  /**
   * Update cache metrics
   */
  updateMetrics(type: 'hit' | 'miss'): void {
    this.metrics.totalRequests++;
    
    if (type === 'hit') {
      this.metrics.hitRate = (this.metrics.hitRate * (this.metrics.totalRequests - 1) + 1) / this.metrics.totalRequests;
    } else {
      this.metrics.missRate = (this.metrics.missRate * (this.metrics.totalRequests - 1) + 1) / this.metrics.totalRequests;
    }

    this.metrics.lastUpdated = Date.now();
  }
}

export default CacheManager;
