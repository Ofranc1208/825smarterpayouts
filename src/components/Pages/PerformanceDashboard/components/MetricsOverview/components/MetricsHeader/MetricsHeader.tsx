'use client';

import React from 'react';

interface MetricsHeaderProps {
  timeRange: string;
}

/**
 * Metrics Header Component
 * 
 * Displays header with title, description, and status legend.
 * 
 * @component MetricsHeader
 */
export default function MetricsHeader({ timeRange }: MetricsHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    }}>
      <div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 0.25rem 0'
        }}>
          Performance Overview
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: '0'
        }}>
          Key metrics for the last {timeRange} across all pages
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
          <span>Good</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
          <span>Needs Improvement</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
          <span>Poor</span>
        </div>
      </div>
    </div>
  );
}
