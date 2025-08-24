import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | SmarterPayouts',
  description: 'Read the terms and conditions for using SmarterPayouts. Clear, fair, and user-focused policies for your peace of mind.',
  keywords: 'terms conditions, user agreement, platform terms, structured settlement terms, legal policies',
  openGraph: {
    title: 'Terms and Conditions | SmarterPayouts',
    description: 'Read the terms and conditions for using SmarterPayouts. Clear, fair, and user-focused policies for your peace of mind.',
    type: 'article',
    url: 'https://smarterpayouts.com/terms',
  }
};

export default function Terms() {
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
              {/* Legal Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '1.5rem',
                border: '1px solid #fbbf24'
              }}>
                <span style={{ fontSize: '1.25rem' }}>📋</span>
                <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.875rem' }}>LEGAL TERMS</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: '700',
                color: '#1f2937',
                lineHeight: '1.2',
                marginBottom: '1rem'
              }}>
                Terms and Conditions
              </h1>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                Clear, fair, and user-focused policies for your peace of mind when using SmarterPayouts.
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

              {/* Quick Nav */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: '#059669'
              }}>
                <span>📍 Platform Services</span>
                <span>•</span>
                <span>🔒 User Rights</span>
                <span>•</span>
                <span>⚖️ State Compliance</span>
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
                Our Terms of Service
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                These terms govern your use of SmarterPayouts and our AI-powered platform.
              </p>
            </div>
            
            {/* IMPORTANT LEGAL NOTICE */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px solid #fbbf24',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔍</span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#92400e',
                  margin: '0'
                }}>
                  Important: SmarterPayouts Platform Notice
                </h3>
              </div>
              
              <div style={{ color: '#92400e', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>SmarterPayouts is primarily a self-quoting platform</strong> that allows individuals to autonomously obtain quotes for their structured settlement payments through our AI-powered system. We provide technology and information services to help you evaluate your options.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>State Participation:</strong> SmarterPayouts may or may not participate directly in transactions in all states. Our participation varies by state based on local regulations and licensing requirements.
                </p>
                <p style={{ marginBottom: '0' }}>
                  <strong>Licensing & Bonding:</strong> Some states (such as Georgia, Minnesota, and others) require specific licensing and bonding for structured settlement companies. Please ask our representatives which states we directly participate in and where we are licensed and bonded. In states where we do not directly participate, we may refer you to qualified affiliate partners.
                </p>
              </div>
            </div>
            
            {/* Terms Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Section 1 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>1</span>
                  Acceptance of Terms
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  By using the SmarterPayouts website and services, you agree to these terms and conditions. If you do not agree, please do not use our site.
                </p>
              </div>

              {/* Section 2 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>2</span>
                  Platform Services & State Participation
                </h3>
                <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Self-Quoting Platform:</strong> SmarterPayouts operates primarily as a technology platform that enables users to obtain quotes for their structured settlement payments. Our AI-powered system, Mint, provides automated quote generation and information services.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Direct Participation:</strong> SmarterPayouts may or may not directly participate in structured settlement transactions in all states. Our direct participation depends on:
                  </p>
                  <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                    <li>State-specific licensing and bonding requirements</li>
                    <li>Local regulatory compliance obligations</li>
                    <li>Business operational decisions</li>
                  </ul>
                  <p style={{ marginBottom: '0' }}>
                    <strong>State Inquiry:</strong> Users should specifically ask our representatives about our participation status, licensing, and bonding in their particular state before proceeding with any transaction.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>3</span>
                  Use of the Website
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li>You must be at least 18 years old to use our services.</li>
                  <li>Do not use our site for unlawful or prohibited purposes.</li>
                  <li>Information provided must be accurate and not misleading.</li>
                </ul>
              </div>

              {/* Section 4 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>4</span>
                  Intellectual Property
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li>All content, trademarks, and logos are the property of SmarterPayouts or its licensors.</li>
                  <li>You may not copy, reproduce, or distribute content without permission.</li>
                </ul>
              </div>

              {/* Section 5 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>5</span>
                  Disclaimers & Limitations
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li>Information on this site is for general purposes only and not legal or financial advice.</li>
                  <li>We do our best to keep information accurate but do not guarantee completeness or timeliness.</li>
                  <li>SmarterPayouts is not liable for any damages arising from use of the site or services.</li>
                  <li><strong>Platform Limitation:</strong> As a self-quoting platform, we provide technology services and information. Our role and legal obligations vary by state based on licensing and participation status.</li>
                </ul>
              </div>

              {/* Section 6 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>6</span>
                  User Responsibilities
                </h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                  <li>Keep your login and personal information secure.</li>
                  <li>Do not attempt to disrupt or harm the website or other users.</li>
                  <li><strong>State Verification:</strong> Users are responsible for verifying our participation status and licensing in their state before proceeding with any transaction.</li>
                </ul>
              </div>

              {/* Section 7 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>7</span>
                  Changes to Terms
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We may update these terms at any time. Changes will be posted on this page with a new effective date. Continued use of the site means you accept the new terms.
                </p>
              </div>

              {/* Section 8 */}
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
                    borderRadius: '50%', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>8</span>
                  Contact
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  If you have questions about these terms, contact us at <a href="mailto:support@smarterpayouts.com" style={{ color: '#059669', fontWeight: '600' }}>support@smarterpayouts.com</a>.
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
              Terms & Conditions FAQ
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
                  Can I use your content on my own site?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  No. All content is protected and may not be reused without written permission.
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
                  How will I know if the terms change?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  We post updates on this page. Please check back regularly for the latest version.
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
                  Does SmarterPayouts participate in my state?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  SmarterPayouts operates primarily as a self-quoting platform. Our direct participation varies by state due to licensing and bonding requirements. Please contact our representatives to verify our participation status and licensing in your specific state.
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
                  What states require licensing and bonding?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Some states like Georgia, Minnesota, and others have specific licensing and bonding requirements for structured settlement companies. Requirements vary and change over time. Always ask our representatives about current compliance status in your state.
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
                  Who can I contact with questions?
                </summary>
                <div style={{
                  marginTop: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Email <a href="mailto:support@smarterpayouts.com" style={{ color: '#059669', fontWeight: '600' }}>support@smarterpayouts.com</a> and our team will be happy to help.
                </div>
              </details>
            </div>

            {/* Mint AI Help */}
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
                fontWeight: '600',
                fontSize: '1.125rem',
                marginBottom: '0.5rem'
              }}>
                🤖 Need instant help with terms questions?
              </h3>
              <p style={{
                color: '#4b5563',
                marginBottom: '1rem',
                fontSize: '0.95rem'
              }}>
                Mint AI can instantly answer questions about our terms, state compliance, and platform policies.
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
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Now that you understand our terms, get your instant quote and experience our AI-powered platform.
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
              💰 Get Your Quote
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
              🤖 Have questions about our terms? Mint AI has instant answers!
            </span>
          </div>
        </div>
      </section>
    </>
  );
}