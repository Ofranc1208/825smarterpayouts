'use client';

import React from 'react';

interface MonitorContainerProps {
  children: React.ReactNode;
}

/**
 * Monitor Container Component
 * 
 * Provides consistent styling and layout for the real-time monitor.
 * 
 * @component MonitorContainer
 */
export default function MonitorContainer({ children }: MonitorContainerProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {children}
      
      {/* CSS for pulse animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `
      }} />
    </div>
  );
}
