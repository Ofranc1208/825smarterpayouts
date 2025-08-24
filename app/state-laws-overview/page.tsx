import Link from 'next/link';
import { SITE_STATS } from '../config/siteConfig';

export const metadata = {
  title: 'State Laws Overview - Structured Settlement Regulations | SmarterPayouts',
  description: 'Comprehensive overview of structured settlement laws across all 50 states. Learn about court requirements, approval processes, and how our affiliate partners ensure compliance.',
  keywords: 'structured settlement state laws, court approval requirements, settlement sales by state, compliance regulations',
};

export default function StateLawsOverview() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "2rem 0 3rem"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem"
            }}>
              Legal Compliance Guide
            </div>

            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "1.5rem",
              lineHeight: "1.2"
            }}>
                State Laws Overview
              </h1>
            
            <p style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              marginBottom: "2rem",
              lineHeight: "1.6",
              maxWidth: "700px",
              margin: "0 auto 2rem"
            }}>
                Structured settlement sales are legal in all 50 states, but each state has specific court requirements and approval processes. 
                We work with affiliate partners across all 50 states to ensure full compliance with local regulations.
              </p>
            
            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem'
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem'
            }}>
              <Link href={SITE_STATS.statesCovered.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  border: '1px solid #e5e7eb'
                }}
                         title={SITE_STATS.statesCovered.description}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669', marginBottom: '0.25rem' }}>
                    {SITE_STATS.statesCovered.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {SITE_STATS.statesCovered.label}
                  </div>
                    </div>
                  </Link>

              <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  border: '1px solid #e5e7eb'
                }}
                title={SITE_STATS.compliance.description}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669', marginBottom: '0.25rem' }}>
                    {SITE_STATS.compliance.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {SITE_STATS.compliance.label}
                </div>
                    </div>
                  </Link>

              <Link href={SITE_STATS.avgDays.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  border: '1px solid #e5e7eb'
                }}
                title={SITE_STATS.avgDays.description}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669', marginBottom: '0.25rem' }}>
                    {SITE_STATS.avgDays.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {SITE_STATS.avgDays.label}
                </div>
                    </div>
                  </Link>

              <Link href={SITE_STATS.aiSupport.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  border: '1px solid #e5e7eb'
                }}
                title={SITE_STATS.aiSupport.description}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669', marginBottom: '0.25rem' }}>
                    {SITE_STATS.aiSupport.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {SITE_STATS.aiSupport.label}
                </div>
                    </div>
                  </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ 
        padding: '48px 16px',
        background: '#ffffff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
              
              {/* Legal Disclaimer */}
          <div style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '2px solid #fbbf24',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '3rem'
          }}>
            <h4 style={{
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⚠️</span>
                  Legal Compliance Notice
                </h4>
            <p style={{
              marginBottom: '1rem',
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
                  <strong>Important:</strong> The state law information and compliance details provided here are gathered for informational purposes only. 
                  State laws and court requirements change frequently and vary by jurisdiction.
                </p>
            <p style={{
              marginBottom: 0,
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
                  Our affiliate partners are responsible for ensuring compliance with local regulations in their respective states. 
                  <strong> Always consult with a qualified attorney</strong> licensed in your state and specializing in structured settlements 
                  to ensure full compliance with current legal requirements. This information should not be considered legal advice.
                </p>
              </div>
              
              {/* Key Facts */}
          <div style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e9f9f1',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
                  🗺️ Key Facts About State Laws
                </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  ✓
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>All 50 States Covered</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Structured settlement sales are legal in all 50 states with court approval</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  ⚖️
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Court Approval Required</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Every state requires court approval to protect consumers</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  🤝
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Affiliate Partners</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>We work with licensed partners in all 50 states for full compliance</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  ⚡
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>AI-Powered Process</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Mint AI helps guide you through state-specific requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Categories */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <div style={{
                height: '100%',
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #e9f9f1',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  🚀
                      </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#059669',
                  marginBottom: '0.5rem'
                }}>Fastest States</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>15-30 days average</p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '0.875rem',
                  color: '#4b5563'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>• Florida</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Texas</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Nevada</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Arizona</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Georgia</li>
                    </ul>
                  </div>
                </div>

            <div>
              <div style={{
                height: '100%',
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #e9f9f1',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  ⚖️
                      </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>Average States</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>25-40 days average</p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '0.875rem',
                  color: '#4b5563'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>• Pennsylvania</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Ohio</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Illinois</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Michigan</li>
                  <li style={{ marginBottom: '0.5rem' }}>• North Carolina</li>
                    </ul>
                  </div>
                </div>

            <div>
              <div style={{
                height: '100%',
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #e9f9f1',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  📋
                      </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Detailed Review</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>30-50 days average</p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '0.875rem',
                  color: '#4b5563'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>• New York</li>
                  <li style={{ marginBottom: '0.5rem' }}>• California</li>
                  <li style={{ marginBottom: '0.5rem' }}>• New Jersey</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Massachusetts</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Connecticut</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Requirements */}
          <div style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e9f9f1',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
                  Common Requirements Across States
                </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontWeight: '700', color: '#059669' }}>1</span>
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Court Petition Filing</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Legal documentation filed with the appropriate court</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontWeight: '700', color: '#059669' }}>2</span>
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Judge Review</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Court review to ensure the sale is in your best interest</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontWeight: '700', color: '#059669' }}>3</span>
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Professional Advice</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Independent advice recommended or required</p>
                      </div>
                    </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontWeight: '700', color: '#059669' }}>4</span>
                      </div>
                      <div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>Full Disclosure</h5>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>Complete transparency of terms and fees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                      🛡️ Full Compliance Through Affiliate Partners
                    </h2>
                <p style={{
                  marginBottom: '1rem',
                  color: '#4b5563',
                  lineHeight: '1.6'
                }}>
                      We work with licensed affiliate partners in all 50 states to ensure full compliance with local regulations. 
                      Each state has unique requirements, and our partners are experts in their respective jurisdictions.
                    </p>
                <ul style={{
                  marginBottom: 0,
                  color: '#4b5563',
                  lineHeight: '1.6',
                  paddingLeft: '1.5rem'
                }}>
                      <li>Licensed partners in all 50 states</li>
                      <li>State-specific legal expertise</li>
                      <li>Full compliance with local regulations</li>
                      <li>Seamless coordination across jurisdictions</li>
                    </ul>
                  </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem'
                }}>
                  🤝
                    </div>
                  </div>
                </div>
              </div>

          {/* Mint AI Help Section */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid #93c5fd',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2563eb',
              marginBottom: '1rem'
            }}>
              🤖 Need State-Specific Guidance?
            </h2>
            <p style={{ 
              color: '#4b5563', 
              fontSize: '1rem', 
              marginBottom: '1.5rem', 
              maxWidth: '600px', 
              margin: '0 auto 1.5rem' 
            }}>
              Mint AI can instantly provide information about your state's specific requirements, timelines, and compliance procedures. 
              Get personalized guidance for your jurisdiction.
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
              💬 Ask Mint About Your State
            </Link>
          </div>

          {/* Final CTA Section */}
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            color: '#ffffff'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
                  Ready to Get Started?
                </h2>
            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
                  Our AI-powered platform and affiliate partners make the process simple and compliant across all 50 states.
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
                💰 Get Your Instant Quote
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
                🤖 Get instant state-specific compliance guidance with Mint AI!
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}