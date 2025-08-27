/**
 * Visualization Data Processor - Data Formatting for Visualization
 * 
 * Processes and formats analytics data for various visualization
 * libraries and chart types including heatmaps, journey flows, and dashboards.
 * 
 * @module VisualizationDataProcessor
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { HeatmapPoint, UserJourneyStep, NavigationInsight, HeatmapVisualizationPoint, AnalyticsSummary } from './types';
import type { HeatmapTracker } from './HeatmapTracker';
import type { UserJourneyAnalyzer } from './UserJourneyAnalyzer';
import type { InsightGenerator } from './InsightGenerator';

export class VisualizationDataProcessor {
  private heatmapTracker: HeatmapTracker;
  private journeyAnalyzer: UserJourneyAnalyzer;
  private insightGenerator: InsightGenerator;

  constructor(
    heatmapTracker: HeatmapTracker,
    journeyAnalyzer: UserJourneyAnalyzer,
    insightGenerator: InsightGenerator
  ) {
    this.heatmapTracker = heatmapTracker;
    this.journeyAnalyzer = journeyAnalyzer;
    this.insightGenerator = insightGenerator;
  }

  /**
   * Generate heatmap visualization data
   */
  generateHeatmapVisualization(options: {
    gridSize?: number;
    intensityScale?: 'linear' | 'logarithmic';
    colorScheme?: 'hot' | 'cool' | 'rainbow';
    normalize?: boolean;
  } = {}): {
    data: HeatmapVisualizationPoint[];
    config: any;
    metadata: any;
  } {
    const {
      gridSize = 20,
      intensityScale = 'linear',
      colorScheme = 'hot',
      normalize = true
    } = options;

    let data = this.heatmapTracker.generateVisualizationData(gridSize);

    // Apply intensity scaling
    if (intensityScale === 'logarithmic') {
      data = data.map(point => ({
        ...point,
        value: Math.log(point.value + 1)
      }));
    }

    // Normalize values if requested
    if (normalize && data.length > 0) {
      const maxValue = Math.max(...data.map(p => p.value));
      if (maxValue > 0) {
        data = data.map(point => ({
          ...point,
          value: point.value / maxValue
        }));
      }
    }

    const config = {
      gridSize,
      intensityScale,
      colorScheme,
      normalize
    };

    const stats = this.heatmapTracker.getHeatmapStats();
    const metadata = {
      totalPoints: data.length,
      dataRange: {
        minValue: Math.min(...data.map(p => p.value)),
        maxValue: Math.max(...data.map(p => p.value))
      },
      timeRange: stats.timeRange,
      generatedAt: Date.now()
    };

    return { data, config, metadata };
  }

  /**
   * Generate user journey flow visualization
   */
  generateJourneyFlowVisualization(): {
    nodes: Array<{ id: string; label: string; value: number; type: string }>;
    edges: Array<{ source: string; target: string; value: number; label?: string }>;
    metadata: any;
  } {
    const journeys = Array.from(this.journeyAnalyzer.getAllJourneys().values());
    const nodes = new Map<string, { label: string; value: number; type: string }>();
    const edges = new Map<string, { source: string; target: string; value: number }>();

    // Process journeys to create nodes and edges
    journeys.forEach(journey => {
      journey.forEach((step, index) => {
        // Create or update node
        const nodeKey = step.element;
        if (!nodes.has(nodeKey)) {
          nodes.set(nodeKey, {
            label: step.element,
            value: 0,
            type: this.getElementType(step.element)
          });
        }
        nodes.get(nodeKey)!.value++;

        // Create edge to next step
        if (index < journey.length - 1) {
          const nextStep = journey[index + 1];
          const edgeKey = `${step.element}->${nextStep.element}`;
          
          if (!edges.has(edgeKey)) {
            edges.set(edgeKey, {
              source: step.element,
              target: nextStep.element,
              value: 0
            });
          }
          edges.get(edgeKey)!.value++;
        }
      });
    });

    const nodeArray = Array.from(nodes.entries()).map(([id, data]) => ({
      id,
      ...data
    }));

    const edgeArray = Array.from(edges.values()).map(edge => ({
      ...edge,
      label: `${edge.value} transitions`
    }));

    const stats = this.journeyAnalyzer.getJourneyStats();
    const metadata = {
      totalJourneys: journeys.length,
      totalNodes: nodeArray.length,
      totalEdges: edgeArray.length,
      averageJourneyLength: stats.averageJourneyLength,
      generatedAt: Date.now()
    };

    return { nodes: nodeArray, edges: edgeArray, metadata };
  }

  /**
   * Generate insights dashboard data
   */
  generateInsightsDashboard(): {
    summary: {
      totalInsights: number;
      highPriorityInsights: number;
      insightsByType: Record<string, number>;
      insightsByImpact: Record<string, number>;
    };
    insights: NavigationInsight[];
    trends: Array<{
      type: string;
      trend: 'increasing' | 'decreasing' | 'stable';
      change: number;
    }>;
    recommendations: Array<{
      priority: 'high' | 'medium' | 'low';
      category: string;
      description: string;
      impact: string;
    }>;
  } {
    const allInsights = this.insightGenerator.getAllInsights();
    const highPriorityInsights = this.insightGenerator.getHighPriorityInsights();
    const insightStats = this.insightGenerator.getInsightStats();

    // Generate trends (simplified - in real implementation would track over time)
    const trends = Object.entries(insightStats.byType).map(([type, count]) => ({
      type,
      trend: 'stable' as const, // Would be calculated from historical data
      change: 0
    }));

    // Generate recommendations from insights
    const recommendations = highPriorityInsights.map(insight => ({
      priority: insight.impact as 'high' | 'medium' | 'low',
      category: insight.type,
      description: insight.recommendation,
      impact: `${Math.round(insight.confidence * 100)}% confidence`
    }));

    return {
      summary: {
        totalInsights: insightStats.total,
        highPriorityInsights: highPriorityInsights.length,
        insightsByType: insightStats.byType,
        insightsByImpact: insightStats.byImpact
      },
      insights: allInsights,
      trends,
      recommendations
    };
  }

  /**
   * Generate analytics summary for overview
   */
  generateAnalyticsSummary(): AnalyticsSummary {
    const heatmapStats = this.heatmapTracker.getHeatmapStats();
    const journeyStats = this.journeyAnalyzer.getJourneyStats();
    const insightStats = this.insightGenerator.getInsightStats();

    return {
      heatmapPoints: heatmapStats.totalPoints,
      userJourneys: journeyStats.totalJourneys,
      insights: insightStats.total,
      topElements: journeyStats.mostActiveElements
    };
  }

  /**
   * Generate time-series data for charts
   */
  generateTimeSeriesData(
    dataType: 'heatmap' | 'journey' | 'insights',
    timeRange: { start: number; end: number },
    interval: 'hour' | 'day' | 'week' = 'hour'
  ): Array<{ timestamp: number; value: number; label: string }> {
    const intervalMs = this.getIntervalMs(interval);
    const buckets = new Map<number, number>();

    // Initialize buckets
    for (let time = timeRange.start; time <= timeRange.end; time += intervalMs) {
      buckets.set(time, 0);
    }

    if (dataType === 'heatmap') {
      const heatmapData = this.heatmapTracker.getDataForTimeRange(timeRange.start, timeRange.end);
      heatmapData.forEach(point => {
        const bucketTime = Math.floor(point.timestamp / intervalMs) * intervalMs;
        buckets.set(bucketTime, (buckets.get(bucketTime) || 0) + 1);
      });
    } else if (dataType === 'journey') {
      const journeyData = this.journeyAnalyzer.getJourneysForTimeRange(timeRange.start, timeRange.end);
      Array.from(journeyData.values()).forEach(steps => {
        steps.forEach((step: any) => {
          const bucketTime = Math.floor(step.timestamp / intervalMs) * intervalMs;
          buckets.set(bucketTime, (buckets.get(bucketTime) || 0) + 1);
        });
      });
    }

    return Array.from(buckets.entries())
      .sort(([a], [b]) => a - b)
      .map(([timestamp, value]) => ({
        timestamp,
        value,
        label: this.formatTimestamp(timestamp, interval)
      }));
  }

  /**
   * Generate conversion funnel data
   */
  generateConversionFunnel(steps: string[]): Array<{
    step: string;
    users: number;
    conversionRate: number;
    dropOffRate: number;
    color: string;
  }> {
    const funnelData = this.journeyAnalyzer.calculateConversionFunnel(steps);
    
    return funnelData.map((item, index) => ({
      ...item,
      dropOffRate: index > 0 ? 100 - item.conversionRate : 0,
      color: this.getFunnelColor(item.conversionRate)
    }));
  }

  /**
   * Generate element interaction matrix
   */
  generateInteractionMatrix(): {
    matrix: number[][];
    labels: string[];
    metadata: any;
  } {
    const journeys = Array.from(this.journeyAnalyzer.getAllJourneys().values());
    const elements = new Set<string>();
    
    // Collect all unique elements
    journeys.forEach(journey => {
      journey.forEach(step => elements.add(step.element));
    });
    
    const elementArray = Array.from(elements);
    const matrix: number[][] = Array(elementArray.length)
      .fill(0)
      .map(() => Array(elementArray.length).fill(0));
    
    // Fill matrix with transition counts
    journeys.forEach(journey => {
      for (let i = 0; i < journey.length - 1; i++) {
        const fromIndex = elementArray.indexOf(journey[i].element);
        const toIndex = elementArray.indexOf(journey[i + 1].element);
        
        if (fromIndex !== -1 && toIndex !== -1) {
          matrix[fromIndex][toIndex]++;
        }
      }
    });
    
    return {
      matrix,
      labels: elementArray,
      metadata: {
        totalElements: elementArray.length,
        totalTransitions: matrix.flat().reduce((sum, val) => sum + val, 0),
        generatedAt: Date.now()
      }
    };
  }

  /**
   * Generate performance metrics for charts
   */
  generatePerformanceMetrics(): {
    responseTime: Array<{ element: string; averageTime: number; samples: number }>;
    engagementRate: Array<{ element: string; rate: number; interactions: number }>;
    dropOffPoints: Array<{ element: string; dropOffs: number; percentage: number }>;
  } {
    const journeys = Array.from(this.journeyAnalyzer.getAllJourneys().values());
    const elementMetrics = new Map<string, {
      totalTime: number;
      interactions: number;
      dropOffs: number;
    }>();

    // Calculate metrics for each element
    journeys.forEach(journey => {
      journey.forEach((step, index) => {
        if (!elementMetrics.has(step.element)) {
          elementMetrics.set(step.element, {
            totalTime: 0,
            interactions: 0,
            dropOffs: 0
          });
        }

        const metrics = elementMetrics.get(step.element)!;
        metrics.interactions++;

        // Calculate time spent (if duration available)
        if (step.duration) {
          metrics.totalTime += step.duration;
        }

        // Check if this is a drop-off point (last step in journey)
        if (index === journey.length - 1 && journey.length > 1) {
          metrics.dropOffs++;
        }
      });
    });

    const responseTime = Array.from(elementMetrics.entries()).map(([element, metrics]) => ({
      element,
      averageTime: metrics.interactions > 0 ? metrics.totalTime / metrics.interactions : 0,
      samples: metrics.interactions
    }));

    const engagementRate = Array.from(elementMetrics.entries()).map(([element, metrics]) => ({
      element,
      rate: metrics.interactions / journeys.length,
      interactions: metrics.interactions
    }));

    const totalJourneys = journeys.length;
    const dropOffPoints = Array.from(elementMetrics.entries())
      .map(([element, metrics]) => ({
        element,
        dropOffs: metrics.dropOffs,
        percentage: totalJourneys > 0 ? (metrics.dropOffs / totalJourneys) * 100 : 0
      }))
      .filter(item => item.dropOffs > 0)
      .sort((a, b) => b.percentage - a.percentage);

    return { responseTime, engagementRate, dropOffPoints };
  }

  /**
   * Export data for external visualization tools
   */
  exportForVisualization(format: 'json' | 'csv' | 'd3' | 'chartjs'): any {
    const heatmapViz = this.generateHeatmapVisualization();
    const journeyFlow = this.generateJourneyFlowVisualization();
    const dashboard = this.generateInsightsDashboard();
    const summary = this.generateAnalyticsSummary();

    const data = {
      heatmap: heatmapViz,
      journeyFlow,
      dashboard,
      summary,
      exportedAt: Date.now()
    };

    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return this.convertToCSV(data);
      case 'd3':
        return this.formatForD3(data);
      case 'chartjs':
        return this.formatForChartJS(data);
      default:
        return data;
    }
  }

  /**
   * Helper: Get element type for visualization
   */
  private getElementType(element: string): string {
    if (element.includes('dropdown')) return 'dropdown';
    if (element.includes('button')) return 'button';
    if (element.includes('link')) return 'link';
    if (element.includes('menu')) return 'menu';
    return 'element';
  }

  /**
   * Helper: Get interval in milliseconds
   */
  private getIntervalMs(interval: 'hour' | 'day' | 'week'): number {
    switch (interval) {
      case 'hour': return 60 * 60 * 1000;
      case 'day': return 24 * 60 * 60 * 1000;
      case 'week': return 7 * 24 * 60 * 60 * 1000;
    }
  }

  /**
   * Helper: Format timestamp for display
   */
  private formatTimestamp(timestamp: number, interval: 'hour' | 'day' | 'week'): string {
    const date = new Date(timestamp);
    switch (interval) {
      case 'hour':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'day':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case 'week':
        return `Week of ${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
    }
  }

  /**
   * Helper: Get funnel color based on conversion rate
   */
  private getFunnelColor(conversionRate: number): string {
    if (conversionRate >= 80) return '#10b981'; // Green
    if (conversionRate >= 60) return '#f59e0b'; // Yellow
    if (conversionRate >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  }

  /**
   * Helper: Convert data to CSV format
   */
  private convertToCSV(data: any): string {
    // Simplified CSV conversion - would be more comprehensive in real implementation
    return JSON.stringify(data);
  }

  /**
   * Helper: Format data for D3.js
   */
  private formatForD3(data: any): any {
    return {
      heatmap: data.heatmap.data,
      network: {
        nodes: data.journeyFlow.nodes,
        links: data.journeyFlow.edges
      },
      timeline: data.summary
    };
  }

  /**
   * Helper: Format data for Chart.js
   */
  private formatForChartJS(data: any): any {
    return {
      heatmap: {
        datasets: [{
          label: 'Heatmap Data',
          data: data.heatmap.data
        }]
      },
      insights: {
        labels: Object.keys(data.dashboard.summary.insightsByType),
        datasets: [{
          data: Object.values(data.dashboard.summary.insightsByType)
        }]
      }
    };
  }
}

export default VisualizationDataProcessor;
