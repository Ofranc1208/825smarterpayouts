'use client';

import Link from 'next/link';

/**
 * Primary CTA Button Component
 * 
 * Main call-to-action button for "How Our Process Works".
 * 
 * @component PrimaryButton
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function PrimaryButton() {
  return (
    <Link href="/main" style={{
      fontWeight: '600',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      borderRadius: '24px',
      boxShadow: '0 4px 16px rgba(251, 194, 51, 0.3)',
      border: 'none',
      padding: '16px 32px',
      transition: 'all 0.2s ease',
      background: '#fbc233',
      color: '#262626',
      textDecoration: 'none',
      display: 'inline-block',
      minWidth: '250px'
    }}>
      How Our Process Works
    </Link>
  );
}
