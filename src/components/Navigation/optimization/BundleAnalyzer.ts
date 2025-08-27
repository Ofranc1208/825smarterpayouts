/**
 * DEPRECATED: Bundle Analyzer - Advanced Optimization
 *
 * This file has been replaced by a modular structure for better scalability,
 * maintainability, and testability.
 *
 * All functionality has been moved to:
 * `src/components/Navigation/optimization/BundleAnalyzer/`
 *
 * Please update your imports to use the new modular structure.
 *
 * @deprecated Use `src/components/Navigation/optimization/BundleAnalyzer` instead.
 * @module BundleAnalyzer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

// Re-export the new modular components for backward compatibility
export { 
  BundleAnalyzer,
  BundleMetricsCollector,
  OptimizationScorer,
  BundleReportGenerator,
  type BundleData,
  type ComponentSizeMap,
  type OptimizationResult,
  type ScoringConfig,
  type BundleReport,
  type ReportConfig,
  type OptimizationConfig
} from './BundleAnalyzer/index';

export { BundleAnalyzer as default } from './BundleAnalyzer/index';

// Legacy interface for backward compatibility
export interface BundleMetrics {
  totalSize: number;
  gzippedSize: number;
  treeShakenSize: number;
  unusedExports: string[];
  heavyDependencies: Array<{ name: string; size: number }>;
  optimizationScore: number;
  recommendations: string[];
}

// Legacy singleton instance
import { BundleAnalyzerOrchestrator } from './BundleAnalyzer/BundleAnalyzerOrchestrator';
export const bundleAnalyzer = new BundleAnalyzerOrchestrator();