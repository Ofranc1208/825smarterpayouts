/**
 * Configuration Manager - Perfection Suite Configuration
 * 
 * Handles all configuration management for the Navigation Perfection Suite
 * including default settings, validation, and feature toggling.
 * 
 * @module ConfigurationManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import type { PerfectionConfig } from './types';

export class ConfigurationManager {
  private config: PerfectionConfig;

  constructor(initialConfig: Partial<PerfectionConfig> = {}) {
    this.config = this.createDefaultConfig(initialConfig);
  }

  /**
   * Create default configuration with overrides
   */
  private createDefaultConfig(overrides: Partial<PerfectionConfig>): PerfectionConfig {
    const defaults: PerfectionConfig = {
      enableBundleOptimization: true,
      enableOfflineSupport: true,
      enableABTesting: true,
      enableAdvancedAnalytics: true,
      enablePerformanceBudgets: true,
      enableSmartCaching: true,
      enableRealTimeMonitoring: true,
      enablePredictiveOptimization: true,
      enableAnalytics: true
    };

    return { ...defaults, ...overrides };
  }

  /**
   * Get current configuration
   */
  getConfig(): PerfectionConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<PerfectionConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Enable specific feature
   */
  enableFeature(feature: keyof PerfectionConfig): void {
    this.config[feature] = true;
    console.log(`✅ Enabled perfection feature: ${feature}`);
  }

  /**
   * Disable specific feature
   */
  disableFeature(feature: keyof PerfectionConfig): void {
    this.config[feature] = false;
    console.log(`❌ Disabled perfection feature: ${feature}`);
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature: keyof PerfectionConfig): boolean {
    return this.config[feature];
  }

  /**
   * Get enabled features count
   */
  getEnabledFeaturesCount(): number {
    return Object.values(this.config).filter(Boolean).length;
  }

  /**
   * Validate configuration
   */
  validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for conflicting configurations
    if (this.config.enablePredictiveOptimization && !this.config.enableAnalytics) {
      errors.push('Predictive optimization requires analytics to be enabled');
    }

    if (this.config.enableRealTimeMonitoring && !this.config.enablePerformanceBudgets) {
      errors.push('Real-time monitoring requires performance budgets to be enabled');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get configuration summary
   */
  getConfigSummary(): {
    totalFeatures: number;
    enabledFeatures: number;
    disabledFeatures: number;
    enabledList: string[];
    disabledList: string[];
  } {
    const entries = Object.entries(this.config);
    const enabled = entries.filter(([, value]) => value);
    const disabled = entries.filter(([, value]) => !value);

    return {
      totalFeatures: entries.length,
      enabledFeatures: enabled.length,
      disabledFeatures: disabled.length,
      enabledList: enabled.map(([key]) => key),
      disabledList: disabled.map(([key]) => key)
    };
  }
}

export default ConfigurationManager;
