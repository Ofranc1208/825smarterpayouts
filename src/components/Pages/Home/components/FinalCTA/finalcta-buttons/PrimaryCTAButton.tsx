'use client';

import Link from 'next/link';

/**
 * Primary CTA Button Component
 * 
 * Displays the primary call-to-action button (Get Instant Quote).
 * 
 * @component PrimaryCTAButton
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function PrimaryCTAButton() {
  return (
    <Link 
      href="/mint-chat-active?type=calculate&source=home-final-cta" 
      style={{
        display: 'inline-block',
        padding: '12px 48px',
        fontSize: '1.25rem',
        lineHeight: '1.5',
        borderRadius: '8px',
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#000',
        backgroundColor: '#f8f9fa',
        border: '2px solid white',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        minWidth: '200px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,255,255,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      Get Instant Quote
    </Link>
  );
}
