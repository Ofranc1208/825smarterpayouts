'use client';

import Link from 'next/link';

export default function ReviewOffer() {
  return (
    <>
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
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.1)',
              textAlign: 'center'
            }}>
              {/* Privacy Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '1.5rem',
                border: '1px solid #a7f3d0'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🔒</span>
                <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.875rem' }}>100% PRIVATE & SECURE</span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                Review Your Offer with Complete Privacy
              </h1>
              
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.6"
              }}>
                Get a quote without sharing personal information. Our process is fully digital, confidential, and secure.
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
                  🔒 Get Your Instant Offer
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

              {/* Trust Indicators */}
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1rem'
              }}>
                ✅ No personal info required • 💻 100% digital • 🛡️ State compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Protection Steps */}
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
              How We Protect Your Privacy
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Your privacy and security are our top priorities throughout the entire process.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {/* Step 1 */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}>
                  🔒
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  No Personal Info Needed
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  Get your quote instantly—no SSN, no credit check, no sensitive data required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}>
                  💻
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  100% Digital & Secure
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  All quotes and documents are handled securely online. Your privacy is protected at every step.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}>
                  🛡️
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Confidential & Compliant
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  We never sell or rent your information. All processes are state and federally compliant.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}>
                  🧑‍💻
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  You Stay in Control
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  Only you decide what to share. We're here to help, not to pressure or collect unnecessary data.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Badge */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '1px solid #a7f3d0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              <span style={{ 
                color: '#059669', 
                fontWeight: '600', 
                fontSize: '1rem' 
              }}>
                100% State & Federal Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ 
        background: 'white', 
        padding: '48px 16px' 
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
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#059669',
                marginBottom: '1.5rem'
              }}>
                "
              </div>
              <blockquote style={{
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: '#374151',
                lineHeight: '1.6',
                marginBottom: '2rem',
                fontWeight: '400'
              }}>
                The SmarterPayouts team made the paperwork and process so easy. I felt safe and informed every step of the way!
              </blockquote>
              <div style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                — A. Johnson, California
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        background: '#f8fafc', 
        padding: '48px 16px' 
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
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Privacy & Security FAQ
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <details style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}>
                    Is the review process secure?
                  </summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    Yes. All documents are handled securely and digitally, with full compliance for your state.
                  </div>
                </details>
                
                <details style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}>
                    How long does it take to finalize?
                  </summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    Most reviews and signings are completed within a few days, depending on your state's requirements.
                  </div>
                </details>
                
                <details style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}>
                    Can I ask questions before signing?
                  </summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    Absolutely! Our team is here to answer any questions and make sure you're comfortable before you sign.
                  </div>
                </details>
              </div>

              <div style={{ 
                textAlign: 'center', 
                marginTop: '2rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
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
                  📖 Read All FAQs
                </Link>
                
                <Link href="/mint-intelligent-chat" style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block',
                  transition: 'all 0.2s ease'
                }}>
                  💬 Ask Mint AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
        padding: '48px 16px',
        textAlign: 'center'
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
              color: 'white',
              marginBottom: '1rem'
            }}>
              Ready to Get Your Private Quote?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Start your secure, private quote process now. No personal information required.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <Link href="/pricing-calculator" style={{
                background: 'white',
                color: '#059669',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                🔒 Get Your Instant Offer
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