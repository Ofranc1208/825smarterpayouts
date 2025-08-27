/**
 * Navigation Service Worker Types
 * 
 * Shared TypeScript interfaces and types for the modular
 * Navigation Service Worker system.
 * 
 * @module NavigationServiceWorkerTypes
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

export interface OfflineConfig {
  enableOfflineMode: boolean;
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  maxCacheAge: number; // in milliseconds
  enableBackgroundSync: boolean;
  enableAnalytics: boolean;
}

export interface CacheMetrics {
  hitRate: number;
  missRate: number;
  totalRequests: number;
  cacheSize: number;
  lastUpdated: number;
}

export interface AnalyticsEvent {
  name: string;
  data: any;
  timestamp: number;
  synced: boolean;
}

export interface ServiceWorkerMessage {
  type: 'CACHE_HIT' | 'CACHE_MISS' | 'CACHE_UPDATED' | 'OFFLINE_FALLBACK';
  data?: any;
  url?: string;
}

export interface OfflineIndicatorConfig {
  position: 'top' | 'bottom';
  autoHide: boolean;
  hideDelay: number;
  customStyles?: string;
}
