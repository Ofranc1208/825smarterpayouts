// Court approval container wrapper - under 50 lines per complexity rule
// Standard white section container

import { ReactNode } from 'react';

interface CourtContainerProps {
  children: ReactNode;
}

export default function CourtContainer({ children }: CourtContainerProps) {
  return (
    <section style={{
      background: 'white',
      padding: '2.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    }}>
      {children}
    </section>
  );
}
