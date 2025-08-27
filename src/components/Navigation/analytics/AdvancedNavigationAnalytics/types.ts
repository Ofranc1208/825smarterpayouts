/**
 * Advanced Navigation Analytics Types
 * 
 * Shared TypeScript interfaces and types for the modular
 * Advanced Navigation Analytics system.
 * 
 * @module AdvancedNavigationAnalyticsTypes
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
  elementId?: string;
  elementType?: string;
}

export interface UserJourneyStep {
  action: 'click' | 'hover' | 'focus' | 'scroll' | 'view';
  element: string;
  timestamp: number;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface NavigationInsight {
  type: 'popular_path' | 'drop_off_point' | 'confusion_area' | 'optimization_opportunity';
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  recommendation: string;
  data: any;
}

export interface AdvancedAnalyticsConfig {
  enableHeatmaps: boolean;
  enableUserJourneys: boolean;
  enablePredictiveAnalytics: boolean;
  enableRealTimeInsights: boolean;
  heatmapSampleRate: number; // 0-1
  journeySessionTimeout: number; // milliseconds
  enableAnalytics: boolean;
}

export interface HeatmapVisualizationPoint {
  x: number;
  y: number;
  value: number;
}

export interface JourneyPattern {
  path: string;
  count: number;
  percentage: number;
  confidence: number;
}

export interface AnalyticsSummary {
  heatmapPoints: number;
  userJourneys: number;
  insights: number;
  topElements: Array<{ element: string; interactions: number }>;
}

export interface StorageData {
  heatmapData?: HeatmapPoint[];
  journeyData?: Record<string, UserJourneyStep[]>;
  insights?: NavigationInsight[];
  sessionId?: string;
}

export interface EventHandlerConfig {
  enableMouseTracking: boolean;
  enableClickTracking: boolean;
  enableJourneyTracking: boolean;
  enableCustomEvents: boolean;
  sampleRate: number;
}

export interface InsightGenerationConfig {
  confusionPatternThreshold: number;
  dropOffTimeThreshold: number;
  highIntensityThreshold: number;
  popularPathMinCount: number;
  realTimeAnalysisInterval: number;
}
