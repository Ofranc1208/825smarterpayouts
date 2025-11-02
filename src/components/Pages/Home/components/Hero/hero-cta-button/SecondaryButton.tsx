'use client';

import Link from 'next/link';

/**
 * Secondary CTA Button Component
 * 
 * Secondary call-to-action button for "Early Payout Calculator".
 * 
 * @component SecondaryButton
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function SecondaryButton() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      fontWeight: '600',
      fontSize: 'clamp(0.8rem, 2vw, 0.88rem)',
      borderRadius: '19px',
      boxShadow: '0 3px 13px rgba(9, 180, 77, 0.3)',
      border: 'none',
      padding: '13px 26px',
      transition: 'all 0.2s ease',
      background: '#09b44d',
      color: '#fff',
      textDecoration: 'none',
      display: 'inline-block',
      minWidth: '200px'
    }}>
      Early Payout Calculator
    </Link>
  );
}
