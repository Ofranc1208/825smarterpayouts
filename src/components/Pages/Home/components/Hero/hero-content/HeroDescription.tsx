'use client';

/**
 * Hero Description Component
 * 
 * Main value proposition text with two descriptive paragraphs.
 * 
 * @component HeroDescription
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HeroDescription() {
  return (
    <>
      <p style={{ 
        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
        color: '#f3f4f6',
        marginBottom: '1rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        lineHeight: '1.6'
      }}>
        No personal info needed. No sales calls. Just Instant Early Payout Offer.
      </p>

      <p style={{ 
        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
        color: '#f3f4f6', 
        marginTop: '0.5rem',
        marginBottom: '2rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        lineHeight: '1.6'
      }}>
        You're in control — Mint, our AI assistant, handles the rest.
      </p>
    </>
  );
}
