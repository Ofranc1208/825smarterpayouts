/**
 * DEPRECATED MOCK DATA GENERATORS
 * 
 * These generators are marked for removal and only serve as SSR fallbacks.
 * Real data comes from RealWebVitalsService and AnalyticsService.
 * 
 * @deprecated Use RealWebVitalsService for actual metrics
 */

// Simple seeded random function for consistent SSR/CSR values
export const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * DEPRECATED: Generates minimal fallback metrics for SSR hydration only
 * Real data comes from RealWebVitalsService
 */
export const generateMockMetrics = (seed: number = 1) => {
  return {
    coreWebVitals: {
      fcp: { 
        name: 'First Contentful Paint', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '🎨' 
      },
      lcp: { 
        name: 'Largest Contentful Paint', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '🖼️' 
      },
      cls: { 
        name: 'Cumulative Layout Shift', 
        value: 0, 
        unit: '', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '📐' 
      },
      fid: { 
        name: 'First Input Delay', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '👆' 
      },
      ttfb: { 
        name: 'Time to First Byte', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '⚡' 
      }
    },
    performance: {
      pageLoad: { 
        name: 'Page Load Time', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '🚀' 
      },
      domReady: { 
        name: 'DOM Ready', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '🏗️' 
      },
      firstByte: { 
        name: 'First Byte', 
        value: 0, 
        unit: 'ms', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '📡' 
      }
    },
    user: {
      activeUsers: { 
        name: 'Active Users', 
        value: 0, 
        unit: '', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '👥' 
      },
      bounceRate: { 
        name: 'Bounce Rate', 
        value: 0, 
        unit: '%', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '📊' 
      },
      sessionDuration: { 
        name: 'Session Duration', 
        value: 0, 
        unit: 's', 
        change: 0, 
        status: 'good' as 'good' | 'needs-improvement' | 'poor', 
        icon: '⏱️' 
      }
    }
  };
};

/**
 * DEPRECATED: Generates minimal fallback page data for SSR hydration only
 * Real data comes from AnalyticsService
 */
export const generateMockPageData = (seed: number = 1) => {
  return [
    { 
      id: 'home', 
      name: 'Home', 
      icon: '🏠', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    },
    { 
      id: 'about', 
      name: 'About Us', 
      icon: 'ℹ️', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      icon: '📞', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    },
    { 
      id: 'court-approval', 
      name: 'Court Approval', 
      icon: '⚖️', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    },
    { 
      id: 'mint-chat', 
      name: 'Mint Chat', 
      icon: '/assets/images/mint-mascot.png', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: '📺', 
      metrics: { visitors: 0, bounceRate: 0, pageViews: 0, avgSessionDuration: 0 }, 
      status: 'good' as 'good' | 'needs-improvement' | 'poor', 
      lastUpdated: new Date() 
    }
  ];
};
