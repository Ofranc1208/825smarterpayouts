import Link from 'next/link';
import { SITE_STATS } from '../config/siteConfig';

export const metadata = {
  title: 'Get Your Cash Your Way | Choose Your Payment Method | SmarterPayouts',
  description: 'Choose how you receive your structured settlement funds. Direct deposit, certified check, or in-person delivery. Fast, secure, and always on your terms.',
  keywords: 'payment methods, direct deposit, structured settlement payout, fast cash, secure payment, certified check',
  openGraph: {
    title: 'Get Your Cash Your Way | Choose Your Payment Method | SmarterPayouts',
    description: 'Choose how you receive your structured settlement funds. Fast, secure, and always on your terms.',
    type: 'article',
    url: 'https://smarterpayouts.com/get-your-cash',
  }
};

export default function GetYourCash() {
  return (
    <>
      {/* Hero Section */}
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
                Get Your Cash Your Way
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                💰 Get Your Cash — Your Way
              </h1>
              
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: "0 auto 2rem"
              }}>
                Choose how you want to receive your structured settlement funds. Fast, secure, and always on your terms.
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
                  🚀 Get Your Instant Offer
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

              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem',
                marginTop: '1.5rem'
              }}>
                <a href="#payment-methods" style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem 0.75rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '10px',
                    border: '1px solid #bbf7d0',
                    textAlign: 'center',
                    height: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
                    }
                  }}
                  title="Click to see payment timing details">
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857', lineHeight: '1' }}>24-72h</div>
                    <div style={{ fontSize: '0.75rem', color: '#065f46', marginTop: '0.25rem', fontWeight: '500' }}>Payment Speed</div>
                  </div>
                </a>
                
                <a href="#payment-methods" style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem 0.75rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '10px',
                    border: '1px solid #bbf7d0',
                    textAlign: 'center',
                    height: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
                    }
                  }}
                  title="Click to explore all payment options">
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857', lineHeight: '1' }}>3</div>
                    <div style={{ fontSize: '0.75rem', color: '#065f46', marginTop: '0.25rem', fontWeight: '500' }}>Payment Methods</div>
                  </div>
                </a>
              </div>

              {/* Centered Compliance Badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1.5rem'
              }}>
                <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '25px',
                    border: '2px solid #bbf7d0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    ':hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
                    }
                  }}
                  title={SITE_STATS.compliance.description}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#047857', lineHeight: '1' }}>{SITE_STATS.compliance.value}</div>
                    <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: '500' }}>State & Federal Compliant</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section id="payment-methods" style={{ 
        padding: '48px 16px', 
        background: '#f8fafc' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Choose Your Perfect Payment Method
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              We offer three secure ways to receive your funds. Pick what works best for your lifestyle and needs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {/* Direct Deposit */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                height: '100%',
                border: '2px solid #bbf7d0',
                textAlign: 'center',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  ⚡ FASTEST
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 1.5rem'
                }}>🏦</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#047857',
                  marginBottom: '1rem'
                }}>Direct Deposit</h3>
                <p style={{
                  color: '#065f46',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  Fill out a secure direct deposit form via DocuSign. This is the fastest and most secure option.
                </p>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#059669' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 500 }}>Same-day processing available</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#059669' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 500 }}>Bank-level security</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#059669' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 500 }}>No delivery delays</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certified Check */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                height: '100%',
                border: '2px solid #fbbf24',
                textAlign: 'center',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  📮 SECURE
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 1.5rem'
                }}>📧</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#d97706',
                  marginBottom: '1rem'
                }}>Certified Check</h3>
                <p style={{
                  color: '#92400e',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  Prefer a physical check? We can mail it directly to your home address for your convenience.
                </p>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f59e0b' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: 500 }}>Overnight mail option</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f59e0b' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: 500 }}>Certified & tracked</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#f59e0b' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: 500 }}>Physical document</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Person Delivery */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                height: '100%',
                border: '2px solid #93c5fd',
                textAlign: 'center',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  🤝 PERSONAL
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 1.5rem'
                }}>🤝</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  marginBottom: '1rem'
                }}>In-Person Delivery</h3>
                <p style={{
                  color: '#1e40af',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  Available in select areas for large amounts. Our funding partner can arrange personal delivery—just ask if you prefer this option.
                </p>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#3b82f6' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 500 }}>Face-to-face delivery</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#3b82f6' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 500 }}>Select markets only</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#3b82f6' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 500 }}>Large amounts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mint AI Help Section */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid #93c5fd',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: '#1d4ed8',
              marginBottom: '1rem'
            }}>🤖 Need Help Choosing?</h3>
            <p style={{
              color: '#1e40af',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 1.5rem'
            }}>
              Not sure which payment method is right for you? Mint AI can analyze your situation, timeline needs, and preferences to recommend the perfect option. Get personalized advice in seconds!
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
              transition: 'all 0.2s ease'
            }}>
              💡 Get My Payment Recommendation
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance & Social Proof Section */}
      <section style={{ 
        padding: '48px 16px', 
        background: '#ffffff' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Compliance Badge */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                border: '2px solid #bbf7d0',
                borderRadius: '50px',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#047857',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              title={SITE_STATS.compliance.description}>
                <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>✅</span>
                {SITE_STATS.compliance.value} State & Federal Compliant
              </div>
            </Link>
          </div>

          {/* Testimonial */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#e2e8f0',
                position: 'absolute',
                top: '1rem',
                left: '2rem'
              }}>"</div>
              <p style={{
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: '#1e293b',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1
              }}>
                I got my money fast and exactly how I wanted it. SmarterPayouts made everything easy and stress-free! 
                <strong> Mint AI even helped me choose the best payment method for my situation.</strong>
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.125rem'
                }}>S</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>S. Patel</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Georgia • Direct Deposit</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid #bbf7d0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 700,
                color: '#047857',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                ❓ Getting Your Cash FAQ
              </h2>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💬 Ask Mint AI Instantly
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  question: "How fast will I get my money?",
                  answer: "Most payments are released within 24-72 hours after court approval. Direct deposit is typically fastest, while checks may take 1-2 additional business days."
                },
                {
                  question: "Can I choose my payment method?",
                  answer: "Absolutely! Choose direct deposit, certified check, or in-person delivery (select areas)—whatever works best for your needs and timeline."
                },
                {
                  question: "Are there any fees or delays?",
                  answer: "No hidden fees or unnecessary delays. We pride ourselves on transparency and speed. All costs are clearly disclosed upfront."
                },
                {
                  question: "What documents do I need for payment setup?",
                  answer: "For direct deposit: banking information and ID. For checks: mailing address and ID. For in-person: ID and scheduling coordination."
                }
              ].map((faq, index) => (
                <details key={index} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: 600,
                    color: '#047857',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}>{faq.question}</summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#065f46',
                    lineHeight: 1.6,
                    fontSize: '0.95rem'
                  }}>{faq.answer}</div>
                </details>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/faqs" style={{
                background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                📖 Read All FAQs
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
              marginBottom: '1.5rem'
            }}>
              Ready to Get Your Cash Your Way?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Get your instant offer now and choose exactly how you want to receive your funds. Fast, secure, and always on your terms.
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