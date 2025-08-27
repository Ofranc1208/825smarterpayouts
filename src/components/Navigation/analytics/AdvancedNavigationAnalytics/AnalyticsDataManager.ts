/**
 * Analytics Data Manager - Storage and Persistence
 * 
 * Manages all data storage, loading, and persistence operations
 * for the Advanced Navigation Analytics system.
 * 
 * @module AnalyticsDataManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { HeatmapPoint, UserJourneyStep, NavigationInsight, StorageData, AdvancedAnalyticsConfig } from './types';

export class AnalyticsDataManager {
  private config: AdvancedAnalyticsConfig;
  private storagePrefix: string = 'navigation-analytics';
  private compressionEnabled: boolean = true;

  constructor(config: AdvancedAnalyticsConfig) {
    this.config = config;
  }

  /**
   * Store heatmap data
   */
  storeHeatmapData(data: HeatmapPoint[]): boolean {
    try {
      const key = `${this.storagePrefix}-heatmap-data`;
      const compressedData = this.compressData(data.slice(-1000)); // Keep last 1000 points
      localStorage.setItem(key, JSON.stringify(compressedData));
      return true;
    } catch (error) {
      console.warn('Failed to store heatmap data:', error);
      return false;
    }
  }

  /**
   * Load heatmap data
   */
  loadHeatmapData(): HeatmapPoint[] {
    try {
      const key = `${this.storagePrefix}-heatmap-data`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.decompressData(parsed) || [];
      }
    } catch (error) {
      console.warn('Failed to load heatmap data:', error);
    }
    return [];
  }

  /**
   * Store journey data
   */
  storeJourneyData(journeys: Map<string, UserJourneyStep[]>): boolean {
    try {
      const key = `${this.storagePrefix}-journey-data`;
      const journeyObject = Object.fromEntries(journeys);
      const compressedData = this.compressData(journeyObject);
      localStorage.setItem(key, JSON.stringify(compressedData));
      return true;
    } catch (error) {
      console.warn('Failed to store journey data:', error);
      return false;
    }
  }

  /**
   * Load journey data
   */
  loadJourneyData(): Map<string, UserJourneyStep[]> {
    try {
      const key = `${this.storagePrefix}-journey-data`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        const decompressed = this.decompressData(parsed);
        return new Map(Object.entries(decompressed || {}));
      }
    } catch (error) {
      console.warn('Failed to load journey data:', error);
    }
    return new Map();
  }

  /**
   * Store insights data
   */
  storeInsights(insights: NavigationInsight[]): boolean {
    try {
      const key = `${this.storagePrefix}-insights`;
      const compressedData = this.compressData(insights.slice(-50)); // Keep last 50 insights
      localStorage.setItem(key, JSON.stringify(compressedData));
      return true;
    } catch (error) {
      console.warn('Failed to store insights:', error);
      return false;
    }
  }

  /**
   * Load insights data
   */
  loadInsights(): NavigationInsight[] {
    try {
      const key = `${this.storagePrefix}-insights`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.decompressData(parsed) || [];
      }
    } catch (error) {
      console.warn('Failed to load insights:', error);
    }
    return [];
  }

  /**
   * Store session ID
   */
  storeSessionId(sessionId: string): boolean {
    try {
      const key = `${this.storagePrefix}-session-id`;
      localStorage.setItem(key, sessionId);
      return true;
    } catch (error) {
      console.warn('Failed to store session ID:', error);
      return false;
    }
  }

  /**
   * Load session ID
   */
  loadSessionId(): string | null {
    try {
      const key = `${this.storagePrefix}-session-id`;
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to load session ID:', error);
      return null;
    }
  }

  /**
   * Store all analytics data
   */
  storeAllData(data: StorageData): boolean {
    let success = true;
    
    if (data.heatmapData) {
      success = success && this.storeHeatmapData(data.heatmapData);
    }
    
    if (data.journeyData) {
      const journeyMap = new Map(Object.entries(data.journeyData));
      success = success && this.storeJourneyData(journeyMap);
    }
    
    if (data.insights) {
      success = success && this.storeInsights(data.insights);
    }
    
    if (data.sessionId) {
      success = success && this.storeSessionId(data.sessionId);
    }
    
    return success;
  }

  /**
   * Load all analytics data
   */
  loadAllData(): StorageData {
    return {
      heatmapData: this.loadHeatmapData(),
      journeyData: Object.fromEntries(this.loadJourneyData()),
      insights: this.loadInsights(),
      sessionId: this.loadSessionId() || undefined
    };
  }

  /**
   * Clear specific data type
   */
  clearData(dataType: 'heatmap' | 'journey' | 'insights' | 'session' | 'all'): boolean {
    try {
      switch (dataType) {
        case 'heatmap':
          localStorage.removeItem(`${this.storagePrefix}-heatmap-data`);
          break;
        case 'journey':
          localStorage.removeItem(`${this.storagePrefix}-journey-data`);
          break;
        case 'insights':
          localStorage.removeItem(`${this.storagePrefix}-insights`);
          break;
        case 'session':
          localStorage.removeItem(`${this.storagePrefix}-session-id`);
          break;
        case 'all':
          this.clearAllData();
          break;
      }
      return true;
    } catch (error) {
      console.warn(`Failed to clear ${dataType} data:`, error);
      return false;
    }
  }

  /**
   * Clear all analytics data
   */
  clearAllData(): boolean {
    try {
      const keys = Object.keys(localStorage);
      const analyticsKeys = keys.filter(key => key.startsWith(this.storagePrefix));
      
      analyticsKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      return true;
    } catch (error) {
      console.warn('Failed to clear all analytics data:', error);
      return false;
    }
  }

  /**
   * Get storage usage statistics
   */
  getStorageStats(): {
    totalSize: number;
    heatmapSize: number;
    journeySize: number;
    insightsSize: number;
    availableSpace: number;
    usagePercentage: number;
  } {
    const getItemSize = (key: string): number => {
      const item = localStorage.getItem(key);
      return item ? item.length : 0;
    };

    const heatmapSize = getItemSize(`${this.storagePrefix}-heatmap-data`);
    const journeySize = getItemSize(`${this.storagePrefix}-journey-data`);
    const insightsSize = getItemSize(`${this.storagePrefix}-insights`);
    const totalSize = heatmapSize + journeySize + insightsSize;

    // Estimate available localStorage space (usually 5-10MB)
    const estimatedLimit = 5 * 1024 * 1024; // 5MB
    const availableSpace = Math.max(0, estimatedLimit - this.getTotalLocalStorageSize());
    const usagePercentage = (totalSize / estimatedLimit) * 100;

    return {
      totalSize,
      heatmapSize,
      journeySize,
      insightsSize,
      availableSpace,
      usagePercentage
    };
  }

  /**
   * Get total localStorage size
   */
  private getTotalLocalStorageSize(): number {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return total;
  }

  /**
   * Compress data for storage
   */
  private compressData(data: any): any {
    if (!this.compressionEnabled) return data;
    
    try {
      // Simple compression: remove redundant properties and round numbers
      if (Array.isArray(data)) {
        return data.map(item => this.compressItem(item));
      } else if (typeof data === 'object' && data !== null) {
        const compressed: any = {};
        for (const [key, value] of Object.entries(data)) {
          compressed[key] = this.compressData(value);
        }
        return compressed;
      }
      return data;
    } catch (error) {
      console.warn('Data compression failed:', error);
      return data;
    }
  }

  /**
   * Compress individual item
   */
  private compressItem(item: any): any {
    if (typeof item === 'object' && item !== null) {
      const compressed: any = {};
      
      for (const [key, value] of Object.entries(item)) {
        // Round numbers to reduce precision
        if (typeof value === 'number') {
          compressed[key] = Math.round(value * 100) / 100;
        } else if (key === 'metadata' && typeof value === 'object') {
          // Compress metadata by keeping only essential fields
          compressed[key] = this.compressMetadata(value);
        } else {
          compressed[key] = value;
        }
      }
      
      return compressed;
    }
    return item;
  }

  /**
   * Compress metadata object
   */
  private compressMetadata(metadata: any): any {
    if (!metadata || typeof metadata !== 'object') return metadata;
    
    // Keep only essential metadata fields
    const essential = ['x', 'y', 'href', 'key', 'scrollY', 'scrollX', 'width', 'height'];
    const compressed: any = {};
    
    for (const field of essential) {
      if (metadata[field] !== undefined) {
        compressed[field] = typeof metadata[field] === 'number' 
          ? Math.round(metadata[field]) 
          : metadata[field];
      }
    }
    
    return compressed;
  }

  /**
   * Decompress data from storage
   */
  private decompressData(data: any): any {
    // Currently just returns the data as-is since we're using simple compression
    // In a more advanced implementation, this would reverse the compression
    return data;
  }

  /**
   * Export data for external analysis
   */
  exportData(format: 'json' | 'csv' = 'json'): string {
    const data = this.loadAllData();
    
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else {
      // Convert to CSV format
      return this.convertToCSV(data);
    }
  }

  /**
   * Convert data to CSV format
   */
  private convertToCSV(data: StorageData): string {
    const lines: string[] = [];
    
    // Heatmap data CSV
    if (data.heatmapData && data.heatmapData.length > 0) {
      lines.push('=== HEATMAP DATA ===');
      lines.push('x,y,intensity,timestamp,elementId,elementType');
      data.heatmapData.forEach(point => {
        lines.push(`${point.x},${point.y},${point.intensity},${point.timestamp},${point.elementId || ''},${point.elementType || ''}`);
      });
      lines.push('');
    }
    
    // Journey data CSV
    if (data.journeyData) {
      lines.push('=== JOURNEY DATA ===');
      lines.push('sessionId,action,element,timestamp,duration');
      Object.entries(data.journeyData).forEach(([sessionId, steps]) => {
        steps.forEach(step => {
          lines.push(`${sessionId},${step.action},${step.element},${step.timestamp},${step.duration || ''}`);
        });
      });
      lines.push('');
    }
    
    // Insights CSV
    if (data.insights && data.insights.length > 0) {
      lines.push('=== INSIGHTS ===');
      lines.push('type,description,confidence,impact,recommendation');
      data.insights.forEach(insight => {
        lines.push(`${insight.type},"${insight.description}",${insight.confidence},${insight.impact},"${insight.recommendation}"`);
      });
    }
    
    return lines.join('\n');
  }

  /**
   * Import data from external source
   */
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as StorageData;
      return this.storeAllData(data);
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  /**
   * Backup data to external storage (if available)
   */
  async backupToCloud(endpoint: string): Promise<boolean> {
    try {
      const data = this.loadAllData();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Failed to backup to cloud:', error);
      return false;
    }
  }

  /**
   * Restore data from external storage
   */
  async restoreFromCloud(endpoint: string): Promise<boolean> {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        return this.storeAllData(data);
      }
      return false;
    } catch (error) {
      console.error('Failed to restore from cloud:', error);
      return false;
    }
  }

  /**
   * Check if storage quota is exceeded
   */
  isStorageQuotaExceeded(): boolean {
    const stats = this.getStorageStats();
    return stats.usagePercentage > 90; // Consider 90% as near-full
  }

  /**
   * Cleanup old data to free space
   */
  cleanupOldData(maxAge: number = 7 * 24 * 60 * 60 * 1000): boolean {
    try {
      const cutoffTime = Date.now() - maxAge;
      
      // Clean heatmap data
      const heatmapData = this.loadHeatmapData();
      const filteredHeatmap = heatmapData.filter(point => point.timestamp > cutoffTime);
      this.storeHeatmapData(filteredHeatmap);
      
      // Clean journey data
      const journeyData = this.loadJourneyData();
      const filteredJourneys = new Map<string, UserJourneyStep[]>();
      
      Array.from(journeyData.entries()).forEach(([sessionId, steps]) => {
        const filteredSteps = steps.filter((step: any) => step.timestamp > cutoffTime);
        if (filteredSteps.length > 0) {
          filteredJourneys.set(sessionId, filteredSteps);
        }
      });
      
      this.storeJourneyData(filteredJourneys);
      
      return true;
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
      return false;
    }
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Set storage prefix
   */
  setStoragePrefix(prefix: string): void {
    this.storagePrefix = prefix;
  }

  /**
   * Enable/disable compression
   */
  setCompressionEnabled(enabled: boolean): void {
    this.compressionEnabled = enabled;
  }
}

export default AnalyticsDataManager;
