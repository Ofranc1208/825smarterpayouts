'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Why Choose SmarterPayouts Section Component
 * 
 * Showcases the key benefits and features including:
 * - AI-Powered Calculator with Mint integration
 * - Court-Approved Process
 * - No Pressure Sales approach
 * - Statistics grid (400+ clients, $50M+, etc.)
 * - Interactive hover effects on all cards
 * 
 * @component WhyChooseSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function WhyChooseSection() {
  const router = useRouter();

  return (
    <section style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 16px'
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
          }}>Why Choose SmarterPayouts?</h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            fontWeight: '300',
            color: '#6c757d',
            lineHeight: '1.6'
          }}>Industry's first AI-powered self-quoting platform. Get instant quotes in seconds with Mint, our AI assistant.</p>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        <div 
            style={{
            textAlign: 'center',
            padding: '24px',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
              background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 90, 39, 0.15)';
              e.currentTarget.style.borderColor = '#09b44d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onClick={() => router.push('/pricing-calculator')}
          >
          <div style={{
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
                   width: 80, 
                   height: 80, 
                   background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                   boxShadow: '0 8px 16px rgba(9, 180, 77, 0.3)'
                 }}>
              <span style={{fontSize: '2rem'}} role="img" aria-label="Calculator">🧮</span>
            </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#2d5a27'
          }}>AI-Powered Calculator</h3>
          <p style={{
            color: '#6c757d',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>Get your quote in seconds with Mint, our AI assistant. No personal information required to see your settlement value.</p>
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
            transition: 'all 0.15s ease-in-out'
          }}>
              Try Calculator →
            </Link>
          </div>
        
          <div 
            style={{
            textAlign: 'center',
            padding: '24px',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
              background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 90, 39, 0.15)';
              e.currentTarget.style.borderColor = '#09b44d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onClick={() => router.push('/court-approval')}
          >
          <div style={{
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
                   width: 80, 
                   height: 80, 
                   background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                   boxShadow: '0 8px 16px rgba(9, 180, 77, 0.3)'
                 }}>
              <span style={{fontSize: '2rem'}} role="img" aria-label="Shield">🛡️</span>
            </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#2d5a27'
          }}>Court-Approved Process</h3>
          <p style={{
            color: '#6c757d',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>100% legal and regulated. We handle all court paperwork and approval requirements for you.</p>
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
            transition: 'all 0.15s ease-in-out'
          }}>
              Learn Process →
            </Link>
          </div>
        
          <div 
            style={{
            textAlign: 'center',
            padding: '24px',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
              background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 90, 39, 0.15)';
              e.currentTarget.style.borderColor = '#09b44d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onClick={() => router.push('/about')}
          >
          <div style={{
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
                   width: 80, 
                   height: 80, 
                   background: 'linear-gradient(135deg, #09b44d 0%, #087a35 100%)',
                   boxShadow: '0 8px 16px rgba(9, 180, 77, 0.3)'
                 }}>
              <span style={{fontSize: '2rem'}} role="img" aria-label="Handshake">🤝</span>
            </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#2d5a27'
          }}>No Pressure Sales</h3>
          <p style={{
            color: '#6c757d',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>Our team educates and informs — never pressures. You're in complete control of your decision.</p>
          <Link href="/about" style={{
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
            transition: 'all 0.15s ease-in-out'
          }}>
              Our Values →
            </Link>
        </div>
      </div>

              <div 
        style={{
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)',
          border: '2px solid #e0e0e0'
        }}
      >
        <div style={{position: 'relative'}}>
          <h3 style={{
            fontSize: '1.25rem',
            marginBottom: '8px',
            fontWeight: '700',
            color: '#2d5a27'
          }}>Join 400+ Happy Clients</h3>
          <p style={{
            marginBottom: '20px',
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>Since 2017, we've helped recipients access over $50M in early payouts.</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div 
              style={{
                padding: '12px 8px',
                borderRadius: '8px',
                background: 'white',
                border: '1px solid #e8f5e8',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(45, 90, 39, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 90, 39, 0.06)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/testimonials')}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#09b44d',
                marginBottom: '2px'
              }}>400+</div>
              <div style={{
                color: '#6c757d',
                fontSize: '0.75rem'
              }}>Happy Clients</div>
            </div>
            
            <div 
              style={{
                padding: '12px 8px',
                borderRadius: '8px',
                background: 'white',
                border: '1px solid #e8f5e8',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(45, 90, 39, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 90, 39, 0.06)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/about')}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#09b44d',
                marginBottom: '2px'
              }}>$50M+</div>
              <div style={{
                color: '#6c757d',
                fontSize: '0.75rem'
              }}>Payments Bought</div>
            </div>
            
            <div 
              style={{
                padding: '12px 8px',
                borderRadius: '8px',
                background: 'white',
                border: '1px solid #e8f5e8',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(45, 90, 39, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 90, 39, 0.06)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/how-fast-can-i-get-my-money')}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#09b44d',
                marginBottom: '2px'
              }}>35-55</div>
              <div style={{
                color: '#6c757d',
                fontSize: '0.75rem'
              }}>Days Average</div>
            </div>
            
            <div 
              style={{
                padding: '12px 8px',
                borderRadius: '8px',
                background: 'white',
                border: '1px solid #e8f5e8',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(45, 90, 39, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 90, 39, 0.06)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/credentials')}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#09b44d',
                marginBottom: '2px'
              }}>BBB</div>
              <div style={{
                color: '#6c757d',
                fontSize: '0.75rem'
              }}>Registered</div>
            </div>
          </div>
          
          <div style={{marginTop: '16px'}}>
            <Link href="/pricing-calculator" style={{
              display: 'inline-block',
              padding: '10px 20px',
              fontSize: '1rem',
              lineHeight: '1.5',
              borderRadius: '6px',
              textDecoration: 'none',
              cursor: 'pointer',
              color: '#fff',
              backgroundColor: '#198754',
              border: '1px solid #198754',
              fontWeight: '600',
              transition: 'all 0.15s ease-in-out'
            }}>
              Start Your Quote Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
