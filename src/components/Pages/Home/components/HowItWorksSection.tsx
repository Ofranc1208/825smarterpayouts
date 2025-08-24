'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * How It Works Section Component
 * 
 * Displays the 3-step process for using SmarterPayouts:
 * 1. Get Your Quote - Calculator with no personal info required
 * 2. Court Approval - Legal paperwork and approval process
 * 3. Get Your Cash - Receive money via direct deposit/check
 * 
 * Features interactive cards with hover effects and connection lines.
 * 
 * @component HowItWorksSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HowItWorksSection() {
  const router = useRouter();

  return (
    <section style={{
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '24px',
              color: '#2d5a27'
            }}>How It Works</h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
              fontWeight: '300',
              color: '#6c757d',
              lineHeight: '1.6'
            }}>Get your cash in 3 simple steps — all handled digitally with full transparency.</p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          position: 'relative'
        }}>
          {/* Subtle Connection Lines for Desktop */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '75%',
            height: '1px',
            zIndex: 1,
            background: 'linear-gradient(90deg, transparent 0%, #e0e0e0 20%, #e0e0e0 80%, transparent 100%)'
          }} className="d-none d-md-block"></div>
          
          <div style={{position: 'relative', zIndex: 2}}>
            <div 
              style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid #e8f5e8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/pricing-calculator')}
            >
              <div style={{position: 'relative'}}>
                <div 
                  style={{
                    borderRadius: '50%',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    position: 'relative',
                    width: 70, 
                    height: 70,
                    background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                    boxShadow: '0 4px 12px rgba(9, 180, 77, 0.2)'
                  }}
                >
                  <span style={{fontWeight: '700', fontSize: '1.25rem'}}>1</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#2d5a27'
                }}>Get Your Quote</h3>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>Use our calculator to see what your settlement is worth. No phone calls or personal data required.</p>
                <Link href="/pricing-calculator" style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: '#198754',
                  backgroundColor: 'transparent',
                  border: '1px solid #198754',
                  fontWeight: '700',
                  transition: 'all 0.15s ease-in-out'
                }}>
                  Try Calculator →
                </Link>
              </div>
            </div>
          </div>
          
          <div style={{position: 'relative', zIndex: 2}}>
            <div 
              style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid #e8f5e8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/court-approval')}
            >
              <div style={{position: 'relative'}}>
                <div 
                  style={{
                    borderRadius: '50%',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    position: 'relative',
                    width: 70, 
                    height: 70,
                    background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                    boxShadow: '0 4px 12px rgba(9, 180, 77, 0.2)'
                  }}
                >
                  <span style={{fontWeight: '700', fontSize: '1.25rem'}}>2</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#2d5a27'
                }}>Court Approval</h3>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>We handle all legal paperwork and court approval. Most cases approved within 30 days.</p>
                <Link href="/court-approval" style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: '#198754',
                  backgroundColor: 'transparent',
                  border: '1px solid #198754',
                  fontWeight: '700',
                  transition: 'all 0.15s ease-in-out'
                }}>
                  Learn Process →
                </Link>
              </div>
            </div>
          </div>
          
          <div style={{position: 'relative', zIndex: 2}}>
            <div 
              style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid #e8f5e8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/get-your-cash')}
            >
              <div style={{position: 'relative'}}>
                <div 
                  style={{
                    borderRadius: '50%',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    position: 'relative',
                    width: 70, 
                    height: 70,
                    background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                    boxShadow: '0 4px 12px rgba(9, 180, 77, 0.2)'
                  }}
                >
                  <span style={{fontWeight: '700', fontSize: '1.25rem'}}>3</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#2d5a27'
                }}>Get Your Cash</h3>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>Receive your money in 24-72 hours after approval via direct deposit, check, or secure transfer.</p>
                <Link href="/get-your-cash" style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: '#198754',
                  backgroundColor: 'transparent',
                  border: '1px solid #198754',
                  fontWeight: '700',
                  transition: 'all 0.15s ease-in-out'
                }}>
                  Payout Options →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
