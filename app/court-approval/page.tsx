import Link from 'next/link';
import { SITE_STATS } from '../config/siteConfig';

export const metadata = {
  title: 'Court Approved Structured Settlements | SmarterPayouts',
  description: 'Learn how the court approval process works for structured settlements. SmarterPayouts guides you through every step—compliant, secure, and stress-free.',
  keywords: 'court approved, structured settlement, legal process, judge, compliance, payout, SmarterPayouts',
  openGraph: {
    title: 'Court Approved Structured Settlements | SmarterPayouts',
    description: 'Learn how the court approval process works for structured settlements. SmarterPayouts guides you through every step—compliant, secure, and stress-free.',
    type: 'website'
  }
};

export default function CourtApproval() {
  return (
    <>
      {/* HERO SECTION */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "2rem 0 3rem",
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.1)'
            }}>
              <div style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#059669",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem"
              }}>
                Court Approved Process
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                🏛️ Court Approved Structured Settlements
              </h1>
              
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: "0 auto 2rem"
              }}>
                Every transaction is reviewed and approved by a judge. We make the process simple, transparent, and fully compliant with <strong>{SITE_STATS.compliance.value} compliance rate</strong>.
              </p>
              
              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                <Link href="/pricing-calculator" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                  minWidth: "200px",
                  textAlign: "center"
                }}>
                  💰 Get Your Instant Offer
                </Link>
                
                <Link href="/mint-intelligent-chat" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                  minWidth: "200px",
                  textAlign: "center"
                }}>
                  💬 Ask Mint AI
                </Link>
              </div>

              {/* Key Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  title={SITE_STATS.compliance.description}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>{SITE_STATS.compliance.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#065f46', marginTop: '0.25rem' }}>Legal Compliance Rate</div>
                  </div>
                </Link>
                
                <Link href={SITE_STATS.statesCovered.link} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  title={SITE_STATS.statesCovered.description}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>{SITE_STATS.statesCovered.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#065f46', marginTop: '0.25rem' }}>States We Serve</div>
                  </div>
                </Link>
                
                <Link href={SITE_STATS.avgDays.link} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  title={SITE_STATS.avgDays.description}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>{SITE_STATS.avgDays.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#065f46', marginTop: '0.25rem' }}>Average Process Days</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section style={{ 
        background: '#f8fafc', 
        padding: '48px 16px' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              How the Court Approval Process Works
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Our streamlined process ensures fast, compliant court approval with <strong>Mint AI guidance</strong> at every step.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            {/* Step 1 */}
            <div>
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #059669, #34d399)'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <div style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}>Step 1</div>
                <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>File the Petition</h5>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  Once you accept your offer, we file a legal petition with your state court to begin the approval process.
                </p>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 600 }}>
                    🤖 Mint helps prepare your paperwork
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div>
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4)'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍⚖️</div>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}>Step 2</div>
                <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Judge Reviews</h5>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  A judge reviews your paperwork, makes sure the offer is in your best interest, and ensures legal compliance.
                </p>
                <Link href="/structured-settlement-laws" style={{
                  textDecoration: 'none',
                  display: 'block',
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#eff6ff',
                  borderRadius: '12px',
                  border: '1px solid #bfdbfe',
                  color: '#2563eb',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}>
                  📚 Learn About Legal Requirements
                </Link>
              </div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #f59e0b, #eab308)'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}>Step 3</div>
                <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Court Hearing</h5>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  Some states require a brief hearing. You may join by phone, Zoom, or in person. We'll walk you through everything.
                </p>
                <Link href="/mint-intelligent-chat" style={{
                  textDecoration: 'none',
                  display: 'block',
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#fffbeb',
                  borderRadius: '12px',
                  border: '1px solid #fed7aa',
                  color: '#d97706',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}>
                  🤖 Practice with Mint AI
                </Link>
              </div>
            </div>
            
            {/* Step 4 */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                boxShadow: '0 12px 40px rgba(5, 150, 105, 0.15)',
                border: '2px solid #bbf7d0',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #059669, #34d399)'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <div style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}>Step 4</div>
                <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Approval & Funding</h5>
                <p style={{ color: '#065f46', lineHeight: 1.6 }}>
                  Once approved, your Early Payout is typically released within 5–7 business days. If requirements aren't met, it may take longer.
                </p>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 600 }}>
                    💰 Average: {SITE_STATS.avgDays.value} days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mint AI Support Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            margin: '3rem 0',
            textAlign: 'center',
            border: '1px solid #0ea5e9'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700,
              color: '#0369a1',
              marginBottom: '1rem'
            }}>
              💬 Get 24/7 Support from Mint AI
            </h3>
            <p style={{
              fontSize: '1.125rem',
              color: '#0c4a6e',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Have questions about the court process? Mint AI can help you understand requirements, prepare for hearings, and guide you through every step.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              justifyItems: 'center'
            }}>
              <Link href="/mint-intelligent-chat" style={{
                textDecoration: 'none',
                display: 'block',
                padding: '1rem',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #0ea5e9',
                color: '#0369a1',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '250px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗣️</div>
                <div style={{ fontWeight: 600 }}>Ask About Court Process</div>
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                textDecoration: 'none',
                display: 'block',
                padding: '1rem',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #0ea5e9',
                color: '#0369a1',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '250px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                <div style={{ fontWeight: 600 }}>Practice Hearing Prep</div>
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                textDecoration: 'none',
                display: 'block',
                padding: '1rem',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #0ea5e9',
                color: '#0369a1',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '250px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️</div>
                <div style={{ fontWeight: 600 }}>Learn Legal Requirements</div>
              </Link>
            </div>
          </div>

          {/* Compliance Badge */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
              <span style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                color: '#047857',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.125rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px solid #bbf7d0',
                boxShadow: '0 4px 20px rgba(5, 150, 105, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={SITE_STATS.compliance.description}>
                ✅ {SITE_STATS.compliance.value} State & Federal Compliant
              </span>
            </Link>
          </div>

          {/* Testimonial */}
          <div style={{
            maxWidth: '800px',
            margin: '3rem auto'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#ffffff',
                padding: '0 1rem',
                fontSize: '2rem'
              }}>💬</div>
              <blockquote style={{ margin: 0, paddingTop: '1rem' }}>
                <p style={{
                  fontSize: '1.125rem',
                  fontStyle: 'italic',
                  color: '#374151',
                  marginBottom: '1rem',
                  lineHeight: 1.6
                }}>
                  "I was nervous about the court process, but SmarterPayouts explained everything and made it easy. <strong>Mint AI even helped me practice what to say!</strong> The judge even commented on how well-prepared I was!"
                </p>
                <footer style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  fontWeight: 600
                }}>
                  — M. Lee, Florida
                </footer>
              </blockquote>
            </div>
          </div>
          
          {/* FAQ SECTION */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '3rem 2rem',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb',
            marginTop: '3rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                fontWeight: 700,
                color: '#047857',
                marginBottom: '1rem'
              }}>
                ❓ Court Approval FAQ
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Get instant answers from Mint AI or browse our most common questions below.
              </p>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '2rem',
                transition: 'all 0.2s ease'
              }}>
                💬 Ask Mint AI Instantly
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              <details style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <summary style={{
                  fontWeight: 700,
                  color: '#047857',
                  cursor: 'pointer',
                  fontSize: '1.125rem'
                }}>
                  🏛️ Do I have to appear in court?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  In some states, yes. You may be able to appear by phone or Zoom. We'll prepare you for what to expect, and <strong>Mint AI can help you practice</strong> what to say.
                </div>
              </details>
              
              <details style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <summary style={{
                  fontWeight: 700,
                  color: '#047857',
                  cursor: 'pointer',
                  fontSize: '1.125rem'
                }}>
                  ⏰ How long does court approval take?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  Most approvals are completed in 3–6 weeks, depending on your state and court schedule. Our average is <strong>{SITE_STATS.avgDays.value} days</strong>.
                </div>
              </details>
              
              <details style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <summary style={{
                  fontWeight: 700,
                  color: '#047857',
                  cursor: 'pointer',
                  fontSize: '1.125rem'
                }}>
                  ❓ What if the judge has questions?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  Our team will help you prepare and answer any questions. <strong>Mint AI offers 24/7 practice sessions</strong> to help you feel confident. The process is designed to protect you.
                </div>
              </details>
              
              <details style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <summary style={{
                  fontWeight: 700,
                  color: '#047857',
                  cursor: 'pointer',
                  fontSize: '1.125rem'
                }}>
                  📋 What documents do I need?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  We handle most paperwork for you. <strong>Mint AI can explain each document</strong> and help you gather any additional items your state requires.
                </div>
              </details>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/faqs" style={{
                background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                📚 View All Court Approval FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
        padding: '48px 16px',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Ready to Start Your Court-Approved Process?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Get your instant quote and let Mint AI guide you through every step of the court approval process.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <Link href="/pricing-calculator" style={{
                background: '#ffffff',
                color: '#047857',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                💰 Get Your Instant Offer
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                💬 Chat with Mint AI
              </Link>
            </div>
            
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                🤖 Need help? Our Mint AI is available 24/7 for instant guidance!
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}