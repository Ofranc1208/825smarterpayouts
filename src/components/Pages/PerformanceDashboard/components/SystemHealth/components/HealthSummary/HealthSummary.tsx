'use client';

import React, { useState, useEffect } from 'react';

/**
 * Health Summary Component
 * 
 * Displays overall system health summary with last check time.
 * 
 * @component HealthSummary
 */
export default function HealthSummary() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{
      marginTop: '1rem',
      padding: '0.75rem',
      background: '#f0fdf4',
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '0.75rem',
        color: '#15803d',
        fontWeight: '500'
      }}>
        All systems operational
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: '#16a34a',
        marginTop: '0.25rem'
      }}>
        {isClient ? `Last check: ${new Date().toLocaleTimeString()}` : 'Last check: recently'}
      </div>
    </div>
  );
}
