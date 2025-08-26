'use client';

import React from 'react';

interface SystemItemProps {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
}

const getHealthColor = (status: string) => {
  switch (status) {
    case 'healthy': return '#10b981';
    case 'warning': return '#f59e0b';
    case 'critical': return '#ef4444';
    default: return '#6b7280';
  }
};

const getHealthIcon = (status: string) => {
  switch (status) {
    case 'healthy': return '✅';
    case 'warning': return '⚠️';
    case 'critical': return '🚨';
    default: return '❓';
  }
};

/**
 * System Item Component
 * 
 * Displays individual system health status.
 * 
 * @component SystemItem
 */
export default function SystemItem({ name, status }: SystemItemProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      background: '#f8fafc',
      borderRadius: '0.5rem',
      border: `1px solid ${getHealthColor(status)}20`
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <span style={{ fontSize: '1.25rem' }}>
          {getHealthIcon(status)}
        </span>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#1f2937'
        }}>
          {name}
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: getHealthColor(status)
        }} />
        <span style={{
          fontSize: '0.75rem',
          color: getHealthColor(status),
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {status}
        </span>
      </div>
    </div>
  );
}
