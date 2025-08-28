/**
 * Performance Data Manager - HONEST IMPLEMENTATION
 *
 * Manages performance data collection without pretending to connect to external services.
 * Provides clear transparency about data sources and limitations.
 *
 * @author SmarterPayouts Team
 * @since 2024
 */

export class PerformanceDataManager {
  private isInitialized = false;
  private initializationMessageShown = false;

  /**
   * Initialize performance data collection
   */
  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      this.isInitialized = true;

      if (!this.initializationMessageShown) {
        console.log('✅ Performance Data Manager initialized');
        console.log('📊 Data Source: Browser APIs + Session Tracking (No external services)');
        console.log('🔍 Transparency: All metrics are from current session or localStorage');
        this.initializationMessageShown = true;
      }
    } catch (error) {
      console.error('❌ Failed to initialize Performance Data Manager:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Check if the service is ready for data collection
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get service status with clear explanation
   */
  getStatus(): 'ready' | 'initializing' | 'error' {
    if (this.isInitialized) return 'ready';
    return 'initializing';
  }

  /**
   * Get data source information for transparency
   */
  getDataSources(): {
    webVitals: 'Browser Performance API';
    sessionData: 'Current Session Tracking';
    changeMetrics: 'localStorage Comparison';
    limitations: string[];
  } {
    return {
      webVitals: 'Browser Performance API',
      sessionData: 'Current Session Tracking',
      changeMetrics: 'localStorage Comparison',
      limitations: [
        'Data is limited to current browser session',
        'No historical data from other sessions',
        'Change metrics compare to previous session values only',
        'No cross-device or multi-user analytics'
      ]
    };
  }

  /**
   * Show transparency notice (call this in development)
   */
  showTransparencyNotice(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Performance Dashboard - Data Transparency Notice');
      console.log('📊 This dashboard shows REAL performance data from:');
      console.log('  • Core Web Vitals (FCP, LCP, CLS, FID, TTFB) - Browser APIs');
      console.log('  • Session metrics - Current browser session tracking');
      console.log('  • Change calculations - Comparison with previous session');
      console.log('');
      console.log('⚠️ Limitations:');
      console.log('  • No external analytics service integration');
      console.log('  • Data limited to current session only');
      console.log('  • No multi-user or cross-device analytics');
      console.log('  • Change metrics use localStorage (client-side only)');
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const performanceDataManager = new PerformanceDataManager();
