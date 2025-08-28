// Disclaimer container wrapper - under 50 lines per complexity rule
// Yellow gradient background container

import { ReactNode } from 'react';

interface DisclaimerContainerProps {
  children: ReactNode;
}

export default function DisclaimerContainer({ children }: DisclaimerContainerProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 10%, #f59e0b 100%)',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      marginBottom: '2rem',
      border: '1px solid #f59e0b',
      boxShadow: '0 4px 6px rgba(245, 158, 11, 0.1)'
    }}>
      {children}
    </div>
  );
}
