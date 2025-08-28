'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  generateMockMetrics,
  generateMockPageData,
  type TransformedMetrics,
  type PageData
} from './utils';
import { unifiedAnalyticsOrchestrator } from '../services/UnifiedAnalyticsOrchestrator';

interface DashboardDataParams {
  selectedPage: string;
  timeRange: '1h' | '24h' | '7d' | '30d';
  realTime: boolean;
}

export function useDashboardData({ selectedPage, timeRange, realTime }: DashboardDataParams) {
  // State management - Start with simple mock data to prevent initialization loops
  const [metrics, setMetrics] = useState<TransformedMetrics>(() => generateMockMetrics(1));
  const [pageData, setPageData] = useState<PageData[]>(() => generateMockPageData(1));
  const [systemHealth, setSystemHealth] = useState<{
    server: 'healthy' | 'warning' | 'critical';
    database: 'healthy' | 'warning' | 'critical';
    cdn: 'healthy' | 'warning' | 'critical';
    api: 'healthy' | 'warning' | 'critical';
  }>({
    server: 'healthy',
    database: 'healthy',
    cdn: 'healthy',
    api: 'healthy'
  });


  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simplified data refresh logic - no complex services
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📊 Refreshing dashboard with simple data...');
      
      // Simple enhanced page data with basic real info
      const enhancedPageData = generateMockPageData(1).map(page => ({
        ...page,
        metrics: {
          ...page.metrics,
          visitors: 1, // Current user
          pageViews: 1, // Current page view
          avgSessionDuration: Math.floor((Date.now() - performance.timeOrigin) / 1000)
        },
        lastUpdated: new Date()
      }));
      setPageData(enhancedPageData);
      
      // Simple analytics
      setAnalytics({
        pageViews: 1,
        uniqueVisitors: 1,
        avgSessionDuration: Math.floor((Date.now() - performance.timeOrigin) / 1000),
        conversionRate: 0
      });
      
      setLastUpdate(new Date());
      console.log('✅ Dashboard refreshed successfully');
      
    } catch (err) {
      console.error('Error refreshing dashboard:', err);
      setError('Failed to refresh dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simplified state - no complex services for now
  const [unifiedData] = useState({});

  // Auto-refresh every 60 seconds when realTime is enabled
  // This is the ONLY auto-refresh mechanism - no duplicates elsewhere
  useEffect(() => {
    if (!realTime) return;
    
    console.log('🔄 Starting auto-refresh every 60 seconds');
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing...');
      refreshData();
    }, 60000);
    
    return () => {
      console.log('🛑 Stopping auto-refresh');
      clearInterval(interval);
    };
  }, [realTime]); // Remove refreshData from dependencies to prevent infinite loop

  // Disable all complex useEffects temporarily to prevent infinite loops

  // Initial data load and dependency-based refresh
  useEffect(() => {
    refreshData();
  }, [selectedPage, timeRange]); // Remove refreshData from dependencies to prevent infinite loop

  return {
    metrics,
    pageData,
    systemHealth,
    analytics,
    isLoading,
    error,
    lastUpdate,
    refreshData,
    unifiedData,
    getUnifiedSummary: () => unifiedAnalyticsOrchestrator.getUnifiedDashboardSummary(),
    getProcessingStats: () => unifiedAnalyticsOrchestrator.getProcessingStats()
  };
}