import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SmarterPayouts',
  description: 'Learn how SmarterPayouts protects your privacy and handles your information. Transparent, secure, and user-focused policies.',
  keywords: 'privacy policy, data protection, information security, user privacy, GDPR compliance, data handling',
  openGraph: {
    title: 'Privacy Policy | SmarterPayouts',
    description: 'Learn how SmarterPayouts protects your privacy and handles your information. Transparent, secure, and user-focused policies.',
    type: 'article',
    url: 'https://smarterpayouts.com/privacy',
  }
};

export default function Privacy() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "2rem 0 3rem",
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
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
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
                <span style={{ fontSize: '1.25rem' }}>🛡️</span>
                <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.875rem' }}>PRIVACY PROTECTION</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: '700',
                color: '#1f2937',
                lineHeight: '1.2',
                marginBottom: '1rem'
              }}>
                Your Privacy Matters
              </h1>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                Transparent, secure, and user-focused policies that protect your information at every step.
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
                  💰 Get Your Quote
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

              {/* Privacy Highlights */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: '#059669'
              }}>
                <span>🔒 Never Sold</span>
                <span>•</span>
                <span>🛡️ Secure Storage</span>
                <span>•</span>
                <span>✅ Your Control</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ 
        background: 'white', 
        padding: '48px 16px' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Our Commitment to Your Privacy
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                SmarterPayouts is committed to protecting your privacy and ensuring your personal information is handled securely and transparently.
              </p>
            </div>
            
            {/* Privacy Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Information We Collect */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>📝</span>
                  Information We Collect
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Information you provide:</strong> Name, email, and details you submit via forms or calculators.
                  </li>
                  <li>
                    <strong>Automatic data:</strong> IP address, browser type, device info, and usage data collected via cookies and analytics tools.
                  </li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>🎯</span>
                  How We Use Your Information
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>To provide quotes, respond to inquiries, and deliver services you request.</li>
                  <li style={{ marginBottom: '0.5rem' }}>To improve our website, user experience, and customer support.</li>
                  <li>To comply with legal obligations and prevent fraud.</li>
                </ul>
              </div>

              {/* How We Protect Your Data */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>🔐</span>
                  How We Protect Your Data
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>We use industry-standard encryption and security measures.</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>We never sell or rent your personal information.</strong></li>
                  <li>Access to your data is limited to authorized team members only.</li>
                </ul>
              </div>

              {/* Cookies & Analytics */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>🍪</span>
                  Cookies & Analytics
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We use cookies and analytics tools (like Google Analytics) to understand how visitors use our site. You can control cookie preferences in your browser settings.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>⚖️</span>
                  Your Rights
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>You can request, update, or delete your personal information at any time.</li>
                  <li>
                    Contact us at <a href="mailto:support@smarterpayouts.com" style={{ color: '#059669', fontWeight: '600' }}>support@smarterpayouts.com</a> for privacy requests.
                  </li>
                </ul>
              </div>

              {/* Policy Updates */}
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    background: '#ecfdf5', 
                    borderRadius: '8px', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>🔄</span>
                  Policy Updates
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We may update this policy from time to time. Changes will be posted on this page with a new effective date.
                </p>
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
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Privacy FAQ
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
                  Do you sell my information?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  <strong>No.</strong> We never sell or rent your personal information to third parties. This is a core commitment of our privacy policy.
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
                  How can I update or delete my data?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Email us at <a href="mailto:support@smarterpayouts.com" style={{ color: '#059669', fontWeight: '600' }}>support@smarterpayouts.com</a> and we'll help you with your request. We respond to all privacy requests within 24-48 hours.
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
                  Are my quotes confidential?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Yes. All quotes and communications are handled securely and confidentially. Your payment information is never shared without your explicit consent.
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
                  How do you protect my data from breaches?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  We use industry-standard SSL encryption, secure servers, and regularly update our security protocols. All sensitive data is encrypted both in transit and at rest.
                </div>
              </details>
            </div>

            {/* Mint AI Help Section */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '12px',
              border: '1px solid #93c5fd',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#2563eb',
                fontWeight: '700',
                fontSize: '1.125rem',
                marginBottom: '0.5rem'
              }}>
                🤖 Have Privacy Questions?
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1rem',
                fontSize: '0.95rem'
              }}>
                Mint AI can instantly answer questions about our privacy practices, data handling, and your rights.
              </p>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                💬 Chat with Mint AI
              </Link>
            </div>

            {/* Privacy Trust Badge */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              borderRadius: '12px',
              border: '1px solid #a7f3d0',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2rem' }}>🛡️</span>
                <span style={{
                  color: '#059669',
                  fontWeight: '700',
                  fontSize: '1.125rem'
                }}>
                  Your Privacy is Protected
                </span>
              </div>
              <p style={{
                color: '#047857',
                lineHeight: '1.6',
                marginBottom: 0,
                fontSize: '0.95rem'
              }}>
                We are committed to transparency and your right to privacy. Your trust is earned through our actions, not just our words.
              </p>
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
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Ready to Get Started Securely?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Your privacy is protected every step of the way. Get your instant quote with confidence.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
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
              💰 Get Secure Quote
            </Link>
            
            <Link href="/mint-intelligent-chat" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: '#ffffff',
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
              🤖 Chat with Mint AI
            </Link>
          </div>
          
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              🛡️ Your data is secure with bank-level encryption and never sold to third parties!
            </span>
          </div>
        </div>
      </section>
    </>
  );
}