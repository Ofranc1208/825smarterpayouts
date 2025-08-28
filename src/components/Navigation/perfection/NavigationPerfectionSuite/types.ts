/**
 * Navigation Perfection Suite Types
 * 
 * Centralized type definitions for the modular Navigation Perfection Suite.
 * 
 * @module NavigationPerfectionSuiteTypes
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

export interface PerfectionConfig {
  enableBundleOptimization: boolean;
  enableOfflineSupport: boolean;
  enableABTesting: boolean;
  enableAdvancedAnalytics: boolean;
  enablePerformanceBudgets: boolean;
  enableSmartCaching: boolean;
  enableRealTimeMonitoring: boolean;
  enablePredictiveOptimization: boolean;
  enableAnalytics: boolean;
}

export interface PerfectionMetrics {
  bundleOptimizationScore: number;
  offlineReadiness: boolean;
  activeABTests: number;
  analyticsInsights: number;
  performanceScore: number;
  cacheHitRate: number;
  overallPerfectionScore: number;
  lastUpdated: number;
}

export interface PerfectionReport {
  metrics: PerfectionMetrics;
  recommendations: string[];
  achievements: string[];
  nextSteps: string[];
  timestamp: number;
}

export interface ComponentInstances {
  bundleAnalyzer: any;
  serviceWorker: any;
  performanceEnforcer: any;
  smartCache: any;
}

export interface ScoreWeights {
  bundleOptimization: number;
  offline: number;
  abTesting: number;
  analytics: number;
  performance: number;
  caching: number;
}
