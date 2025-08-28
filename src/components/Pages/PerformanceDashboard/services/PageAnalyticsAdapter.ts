/**
 * Page Analytics Adapter
 *
 * Adapter that connects individual page analytics hooks to the unified analytics system.
 * Provides a standardized interface for all pages to integrate with the Performance Dashboard.
 *
 * @author SmarterPayouts Team
 * @since 2024
 */

import { unifiedAnalyticsOrchestrator, type UnifiedAnalyticsEvent } from './UnifiedAnalyticsOrchestrator';

export interface PageAnalyticsAdapterConfig {
  pageName: string;
  sessionId?: string;
  enableRealTimeTracking?: boolean;
  enablePerformanceTracking?: boolean;
  enableAccessibilityTracking?: boolean;
}

export interface PageEventData {
  action: string;
  category: 'navigation' | 'engagement' | 'conversion' | 'performance' | 'accessibility';
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export class PageAnalyticsAdapter {
  private config: PageAnalyticsAdapterConfig;
  private isInitialized = false;

  constructor(config: PageAnalyticsAdapterConfig) {
    this.config = {
      sessionId: this.generateSessionId(),
      enableRealTimeTracking: true,
      enablePerformanceTracking: true,
      enableAccessibilityTracking: true,
      ...config
    };
  }

  /**
   * Initialize the page adapter
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Register this page with the unified orchestrator
      unifiedAnalyticsOrchestrator.registerPageAnalytics(this.config.pageName, this);

      this.isInitialized = true;
      console.log(`📊 Page Analytics Adapter initialized for: ${this.config.pageName}`);
    } catch (error) {
      console.error(`Failed to initialize Page Analytics Adapter for ${this.config.pageName}:`, error);
      throw error;
    }
  }

  /**
   * Track a page event
   */
  trackEvent(eventData: PageEventData): void {
    if (!this.isInitialized) {
      console.warn(`Page Analytics Adapter not initialized for ${this.config.pageName}`);
      return;
    }

    const unifiedEvent: UnifiedAnalyticsEvent = {
      timestamp: Date.now(),
      sessionId: this.config.sessionId!,
      page: this.config.pageName,
      eventType: this.mapActionToEventType(eventData.action),
      category: eventData.category,
      action: eventData.action,
      label: eventData.label,
      value: eventData.value,
      metadata: {
        ...eventData.metadata,
        pageName: this.config.pageName,
        sessionId: this.config.sessionId
      }
    };

    unifiedAnalyticsOrchestrator.trackUnifiedEvent(unifiedEvent);
  }

  /**
   * Track page view
   */
  trackPageView(metadata?: Record<string, any>): void {
    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: this.config.pageName,
      metadata: {
        pageTitle: `${this.config.pageName} Page`,
        ...metadata
      }
    });
  }

  /**
   * Track CTA click
   */
  trackCTAClick(ctaType: string, label: string, metadata?: Record<string, any>): void {
    this.trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: `${ctaType}: ${label}`,
      metadata: {
        ctaType,
        ctaLabel: label,
        ...metadata
      }
    });
  }

  /**
   * Track section view
   */
  trackSectionView(sectionName: string, metadata?: Record<string, any>): void {
    this.trackEvent({
      action: 'section_view',
      category: 'engagement',
      label: sectionName,
      metadata: {
        sectionName,
        ...metadata
      }
    });
  }

  /**
   * Track conversion event
   */
  trackConversion(conversionType: string, value?: number, metadata?: Record<string, any>): void {
    this.trackEvent({
      action: 'conversion',
      category: 'conversion',
      label: conversionType,
      value,
      metadata: {
        conversionType,
        ...metadata
      }
    });
  }

  /**
   * Track performance metric
   */
  trackPerformanceMetric(metricName: string, value: number, metadata?: Record<string, any>): void {
    this.trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metricName,
      value,
      metadata: {
        metricName,
        ...metadata
      }
    });
  }

  /**
   * Track error
   */
  trackError(error: Error | string, metadata?: Record<string, any>): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    this.trackEvent({
      action: 'error',
      category: 'performance',
      label: errorMessage,
      metadata: {
        errorMessage,
        errorStack,
        ...metadata
      }
    });
  }

  /**
   * Update page performance metrics
   */
  updatePerformanceMetrics(metrics: {
    loadTime?: number;
    renderTime?: number;
    interactionTime?: number;
    webVitalsScore?: number;
    memoryUsage?: number;
    errorCount?: number;
  }): void {
    unifiedAnalyticsOrchestrator.updatePageMetrics(this.config.pageName, {
      performance: {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0,
        webVitalsScore: 0,
        memoryUsage: 0,
        errorCount: 0,
        ...metrics
      }
    });
  }

  /**
   * Update page accessibility metrics
   */
  updateAccessibilityMetrics(metrics: {
    score?: number;
    lastAudit?: Date | null;
    compliance?: 'AA' | 'A' | 'Non-compliant';
    issues?: string[];
  }): void {
    unifiedAnalyticsOrchestrator.updatePageMetrics(this.config.pageName, {
      accessibility: {
        score: 0,
        lastAudit: null,
        compliance: 'Non-compliant',
        issues: [],
        ...metrics
      }
    });
  }

  /**
   * Get adapter statistics
   */
  getStats(): {
    pageName: string;
    isInitialized: boolean;
    sessionId: string;
    config: PageAnalyticsAdapterConfig;
  } {
    return {
      pageName: this.config.pageName,
      isInitialized: this.isInitialized,
      sessionId: this.config.sessionId!,
      config: this.config
    };
  }

  /**
   * Map action to event type
   */
  private mapActionToEventType(action: string): UnifiedAnalyticsEvent['eventType'] {
    const actionMap: Record<string, UnifiedAnalyticsEvent['eventType']> = {
      'page_view': 'page_view',
      'cta_click': 'cta_click',
      'section_view': 'section_view',
      'conversion': 'conversion',
      'error': 'error',
      'performance_metric': 'performance'
    };

    return actionMap[action] || 'page_view';
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Hook to create and use page analytics adapter
 */
export function usePageAnalyticsAdapter(config: PageAnalyticsAdapterConfig) {
  const adapter = new PageAnalyticsAdapter(config);

  return {
    adapter,
    initialize: () => adapter.initialize(),
    trackEvent: (eventData: PageEventData) => adapter.trackEvent(eventData),
    trackPageView: (metadata?: Record<string, any>) => adapter.trackPageView(metadata),
    trackCTAClick: (ctaType: string, label: string, metadata?: Record<string, any>) =>
      adapter.trackCTAClick(ctaType, label, metadata),
    trackSectionView: (sectionName: string, metadata?: Record<string, any>) =>
      adapter.trackSectionView(sectionName, metadata),
    trackConversion: (conversionType: string, value?: number, metadata?: Record<string, any>) =>
      adapter.trackConversion(conversionType, value, metadata),
    trackPerformanceMetric: (metricName: string, value: number, metadata?: Record<string, any>) =>
      adapter.trackPerformanceMetric(metricName, value, metadata),
    trackError: (error: Error | string, metadata?: Record<string, any>) =>
      adapter.trackError(error, metadata),
    updatePerformanceMetrics: (metrics: any) => adapter.updatePerformanceMetrics(metrics),
    updateAccessibilityMetrics: (metrics: any) => adapter.updateAccessibilityMetrics(metrics),
    getStats: () => adapter.getStats()
  };
}
