// Reusable law title component - under 50 lines per complexity rule
// Standard h3 styling for law titles

import { ReactNode } from 'react';

interface LawTitleProps {
  children: ReactNode;
  icon?: string;
}

export default function LawTitle({ children, icon }: LawTitleProps) {
  return (
    <h3 style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </h3>
  );
}
