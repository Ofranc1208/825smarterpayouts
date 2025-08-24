import Link from 'next/link';
import Image from 'next/image';
import { SITE_STATS } from '../config/siteConfig';

export const metadata = {
  title: 'Get Instant Structured Settlement Quote | No Personal Info Required | SmarterPayouts',
  description: 'Get your free structured settlement quote in 60 seconds. No personal information, no credit checks, no pressure. AI-powered calculator provides instant accurate offers.',
  keywords: 'structured settlement quote, instant quote, no personal info, free quote, settlement calculator, cash offer, no credit check',
  openGraph: {
    title: 'Get Instant Structured Settlement Quote | No Personal Info Required',
    description: 'Get your free structured settlement quote in 60 seconds. No personal information, no credit checks, no pressure.',
    type: 'article',
    url: 'https://smarterpayouts.com/get-a-quote',
  }
};

export default function GetAQuote() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Modern Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "2rem 0 3rem",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              maxWidth: '1000px',
              width: '100%'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#059669",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "1rem",
                  textAlign: "center"
                }}>
                  Instant Quotes
                </div>
                
                <h1 style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "1.5rem",
                  lineHeight: "1.2"
                }}>
                  Get Your Free Settlement Quote
                </h1>
                
                <p style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  maxWidth: "600px",
                  margin: "0 auto 2rem",
                  lineHeight: "1.6"
                }}>
                  Get a <strong>free, no-obligation cash offer</strong> in 60 seconds. No personal information, no credit checks, no pressure. Just instant, accurate quotes.
                </p>

                <div style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "2rem"
                }}>
                  <Link href="/pricing-calculator" style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}>
                    💰 Get Your Instant Quote
                  </Link>
                  
                  <Link href="/mint-intelligent-chat" style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}>
                    💬 Chat with Mint AI
                  </Link>
                </div>

                {/* Simple Benefits */}
                <div style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginBottom: "1rem"
                }}>
                  ✅ No personal info required • ⚡ 60 second results • 🚫 No pressure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ 
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
              Choose Your Quote Method
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Two simple ways to get your quote. Both are fast, secure, and pressure-free.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* AI Calculator Option */}
            <Link href="/pricing-calculator" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                border: '1px solid #bbf7d0',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>🤖</div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.75rem'
                }}>AI Calculator</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.5',
                  fontSize: '0.875rem'
                }}>
                  Instant quote in 60 seconds. No personal info required.
                </p>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  ⚡ Recommended • 24/7 Available
                </div>
              </div>
            </Link>

            {/* Human Expert Option */}
            <a href="tel:+19547649750" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                border: '1px solid #fbbf24',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>👨‍💼</div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.75rem'
                }}>Talk to Expert</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.5',
                  fontSize: '0.875rem'
                }}>
                  Speak with our team for personalized guidance. No pressure.
                </p>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#d97706',
                  fontWeight: '600'
                }}>
                  📞 (954) 764-9750
                </div>
              </div>
            </a>
          </div>

          {/* Simple help text */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            borderRadius: '12px',
            border: '1px solid #bbf7d0'
          }}>
            <p style={{ 
              margin: 0, 
              color: '#059669', 
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              🤖 Need help choosing? <Link href="/mint-intelligent-chat" style={{ color: '#059669', fontWeight: 600, textDecoration: 'none' }}>Ask Mint AI for guidance</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        padding: '48px 16px', 
        background: '#ffffff' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
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
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                ❓ Frequently Asked Questions
              </h2>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💬 Ask Mint AI
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  question: "Do I need to provide personal information?",
                  answer: "No. Our AI calculator and phone quotes do not require sensitive personal information, social security numbers, or credit checks. Just payment details."
                },
                {
                  question: "How fast will I get my quote?",
                  answer: "AI calculator quotes are instant (60 seconds). Phone quotes are provided during your call. Both are equally accurate and reliable."
                },
                {
                  question: "Is there any obligation or pressure?",
                  answer: "Never. All quotes are completely free, confidential, and come with zero obligation or sales pressure. You're in control of your decision."
                },
                {
                  question: "What if I have a unique or complex situation?",
                  answer: "Our AI handles most complex cases instantly. For unique situations, our human experts can walk you through specialized options step by step."
                },
                {
                  question: "How accurate are the quotes?",
                  answer: "Our AI-powered quotes are based on real market data and current rates. They're as accurate as quotes from traditional companies, often more so."
                }
              ].map((faq, index) => (
                <details key={index} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>{faq.question}</summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    fontSize: '0.875rem'
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
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                📖 View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.5rem'
              }}>
                Ready to Get Your Free Quote?
              </h2>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: '2.5rem',
                opacity: 0.9,
                lineHeight: '1.6'
              }}>
                Join thousands who've discovered their settlement's true value. No personal information required, no pressure, just answers.
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
                  color: '#059669',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease'
                }}>
                  🤖 Use AI Calculator
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
                  transition: 'all 0.2s ease'
                }}>
                  💬 Chat with Mint AI
                </Link>
                <a href="tel:+19547649750" style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease'
                }}>
                  📞 Call (954) 764-9750
                </a>
              </div>
              
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                display: 'inline-block'
              }}>
                <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  🤖 Still have questions? Our Mint AI is available 24/7 for instant help!
                </span>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}
