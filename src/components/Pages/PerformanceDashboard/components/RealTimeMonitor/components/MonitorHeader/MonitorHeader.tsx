'use client';

import React from 'react';

interface MonitorHeaderProps {
  isEnabled: boolean;
  title?: string;
}

/**
 * Monitor Header Component
 * 
 * Displays header with status indicator and title.
 * 
 * @component MonitorHeader
 */
export default function MonitorHeader({ isEnabled, title = 'Real-time Monitor' }: MonitorHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    }}>
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: isEnabled ? '#10b981' : '#6b7280',
        animation: isEnabled ? 'pulse 2s infinite' : 'none'
      }} />
      <h3 style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0'
      }}>
        {title}
      </h3>
    </div>
  );
}
