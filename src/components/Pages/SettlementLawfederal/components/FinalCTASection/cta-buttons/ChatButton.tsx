// Final CTA chat button - under 50 lines per complexity rule
// Large chat button

import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      display: 'inline-block',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '2rem',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.125rem',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
    }}>
      💬 Chat with Mint AI
    </Link>
  );
}
