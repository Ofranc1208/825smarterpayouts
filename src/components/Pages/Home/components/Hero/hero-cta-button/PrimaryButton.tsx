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
      fontSize: 'clamp(0.8rem, 2vw, 0.88rem)',
      borderRadius: '19px',
      boxShadow: '0 3px 13px rgba(251, 194, 51, 0.3)',
      border: 'none',
      padding: '13px 26px',
      transition: 'all 0.2s ease',
      background: '#fbc233',
      color: '#262626',
      textDecoration: 'none',
      display: 'inline-block',
      minWidth: '200px'
    }}>
      How Our Process Works
    </Link>
  );
}
