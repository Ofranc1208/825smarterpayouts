// Hero background wrapper component - under 50 lines per complexity rule
// Simple layout component

import { ReactNode } from 'react';

interface HeroBackgroundProps {
  children: ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '2.5rem 0',
      textAlign: 'center',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {children}
      </div>
    </section>
  );
}
