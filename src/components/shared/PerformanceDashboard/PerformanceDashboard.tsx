/**
 * Performance Dashboard Component - Enterprise Grade
 * 
 * Real-time performance monitoring dashboard displaying Core Web Vitals,
 * custom metrics, and performance analytics for development and production.
 * 
 * @component PerformanceDashboard
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { performanceMonitor, PerformanceMetric, CustomMetric } from '../../../utils/performanceMonitor';

export interface PerformanceDashboardProps {
  /** Show real-time updates */
  realTime?: boolean;
  /** Update interval in milliseconds */
  updateInterval?: number;
  /** Show detailed metrics */
  showDetails?: boolean;
  /** Dashboard theme */
  theme?: 'light' | 'dark';
  /** Custom CSS class */
  className?: string;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  realTime = true,
  updateInterval = 5000,
  showDetails = true,
  theme = 'light',
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial load
    updateMetrics();

    // Set up real-time updates
    if (realTime) {
      const interval = setInterval(updateMetrics, updateInterval);
      return () => clearInterval(interval);
    }
  }, [realTime, updateInterval]);

  const updateMetrics = () => {
    const currentMetrics = performanceMonitor.getMetrics();
    const currentCustomMetrics = performanceMonitor.getCustomMetrics();
    const currentSummary = performanceMonitor.getPerformanceSummary();

    setMetrics(currentMetrics);
    setCustomMetrics(currentCustomMetrics);
    setSummary(currentSummary);
  };

  const getMetricColor = (rating: string) => {
    switch (rating) {
      case 'good': return '#10b981';
      case 'needs-improvement': return '#f59e0b';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatMetricValue = (metric: PerformanceMetric) => {
    switch (metric.name) {
      case 'LCP':
      case 'FCP':
      case 'FID':
      case 'TTFB':
        return `${metric.value.toFixed(0)}ms`;
      case 'CLS':
        return metric.value.toFixed(3);
      default:
        return metric.value.toString();
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '0.75rem',
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#1f2937',
          border: `2px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '1.5rem',
        }}
        title="Show Performance Dashboard"
      >
        📊
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '400px',
        maxHeight: '600px',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#1f2937',
                  border: `2px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      className={className}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem',
          backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
          borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
          📊 Performance Dashboard
        </h3>
        <button
          onClick={toggleVisibility}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          }}
          title="Hide Dashboard"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
        {/* Overall Score */}
        {summary && (
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
              borderRadius: '0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {summary.overallScore}/100
            </div>
            <div style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Overall Performance Score
            </div>
          </div>
        )}

        {/* Core Web Vitals */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            Core Web Vitals
          </h4>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {metrics
              .filter(metric => ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].includes(metric.name))
              .map((metric) => (
                <div
                  key={metric.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
                    borderRadius: '0.5rem',
                    border: `2px solid ${getMetricColor(metric.rating)}`,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                      {metric.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      {metric.rating.replace('-', ' ')}
                    </div>
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                    {formatMetricValue(metric)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Custom Metrics */}
        {showDetails && customMetrics.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              Custom Metrics
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {customMetrics.slice(-5).map((metric, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <span>{metric.name}</span>
                  <span style={{ fontWeight: '600' }}>
                    {metric.value.toFixed(2)} {metric.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={updateMetrics}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: theme === 'dark' ? '#059669' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Refresh
          </button>
          <button
            onClick={() => performanceMonitor.reset()}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: theme === 'dark' ? '#dc2626' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
