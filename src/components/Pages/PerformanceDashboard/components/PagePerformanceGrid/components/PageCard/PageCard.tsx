'use client';

import React, { useState, useEffect } from 'react';

interface PageData {
  id: string;
  name: string;
  icon: string;
  metrics: {
    visitors: number;
    bounceRate: number;
    pageViews: number;
    avgSessionDuration: number;
  };
  status: 'good' | 'needs-improvement' | 'poor';
  lastUpdated: Date;
}

interface PageCardProps {
  page: PageData;
  isSelected: boolean;
  onSelect: () => void;
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

/**
 * Page Card Component
 * 
 * Displays individual page performance metrics in a card format.
 * 
 * @component PageCard
 */
export default function PageCard({ page, isSelected, onSelect, isLoading }: PageCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#f3f4f6',
            borderRadius: '0.5rem',
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
              height: '0.75rem',
              background: '#f3f4f6',
              borderRadius: '0.25rem',
              width: '60%',
              animation: 'pulse 2s infinite'
            }} />
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} style={{
              height: '3rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              animation: 'pulse 2s infinite'
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            fontSize: '1.5rem',
            background: `linear-gradient(135deg, ${getStatusColor(page.status)}20 0%, ${getStatusColor(page.status)}10 100%)`,
            borderRadius: '0.5rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {page.icon}
          </div>
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 0.25rem 0'
            }}>
              {page.name}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: getStatusColor(page.status)
              }} />
              <span style={{
                fontSize: '0.75rem',
                color: getStatusColor(page.status),
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {typeof page.status === 'string' ? page.status.replace('-', ' ') : page.status || 'unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            {page.metrics.pageViews || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Page Views</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            {page.metrics.avgSessionDuration || 0}s
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Avg Session</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            {typeof page.metrics.visitors === 'number' ? page.metrics.visitors.toLocaleString() : page.metrics.visitors || '0'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Visitors</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            {page.metrics.bounceRate}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Bounce</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        fontSize: '0.75rem',
        color: '#9ca3af',
        textAlign: 'center'
      }}>
        {isClient ? `Updated ${page.lastUpdated.toLocaleTimeString()}` : 'Updated recently'}
      </div>
    </div>
  );
}
