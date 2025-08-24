import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Structured Settlement Info Hub | SmarterPayouts',
  description: 'Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at SmarterPayouts.',
  robots: 'index, follow',
};

export default function StructuredSettlementInfoHub() {
  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Structured Settlement Info Hub | Complete Guide & Resources",
    "description": "Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at SmarterPayouts.",
    "image": "https://smarterpayouts.com/assets/images/social-preview.jpg",
    "author": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "url": "https://smarterpayouts.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmarterPayouts",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smarterpayouts.com/assets/images/logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://smarterpayouts.com/structured-settlement-info-hub"
    }
  };

  // Breadcrumb Schema for Navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smarterpayouts.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Knowledge Hub",
        "item": "https://smarterpayouts.com/structured-settlement-info-hub"
      }
    ]
  };

  return (
    <>
      <title>Structured Settlement Info Hub | SmarterPayouts</title>
      <meta name="description" content="Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at SmarterPayouts." />
      <meta name="robots" content="index, follow" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .main-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .sidebar {
              order: -1;
              width: 100% !important;
              position: static !important;
            }
          }
          @media (max-width: 480px) {
            .main-grid {
              padding: 0 8px !important;
            }
          }
        `
      }} />
      
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "5rem 0 4rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
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
            Knowledge Center
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            📚 Structured Settlement Info Hub
          </h1>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: "1.6"
          }}>
            Your comprehensive resource for understanding, selling, and maximizing your structured settlement payout.
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Link href="/pricing-calculator" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(9, 180, 77, 0.2)"
            }}>💰 Get Your Quote</Link>
            <Link href="/mint-intelligent-chat" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(139, 92, 246, 0.2)"
            }}>💬 Chat with Mint AI</Link>
          </div>
        </div>
      </section>

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '48px 0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div className="main-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px',
            gap: '2rem',
            alignItems: 'start'
          }}>
            <div style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0'
            }}>

            <section style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              marginBottom: '2rem',
              border: '1px solid #e5e7eb',
              transition: 'box-shadow 0.2s ease'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🏛️ What is a structured settlement?
              </h2>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Structured settlements are financial arrangements that provide periodic payments to individuals, typically as a result of a personal injury lawsuit or insurance claim. These payments offer long-term financial security and are often tax-free.
              </p>
              <Link href="/structured-settlement-info-hub/what-is-a-structured-settlement" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)'
              }}>
                📖 Learn More About Structured Settlements
              </Link>
            </section>

            <section style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              marginBottom: '2rem',
              border: '1px solid #e5e7eb',
              transition: 'box-shadow 0.2s ease'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💰 Can I sell my structured settlement?
              </h2>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Yes, you can sell your structured settlement payments for a lump sum of cash. The process involves court approval and varies by state. Selling your settlement can provide immediate funds for major expenses or financial goals.
              </p>
              <Link href="/structured-settlement-info-hub/how-to-sell-structured-settlement" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)'
              }}>
                🚀 Learn How to Sell Your Settlement
              </Link>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                📚 Explore Our Resources
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '1rem',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                  border: '1px solid #e5e7eb',
                  height: 'fit-content',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    ⚖️ State Laws & Requirements
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    Learn about structured settlement laws in your state.
                  </p>
                  <Link href="/structured-settlement-info-hub/state-laws" style={{
                    color: '#059669',
                    border: '1px solid #059669',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-block',
                    transition: 'all 0.2s ease',
                    fontSize: '0.875rem'
                  }}>
                    View State Laws
                  </Link>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  height: 'fit-content'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    🏛️ Court Approval Process
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    Understand the legal requirements for selling.
                  </p>
                  <Link href="/structured-settlement-info-hub/court-approval-process" style={{
                    color: '#059669',
                    border: '1px solid #059669',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    Learn About Court Approval
                  </Link>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  height: 'fit-content'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    📚 Glossary of Terms
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    Definitions of key structured settlement terms.
                  </p>
                  <Link href="/structured-settlement-info-hub/glossary-of-structured-settlement-terms" style={{
                    color: '#059669',
                    border: '1px solid #059669',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    View Glossary
                  </Link>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  height: 'fit-content'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    ❓ FAQ
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    Answers to common questions about settlements.
                  </p>
                  <Link href="/structured-settlement-info-hub/faq" style={{
                    color: '#059669',
                    border: '1px solid #059669',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    Read FAQ
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar" style={{ 
            width: '300px',
            position: 'sticky',
            top: '2rem',
            height: 'fit-content'
          }}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                💰 Get Your Instant Quote
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Find out how much your structured settlement is worth today.
              </p>
              <Link href="/pricing-calculator" style={{
                display: 'block',
                background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(9, 180, 77, 0.2)'
              }}>
                Calculate Your Offer
              </Link>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                💬 Chat with Mint AI
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Get instant answers to your settlement questions 24/7.
              </p>
              <Link href="/mint-intelligent-chat" style={{
                display: 'block',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)'
              }}>
                Chat with Mint AI
              </Link>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                📄 Related Articles
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link href="/structured-settlement-info-hub/pros-cons-selling-structured-settlement" style={{
                    color: '#059669',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    Pros & Cons of Selling
                  </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link href="/structured-settlement-info-hub/maximize-offer-selling-structured-settlement" style={{
                    color: '#059669',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    How to Maximize Your Offer
                  </Link>
                </li>
                <li>
                  <Link href="/structured-settlement-info-hub/common-mistakes-selling-structured-settlement" style={{
                    color: '#059669',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    Common Mistakes to Avoid
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          </div>
        </div>
      </main>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Get your instant quote or chat with Mint AI to learn more about your structured settlement options.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/pricing-calculator" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(9, 180, 77, 0.3)'
            }}>
              💰 Get Your Instant Quote
            </Link>
            <Link href="/mint-intelligent-chat" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              💬 Chat with Mint AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 