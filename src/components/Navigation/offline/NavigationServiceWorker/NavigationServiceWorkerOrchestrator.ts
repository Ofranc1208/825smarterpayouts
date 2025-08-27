/**
 * Navigation Service Worker Orchestrator - Main Coordinator
 * 
 * Coordinates all service worker modules and provides the main
 * public interface for the Navigation Service Worker system.
 * 
 * @module NavigationServiceWorkerOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';
import { CacheManager } from './CacheManager';
import { BackgroundSyncManager } from './BackgroundSyncManager';
import { AnalyticsQueueManager } from './AnalyticsQueueManager';
import { MetricsTracker } from './MetricsTracker';
import { OfflineUIManager } from './OfflineUIManager';
import { MessageHandler } from './MessageHandler';
import { ServiceWorkerScriptGenerator } from './ServiceWorkerScriptGenerator';
import type { OfflineConfig, CacheMetrics, OfflineIndicatorConfig } from './types';

export class NavigationServiceWorkerOrchestrator {
  private config: OfflineConfig;
  private isSupported: boolean;
  private registration: ServiceWorkerRegistration | null = null;

  // Module instances
  private cacheManager: CacheManager;
  private syncManager: BackgroundSyncManager;
  private analyticsQueue: AnalyticsQueueManager;
  private metricsTracker: MetricsTracker;
  private uiManager: OfflineUIManager;
  private messageHandler: MessageHandler;
  private scriptGenerator: ServiceWorkerScriptGenerator;

  constructor(config: Partial<OfflineConfig> = {}, uiConfig: Partial<OfflineIndicatorConfig> = {}) {
    this.config = {
      enableOfflineMode: true,
      cacheStrategy: 'stale-while-revalidate',
      maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours
      enableBackgroundSync: true,
      enableAnalytics: true,
      ...config
    };

    this.isSupported = typeof window !== 'undefined' && 'serviceWorker' in navigator;

    // Initialize modules
    this.metricsTracker = new MetricsTracker(this.config);
    this.cacheManager = new CacheManager(this.config, this.metricsTracker.getMetrics());
    this.syncManager = new BackgroundSyncManager(this.config);
    this.analyticsQueue = new AnalyticsQueueManager(this.config);
    this.uiManager = new OfflineUIManager(this.config, uiConfig);
    this.scriptGenerator = new ServiceWorkerScriptGenerator(this.config);
    
    // Message handler needs references to other modules
    this.messageHandler = new MessageHandler(
      this.config,
      this.cacheManager,
      this.uiManager,
      this.metricsTracker,
      this.analyticsQueue
    );
  }

  /**
   * Initialize the complete service worker system
   */
  async initialize(): Promise<boolean> {
    if (!this.isSupported || !this.config.enableOfflineMode) {
      console.warn('Service Worker not supported or disabled');
      return false;
    }

    try {
      console.log('Initializing Navigation Service Worker system...');

      // Step 1: Generate and register service worker
      const scriptRegistered = await this.registerServiceWorker();
      if (!scriptRegistered) {
        throw new Error('Failed to register service worker');
      }

      // Step 2: Setup message handlers
      this.messageHandler.setupMessageHandlers();

      // Step 3: Setup background sync
      if (this.config.enableBackgroundSync) {
        await this.syncManager.setupBackgroundSync();
      }

      // Step 4: Cache initial resources
      await this.cacheManager.cacheNavigationResources();

      // Step 5: Setup metrics tracking
      await this.metricsTracker.updateCacheSize();

      console.log('Navigation Service Worker system initialized successfully');
      
      if (this.config.enableAnalytics) {
        track('navigation_sw_system_initialized', {
          cache_strategy: this.config.cacheStrategy,
          background_sync: this.config.enableBackgroundSync,
          modules_loaded: 7,
          timestamp: Date.now()
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize Navigation Service Worker system:', error);
      
      if (this.config.enableAnalytics) {
        track('navigation_sw_initialization_failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: Date.now()
        });
      }
      
      return false;
    }
  }

  /**
   * Register service worker with generated script
   */
  private async registerServiceWorker(): Promise<boolean> {
    try {
      // Generate service worker script
      const scriptContent = this.scriptGenerator.generateServiceWorkerScript();
      
      // Create blob URL for the script
      const blob = new Blob([scriptContent], { type: 'application/javascript' });
      const scriptUrl = URL.createObjectURL(blob);

      // Register service worker
      this.registration = await navigator.serviceWorker.register(scriptUrl, {
        scope: '/navigation/'
      });

      // Set registration in sync manager
      this.syncManager.setRegistration(this.registration);

      console.log('Service Worker registered successfully');
      return true;
    } catch (error) {
      console.error('Failed to register service worker:', error);
      return false;
    }
  }

  /**
   * Update service worker configuration
   */
  async updateConfiguration(newConfig: Partial<OfflineConfig>): Promise<boolean> {
    try {
      // Update internal configuration
      this.config = { ...this.config, ...newConfig };

      // Update all modules
      this.scriptGenerator.updateConfig(newConfig);
      
      // Send configuration update to service worker
      await this.messageHandler.updateServiceWorkerConfig(newConfig);

      console.log('Service Worker configuration updated');
      
      if (this.config.enableAnalytics) {
        track('navigation_sw_config_updated', {
          updated_fields: Object.keys(newConfig),
          timestamp: Date.now()
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to update service worker configuration:', error);
      return false;
    }
  }

  /**
   * Get comprehensive system status
   */
  getSystemStatus(): {
    isSupported: boolean;
    isRegistered: boolean;
    isOnline: boolean;
    config: OfflineConfig;
    metrics: CacheMetrics;
    syncStatus: any;
    queueStats: any;
  } {
    return {
      isSupported: this.isSupported,
      isRegistered: this.registration !== null,
      isOnline: this.uiManager.isCurrentlyOnline(),
      config: this.config,
      metrics: this.metricsTracker.getMetrics(),
      syncStatus: this.syncManager.getSyncStatus(),
      queueStats: this.analyticsQueue.getQueueStats()
    };
  }

  /**
   * Get detailed performance report
   */
  getPerformanceReport(): any {
    return this.metricsTracker.getPerformanceReport();
  }

  /**
   * Cache navigation resources manually
   */
  async cacheNavigationResources(): Promise<void> {
    await this.cacheManager.cacheNavigationResources();
  }

  /**
   * Clear all navigation caches
   */
  async clearCache(): Promise<void> {
    await this.cacheManager.clearCache();
  }

  /**
   * Trigger background sync manually
   */
  async triggerSync(): Promise<boolean> {
    return await this.syncManager.triggerSync();
  }

  /**
   * Queue analytics event
   */
  queueAnalyticsEvent(eventName: string, data: any): void {
    this.analyticsQueue.queueAnalyticsEvent(eventName, data);
  }

  /**
   * Show custom UI message
   */
  showMessage(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    this.uiManager.showCustomMessage(message, type);
  }

  /**
   * Update service worker script
   */
  async updateServiceWorker(): Promise<boolean> {
    if (!this.registration) return false;

    try {
      await this.registration.update();
      console.log('Navigation Service Worker updated');
      
      if (this.config.enableAnalytics) {
        track('navigation_sw_updated', {
          timestamp: Date.now()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update service worker:', error);
      return false;
    }
  }

  /**
   * Check if navigation is available offline
   */
  isOfflineReady(): boolean {
    return this.isSupported && this.registration !== null;
  }

  /**
   * Get cache metrics
   */
  getCacheMetrics(): CacheMetrics {
    return this.metricsTracker.getMetrics();
  }

  /**
   * Reset all metrics (for testing/debugging)
   */
  resetMetrics(): void {
    this.metricsTracker.resetMetrics();
  }

  /**
   * Clear analytics queue
   */
  clearAnalyticsQueue(): void {
    this.analyticsQueue.clearAllEvents();
  }

  /**
   * Generate service worker script (for external use)
   */
  generateServiceWorkerScript(): string {
    return this.scriptGenerator.generateServiceWorkerScript();
  }

  /**
   * Validate service worker script
   */
  validateServiceWorkerScript(): { valid: boolean; errors: string[] } {
    return this.scriptGenerator.validateScript();
  }

  /**
   * Get script size estimation
   */
  getScriptSize(): number {
    return this.scriptGenerator.getScriptSizeEstimate();
  }

  /**
   * Setup communication channel with service worker
   */
  async setupCommunicationChannel(): Promise<MessageChannel | null> {
    return await this.messageHandler.setupCommunicationChannel();
  }

  /**
   * Wait for service worker to be ready
   */
  async waitForServiceWorker(timeout: number = 5000): Promise<boolean> {
    return await this.messageHandler.waitForServiceWorker(timeout);
  }

  /**
   * Cleanup all resources
   */
  cleanup(): void {
    this.uiManager.cleanup();
    
    if (this.registration) {
      this.registration.unregister().catch(error => {
        console.error('Failed to unregister service worker:', error);
      });
    }

    console.log('Navigation Service Worker system cleaned up');
  }

  /**
   * Get module instances (for advanced usage)
   */
  getModules(): {
    cacheManager: CacheManager;
    syncManager: BackgroundSyncManager;
    analyticsQueue: AnalyticsQueueManager;
    metricsTracker: MetricsTracker;
    uiManager: OfflineUIManager;
    messageHandler: MessageHandler;
    scriptGenerator: ServiceWorkerScriptGenerator;
  } {
    return {
      cacheManager: this.cacheManager,
      syncManager: this.syncManager,
      analyticsQueue: this.analyticsQueue,
      metricsTracker: this.metricsTracker,
      uiManager: this.uiManager,
      messageHandler: this.messageHandler,
      scriptGenerator: this.scriptGenerator
    };
  }
}

export default NavigationServiceWorkerOrchestrator;
