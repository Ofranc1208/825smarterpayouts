/**
 * Unified Analytics Orchestrator
 *
 * Main orchestrator that connects all page analytics to the Performance Dashboard.
 * Provides unified tracking across Navigation, Pages, and Dashboard components.
 *
 * @author SmarterPayouts Team
 * @since 2024
 */

import { analyticsOrchestrator } from './AnalyticsOrchestrator';
import { navigationDashboardIntegration } from '../../../Navigation/services/NavigationDashboardIntegration';
import type { PageAnalyticsEvent, PagePerformanceMetrics, PageAccessibilityMetrics } from './types';

export interface UnifiedAnalyticsEvent {
  // Common fields
  timestamp: number;
  sessionId: string;
  page: string;

  // Event classification
  eventType: 'page_view' | 'cta_click' | 'section_view' | 'conversion' | 'error' | 'performance';
  category: 'navigation' | 'engagement' | 'conversion' | 'performance' | 'accessibility';

  // Event data
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface UnifiedPageMetrics {
  page: string;
  analytics: PageAnalyticsEvent[];
  performance: PagePerformanceMetrics;
  accessibility: PageAccessibilityMetrics;
  lastUpdated: Date;
}

export class UnifiedAnalyticsOrchestrator {
  private pageMetrics = new Map<string, UnifiedPageMetrics>();
  private eventQueue: UnifiedAnalyticsEvent[] = [];
  private isInitialized = false;

  /**
   * Initialize the unified analytics system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize core analytics orchestrator
      await analyticsOrchestrator.initialize();

      // Initialize navigation integration
      await navigationDashboardIntegration.initialize();

      // Start event processing
      this.startEventProcessing();

      this.isInitialized = true;
      console.log('🔗 Unified Analytics Orchestrator initialized');
    } catch (error) {
      console.error('Failed to initialize Unified Analytics Orchestrator:', error);
      throw error;
    }
  }

  /**
   * Register page analytics hook
   */
  registerPageAnalytics(pageName: string, analyticsHook: any): void {
    console.log(`📊 Registering analytics for page: ${pageName}`);

    // Store page reference for later aggregation
    this.pageMetrics.set(pageName, {
      page: pageName,
      analytics: [],
      performance: {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0,
        webVitalsScore: 0,
        memoryUsage: 0,
        errorCount: 0
      },
      accessibility: {
        score: 0,
        lastAudit: null,
        compliance: 'Non-compliant',
        issues: []
      },
      lastUpdated: new Date()
    });
  }

  /**
   * Track unified analytics event
   */
  trackUnifiedEvent(event: UnifiedAnalyticsEvent): void {
    // Add to queue
    this.eventQueue.push(event);

    // Send to Performance Dashboard
    this.sendToPerformanceDashboard(event);

    // Send to Navigation Integration if navigation-related
    if (event.category === 'navigation') {
      this.sendToNavigationIntegration(event);
    }
  }

  /**
   * Update page metrics
   */
  updatePageMetrics(pageName: string, metrics: Partial<UnifiedPageMetrics>): void {
    const existingMetrics = this.pageMetrics.get(pageName);
    if (existingMetrics) {
      this.pageMetrics.set(pageName, {
        ...existingMetrics,
        ...metrics,
        lastUpdated: new Date()
      });
    }
  }

  /**
   * Get all page metrics for dashboard
   */
  getAllPageMetrics(): UnifiedPageMetrics[] {
    return Array.from(this.pageMetrics.values());
  }

  /**
   * Get aggregated dashboard summary
   */
  getUnifiedDashboardSummary() {
    const pageMetrics = this.getAllPageMetrics();
    const navigationMetrics = navigationDashboardIntegration.getNavigationMetricsForDashboard();

    return {
      totalPages: pageMetrics.length,
      totalEvents: this.eventQueue.length,
      pageMetrics,
      navigationMetrics,
      lastUpdated: new Date(),
      systemHealth: 'operational' as const
    };
  }

  /**
   * Send event to Performance Dashboard
   */
  private sendToPerformanceDashboard(event: UnifiedAnalyticsEvent): void {
    if (analyticsOrchestrator.isReady()) {
      // Convert unified event to dashboard format
      const dashboardEvent = {
        page: event.page,
        event: event.eventType,
        category: event.category,
        action: event.action,
        label: event.label,
        value: event.value,
        timestamp: event.timestamp,
        metadata: event.metadata
      };

      // Send to analytics orchestrator
      analyticsOrchestrator.trackPageView(dashboardEvent);
    }
  }

  /**
   * Send navigation event to Navigation Integration
   */
  private sendToNavigationIntegration(event: UnifiedAnalyticsEvent): void {
    // Convert unified event to navigation format
    const navigationEvent = {
      eventType: event.eventType === 'page_view' ? 'click' as const : (event.eventType as any),
      elementType: 'nav_item' as const,
      elementId: event.metadata?.elementId || event.label || 'unknown',
      elementLabel: event.label || 'Navigation Event',
      timestamp: event.timestamp,
      sessionId: event.sessionId,
      metadata: event.metadata
    };

    // Send to navigation integration
    navigationDashboardIntegration.updateAnalytics([navigationEvent]);
  }

  /**
   * Process event queue periodically
   */
  private startEventProcessing(): void {
    setInterval(() => {
      this.processEventQueue();
    }, 5000); // Process every 5 seconds
  }

  /**
   * Process queued events
   */
  private processEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    // Group events by page
    const eventsByPage = this.eventQueue.reduce((acc, event) => {
      if (!acc[event.page]) {
        acc[event.page] = [];
      }
      acc[event.page].push(event);
      return acc;
    }, {} as Record<string, UnifiedAnalyticsEvent[]>);

    // Update page metrics
    Object.entries(eventsByPage).forEach(([pageName, events]) => {
      const pageMetrics = this.pageMetrics.get(pageName);
      if (pageMetrics) {
        // Update analytics events
        pageMetrics.analytics = [
          ...pageMetrics.analytics,
          ...events.map(e => ({
            event: e.eventType,
            category: e.category,
            action: e.action,
            label: e.label,
            value: e.value,
            timestamp: e.timestamp
          }))
        ].slice(-100); // Keep last 100 events

        pageMetrics.lastUpdated = new Date();
      }
    });

    // Clear processed events
    this.eventQueue = [];
  }

  /**
   * Get event processing stats
   */
  getProcessingStats(): {
    queuedEvents: number;
    processedPages: number;
    lastProcessed: Date | null;
  } {
    return {
      queuedEvents: this.eventQueue.length,
      processedPages: this.pageMetrics.size,
      lastProcessed: this.eventQueue.length > 0 ? new Date() : null
    };
  }
}

// Export singleton instance
export const unifiedAnalyticsOrchestrator = new UnifiedAnalyticsOrchestrator();
