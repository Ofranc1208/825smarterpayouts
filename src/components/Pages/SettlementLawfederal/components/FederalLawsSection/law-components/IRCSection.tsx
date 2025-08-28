// Reusable IRC section badge - under 50 lines per complexity rule
// Badge for IRC code sections

import { ReactNode } from 'react';

interface IRCSectionProps {
  code: string;
  children: ReactNode;
  color?: string;
}

export default function IRCSection({ code, children, color = '#059669' }: IRCSectionProps) {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      border: '1px solid #d1d5db'
    }}>
      <span style={{
        background: color,
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        display: 'inline-block'
      }}>
        {code}
      </span>
      <p style={{
        color: '#4b5563',
        lineHeight: '1.5',
        fontSize: '0.95rem',
        margin: '0'
      }}>
        {children}
      </p>
    </div>
  );
}
