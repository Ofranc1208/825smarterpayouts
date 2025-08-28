/**
 * Navigation Perfection Orchestrator - Main Coordinator
 * 
 * Coordinates all perfection suite modules and provides the main
 * public interface for the modular Navigation Perfection Suite.
 * 
 * @module NavigationPerfectionOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import { ConfigurationManager } from './ConfigurationManager';
import { ComponentInitializer } from './ComponentInitializer';
import { MetricsCollector } from './MetricsCollector';
import { ReportGenerator } from './ReportGenerator';
import { MonitoringManager } from './MonitoringManager';
import type { PerfectionConfig, PerfectionReport, PerfectionMetrics } from './types';

export class NavigationPerfectionOrchestrator {
  private configManager: ConfigurationManager;
  private componentInitializer: ComponentInitializer;
  private metricsCollector: MetricsCollector | null = null;
  private reportGenerator: ReportGenerator;
  private monitoringManager: MonitoringManager;
  private isInitialized: boolean = false;

  constructor(config: Partial<PerfectionConfig> = {}) {
    // Initialize all managers
    this.configManager = new ConfigurationManager(config);
    this.componentInitializer = new ComponentInitializer(this.configManager.getConfig());
    this.reportGenerator = new ReportGenerator(this.configManager.isFeatureEnabled('enableAnalytics'));
    this.monitoringManager = new MonitoringManager(this.configManager.getConfig());
  }

  /**
   * Initialize the perfection suite
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      console.log('🚀 Initializing Navigation Perfection Suite...');

      // Validate configuration
      const validation = this.configManager.validateConfig();
      if (!validation.isValid) {
        console.warn('Configuration validation warnings:', validation.errors);
      }

      // Initialize components
      const components = await this.componentInitializer.initialize();
      
      // Initialize metrics collector with components
      this.metricsCollector = new MetricsCollector(components);

      // Start monitoring if enabled
      if (this.configManager.isFeatureEnabled('enableRealTimeMonitoring')) {
        this.monitoringManager.startMonitoring(() => this.generatePerfectionReport());
      }

      this.isInitialized = true;

      console.log('✅ Navigation Perfection Suite initialized successfully!');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Navigation Perfection Suite:', error);
      return false;
    }
  }

  /**
   * Generate comprehensive perfection report
   */
  async generatePerfectionReport(): Promise<PerfectionReport> {
    if (!this.metricsCollector) {
      throw new Error('Perfection suite not initialized. Call initialize() first.');
    }

    const metrics = await this.metricsCollector.collectMetrics();
    return this.reportGenerator.generateReport(metrics);
  }

  /**
   * Get current perfection score
   */
  async getPerfectionScore(): Promise<number> {
    const report = await this.generatePerfectionReport();
    return report.metrics.overallPerfectionScore;
  }

  /**
   * Run perfection audit
   */
  async runPerfectionAudit(): Promise<PerfectionReport> {
    console.log('🔍 Running Navigation Perfection Audit...');
    
    const report = await this.generatePerfectionReport();
    
    console.log(`📊 Perfection Score: ${report.metrics.overallPerfectionScore}/100`);
    console.log(`🎯 Achievements: ${report.achievements.length}`);
    console.log(`💡 Recommendations: ${report.recommendations.length}`);
    
    return report;
  }

  /**
   * Enable specific perfection feature
   */
  async enableFeature(feature: keyof PerfectionConfig): Promise<void> {
    this.configManager.enableFeature(feature);
    await this.updateAllManagers();
  }

  /**
   * Disable specific perfection feature
   */
  async disableFeature(feature: keyof PerfectionConfig): Promise<void> {
    this.configManager.disableFeature(feature);
    await this.updateAllManagers();
  }

  /**
   * Get feature status
   */
  getFeatureStatus(): PerfectionConfig {
    return this.configManager.getConfig();
  }

  /**
   * Update configuration
   */
  async updateConfiguration(updates: Partial<PerfectionConfig>): Promise<void> {
    this.configManager.updateConfig(updates);
    await this.updateAllManagers();
  }

  /**
   * Get detailed metrics breakdown
   */
  async getMetricsBreakdown(): Promise<{
    component: string;
    score: number;
    weight: number;
    contribution: number;
  }[]> {
    if (!this.metricsCollector) {
      throw new Error('Perfection suite not initialized. Call initialize() first.');
    }

    const metrics = await this.metricsCollector.collectMetrics();
    return this.metricsCollector.getMetricsBreakdown(metrics);
  }

  /**
   * Get executive summary
   */
  async getExecutiveSummary(): Promise<{
    status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
    summary: string;
    keyMetrics: { name: string; value: string; status: 'good' | 'warning' | 'critical' }[];
  }> {
    const metrics = await this.metricsCollector!.collectMetrics();
    return this.reportGenerator.generateExecutiveSummary(metrics);
  }

  /**
   * Get action plan
   */
  async getActionPlan(): Promise<{
    high: string[];
    medium: string[];
    low: string[];
  }> {
    const metrics = await this.metricsCollector!.collectMetrics();
    return this.reportGenerator.generateActionPlan(metrics);
  }

  /**
   * Force optimization check
   */
  async forceOptimizationCheck(): Promise<void> {
    await this.monitoringManager.forceOptimizationCheck();
  }

  /**
   * Get system status
   */
  getSystemStatus(): {
    isInitialized: boolean;
    configSummary: any;
    monitoringStatus: any;
    initializationStatus: any;
  } {
    return {
      isInitialized: this.isInitialized,
      configSummary: this.configManager.getConfigSummary(),
      monitoringStatus: this.monitoringManager.getMonitoringStatus(),
      initializationStatus: this.componentInitializer.getInitializationStatus()
    };
  }

  /**
   * Update all managers with new configuration
   */
  private async updateAllManagers(): Promise<void> {
    const config = this.configManager.getConfig();

    // Update component initializer
    await this.componentInitializer.updateConfig(config);

    // Update monitoring manager
    this.monitoringManager.updateConfig(config);

    // Update report generator analytics setting
    this.reportGenerator.setAnalyticsEnabled(config.enableAnalytics);

    // Recreate metrics collector if components changed
    if (this.isInitialized) {
      const components = this.componentInitializer.getComponents();
      if (components) {
        this.metricsCollector = new MetricsCollector(components);
      }
    }
  }

  /**
   * Destroy perfection suite
   */
  destroy(): void {
    this.monitoringManager.stopMonitoring();
    this.componentInitializer.destroy();
    this.isInitialized = false;
    console.log('🔥 Navigation Perfection Suite destroyed');
  }
}

export default NavigationPerfectionOrchestrator;
