/**
 * Bundle Analyzer - Advanced Optimization
 * 
 * Modular bundle analysis system for navigation components
 * 
 * @module BundleAnalyzer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

// Main orchestrator
export { BundleAnalyzerOrchestrator as BundleAnalyzer } from './BundleAnalyzerOrchestrator';

// Individual services
export { BundleMetricsCollector } from './BundleMetricsCollector';
export { OptimizationScorer } from './OptimizationScorer';
export { BundleReportGenerator } from './BundleReportGenerator';

// Types
export type { BundleData, ComponentSizeMap } from './BundleMetricsCollector';
export type { OptimizationResult, ScoringConfig } from './OptimizationScorer';
export type { BundleReport, ReportConfig } from './BundleReportGenerator';
export type { OptimizationConfig } from './BundleAnalyzerOrchestrator';

// Default export
export { BundleAnalyzerOrchestrator as default } from './BundleAnalyzerOrchestrator';
