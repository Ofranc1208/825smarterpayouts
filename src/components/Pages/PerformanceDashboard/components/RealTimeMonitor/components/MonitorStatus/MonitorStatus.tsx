'use client';

import React, { useState, useEffect } from 'react';

interface MonitorStatusProps {
  isEnabled: boolean;
  lastUpdate: Date;
}

/**
 * Monitor Status Component
 * 
 * Displays monitoring status with appropriate icons and messages.
 * 
 * @component MonitorStatus
 */
export default function MonitorStatus({ isEnabled, lastUpdate }: MonitorStatusProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{
      fontSize: '0.875rem',
      color: '#6b7280',
      textAlign: 'center',
      padding: '2rem 0'
    }}>
      {isEnabled ? (
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <div>Monitoring active</div>
          <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
            {isClient ? `Last update: ${lastUpdate.toLocaleTimeString()}` : 'Last update: recently'}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏸️</div>
          <div>Real-time monitoring disabled</div>
        </div>
      )}
    </div>
  );
}
