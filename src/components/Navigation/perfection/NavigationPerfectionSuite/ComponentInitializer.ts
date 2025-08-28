/**
 * Component Initializer - Perfection Suite Component Management
 * 
 * Handles initialization and management of all navigation perfection
 * components including bundle analyzer, service worker, etc.
 * 
 * @module ComponentInitializer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import { track } from '@vercel/analytics';
import { BundleAnalyzer } from '../../optimization/BundleAnalyzer';
import { NavigationServiceWorker } from '../../offline/NavigationServiceWorker';
import { PerformanceBudgetEnforcer } from '../../performance/PerformanceBudgetEnforcer';
import { SmartNavigationCache } from '../../caching/SmartNavigationCache';
import type { PerfectionConfig, ComponentInstances } from './types';

export class ComponentInitializer {
  private config: PerfectionConfig;
  private components: ComponentInstances | null = null;
  private isInitialized: boolean = false;

  constructor(config: PerfectionConfig) {
    this.config = config;
  }

  /**
   * Initialize all perfection components
   */
  async initialize(): Promise<ComponentInstances> {
    if (this.isInitialized && this.components) {
      return this.components;
    }

    try {
      console.log('🚀 Initializing Navigation Perfection Components...');

      // Initialize components
      this.components = this.createComponents();

      // Run initialization tasks
      await this.runInitializationTasks();

      // Setup integrations
      this.setupIntegrations();

      this.isInitialized = true;

      // Track initialization
      if (this.config.enableAnalytics) {
        track('navigation_perfection_components_initialized', {
          features_enabled: Object.values(this.config).filter(Boolean).length,
          timestamp: Date.now()
        });
      }

      console.log('✅ Navigation Perfection Components initialized successfully!');
      return this.components;
    } catch (error) {
      console.error('❌ Failed to initialize Navigation Perfection Components:', error);
      throw error;
    }
  }

  /**
   * Create component instances
   */
  private createComponents(): ComponentInstances {
    const bundleAnalyzer = new BundleAnalyzer({
      enableTreeShaking: this.config.enableBundleOptimization,
      enableAnalytics: this.config.enableAnalytics
    });

    const serviceWorker = new NavigationServiceWorker({
      enableOfflineMode: this.config.enableOfflineSupport,
      enableAnalytics: this.config.enableAnalytics
    });

    const performanceEnforcer = new PerformanceBudgetEnforcer({
      enableRealTimeMonitoring: this.config.enablePerformanceBudgets,
      enableAnalytics: this.config.enableAnalytics
    });

    const smartCache = new SmartNavigationCache({
      enablePredictivePreloading: this.config.enablePredictiveOptimization,
      enableAnalytics: this.config.enableAnalytics
    });

    return {
      bundleAnalyzer,
      serviceWorker,
      performanceEnforcer,
      smartCache
    };
  }

  /**
   * Run initialization tasks for enabled components
   */
  private async runInitializationTasks(): Promise<void> {
    if (!this.components) return;

    const initPromises: Promise<any>[] = [];

    if (this.config.enableBundleOptimization) {
      initPromises.push(
        this.components.bundleAnalyzer.analyzeBundleSize().catch((error: any) => {
          console.warn('Bundle analyzer initialization failed:', error);
          return null;
        })
      );
    }

    if (this.config.enableOfflineSupport) {
      initPromises.push(
        this.components.serviceWorker.initialize().catch((error: any) => {
          console.warn('Service worker initialization failed:', error);
          return null;
        })
      );
    }

    // Wait for all initializations (with error handling)
    await Promise.allSettled(initPromises);
  }

  /**
   * Setup cross-component integrations
   */
  private setupIntegrations(): void {
    if (!this.components) return;

    try {
      // Performance budget violations trigger cache optimization
      this.components.performanceEnforcer.addBudget({
        metric: 'cache_hit_rate',
        budget: 80,
        unit: 'score',
        severity: 'warning',
        description: 'Cache hit rate should be above 80%'
      });

      // Additional integrations can be added here
      console.log('🔗 Cross-component integrations configured');
    } catch (error) {
      console.warn('Failed to setup integrations:', error);
    }
  }

  /**
   * Get component instances
   */
  getComponents(): ComponentInstances | null {
    return this.components;
  }

  /**
   * Check if components are initialized
   */
  isComponentsInitialized(): boolean {
    return this.isInitialized && this.components !== null;
  }

  /**
   * Update configuration and reinitialize if needed
   */
  async updateConfig(newConfig: PerfectionConfig): Promise<void> {
    const configChanged = JSON.stringify(this.config) !== JSON.stringify(newConfig);
    this.config = newConfig;

    if (configChanged && this.isInitialized) {
      console.log('🔄 Configuration changed, reinitializing components...');
      this.isInitialized = false;
      this.components = null;
      await this.initialize();
    }
  }

  /**
   * Destroy all components
   */
  destroy(): void {
    if (!this.components) return;

    try {
      this.components.smartCache.destroy();
      this.components.serviceWorker.updateServiceWorker();
      
      this.components = null;
      this.isInitialized = false;
      
      console.log('🔥 Navigation Perfection Components destroyed');
    } catch (error) {
      console.warn('Error during component destruction:', error);
    }
  }

  /**
   * Get initialization status
   */
  getInitializationStatus(): {
    isInitialized: boolean;
    componentsReady: boolean;
    enabledFeatures: string[];
    failedFeatures: string[];
  } {
    const enabledFeatures = Object.entries(this.config)
      .filter(([, enabled]) => enabled)
      .map(([feature]) => feature);

    return {
      isInitialized: this.isInitialized,
      componentsReady: this.components !== null,
      enabledFeatures,
      failedFeatures: [] // Could be enhanced to track failed initializations
    };
  }
}

export default ComponentInitializer;
