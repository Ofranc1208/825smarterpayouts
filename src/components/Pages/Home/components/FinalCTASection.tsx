import Link from 'next/link';

/**
 * Final Call-to-Action Section Component
 * 
 * The closing section of the homepage featuring:
 * - Compelling headline and description
 * - Primary CTA buttons for instant quote and expert consultation
 * - Trust indicators (security, BBB accredited, Florida licensed)
 * - Gradient background with interactive hover effects
 * - Responsive design with proper spacing
 * 
 * @component FinalCTASection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function FinalCTASection() {
  return (
    <section style={{
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #2d5a27 0%, #09b44d 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '24px',
              color: 'white'
            }}>Ready to Access Your Cash?</h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              See what your structured settlement is worth today. No obligations, no personal information required.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              <Link 
                href="/pricing-calculator" 
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
              <Link 
                href="/contact" 
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
                Speak with Expert
              </Link>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.875rem'
            }}>
              <span role="img" aria-label="Shield">🛡️</span> 100% secure and confidential • 
              <Link href="/credentials" style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '4px',
                marginRight: '4px'
              }}>BBB Accredited</Link> • 
              <Link href="/credentials" style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '4px'
              }}>Florida Licensed</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
