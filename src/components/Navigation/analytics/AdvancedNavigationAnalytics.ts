/**
 * DEPRECATED: Advanced Navigation Analytics - Heatmap & User Journey
 * 
 * This file has been modularized for better maintainability and scalability.
 * Please use the new modular system from './AdvancedNavigationAnalytics/' instead.
 * 
 * @deprecated Use AdvancedAnalyticsOrchestrator from './AdvancedNavigationAnalytics/index'
 * @module AdvancedNavigationAnalytics
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition (Modularized)
 */

// Re-export the new modular system for backward compatibility
export {
  AdvancedAnalyticsOrchestrator as AdvancedNavigationAnalytics,
  advancedNavigationAnalytics,
  HeatmapTracker,
  UserJourneyAnalyzer,
  EventListenerManager,
  InsightGenerator,
  AnalyticsDataManager,
  VisualizationDataProcessor,
  type HeatmapPoint,
  type UserJourneyStep,
  type NavigationInsight,
  type AdvancedAnalyticsConfig,
  type HeatmapVisualizationPoint,
  type JourneyPattern,
  type AnalyticsSummary,
  type StorageData,
  type EventHandlerConfig,
  type InsightGenerationConfig
} from './AdvancedNavigationAnalytics/index';

// Default export (main orchestrator)
export { AdvancedAnalyticsOrchestrator as default } from './AdvancedNavigationAnalytics/index';
