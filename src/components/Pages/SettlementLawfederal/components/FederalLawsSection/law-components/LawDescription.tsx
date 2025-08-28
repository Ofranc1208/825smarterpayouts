// Reusable law description component - under 50 lines per complexity rule
// Standard paragraph styling for law descriptions

import { ReactNode } from 'react';

interface LawDescriptionProps {
  children: ReactNode;
  marginBottom?: string;
}

export default function LawDescription({ children, marginBottom = '1rem' }: LawDescriptionProps) {
  return (
    <p style={{
      color: '#4b5563',
      lineHeight: '1.6',
      marginBottom,
      margin: marginBottom === '0' ? '0' : `0 0 ${marginBottom} 0`
    }}>
      {children}
    </p>
  );
}
