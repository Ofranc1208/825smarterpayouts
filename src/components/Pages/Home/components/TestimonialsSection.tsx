'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Testimonials Preview Section Component
 * 
 * Displays customer testimonials including:
 * - Three featured testimonials with star ratings
 * - Customer names and locations
 * - Interactive hover effects
 * - Link to full testimonials page
 * - Responsive grid layout
 * 
 * @component TestimonialsSection
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function TestimonialsSection() {
  const router = useRouter();

  return (
    <section style={{
      padding: '48px 16px',
      backgroundColor: 'white'
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
            }}>What Our Clients Say</h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
              fontWeight: '300',
              color: '#6c757d',
              lineHeight: '1.6'
            }}>Real feedback from real people who chose SmarterPayouts.</p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div 
              style={{
                              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e8f5e8'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/testimonials')}
            >
            <div style={{
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{marginBottom: '16px'}}>
                  {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{
                    color: '#ffc107',
                    fontSize: '1.25rem'
                  }}>★</span>
                  ))}
                </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>"SmarterPayouts gave me an instant quote online with zero hassle. The process was transparent and I felt in control the entire time."</p>
              <footer style={{color: '#6c757d'}}>
                  <strong style={{color: '#2d5a27'}}>Nat Reynolds</strong><br />
                  <small>Denver, CO</small>
                </footer>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '16px'
              }}>
                  <span style={{fontSize: '2rem', opacity: 0.1, color: '#09b44d'}}>"</span>
                </div>
              </div>
            </div>
          
            <div 
              style={{
                              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e8f5e8'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/testimonials')}
            >
            <div style={{
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{marginBottom: '16px'}}>
                  {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{
                    color: '#ffc107',
                    fontSize: '1.25rem'
                  }}>★</span>
                  ))}
                </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>"I loved how easy it was to get a quote without any phone calls or pressure. Everything was clear, fast, and transparent."</p>
              <footer style={{color: '#6c757d'}}>
                  <strong style={{color: '#2d5a27'}}>Celia Almeda</strong><br />
                  <small>Austin, TX</small>
                </footer>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '16px'
              }}>
                  <span style={{fontSize: '2rem', opacity: 0.1, color: '#09b44d'}}>"</span>
                </div>
              </div>
            </div>
          
            <div 
              style={{
                              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e8f5e8'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.12)';
                e.currentTarget.style.borderColor = '#09b44d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e8f5e8';
              }}
              onClick={() => router.push('/testimonials')}
            >
            <div style={{
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{marginBottom: '16px'}}>
                  {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{
                    color: '#ffc107',
                    fontSize: '1.25rem'
                  }}>★</span>
                  ))}
                </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>"The online process was simple and transparent. I appreciated the honest pricing and no hidden fees."</p>
              <footer style={{color: '#6c757d'}}>
                  <strong style={{color: '#2d5a27'}}>Roberto García</strong><br />
                  <small>Miami, FL</small>
                </footer>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '16px'
              }}>
                  <span style={{fontSize: '2rem', opacity: 0.1, color: '#09b44d'}}>"</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '48px'
        }}>
          <Link href="/testimonials" style={{
            display: 'inline-block',
            padding: '12px 48px',
            fontSize: '1.25rem',
            lineHeight: '1.5',
            borderRadius: '8px',
            textDecoration: 'none',
            cursor: 'pointer',
            color: '#198754',
            backgroundColor: 'transparent',
            border: '1px solid #198754',
            fontWeight: '700',
            transition: 'all 0.15s ease-in-out'
          }}>
            Read More Reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}
