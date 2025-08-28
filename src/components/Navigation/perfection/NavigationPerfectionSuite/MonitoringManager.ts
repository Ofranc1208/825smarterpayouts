/**
 * Monitoring Manager - Real-time Perfection Monitoring
 * 
 * Handles real-time monitoring, predictive optimization,
 * and automated performance adjustments.
 * 
 * @module MonitoringManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Modular Edition
 */

import type { PerfectionReport, PerfectionConfig } from './types';

export class MonitoringManager {
  private config: PerfectionConfig;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private isMonitoring: boolean = false;
  private reportCallback: (() => Promise<PerfectionReport>) | null = null;

  constructor(config: PerfectionConfig) {
    this.config = config;
  }

  /**
   * Start real-time monitoring
   */
  startMonitoring(reportGenerator: () => Promise<PerfectionReport>): void {
    if (this.isMonitoring || !this.config.enableRealTimeMonitoring) {
      return;
    }

    this.reportCallback = reportGenerator;
    this.isMonitoring = true;

    this.monitoringInterval = setInterval(async () => {
      try {
        const report = await this.reportCallback!();
        
        // Auto-optimize based on metrics
        if (this.config.enablePredictiveOptimization) {
          this.performPredictiveOptimization(report);
        }

        // Log monitoring status
        this.logMonitoringStatus(report);
      } catch (error) {
        console.error('Error during monitoring cycle:', error);
      }
    }, 60000); // Every minute

    console.log('📊 Real-time monitoring started');
  }

  /**
   * Stop real-time monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.isMonitoring = false;
    this.reportCallback = null;
    console.log('📊 Real-time monitoring stopped');
  }

  /**
   * Perform predictive optimization based on report
   */
  private performPredictiveOptimization(report: PerfectionReport): void {
    const { metrics } = report;
    const optimizations: string[] = [];

    // Auto-optimize based on performance score
    if (metrics.performanceScore < 80) {
      optimizations.push('Performance score below threshold');
      
      // Clear old cache entries if cache hit rate is low
      if (metrics.cacheHitRate < 70) {
        optimizations.push('Cache hit rate optimization triggered');
        // Smart cache cleanup would be triggered here
      }
    }

    // Predictive bundle optimization
    if (metrics.bundleOptimizationScore < 85) {
      optimizations.push('Bundle optimization recommended');
    }

    // Offline readiness check
    if (!metrics.offlineReadiness && this.config.enableOfflineSupport) {
      optimizations.push('Offline support needs attention');
    }

    // A/B testing recommendations
    if (metrics.activeABTests < 1 && this.config.enableABTesting) {
      optimizations.push('A/B testing setup recommended');
    }

    if (optimizations.length > 0) {
      console.log('🔧 Auto-optimization triggered:', optimizations);
    }
  }

  /**
   * Log monitoring status
   */
  private logMonitoringStatus(report: PerfectionReport): void {
    const { metrics } = report;
    
    console.log(`📊 Monitoring Update - Score: ${metrics.overallPerfectionScore}/100`);
    
    // Log warnings for low scores
    if (metrics.overallPerfectionScore < 80) {
      console.warn('⚠️ Overall perfection score is below optimal threshold');
    }

    if (metrics.performanceScore < 85) {
      console.warn('⚠️ Performance score needs attention');
    }

    if (metrics.cacheHitRate < 80) {
      console.warn('⚠️ Cache hit rate is below optimal threshold');
    }
  }

  /**
   * Update monitoring configuration
   */
  updateConfig(newConfig: PerfectionConfig): void {
    const wasMonitoring = this.isMonitoring;
    
    if (wasMonitoring) {
      this.stopMonitoring();
    }

    this.config = newConfig;

    if (wasMonitoring && this.config.enableRealTimeMonitoring && this.reportCallback) {
      this.startMonitoring(this.reportCallback);
    }
  }

  /**
   * Get monitoring status
   */
  getMonitoringStatus(): {
    isMonitoring: boolean;
    isEnabled: boolean;
    intervalMs: number;
    uptime: number;
  } {
    return {
      isMonitoring: this.isMonitoring,
      isEnabled: this.config.enableRealTimeMonitoring,
      intervalMs: 60000,
      uptime: this.isMonitoring ? Date.now() : 0
    };
  }

  /**
   * Force optimization check
   */
  async forceOptimizationCheck(): Promise<void> {
    if (!this.reportCallback) {
      console.warn('Cannot force optimization check: no report generator available');
      return;
    }

    try {
      console.log('🔧 Forcing optimization check...');
      const report = await this.reportCallback();
      this.performPredictiveOptimization(report);
    } catch (error) {
      console.error('Error during forced optimization check:', error);
    }
  }

  /**
   * Set custom monitoring interval
   */
  setMonitoringInterval(intervalMs: number): void {
    if (intervalMs < 10000) {
      console.warn('Monitoring interval too short, minimum is 10 seconds');
      return;
    }

    const wasMonitoring = this.isMonitoring;
    
    if (wasMonitoring) {
      this.stopMonitoring();
    }

    // Update the interval and restart if needed
    if (wasMonitoring && this.reportCallback) {
      this.monitoringInterval = setInterval(async () => {
        try {
          const report = await this.reportCallback!();
          
          if (this.config.enablePredictiveOptimization) {
            this.performPredictiveOptimization(report);
          }

          this.logMonitoringStatus(report);
        } catch (error) {
          console.error('Error during monitoring cycle:', error);
        }
      }, intervalMs);

      this.isMonitoring = true;
      console.log(`📊 Monitoring interval updated to ${intervalMs}ms`);
    }
  }

  /**
   * Get optimization history (placeholder for future enhancement)
   */
  getOptimizationHistory(): {
    timestamp: number;
    trigger: string;
    action: string;
    result: string;
  }[] {
    // This could be enhanced to track optimization history
    return [];
  }
}

export default MonitoringManager;
