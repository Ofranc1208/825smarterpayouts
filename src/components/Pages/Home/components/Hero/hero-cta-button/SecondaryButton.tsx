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
    <Link href="/mint-chat-active?type=calculate&source=home-hero-secondary" style={{
      fontWeight: '600',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      borderRadius: '24px',
      boxShadow: '0 4px 16px rgba(9, 180, 77, 0.3)',
      border: 'none',
      padding: '16px 32px',
      transition: 'all 0.2s ease',
      background: '#09b44d',
      color: '#fff',
      textDecoration: 'none',
      display: 'inline-block',
      minWidth: '250px'
    }}>
      Early Payout Calculator
    </Link>
  );
}
