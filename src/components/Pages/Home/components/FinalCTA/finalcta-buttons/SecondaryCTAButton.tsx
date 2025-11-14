'use client';

/**
 * Secondary CTA Button Component
 * 
 * Displays the secondary call-to-action button (Talk to Expert).
 * 
 * @component SecondaryCTAButton
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function SecondaryCTAButton() {
  return (
    <a 
      href="tel:+18552143510"
      style={{
        display: 'inline-block',
        padding: '12px 48px',
        fontSize: '1.25rem',
        lineHeight: '1.5',
        borderRadius: '8px',
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#f8f9fa',
        backgroundColor: 'transparent',
        border: '2px solid white',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        minWidth: '200px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      Talk to Expert
    </a>
  );
}
