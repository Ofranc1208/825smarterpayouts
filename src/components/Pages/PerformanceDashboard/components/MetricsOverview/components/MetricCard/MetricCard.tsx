'use client';

import React from 'react';

interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'needs-improvement' | 'poor';
  icon: string;
}

interface MetricCardProps {
  metric: Metric;
  isLoading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good': return '#10b981';
    case 'needs-improvement': return '#f59e0b';
    case 'poor': return '#ef4444';
    default: return '#6b7280';
  }
};

const getChangeColor = (change: number) => {
  return change >= 0 ? '#10b981' : '#ef4444';
};

/**
 * Metric Card Component
 * 
 * Displays individual performance metric with status indicators.
 * 
 * @component MetricCard
 */
export default function MetricCard({ metric, isLoading }: MetricCardProps) {
  if (isLoading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#f3f4f6',
            borderRadius: '0.75rem',
            animation: 'pulse 2s infinite'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              height: '1rem',
              background: '#f3f4f6',
              borderRadius: '0.25rem',
              marginBottom: '0.5rem',
              animation: 'pulse 2s infinite'
            }} />
            <div style={{
              height: '2rem',
              background: '#f3f4f6',
              borderRadius: '0.25rem',
              width: '60%',
              animation: 'pulse 2s infinite'
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {/* Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          background: `linear-gradient(135deg, ${getStatusColor(metric.status)}20 0%, ${getStatusColor(metric.status)}10 100%)`,
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          {metric.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#6b7280',
              margin: '0'
            }}>
              {metric.name}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: getChangeColor(metric.change),
              fontWeight: '500'
            }}>
              <span>{metric.change >= 0 ? '↗' : '↘'}</span>
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem'
          }}>
            <span style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
            </span>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              {metric.unit}
            </span>
          </div>

          {/* Status Indicator */}
          <div style={{
            marginTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getStatusColor(metric.status)
            }} />
            <span style={{
              fontSize: '0.75rem',
              color: getStatusColor(metric.status),
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {typeof metric.status === 'string' ? metric.status.replace('-', ' ') : metric.status || 'unknown'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
