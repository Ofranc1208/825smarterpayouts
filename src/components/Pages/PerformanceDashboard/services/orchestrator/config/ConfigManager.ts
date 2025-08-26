/**
 * Configuration Manager
 * 
 * Manages analytics configuration, settings, and runtime parameters.
 * Handles configuration validation, defaults, and updates.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { AnalyticsConfig } from '../../types';

export class ConfigManager {
  private config: AnalyticsConfig;
  private readonly defaultConfig: AnalyticsConfig = {
    enableRealTimeTracking: true,
    refreshInterval: 30000, // 30 seconds
    maxDataPoints: 1000,
    enableConsoleLogging: true
  };

  constructor(initialConfig?: Partial<AnalyticsConfig>) {
    this.config = { ...this.defaultConfig, ...initialConfig };
    this.validateConfig();
  }

  /**
   * Get current configuration
   */
  getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<AnalyticsConfig>): void {
    const updatedConfig = { ...this.config, ...newConfig };
    
    // Validate before applying
    if (this.isValidConfig(updatedConfig)) {
      this.config = updatedConfig;
      this.logConfigChange(newConfig);
    } else {
      throw new Error('Invalid configuration provided');
    }
  }

  /**
   * Reset to default configuration
   */
  resetToDefaults(): void {
    this.config = { ...this.defaultConfig };
    this.logConfigChange(this.defaultConfig);
  }

  /**
   * Get specific config value
   */
  get<K extends keyof AnalyticsConfig>(key: K): AnalyticsConfig[K] {
    return this.config[key];
  }

  /**
   * Set specific config value
   */
  set<K extends keyof AnalyticsConfig>(key: K, value: AnalyticsConfig[K]): void {
    const oldValue = this.config[key];
    this.config[key] = value;
    
    if (!this.isValidConfig(this.config)) {
      // Revert if invalid
      this.config[key] = oldValue;
      throw new Error(`Invalid value for ${key}: ${value}`);
    }
    
    this.logConfigChange({ [key]: value });
  }

  /**
   * Get configuration for specific environment
   */
  getEnvironmentConfig(): AnalyticsConfig {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    
    return {
      ...this.config,
      enableConsoleLogging: isDevelopment || this.config.enableConsoleLogging,
      enableRealTimeTracking: isProduction ? this.config.enableRealTimeTracking : true,
      refreshInterval: isDevelopment ? 10000 : this.config.refreshInterval // Faster refresh in dev
    };
  }

  /**
   * Export configuration for persistence
   */
  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  /**
   * Import configuration from JSON
   */
  importConfig(configJson: string): void {
    try {
      const importedConfig = JSON.parse(configJson);
      
      if (this.isValidConfig(importedConfig)) {
        this.config = { ...this.defaultConfig, ...importedConfig };
        this.logConfigChange(importedConfig);
      } else {
        throw new Error('Invalid configuration format');
      }
    } catch (error) {
      throw new Error(`Failed to import configuration: ${error}`);
    }
  }

  /**
   * Get configuration schema for validation
   */
  getConfigSchema(): Record<keyof AnalyticsConfig, {
    type: string;
    required: boolean;
    default: any;
    validation?: (value: any) => boolean;
  }> {
    return {
      enableRealTimeTracking: {
        type: 'boolean',
        required: true,
        default: true
      },
      refreshInterval: {
        type: 'number',
        required: true,
        default: 30000,
        validation: (value: number) => value >= 1000 && value <= 300000 // 1s to 5min
      },
      maxDataPoints: {
        type: 'number',
        required: true,
        default: 1000,
        validation: (value: number) => value >= 100 && value <= 10000
      },
      enableConsoleLogging: {
        type: 'boolean',
        required: true,
        default: true
      }
    };
  }

  // Private methods
  private validateConfig(): void {
    if (!this.isValidConfig(this.config)) {
      console.warn('Invalid configuration detected, using defaults');
      this.config = { ...this.defaultConfig };
    }
  }

  private isValidConfig(config: any): config is AnalyticsConfig {
    const schema = this.getConfigSchema();
    
    for (const [key, rules] of Object.entries(schema)) {
      const value = config[key];
      
      // Check if required field is present
      if (rules.required && value === undefined) {
        return false;
      }
      
      // Check type
      if (value !== undefined && typeof value !== rules.type) {
        return false;
      }
      
      // Check custom validation
      if (value !== undefined && rules.validation && !rules.validation(value)) {
        return false;
      }
    }
    
    return true;
  }

  private logConfigChange(changes: Partial<AnalyticsConfig>): void {
    if (this.config.enableConsoleLogging) {
      console.log('📋 Configuration updated:', changes);
    }
  }
}

// Export singleton instance with default config
export const configManager = new ConfigManager();
