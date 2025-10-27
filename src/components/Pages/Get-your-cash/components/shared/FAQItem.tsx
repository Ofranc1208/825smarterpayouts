/**
 * FAQ Item Component
 *
 * Modern collapsible FAQ component using React state
 */

'use client';

import React, { useState } from 'react';
import { FAQ } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isOpen ? '#22c55e' : '#e5e7eb'}`,
      boxShadow: isOpen ? '0 6px 20px rgba(34, 197, 94, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1rem',
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
        <span style={{
          fontSize: '0.9375rem',
          fontWeight: '600',
          color: '#047857'
        }}>
          {faq.question}
        </span>
        <span style={{
          fontSize: '0.875rem',
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
          padding: '0 1rem 1rem 1rem',
          borderTop: '1px solid #e5e7eb',
          background: '#fafafa'
        }}>
          <p style={{
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0,
            fontSize: '0.875rem'
          }}>
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

