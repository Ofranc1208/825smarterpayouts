// Hero background wrapper component - under 50 lines per complexity rule
// Simple layout component matching State Laws styling

import { ReactNode } from 'react';

interface HeroBackgroundProps {
  children: ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      padding: "5rem 0 4rem",
      position: "relative",
      overflow: "hidden",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        textAlign: 'center'
      }}>
        {children}
      </div>
    </section>
  );
}
