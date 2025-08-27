/**
 * Advanced Analytics Orchestrator - Main Coordinator
 * 
 * Coordinates all analytics modules and provides the main
 * public interface for the Advanced Navigation Analytics system.
 * 
 * @module AdvancedAnalyticsOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { HeatmapTracker } from './HeatmapTracker';
import { UserJourneyAnalyzer } from './UserJourneyAnalyzer';
import { EventListenerManager } from './EventListenerManager';
import { InsightGenerator } from './InsightGenerator';
import { AnalyticsDataManager } from './AnalyticsDataManager';
import { VisualizationDataProcessor } from './VisualizationDataProcessor';
import type { AdvancedAnalyticsConfig, NavigationInsight, AnalyticsSummary } from './types';

export class AdvancedAnalyticsOrchestrator {
  private config: AdvancedAnalyticsConfig;
  private sessionId: string;
  private isInitialized: boolean = false;

  // Module instances
  private heatmapTracker!: HeatmapTracker;
  private journeyAnalyzer!: UserJourneyAnalyzer;
  private eventManager!: EventListenerManager;
  private insightGenerator!: InsightGenerator;
  private dataManager!: AnalyticsDataManager;
  private visualizationProcessor!: VisualizationDataProcessor;

  // Periodic analysis interval
  private analysisInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<AdvancedAnalyticsConfig> = {}) {
    this.config = {
      enableHeatmaps: true,
      enableUserJourneys: true,
      enablePredictiveAnalytics: true,
      enableRealTimeInsights: true,
      heatmapSampleRate: 0.1, // 10% sampling
      journeySessionTimeout: 30 * 60 * 1000, // 30 minutes
      enableAnalytics: true,
      ...config
    };

    this.sessionId = this.generateSessionId();
    this.initializeModules();
  }

  /**
   * Initialize all analytics modules
   */
  private initializeModules(): void {
    // Initialize core modules
    this.heatmapTracker = new HeatmapTracker(this.config);
    this.journeyAnalyzer = new UserJourneyAnalyzer(this.config, this.sessionId);
    this.dataManager = new AnalyticsDataManager(this.config);
    
    // Initialize dependent modules
    this.insightGenerator = new InsightGenerator(
      this.config,
      this.heatmapTracker,
      this.journeyAnalyzer
    );
    
    this.eventManager = new EventListenerManager(
      this.config,
      this.heatmapTracker,
      this.journeyAnalyzer
    );
    
    this.visualizationProcessor = new VisualizationDataProcessor(
      this.heatmapTracker,
      this.journeyAnalyzer,
      this.insightGenerator
    );
  }

  /**
   * Initialize the complete analytics system
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      console.log('Initializing Advanced Navigation Analytics system...');

      // Load existing data
      this.loadStoredData();

      // Setup event listeners
      this.eventManager.setupEventListeners();

      // Start periodic analysis
      if (this.config.enableRealTimeInsights) {
        this.startPeriodicAnalysis();
      }

      this.isInitialized = true;
      console.log('Advanced Navigation Analytics system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Advanced Navigation Analytics system:', error);
    }
  }

  /**
   * Load stored data from previous sessions
   */
  private loadStoredData(): void {
    const storedData = this.dataManager.loadAllData();
    
    if (storedData.heatmapData) {
      this.heatmapTracker.setData(storedData.heatmapData);
    }
    
    if (storedData.journeyData) {
      const journeyMap = new Map(Object.entries(storedData.journeyData));
      this.journeyAnalyzer.setJourneys(journeyMap);
    }
    
    if (storedData.sessionId) {
      this.sessionId = storedData.sessionId;
      this.journeyAnalyzer.updateSessionId(this.sessionId);
    }
  }

  /**
   * Start periodic analysis
   */
  private startPeriodicAnalysis(): void {
    if (this.analysisInterval) return;

    this.analysisInterval = setInterval(() => {
      try {
        // Generate insights
        this.insightGenerator.generateAllInsights();
        
        // Store data periodically
        this.storeData();
        
        // Cleanup old data if storage is getting full
        if (this.dataManager.isStorageQuotaExceeded()) {
          this.dataManager.cleanupOldData();
        }
      } catch (error) {
        console.error('Error during periodic analysis:', error);
      }
    }, 60000); // Every minute
  }

  /**
   * Store current data
   */
  private storeData(): void {
    const heatmapData = this.heatmapTracker.getAllData();
    const journeyData = this.journeyAnalyzer.getAllJourneys();
    const insights = this.insightGenerator.getAllInsights();

    this.dataManager.storeAllData({
      heatmapData,
      journeyData: Object.fromEntries(journeyData),
      insights,
      sessionId: this.sessionId
    });
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get all insights
   */
  getInsights(): NavigationInsight[] {
    return this.insightGenerator.getAllInsights();
  }

  /**
   * Get high-priority insights
   */
  getHighPriorityInsights(): NavigationInsight[] {
    return this.insightGenerator.getHighPriorityInsights();
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary(): AnalyticsSummary {
    return this.visualizationProcessor.generateAnalyticsSummary();
  }

  /**
   * Generate heatmap visualization data
   */
  generateHeatmapData(options?: any): any {
    return this.visualizationProcessor.generateHeatmapVisualization(options);
  }

  /**
   * Generate user journey flow visualization
   */
  generateJourneyFlowData(): any {
    return this.visualizationProcessor.generateJourneyFlowVisualization();
  }

  /**
   * Generate insights dashboard data
   */
  generateDashboardData(): any {
    return this.visualizationProcessor.generateInsightsDashboard();
  }

  /**
   * Generate time-series data
   */
  generateTimeSeriesData(
    dataType: 'heatmap' | 'journey' | 'insights',
    timeRange: { start: number; end: number },
    interval?: 'hour' | 'day' | 'week'
  ): any {
    return this.visualizationProcessor.generateTimeSeriesData(dataType, timeRange, interval);
  }

  /**
   * Generate conversion funnel data
   */
  generateConversionFunnel(steps: string[]): any {
    return this.visualizationProcessor.generateConversionFunnel(steps);
  }

  /**
   * Generate performance metrics
   */
  generatePerformanceMetrics(): any {
    return this.visualizationProcessor.generatePerformanceMetrics();
  }

  /**
   * Export data for external visualization
   */
  exportVisualizationData(format: 'json' | 'csv' | 'd3' | 'chartjs' = 'json'): any {
    return this.visualizationProcessor.exportForVisualization(format);
  }

  /**
   * Get system status
   */
  getSystemStatus(): {
    isInitialized: boolean;
    isTracking: boolean;
    sessionId: string;
    config: AdvancedAnalyticsConfig;
    dataStats: any;
    storageStats: any;
  } {
    return {
      isInitialized: this.isInitialized,
      isTracking: this.eventManager.isCurrentlyTracking(),
      sessionId: this.sessionId,
      config: this.config,
      dataStats: {
        heatmapPoints: this.heatmapTracker.getAllData().length,
        journeys: this.journeyAnalyzer.getAllJourneys().size,
        insights: this.insightGenerator.getAllInsights().length
      },
      storageStats: this.dataManager.getStorageStats()
    };
  }

  /**
   * Update configuration
   */
  updateConfiguration(newConfig: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update all modules
    this.heatmapTracker.updateConfig(this.config);
    this.journeyAnalyzer.updateConfig(this.config);
    this.eventManager.updateConfig(this.config);
    this.insightGenerator.updateConfig(this.config);
    this.dataManager.updateConfig(this.config);
    
    // Restart periodic analysis if settings changed
    if (this.config.enableRealTimeInsights && !this.analysisInterval) {
      this.startPeriodicAnalysis();
    } else if (!this.config.enableRealTimeInsights && this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }
  }

  /**
   * Clear all analytics data
   */
  clearAllData(): void {
    this.heatmapTracker.clearAllData();
    this.journeyAnalyzer.clearAllData();
    this.insightGenerator.clearAllInsights();
    this.dataManager.clearAllData();
  }

  /**
   * Clear specific data type
   */
  clearData(dataType: 'heatmap' | 'journey' | 'insights' | 'all'): void {
    switch (dataType) {
      case 'heatmap':
        this.heatmapTracker.clearAllData();
        this.dataManager.clearData('heatmap');
        break;
      case 'journey':
        this.journeyAnalyzer.clearAllData();
        this.dataManager.clearData('journey');
        break;
      case 'insights':
        this.insightGenerator.clearAllInsights();
        this.dataManager.clearData('insights');
        break;
      case 'all':
        this.clearAllData();
        break;
    }
  }

  /**
   * Force data storage
   */
  forceStoreData(): void {
    this.storeData();
  }

  /**
   * Force insights generation
   */
  forceGenerateInsights(): NavigationInsight[] {
    return this.insightGenerator.generateAllInsights();
  }

  /**
   * Optimize data storage
   */
  optimizeData(): {
    heatmapOptimized: number;
    storageFreed: number;
    oldDataCleaned: number;
  } {
    const heatmapOptimized = this.heatmapTracker.optimizeData();
    const oldDataCleaned = this.dataManager.cleanupOldData() ? 1 : 0;
    
    // Force storage after optimization
    this.storeData();
    
    const storageStats = this.dataManager.getStorageStats();
    
    return {
      heatmapOptimized,
      storageFreed: storageStats.availableSpace,
      oldDataCleaned
    };
  }

  /**
   * Get module instances (for advanced usage)
   */
  getModules(): {
    heatmapTracker: HeatmapTracker;
    journeyAnalyzer: UserJourneyAnalyzer;
    eventManager: EventListenerManager;
    insightGenerator: InsightGenerator;
    dataManager: AnalyticsDataManager;
    visualizationProcessor: VisualizationDataProcessor;
  } {
    return {
      heatmapTracker: this.heatmapTracker,
      journeyAnalyzer: this.journeyAnalyzer,
      eventManager: this.eventManager,
      insightGenerator: this.insightGenerator,
      dataManager: this.dataManager,
      visualizationProcessor: this.visualizationProcessor
    };
  }

  /**
   * Cleanup and destroy the analytics system
   */
  destroy(): void {
    // Stop periodic analysis
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }
    
    // Remove event listeners
    this.eventManager.removeEventListeners();
    
    // Store final data
    this.storeData();
    
    this.isInitialized = false;
    console.log('Advanced Navigation Analytics system destroyed');
  }
}

export default AdvancedAnalyticsOrchestrator;
