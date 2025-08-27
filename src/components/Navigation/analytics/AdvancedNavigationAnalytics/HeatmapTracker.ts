/**
 * Heatmap Tracker - Mouse and Click Tracking
 * 
 * Handles all heatmap data collection including mouse movements,
 * clicks, and intensity calculations for visualization.
 * 
 * @module HeatmapTracker
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { HeatmapPoint, HeatmapVisualizationPoint, AdvancedAnalyticsConfig } from './types';

export class HeatmapTracker {
  private heatmapData: HeatmapPoint[] = [];
  private config: AdvancedAnalyticsConfig;
  private maxDataPoints: number = 10000;
  private storageThreshold: number = 100;

  constructor(config: AdvancedAnalyticsConfig) {
    this.config = config;
  }

  /**
   * Handle mouse movement for heatmap
   */
  handleMouseMove(event: MouseEvent): void {
    if (!this.config.enableHeatmaps) return;
    if (Math.random() > this.config.heatmapSampleRate) return;

    const point: HeatmapPoint = {
      x: event.clientX,
      y: event.clientY,
      intensity: 1,
      timestamp: Date.now(),
      elementId: (event.target as Element)?.id,
      elementType: (event.target as Element)?.tagName?.toLowerCase()
    };

    this.addHeatmapPoint(point);
  }

  /**
   * Handle click events for heatmap
   */
  handleClick(event: MouseEvent): void {
    if (!this.config.enableHeatmaps) return;

    const target = event.target as Element;
    const point: HeatmapPoint = {
      x: event.clientX,
      y: event.clientY,
      intensity: 5, // Clicks have higher intensity
      timestamp: Date.now(),
      elementId: target.id,
      elementType: target.tagName?.toLowerCase()
    };

    this.addHeatmapPoint(point);
  }

  /**
   * Add heatmap point to collection
   */
  private addHeatmapPoint(point: HeatmapPoint): void {
    this.heatmapData.push(point);

    // Limit data size to prevent memory issues
    if (this.heatmapData.length > this.maxDataPoints) {
      this.heatmapData = this.heatmapData.slice(-Math.floor(this.maxDataPoints / 2));
    }
  }

  /**
   * Generate heatmap visualization data
   */
  generateVisualizationData(gridSize: number = 20): HeatmapVisualizationPoint[] {
    // Group points by proximity and sum intensity
    const grid: Map<string, number> = new Map();

    this.heatmapData.forEach(point => {
      const gridX = Math.floor(point.x / gridSize) * gridSize;
      const gridY = Math.floor(point.y / gridSize) * gridSize;
      const key = `${gridX},${gridY}`;
      
      grid.set(key, (grid.get(key) || 0) + point.intensity);
    });

    return Array.from(grid.entries()).map(([key, value]) => {
      const [x, y] = key.split(',').map(Number);
      return { x, y, value };
    });
  }

  /**
   * Get heatmap statistics
   */
  getHeatmapStats(): {
    totalPoints: number;
    totalClicks: number;
    totalMoves: number;
    averageIntensity: number;
    timeRange: { start: number; end: number };
    topElements: Array<{ elementId: string; count: number }>;
  } {
    const clicks = this.heatmapData.filter(p => p.intensity > 1);
    const moves = this.heatmapData.filter(p => p.intensity === 1);
    const totalIntensity = this.heatmapData.reduce((sum, p) => sum + p.intensity, 0);

    // Count interactions by element
    const elementCounts: Map<string, number> = new Map();
    this.heatmapData.forEach(point => {
      if (point.elementId) {
        elementCounts.set(point.elementId, (elementCounts.get(point.elementId) || 0) + 1);
      }
    });

    const topElements = Array.from(elementCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([elementId, count]) => ({ elementId, count }));

    const timestamps = this.heatmapData.map(p => p.timestamp);
    const timeRange = {
      start: Math.min(...timestamps) || 0,
      end: Math.max(...timestamps) || 0
    };

    return {
      totalPoints: this.heatmapData.length,
      totalClicks: clicks.length,
      totalMoves: moves.length,
      averageIntensity: this.heatmapData.length > 0 ? totalIntensity / this.heatmapData.length : 0,
      timeRange,
      topElements
    };
  }

  /**
   * Get high-intensity areas
   */
  getHighIntensityAreas(threshold: number = 10, gridSize: number = 20): HeatmapVisualizationPoint[] {
    const visualizationData = this.generateVisualizationData(gridSize);
    return visualizationData.filter(point => point.value >= threshold);
  }

  /**
   * Find areas with no navigation elements
   */
  findUnusedNavigationAreas(): Array<{ x: number; y: number; intensity: number }> {
    const highIntensityAreas = this.getHighIntensityAreas();
    
    return highIntensityAreas
      .filter(area => !this.isNavigationElement(area.x, area.y))
      .map(area => ({
        x: area.x,
        y: area.y,
        intensity: area.value
      }));
  }

  /**
   * Check if coordinates contain navigation element
   */
  private isNavigationElement(x: number, y: number): boolean {
    if (typeof document === 'undefined') return false;
    
    const element = document.elementFromPoint(x, y);
    return element?.closest('[data-nav-element]') !== null;
  }

  /**
   * Get heatmap data for time range
   */
  getDataForTimeRange(startTime: number, endTime: number): HeatmapPoint[] {
    return this.heatmapData.filter(point => 
      point.timestamp >= startTime && point.timestamp <= endTime
    );
  }

  /**
   * Get heatmap data by element type
   */
  getDataByElementType(elementType: string): HeatmapPoint[] {
    return this.heatmapData.filter(point => 
      point.elementType === elementType.toLowerCase()
    );
  }

  /**
   * Clear old heatmap data
   */
  clearOldData(maxAge: number = 24 * 60 * 60 * 1000): number {
    const cutoffTime = Date.now() - maxAge;
    const initialLength = this.heatmapData.length;
    
    this.heatmapData = this.heatmapData.filter(point => point.timestamp > cutoffTime);
    
    return initialLength - this.heatmapData.length;
  }

  /**
   * Get all heatmap data
   */
  getAllData(): HeatmapPoint[] {
    return [...this.heatmapData];
  }

  /**
   * Set heatmap data (for loading from storage)
   */
  setData(data: HeatmapPoint[]): void {
    this.heatmapData = data;
  }

  /**
   * Clear all heatmap data
   */
  clearAllData(): void {
    this.heatmapData = [];
  }

  /**
   * Get data size in bytes (approximate)
   */
  getDataSize(): number {
    return JSON.stringify(this.heatmapData).length;
  }

  /**
   * Optimize data by removing redundant points
   */
  optimizeData(proximityThreshold: number = 5): number {
    const optimized: HeatmapPoint[] = [];
    const processed = new Set<string>();

    for (const point of this.heatmapData) {
      const key = `${Math.floor(point.x / proximityThreshold)}_${Math.floor(point.y / proximityThreshold)}`;
      
      if (!processed.has(key)) {
        // Find all points in this proximity group
        const nearbyPoints = this.heatmapData.filter(p => 
          Math.abs(p.x - point.x) <= proximityThreshold &&
          Math.abs(p.y - point.y) <= proximityThreshold
        );

        // Merge nearby points
        const mergedPoint: HeatmapPoint = {
          x: nearbyPoints.reduce((sum, p) => sum + p.x, 0) / nearbyPoints.length,
          y: nearbyPoints.reduce((sum, p) => sum + p.y, 0) / nearbyPoints.length,
          intensity: nearbyPoints.reduce((sum, p) => sum + p.intensity, 0),
          timestamp: Math.max(...nearbyPoints.map(p => p.timestamp)),
          elementId: point.elementId,
          elementType: point.elementType
        };

        optimized.push(mergedPoint);
        processed.add(key);
      }
    }

    const originalLength = this.heatmapData.length;
    this.heatmapData = optimized;
    
    return originalLength - optimized.length;
  }

  /**
   * Should trigger storage based on data size
   */
  shouldTriggerStorage(): boolean {
    return this.heatmapData.length % this.storageThreshold === 0;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export default HeatmapTracker;
