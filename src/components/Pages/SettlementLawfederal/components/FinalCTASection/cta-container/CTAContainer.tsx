// Final CTA container wrapper - under 50 lines per complexity rule
// Green gradient background section

import { ReactNode } from 'react';

interface CTAContainerProps {
  children: ReactNode;
}

export default function CTAContainer({ children }: CTAContainerProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '4rem 0',
      textAlign: 'center',
      borderTop: '1px solid #e5e7eb'
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
