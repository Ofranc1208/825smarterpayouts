'use client';

import React from 'react';

interface ChartPlaceholderProps {
  icon?: string;
  title: string;
  subtitle?: string;
  timeRange?: string;
}

export default function ChartPlaceholder({ 
  icon = '📈', 
  title, 
  subtitle,
  timeRange 
}: ChartPlaceholderProps) {
  return (
    <div style={{
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      borderRadius: '0.5rem',
      color: '#6b7280'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
        <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            {subtitle}
          </div>
        )}
        {timeRange && (
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Time range: {timeRange}
          </div>
        )}
      </div>
    </div>
  );
}
