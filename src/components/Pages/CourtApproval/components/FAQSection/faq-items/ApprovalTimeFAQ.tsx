'use client';

import { useState } from 'react';
import { SITE_STATS } from '../../../../../../../app/config/siteConfig';

export default function ApprovalTimeFAQ() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      border: `1px solid ${isOpen ? '#22c55e' : '#e5e7eb'}`,
      boxShadow: isOpen ? '0 8px 24px rgba(34, 197, 94, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1.25rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: '#ffffff',
            borderRadius: '8px',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6875rem',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            ⏰
          </div>
          <span style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#047857'
          }}>
            How long does court approval take?
          </span>
        </div>
        <span style={{
          fontSize: '1rem',
          color: '#6b7280',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div style={{
          padding: '0 1.25rem 1.25rem 1.25rem',
          borderTop: '1px solid #e5e7eb',
          background: '#fafafa'
        }}>
          <p style={{
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0,
            fontSize: '0.875rem'
          }}>
            Most approvals are completed in 3–6 weeks, depending on your state and court schedule. Our average is <strong>{SITE_STATS.avgDays.value} days</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
