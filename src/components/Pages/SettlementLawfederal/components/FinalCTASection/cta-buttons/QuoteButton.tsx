// Final CTA quote button - under 50 lines per complexity rule
// Large quote button

import Link from 'next/link';

export default function QuoteButton() {
  return (
    <Link href="/mint-chat-active?type=calculate&source=federal-law-cta" style={{
      display: 'inline-block',
      background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '2rem',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.125rem',
      boxShadow: '0 4px 15px rgba(9, 180, 77, 0.3)'
    }}>
      💰 Get Your Instant Quote
    </Link>
  );
}
