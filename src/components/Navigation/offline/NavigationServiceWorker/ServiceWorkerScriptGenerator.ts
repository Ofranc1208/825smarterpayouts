/**
 * Service Worker Script Generator - Dynamic SW Script Creation
 * 
 * Generates the complete service worker script with all necessary
 * event handlers, caching strategies, and background sync logic.
 * 
 * @module ServiceWorkerScriptGenerator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { OfflineConfig } from './types';

export class ServiceWorkerScriptGenerator {
  private config: OfflineConfig;

  constructor(config: OfflineConfig) {
    this.config = config;
  }

  /**
   * Generate complete service worker script
   */
  generateServiceWorkerScript(): string {
    return `
// Navigation Service Worker - Generated Script
// Generated at: ${new Date().toISOString()}
// Configuration: ${JSON.stringify(this.config, null, 2)}

const CACHE_NAME = 'navigation-v1';
const CACHE_STRATEGY = '${this.config.cacheStrategy}';
const MAX_CACHE_AGE = ${this.config.maxCacheAge};
const ENABLE_BACKGROUND_SYNC = ${this.config.enableBackgroundSync};
const ENABLE_ANALYTICS = ${this.config.enableAnalytics};

${this.generateMetricsTracking()}

${this.generateInstallHandler()}

${this.generateActivateHandler()}

${this.generateFetchHandler()}

${this.generateBackgroundSyncHandler()}

${this.generateMessageHandler()}

${this.generateCacheStrategies()}

${this.generateUtilityFunctions()}
    `.trim();
  }

  /**
   * Generate metrics tracking code
   */
  private generateMetricsTracking(): string {
    return `
// Metrics tracking
let swMetrics = {
  hits: 0,
  misses: 0,
  totalRequests: 0,
  startTime: Date.now(),
  errors: 0
};

function updateSWMetrics(type) {
  swMetrics.totalRequests++;
  if (type === 'hit') {
    swMetrics.hits++;
  } else if (type === 'miss') {
    swMetrics.misses++;
  } else if (type === 'error') {
    swMetrics.errors++;
  }
  
  // Report metrics every 25 requests
  if (swMetrics.totalRequests % 25 === 0) {
    postMessage({
      type: 'METRICS_UPDATE',
      data: {
        hitRate: swMetrics.hits / swMetrics.totalRequests,
        missRate: swMetrics.misses / swMetrics.totalRequests,
        errorRate: swMetrics.errors / swMetrics.totalRequests,
        totalRequests: swMetrics.totalRequests,
        uptime: Date.now() - swMetrics.startTime
      }
    });
  }
}`.trim();
  }

  /**
   * Generate install event handler
   */
  private generateInstallHandler(): string {
    return `
// Install event
self.addEventListener('install', (event) => {
  console.log('Navigation SW: Installing version', CACHE_NAME);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Navigation SW: Cache opened');
      
      // Pre-cache critical navigation resources
      const criticalResources = [
        '/',
        '/navigation/desktop',
        '/navigation/mobile'
      ];
      
      return cache.addAll(criticalResources).catch(error => {
        console.error('Navigation SW: Failed to pre-cache resources:', error);
      });
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});`.trim();
  }

  /**
   * Generate activate event handler
   */
  private generateActivateHandler(): string {
    return `
// Activate event
self.addEventListener('activate', (event) => {
  console.log('Navigation SW: Activating');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old navigation caches
          if (cacheName.startsWith('navigation-') && cacheName !== CACHE_NAME) {
            console.log('Navigation SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});`.trim();
  }

  /**
   * Generate fetch event handler
   */
  private generateFetchHandler(): string {
    return `
// Fetch event
self.addEventListener('fetch', (event) => {
  // Only handle navigation-related requests
  if (shouldHandleRequest(event.request)) {
    event.respondWith(handleNavigationRequest(event.request));
  }
});

function shouldHandleRequest(request) {
  const url = new URL(request.url);
  
  // Handle navigation routes and API calls
  return (
    request.method === 'GET' &&
    (
      url.pathname.startsWith('/navigation/') ||
      url.pathname.startsWith('/api/navigation/') ||
      url.pathname === '/' ||
      request.destination === 'document'
    )
  );
}`.trim();
  }

  /**
   * Generate background sync handler
   */
  private generateBackgroundSyncHandler(): string {
    if (!this.config.enableBackgroundSync) {
      return '// Background sync disabled';
    }

    return `
// Background sync
self.addEventListener('sync', (event) => {
  console.log('Navigation SW: Sync event received:', event.tag);
  
  if (event.tag === 'navigation-analytics-sync') {
    event.waitUntil(syncAnalytics());
  } else if (event.tag === 'navigation-cache-sync') {
    event.waitUntil(syncCacheData());
  }
});

async function syncAnalytics() {
  try {
    console.log('Navigation SW: Syncing analytics data');
    
    // Get queued analytics events
    const events = await getQueuedAnalyticsEvents();
    
    if (events.length === 0) {
      console.log('Navigation SW: No analytics events to sync');
      return;
    }

    // Send events to analytics endpoint
    for (const event of events) {
      try {
        const response = await fetch('/api/analytics/navigation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event)
        });

        if (response.ok) {
          await markEventAsSynced(event.id);
          console.log('Navigation SW: Analytics event synced:', event.name);
        } else {
          console.error('Navigation SW: Failed to sync analytics event:', response.status);
        }
      } catch (syncError) {
        console.error('Navigation SW: Error syncing individual event:', syncError);
      }
    }

    // Clean up synced events
    await cleanupSyncedEvents();
    
    postMessage({
      type: 'SYNC_COMPLETED',
      data: { eventsSynced: events.length, timestamp: Date.now() }
    });
    
  } catch (error) {
    console.error('Navigation SW: Background sync failed:', error);
    updateSWMetrics('error');
  }
}

async function syncCacheData() {
  try {
    console.log('Navigation SW: Syncing cache data');
    
    // Update navigation data cache
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch('/api/navigation/config');
    
    if (response.ok) {
      await cache.put('/api/navigation/config', response);
      console.log('Navigation SW: Cache data synced');
    }
    
  } catch (error) {
    console.error('Navigation SW: Cache sync failed:', error);
  }
}`.trim();
  }

  /**
   * Generate message handler
   */
  private generateMessageHandler(): string {
    return `
// Message handling
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  console.log('Navigation SW: Message received:', type);
  
  switch (type) {
    case 'REQUEST_CACHE_STATUS':
      handleCacheStatusRequest(event);
      break;
    case 'REQUEST_METRICS':
      handleMetricsRequest(event);
      break;
    case 'TRIGGER_CACHE_CLEANUP':
      handleCacheCleanup(event);
      break;
    case 'UPDATE_CONFIG':
      handleConfigUpdate(event, data);
      break;
    case 'SETUP_CHANNEL':
      console.log('Navigation SW: Communication channel setup');
      break;
    default:
      console.log('Navigation SW: Unknown message type:', type);
  }
});

async function handleCacheStatusRequest(event) {
  try {
    const cacheNames = await caches.keys();
    const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
    
    let totalEntries = 0;
    let totalSize = 0;
    
    for (const cacheName of navigationCaches) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      totalEntries += keys.length;
      
      // Estimate cache size
      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }
    
    const responseData = {
      type: 'CACHE_STATUS_RESPONSE',
      data: {
        caches: navigationCaches.length,
        entries: totalEntries,
        sizeBytes: totalSize,
        timestamp: Date.now()
      }
    };
    
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage(responseData);
    } else {
      postMessage(responseData);
    }
  } catch (error) {
    console.error('Navigation SW: Failed to get cache status:', error);
  }
}

async function handleMetricsRequest(event) {
  const responseData = {
    type: 'METRICS_RESPONSE',
    data: {
      ...swMetrics,
      timestamp: Date.now()
    }
  };
  
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage(responseData);
  } else {
    postMessage(responseData);
  }
}

async function handleCacheCleanup(event) {
  try {
    const cacheNames = await caches.keys();
    const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
    
    // Clean up old caches (keep only current version)
    const cachesToDelete = navigationCaches.filter(name => name !== CACHE_NAME);
    
    for (const cacheName of cachesToDelete) {
      await caches.delete(cacheName);
    }
    
    // Clean up expired entries in current cache
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader) {
          const responseDate = new Date(dateHeader);
          const now = new Date();
          const age = now.getTime() - responseDate.getTime();
          
          if (age > MAX_CACHE_AGE) {
            await cache.delete(request);
          }
        }
      }
    }
    
    const responseData = {
      type: 'CACHE_CLEANUP_RESPONSE',
      data: {
        deletedCaches: cachesToDelete.length,
        timestamp: Date.now()
      }
    };
    
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage(responseData);
    } else {
      postMessage(responseData);
    }
  } catch (error) {
    console.error('Navigation SW: Cache cleanup failed:', error);
  }
}`.trim();
  }

  /**
   * Generate cache strategies
   */
  private generateCacheStrategies(): string {
    return `
async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    if (CACHE_STRATEGY === 'cache-first') {
      return await cacheFirst(cache, request);
    } else if (CACHE_STRATEGY === 'network-first') {
      return await networkFirst(cache, request);
    } else {
      return await staleWhileRevalidate(cache, request);
    }
  } catch (error) {
    console.error('Navigation SW: Request handling failed:', error);
    updateSWMetrics('error');
    
    // Try to serve from cache as fallback
    const cached = await cache.match(request);
    if (cached) {
      postMessage({ type: 'CACHE_HIT', url: request.url });
      return cached;
    }
    
    // Return offline page or error response
    return new Response('Navigation temporarily unavailable', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function cacheFirst(cache, request) {
  const cached = await cache.match(request);
  if (cached) {
    updateSWMetrics('hit');
    postMessage({ type: 'CACHE_HIT', url: request.url });
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    updateSWMetrics('miss');
    postMessage({ type: 'CACHE_MISS', url: request.url });
    return response;
  } catch (error) {
    updateSWMetrics('error');
    postMessage({ type: 'OFFLINE_FALLBACK', data: { resource: request.url } });
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(cache, request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      updateSWMetrics('hit');
      postMessage({ type: 'CACHE_HIT', url: request.url });
      return cached;
    }
    updateSWMetrics('error');
    postMessage({ type: 'OFFLINE_FALLBACK', data: { resource: request.url } });
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(cache, request) {
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
      postMessage({ type: 'CACHE_UPDATED', url: request.url });
    }
    return response;
  }).catch(error => {
    console.error('Navigation SW: Network request failed:', error);
    if (!cached) {
      updateSWMetrics('error');
      postMessage({ type: 'OFFLINE_FALLBACK', data: { resource: request.url } });
    }
    return cached || new Response('Offline', { status: 503 });
  });
  
  if (cached) {
    updateSWMetrics('hit');
    postMessage({ type: 'CACHE_HIT', url: request.url });
  } else {
    updateSWMetrics('miss');
  }
  
  return cached || fetchPromise;
}`.trim();
  }

  /**
   * Generate utility functions
   */
  private generateUtilityFunctions(): string {
    return `
// Utility functions
function postMessage(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      try {
        client.postMessage(message);
      } catch (error) {
        console.error('Navigation SW: Failed to post message to client:', error);
      }
    });
  });
}

async function getQueuedAnalyticsEvents() {
  // In a real implementation, this would use IndexedDB
  // For now, return empty array as placeholder
  return [];
}

async function markEventAsSynced(eventId) {
  // Mark event as synced in IndexedDB
  console.log('Navigation SW: Marking event as synced:', eventId);
}

async function cleanupSyncedEvents() {
  // Remove synced events from IndexedDB
  console.log('Navigation SW: Cleaning up synced events');
}

function handleConfigUpdate(event, newConfig) {
  // Update service worker configuration
  if (newConfig.cacheStrategy) {
    CACHE_STRATEGY = newConfig.cacheStrategy;
    console.log('Navigation SW: Cache strategy updated to:', CACHE_STRATEGY);
  }
  if (newConfig.maxCacheAge) {
    MAX_CACHE_AGE = newConfig.maxCacheAge;
    console.log('Navigation SW: Max cache age updated to:', MAX_CACHE_AGE);
  }
  
  const responseData = {
    type: 'CONFIG_UPDATE_RESPONSE',
    data: { 
      success: true, 
      timestamp: Date.now(),
      config: { CACHE_STRATEGY, MAX_CACHE_AGE }
    }
  };
  
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage(responseData);
  } else {
    postMessage(responseData);
  }
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Navigation SW: Global error:', event.error);
  updateSWMetrics('error');
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Navigation SW: Unhandled promise rejection:', event.reason);
  updateSWMetrics('error');
});

console.log('Navigation Service Worker loaded successfully');`.trim();
  }

  /**
   * Update configuration and regenerate script
   */
  updateConfig(newConfig: Partial<OfflineConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get script size estimation
   */
  getScriptSizeEstimate(): number {
    return this.generateServiceWorkerScript().length;
  }

  /**
   * Validate generated script
   */
  validateScript(): { valid: boolean; errors: string[] } {
    const script = this.generateServiceWorkerScript();
    const errors: string[] = [];

    // Basic syntax validation
    try {
      // This is a simple check - in production you might use a proper JS parser
      if (!script.includes('self.addEventListener')) {
        errors.push('Missing event listeners');
      }
      if (!script.includes('CACHE_NAME')) {
        errors.push('Missing cache name definition');
      }
      if (this.config.enableBackgroundSync && !script.includes('sync')) {
        errors.push('Background sync enabled but not implemented');
      }
    } catch (error) {
      errors.push(`Script validation error: ${error}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default ServiceWorkerScriptGenerator;
