'use client';

import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services';

interface DashboardDataParams {
  selectedPage: string;
  timeRange: '1h' | '24h' | '7d' | '30d';
  realTime: boolean;
}

// Simple seeded random function for consistent SSR/CSR values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Mock data generator for demonstration - using seed for consistent SSR/CSR
const generateMockMetrics = (seed: number = 1) => {
  return {
    coreWebVitals: {
      fcp: {
        name: 'First Contentful Paint',
        value: Math.floor(seededRandom(seed + 1) * 2000) + 500,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 2) * 20) - 10,
        status: (seededRandom(seed + 3) > 0.7 ? 'good' : seededRandom(seed + 4) > 0.4 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '🎨'
      },
      lcp: {
        name: 'Largest Contentful Paint',
        value: Math.floor(seededRandom(seed + 5) * 3000) + 1000,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 6) * 20) - 10,
        status: (seededRandom(seed + 7) > 0.6 ? 'good' : seededRandom(seed + 8) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '🖼️'
      },
      cls: {
        name: 'Cumulative Layout Shift',
        value: seededRandom(seed + 9) * 0.3,
        unit: '',
        change: Math.floor(seededRandom(seed + 10) * 20) - 10,
        status: (seededRandom(seed + 11) > 0.8 ? 'good' : seededRandom(seed + 12) > 0.5 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '📐'
      },
      fid: {
        name: 'First Input Delay',
        value: Math.floor(seededRandom(seed + 13) * 200) + 50,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 14) * 20) - 10,
        status: (seededRandom(seed + 15) > 0.7 ? 'good' : seededRandom(seed + 16) > 0.4 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '👆'
      },
      ttfb: {
        name: 'Time to First Byte',
        value: Math.floor(seededRandom(seed + 17) * 1000) + 200,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 18) * 20) - 10,
        status: (seededRandom(seed + 19) > 0.6 ? 'good' : seededRandom(seed + 20) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '⚡'
      }
    },
    performance: {
      pageLoad: {
        name: 'Page Load Time',
        value: Math.floor(seededRandom(seed + 21) * 4000) + 1000,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 22) * 20) - 10,
        status: (seededRandom(seed + 23) > 0.6 ? 'good' : seededRandom(seed + 24) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '🚀'
      },
      domReady: {
        name: 'DOM Ready',
        value: Math.floor(seededRandom(seed + 25) * 2000) + 500,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 26) * 20) - 10,
        status: (seededRandom(seed + 27) > 0.7 ? 'good' : seededRandom(seed + 28) > 0.4 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '🏗️'
      },
      firstByte: {
        name: 'First Byte',
        value: Math.floor(seededRandom(seed + 29) * 800) + 100,
        unit: 'ms',
        change: Math.floor(seededRandom(seed + 30) * 20) - 10,
        status: (seededRandom(seed + 31) > 0.8 ? 'good' : seededRandom(seed + 32) > 0.5 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
        icon: '📡'
      }
    },
    user: {
      activeUsers: {
        name: 'Active Users',
        value: Math.floor(seededRandom(seed + 33) * 1000) + 100,
        unit: '',
        change: Math.floor(seededRandom(seed + 34) * 30) - 15,
        status: 'good' as 'good' | 'needs-improvement' | 'poor',
        icon: '👥'
      },
      bounceRate: {
        name: 'Bounce Rate',
        value: Math.floor(seededRandom(seed + 35) * 50) + 20,
        unit: '%',
        change: Math.floor(seededRandom(seed + 36) * 20) - 10,
        status: (seededRandom(seed + 37) > 0.5 ? 'good' : 'needs-improvement') as 'good' | 'needs-improvement' | 'poor',
        icon: '📊'
      },
      sessionDuration: {
        name: 'Session Duration',
        value: Math.floor(seededRandom(seed + 38) * 300) + 120,
        unit: 's',
        change: Math.floor(seededRandom(seed + 39) * 20) - 10,
        status: 'good' as 'good' | 'needs-improvement' | 'poor',
        icon: '⏱️'
      }
    }
  };
};

