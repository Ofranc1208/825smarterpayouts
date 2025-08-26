/**
 * Vercel Service
 * 
 * Main orchestrator for Vercel Analytics integration using modular components.
 * Replaces the monolithic VercelAnalyticsService.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { RealMetrics, RealPageData, VisitorData, TimeRange } from '../types';
import { vercelConnectionManager } from './core/VercelConnectionManager';
import { webVitalsCollector } from './core/WebVitalsCollector';
import { metricsCalculator } from './calculators/MetricsCalculator';
import { pageDataCalculator } from './calculators/PageDataCalculator';
import { visitorDataCalculator } from './calculators/VisitorDataCalculator';

export class VercelService {
  /**
   * Initialize the Vercel Analytics connection
   */
  async initialize(): Promise<void> {
    await vercelConnectionManager.initialize();
  }

  /**
   * Get comprehensive performance metrics
   */
  async getRealMetrics(timeRange: TimeRange = '24h'): Promise<RealMetrics> {
    if (!vercelConnectionManager.isConnected()) {
      console.warn('Vercel Analytics not initialized, using fallback data');
    }

    // Get Web Vitals data from browser
    const webVitals = await webVitalsCollector.getWebVitals();
    
    // Calculate and return formatted metrics
    return metricsCalculator.calculateRealMetrics(webVitals);
  }

  /**
   * Get real page performance data
   */
  async getRealPageData(timeRange: TimeRange = '24h'): Promise<RealPageData[]> {
    return await pageDataCalculator.getRealPageData(timeRange);
  }

  /**
   * Get real visitor analytics data
   */
  async getRealVisitorData(timeRange: TimeRange = '24h'): Promise<VisitorData> {
    return await visitorDataCalculator.getRealVisitorData(timeRange);
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): 'connected' | 'disconnected' | 'error' {
    return vercelConnectionManager.getStatus();
  }

  /**
   * Initialize Web Vitals tracking (for compatibility)
   */
  async initWebVitalsTracking(): Promise<void> {
    // This method exists for compatibility with existing code
    await this.initialize();
  }
}

// Export singleton instance
export const vercelService = new VercelService();
