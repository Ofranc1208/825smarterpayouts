'use client';

import React from 'react';

/**
 * Page Grid Header Component
 * 
 * Displays header with title and description for the page performance grid.
 * 
 * @component PageGridHeader
 */
export default function PageGridHeader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    }}>
      <div>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 0.25rem 0'
        }}>
          Page Performance
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: '0'
        }}>
          Click on a page to view detailed metrics
        </p>
      </div>
    </div>
  );
}
