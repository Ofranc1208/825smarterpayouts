// Disclaimer Section main orchestrator - under 50 lines per complexity rule
// Orchestrates all disclaimer subcomponents following enterprise patterns

'use client';

import { useState } from 'react';
import { DisclaimerTitle, DisclaimerText } from './disclaimer-content';
import { DisclaimerContainer } from './disclaimer-container';
import { settlementLawPageData } from '../../data';

export default function DisclaimerSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const disclaimer = settlementLawPageData.disclaimer;

  if (!disclaimer.isExpandable) {
    return (
      <DisclaimerContainer>
        <DisclaimerTitle />
        <DisclaimerText />
      </DisclaimerContainer>
    );
  }

  return (
    <section style={{
      background: 'white',
      padding: '0',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: 'pointer',
          padding: '0.875rem 1rem',
          background: isExpanded ? '#fef3c7' : '#fffbeb',
          borderBottom: isExpanded ? '1px solid #f59e0b' : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          <div style={{
            flex: 1,
            minWidth: 0
          }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#92400e',
              margin: 0,
              marginBottom: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.875rem' }}>⚠️</span>
              {disclaimer.title}
            </h3>
            {!isExpanded && disclaimer.shortText && (
              <p style={{
                margin: 0,
                color: '#78350f',
                fontSize: '0.75rem',
                lineHeight: '1.4'
              }}>
                {disclaimer.shortText}
              </p>
            )}
          </div>
          
          <div style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#92400e',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              display: 'inline-block'
            }}>
              ▼
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{
          padding: '0.875rem 1rem',
          background: '#fffbeb',
          borderTop: '1px solid #f59e0b'
        }}>
          <DisclaimerText />
        </div>
      )}
    </section>
  );
}
