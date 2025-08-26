'use client';

import React, { useState, useEffect } from 'react';
import {
  DashboardHeader,
  MetricsOverview,
  PagePerformanceGrid,
  RealTimeMonitor,
  AnalyticsCharts,
  SystemHealth
} from './components';
import WebVitalsTracker from './components/WebVitalsTracker';
import { useDashboardData } from './hooks/useDashboardData';
import { DashboardProvider } from './context/DashboardContext';
import ErrorBoundary from './components/ErrorBoundary/DashboardErrorBoundary';

/**
 * Enterprise Performance Dashboard - Admin Only
 * 
 * Real-time monitoring dashboard for all SmarterPayouts pages with:
 * - Live performance metrics (Core Web Vitals)
 * - Page-by-page analytics breakdown
 * - System health monitoring
 * - User behavior analytics
 * - Error tracking and alerts
 * 
 * @component PerformanceDashboardPage
 * @access Admin Only
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */
export default function PerformanceDashboardPage() {
  const [selectedPage, setSelectedPage] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isRealTime, setIsRealTime] = useState(true);

  const {
    metrics,
    pageData,
    systemHealth,
    analytics,
    isLoading,
    error,
    lastUpdate,
    refreshData
  } = useDashboardData({
    selectedPage,
    timeRange,
    realTime: isRealTime
  });

  // Auto-refresh every 30 seconds when real-time is enabled
  useEffect(() => {
    if (!isRealTime) return;
    
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [isRealTime, refreshData]);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#dc2626'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>⚠️ Dashboard Error</h1>
          <p>{error}</p>
          <button 
            onClick={refreshData}
            style={{
              padding: '0.5rem 1rem',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <ErrorBoundary>
        {/* Real Performance Tracking - Runs silently in background */}
        <WebVitalsTracker />
        
        <div style={{
          minHeight: '100vh',
          background: '#f8fafc',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {/* Dashboard Header */}
          <DashboardHeader
            selectedPage={selectedPage}
            onPageChange={setSelectedPage}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            isRealTime={isRealTime}
            onRealTimeToggle={setIsRealTime}
            onRefresh={refreshData}
          />

          {/* Main Dashboard Content */}
          <main style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            display: 'grid',
            gap: '2rem'
          }}>
            {/* Metrics Overview */}
            <MetricsOverview
              metrics={metrics}
              isLoading={isLoading}
              timeRange={timeRange}
            />

            {/* Dashboard Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
              alignItems: 'start'
            }}>
              {/* Left Column - Main Content */}
              <div style={{ display: 'grid', gap: '2rem' }}>
                <PagePerformanceGrid
                  pageData={pageData}
                  selectedPage={selectedPage}
                  onPageSelect={setSelectedPage}
                  isLoading={isLoading}
                />
                
                <AnalyticsCharts
                  analytics={analytics}
                  timeRange={timeRange}
                  isLoading={isLoading}
                />
              </div>

              {/* Right Column - Sidebar */}
              <div style={{ display: 'grid', gap: '2rem' }}>
                <RealTimeMonitor
                  isEnabled={isRealTime}
                  metrics={metrics}
                  lastUpdate={lastUpdate}
                />
                
                <SystemHealth
                  health={systemHealth}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </main>

          {/* Development Info */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'fixed',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              zIndex: 9999,
              fontFamily: 'monospace'
            }}>
              <div>🚀 Dashboard: Active</div>
              <div>📊 Real-time: {isRealTime ? 'ON' : 'OFF'}</div>
              <div>⏱️ Range: {timeRange}</div>
              <div>📄 Page: {selectedPage}</div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </DashboardProvider>
  );
}
