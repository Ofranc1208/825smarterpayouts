/**
 * Message Handler - Service Worker Communication
 * 
 * Handles all communication between the main thread and service worker
 * including message routing, event handling, and data synchronization.
 * 
 * @module MessageHandler
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { ServiceWorkerMessage, OfflineConfig } from './types';
import type { CacheManager } from './CacheManager';
import type { OfflineUIManager } from './OfflineUIManager';
import type { MetricsTracker } from './MetricsTracker';
import type { AnalyticsQueueManager } from './AnalyticsQueueManager';

export class MessageHandler {
  private config: OfflineConfig;
  private cacheManager: CacheManager;
  private uiManager: OfflineUIManager;
  private metricsTracker: MetricsTracker;
  private analyticsQueue: AnalyticsQueueManager;

  constructor(
    config: OfflineConfig,
    cacheManager: CacheManager,
    uiManager: OfflineUIManager,
    metricsTracker: MetricsTracker,
    analyticsQueue: AnalyticsQueueManager
  ) {
    this.config = config;
    this.cacheManager = cacheManager;
    this.uiManager = uiManager;
    this.metricsTracker = metricsTracker;
    this.analyticsQueue = analyticsQueue;
  }

  /**
   * Setup message handlers for communication with service worker
   */
  setupMessageHandlers(): void {
    if (typeof navigator === 'undefined' || !navigator.serviceWorker) return;

    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event);
    });

    console.log('Service Worker message handlers setup complete');
  }

  /**
   * Handle incoming messages from service worker
   */
  private handleServiceWorkerMessage(event: MessageEvent): void {
    const message: ServiceWorkerMessage = event.data;
    
    if (!message || !message.type) {
      console.warn('Invalid service worker message received:', event.data);
      return;
    }

    console.log('Service Worker message received:', message.type, message.data);

    switch (message.type) {
      case 'CACHE_HIT':
        this.handleCacheHit(message);
        break;
      case 'CACHE_MISS':
        this.handleCacheMiss(message);
        break;
      case 'CACHE_UPDATED':
        this.handleCacheUpdate(message);
        break;
      case 'OFFLINE_FALLBACK':
        this.handleOfflineFallback(message);
        break;
      default:
        console.warn('Unknown service worker message type:', message.type);
    }
  }

  /**
   * Handle cache hit messages
   */
  private handleCacheHit(message: ServiceWorkerMessage): void {
    this.metricsTracker.updateMetrics('hit');
    
    if (this.config.enableAnalytics) {
      console.log('Cache hit for:', message.url);
    }
  }

  /**
   * Handle cache miss messages
   */
  private handleCacheMiss(message: ServiceWorkerMessage): void {
    this.metricsTracker.updateMetrics('miss');
    
    if (this.config.enableAnalytics) {
      console.log('Cache miss for:', message.url);
      this.analyticsQueue.queueAnalyticsEvent('navigation_cache_miss', {
        url: message.url,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Handle cache update notifications
   */
  private handleCacheUpdate(message: ServiceWorkerMessage): void {
    this.cacheManager.handleCacheUpdate(message.data);
    
    if (this.config.enableAnalytics) {
      this.analyticsQueue.queueAnalyticsEvent('navigation_cache_updated', {
        url: message.url,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Handle offline fallback scenarios
   */
  private handleOfflineFallback(message: ServiceWorkerMessage): void {
    this.uiManager.handleOfflineFallback(message.data);
    
    if (this.config.enableAnalytics) {
      this.analyticsQueue.handleOfflineFallback(message.data?.resource || 'unknown');
    }
  }

  /**
   * Send message to service worker
   */
  async sendMessageToServiceWorker(type: string, data?: any): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.serviceWorker || !navigator.serviceWorker.controller) {
      console.warn('Service Worker not available for messaging');
      return false;
    }

    try {
      navigator.serviceWorker.controller.postMessage({
        type,
        data,
        timestamp: Date.now()
      });

      console.log('Message sent to service worker:', type, data);
      return true;
    } catch (error) {
      console.error('Failed to send message to service worker:', error);
      return false;
    }
  }

  /**
   * Request cache status from service worker
   */
  async requestCacheStatus(): Promise<void> {
    await this.sendMessageToServiceWorker('REQUEST_CACHE_STATUS');
  }

  /**
   * Request metrics from service worker
   */
  async requestMetrics(): Promise<void> {
    await this.sendMessageToServiceWorker('REQUEST_METRICS');
  }

  /**
   * Trigger cache cleanup in service worker
   */
  async triggerCacheCleanup(): Promise<void> {
    await this.sendMessageToServiceWorker('TRIGGER_CACHE_CLEANUP');
  }

  /**
   * Update service worker configuration
   */
  async updateServiceWorkerConfig(config: Partial<OfflineConfig>): Promise<void> {
    await this.sendMessageToServiceWorker('UPDATE_CONFIG', config);
  }

  /**
   * Generate message handling script for service worker
   */
  generateServiceWorkerMessageScript(): string {
    return `
// Message handling in service worker
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
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
    default:
      console.log('Unknown message type in SW:', type);
  }
});

async function handleCacheStatusRequest(event) {
  try {
    const cacheNames = await caches.keys();
    const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
    
    let totalEntries = 0;
    for (const cacheName of navigationCaches) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      totalEntries += keys.length;
    }
    
    event.ports[0]?.postMessage({
      type: 'CACHE_STATUS_RESPONSE',
      data: {
        caches: navigationCaches.length,
        entries: totalEntries,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Failed to get cache status:', error);
  }
}

async function handleMetricsRequest(event) {
  event.ports[0]?.postMessage({
    type: 'METRICS_RESPONSE',
    data: swMetrics
  });
}

async function handleCacheCleanup(event) {
  try {
    const cacheNames = await caches.keys();
    const navigationCaches = cacheNames.filter(name => name.startsWith('navigation-'));
    
    // Clean up old caches (keep only latest version)
    const cachesToDelete = navigationCaches.filter(name => !name.includes('-v1'));
    
    for (const cacheName of cachesToDelete) {
      await caches.delete(cacheName);
    }
    
    event.ports[0]?.postMessage({
      type: 'CACHE_CLEANUP_RESPONSE',
      data: {
        deleted: cachesToDelete.length,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}

function handleConfigUpdate(event, newConfig) {
  // Update service worker configuration
  if (newConfig.cacheStrategy) {
    CACHE_STRATEGY = newConfig.cacheStrategy;
  }
  if (newConfig.maxCacheAge) {
    MAX_CACHE_AGE = newConfig.maxCacheAge;
  }
  
  console.log('Service worker config updated:', newConfig);
  
  event.ports[0]?.postMessage({
    type: 'CONFIG_UPDATE_RESPONSE',
    data: { success: true, timestamp: Date.now() }
  });
}`.trim();
  }

  /**
   * Setup bidirectional communication channel
   */
  async setupCommunicationChannel(): Promise<MessageChannel | null> {
    if (typeof MessageChannel === 'undefined' || !navigator.serviceWorker.controller) {
      return null;
    }

    const channel = new MessageChannel();
    
    // Setup response handler
    channel.port1.onmessage = (event) => {
      console.log('Response from service worker:', event.data);
      this.handleServiceWorkerResponse(event.data);
    };

    // Send port to service worker
    navigator.serviceWorker.controller.postMessage({
      type: 'SETUP_CHANNEL'
    }, [channel.port2]);

    return channel;
  }

  /**
   * Handle responses from service worker
   */
  private handleServiceWorkerResponse(data: any): void {
    switch (data.type) {
      case 'CACHE_STATUS_RESPONSE':
        console.log('Cache status:', data.data);
        break;
      case 'METRICS_RESPONSE':
        this.metricsTracker.handleMetricsUpdate(data.data);
        break;
      case 'CACHE_CLEANUP_RESPONSE':
        console.log('Cache cleanup completed:', data.data);
        break;
      case 'CONFIG_UPDATE_RESPONSE':
        console.log('Service worker config updated successfully');
        break;
      default:
        console.log('Unknown response type:', data.type);
    }
  }

  /**
   * Check if service worker is ready for communication
   */
  isServiceWorkerReady(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      navigator.serviceWorker &&
      navigator.serviceWorker.controller !== null
    );
  }

  /**
   * Wait for service worker to be ready
   */
  async waitForServiceWorker(timeout: number = 5000): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.isServiceWorkerReady()) {
        resolve(true);
        return;
      }

      const timeoutId = setTimeout(() => {
        resolve(false);
      }, timeout);

      const checkReady = () => {
        if (this.isServiceWorkerReady()) {
          clearTimeout(timeoutId);
          resolve(true);
        } else {
          setTimeout(checkReady, 100);
        }
      };

      checkReady();
    });
  }
}

export default MessageHandler;
