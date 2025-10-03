// Attorney disclaimer section - now modular and under 50 lines
// Orchestrates all disclaimer subcomponents following enterprise patterns
// Now collapsible for cleaner UI

'use client';
import { useState } from 'react';
import { DisclaimerText } from '../disclaimer-content';
import { DisclaimerContainer } from '../disclaimer-container';

export default function DisclaimerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DisclaimerContainer>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isOpen ? '0.5rem' : '0'
        }}
      >
        <h3 style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          margin: 0
        }}>
          ⚖️ Attorney Disclaimer
        </h3>
        <span style={{
          fontSize: '0.75rem',
          color: '#dc2626',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </div>
      {isOpen && <DisclaimerText />}
    </DisclaimerContainer>
  );
}