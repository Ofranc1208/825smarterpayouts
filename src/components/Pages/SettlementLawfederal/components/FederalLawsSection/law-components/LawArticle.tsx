// Reusable law article wrapper - under 50 lines per complexity rule
// Container for individual law articles

import { ReactNode } from 'react';

interface LawArticleProps {
  children: ReactNode;
  isLast?: boolean;
}

export default function LawArticle({ children, isLast = false }: LawArticleProps) {
  return (
    <article style={{
      background: '#f8fafc',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginBottom: isLast ? '0' : '1.5rem',
      border: '1px solid #e2e8f0'
    }}>
      {children}
    </article>
  );
}
