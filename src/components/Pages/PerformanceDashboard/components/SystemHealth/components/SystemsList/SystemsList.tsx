'use client';

import React from 'react';
import { SystemItem } from '../SystemItem';

interface SystemsListProps {
  health: {
    server: 'healthy' | 'warning' | 'critical';
    database: 'healthy' | 'warning' | 'critical';
    cdn: 'healthy' | 'warning' | 'critical';
    api: 'healthy' | 'warning' | 'critical';
  };
}

/**
 * Systems List Component
 * 
 * Displays list of all system health statuses.
 * 
 * @component SystemsList
 */
export default function SystemsList({ health }: SystemsListProps) {
  const systems = [
    { name: 'Server', status: health.server },
    { name: 'Database', status: health.database },
    { name: 'CDN', status: health.cdn },
    { name: 'API', status: health.api }
  ];

  return (
    <div style={{
      display: 'grid',
      gap: '0.75rem'
    }}>
      {systems.map((system) => (
        <SystemItem
          key={system.name}
          name={system.name}
          status={system.status}
        />
      ))}
    </div>
  );
}