const generateMockPageData = (seed: number = 1) => {
  return [
    {
      id: 'home',
      name: 'Home',
      icon: '🏠',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 100) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 101) * 3000) + 1000,
        cls: seededRandom(seed + 102) * 0.3,
        visitors: Math.floor(seededRandom(seed + 103) * 5000) + 1000,
        bounceRate: Math.floor(seededRandom(seed + 104) * 50) + 20
      },
      status: (seededRandom(seed + 105) > 0.6 ? 'good' : seededRandom(seed + 106) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    },
    {
      id: 'about',
      name: 'About Us',
      icon: 'ℹ️',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 110) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 111) * 3000) + 1000,
        cls: seededRandom(seed + 112) * 0.3,
        visitors: Math.floor(seededRandom(seed + 113) * 2000) + 500,
        bounceRate: Math.floor(seededRandom(seed + 114) * 50) + 20
      },
      status: (seededRandom(seed + 115) > 0.6 ? 'good' : seededRandom(seed + 116) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '📞',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 120) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 121) * 3000) + 1000,
        cls: seededRandom(seed + 122) * 0.3,
        visitors: Math.floor(seededRandom(seed + 123) * 1500) + 300,
        bounceRate: Math.floor(seededRandom(seed + 124) * 50) + 20
      },
      status: (seededRandom(seed + 125) > 0.6 ? 'good' : seededRandom(seed + 126) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    },
    {
      id: 'court-approval',
      name: 'Court Approval',
      icon: '⚖️',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 130) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 131) * 3000) + 1000,
        cls: seededRandom(seed + 132) * 0.3,
        visitors: Math.floor(seededRandom(seed + 133) * 3000) + 800,
        bounceRate: Math.floor(seededRandom(seed + 134) * 50) + 20
      },
      status: (seededRandom(seed + 135) > 0.6 ? 'good' : seededRandom(seed + 136) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    },
    {
      id: 'mint-chat',
      name: 'Mint Chat',
      icon: '🤖',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 140) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 141) * 3000) + 1000,
        cls: seededRandom(seed + 142) * 0.3,
        visitors: Math.floor(seededRandom(seed + 143) * 4000) + 1200,
        bounceRate: Math.floor(seededRandom(seed + 144) * 50) + 20
      },
      status: (seededRandom(seed + 145) > 0.6 ? 'good' : seededRandom(seed + 146) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '📺',
      metrics: {
        fcp: Math.floor(seededRandom(seed + 150) * 2000) + 500,
        lcp: Math.floor(seededRandom(seed + 151) * 3000) + 1000,
        cls: seededRandom(seed + 152) * 0.3,
        visitors: Math.floor(seededRandom(seed + 153) * 1000) + 200,
        bounceRate: Math.floor(seededRandom(seed + 154) * 50) + 20
      },
      status: (seededRandom(seed + 155) > 0.6 ? 'good' : seededRandom(seed + 156) > 0.3 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor',
      lastUpdated: new Date('2024-01-01T12:00:00Z')
    }
  ];
};

export function useDashboardData({ selectedPage, timeRange, realTime }: DashboardDataParams) {
  // Use real analytics service for data
  const [metrics, setMetrics] = useState(() => generateMockMetrics(1)); // Fallback for SSR
  const [pageData, setPageData] = useState(() => generateMockPageData(1)); // Fallback for SSR
  const [systemHealth] = useState({
    server: 'healthy' as const,
    database: 'healthy' as const,
    cdn: 'healthy' as const,
    api: 'healthy' as const
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
  const [isRealDataEnabled, setIsRealDataEnabled] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (typeof window !== 'undefined' && isRealDataEnabled) {
        // Use real analytics service
        console.log('📊 Fetching real performance data...');
        
        // Get real metrics
        const realMetrics = await analyticsService.getRealMetrics(timeRange);
        setMetrics(realMetrics);
        
        // Get real page data
        const realPageData = await analyticsService.getRealPageData(timeRange);
        setPageData(realPageData);
        
        // Get real visitor data
        const visitorData = await analyticsService.getRealVisitorData(timeRange);
        setAnalytics({
          pageViews: visitorData.pageViews,
          uniqueVisitors: visitorData.uniqueVisitors,
          avgSessionDuration: visitorData.avgSessionDuration,
          conversionRate: 2.5 + (Math.random() * 2) // Simulated conversion rate
        });
        
        console.log('✅ Real data loaded successfully');
      } else {
        // Fallback to enhanced mock data
        const newSeed = realTime ? Date.now() % 1000 : 1;
        setMetrics(generateMockMetrics(newSeed));
        setPageData(generateMockPageData(newSeed));
        
        // Enhanced mock analytics
        const variance = Math.sin(Date.now() / 60000) * 0.2;
        setAnalytics({
          pageViews: Math.floor(5000 + (variance * 1000)),
          uniqueVisitors: Math.floor(2000 + (variance * 500)),
          avgSessionDuration: Math.floor(120 + (variance * 60)),
          conversionRate: 2.5 + (variance * 1.5)
        });
      }
      
      setLastUpdate(new Date());
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data');
      
      // Fallback to mock data on error
      const fallbackSeed = Date.now() % 1000;
      setMetrics(generateMockMetrics(fallbackSeed));
      setPageData(generateMockPageData(fallbackSeed));
    } finally {
      setIsLoading(false);
    }
  }, [timeRange, realTime, isRealDataEnabled]);

  // Enable real data after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize analytics service and enable real data
      const initializeAnalytics = async () => {
        try {
          await analyticsService.initialize();
          console.log('🚀 Analytics service initialized');
          setIsRealDataEnabled(true);
        } catch (error) {
          console.warn('⚠️ Analytics initialization failed, using enhanced mock data:', error);
          setIsRealDataEnabled(true); // Still enable to show enhanced mock data
        }
      };
      
      // Small delay to ensure DOM is ready
      const timer = setTimeout(initializeAnalytics, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData, selectedPage, timeRange]);

  // Auto-refresh for real-time data
  useEffect(() => {
    if (!realTime || !isRealDataEnabled) return;

    const interval = setInterval(() => {
      refreshData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [realTime, isRealDataEnabled, refreshData]);

  return {
    metrics,
    pageData,
    systemHealth,
    analytics,
    isLoading,
    error,
    lastUpdate,
    refreshData
  };
}