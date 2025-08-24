import Link from 'next/link';
import Image from 'next/image';
import { SITE_STATS } from '../config/siteConfig';

export const metadata = {
  title: 'How Fast Can I Get My Structured Settlement Money? | SmarterPayouts',
  description: 'Learn how quickly you can access your structured settlement cash. Most clients receive funds in 24-72 hours after court approval. Get your instant quote today.',
  keywords: 'how fast structured settlement money, quick payout, settlement cash, court approval time, fast money structured settlement',
  openGraph: {
    title: 'How Fast Can I Get My Structured Settlement Money? | SmarterPayouts',
    description: 'Most clients receive funds in 24-72 hours after court approval. Learn the complete timeline and how to expedite your payout.',
    type: 'article',
    url: 'https://smarterpayouts.com/how-fast-can-i-get-my-money',
  }
};

export default function HowFastCanIGetMyMoney() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How fast can I get my structured settlement money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most clients receive their money in 24-72 hours after court approval. The total process typically takes 30-45 days from quote to cash, depending on court schedules."
        }
      },
      {
        "@type": "Question", 
        "name": "What affects how quickly I can get my money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Court schedules, completeness of documentation, and your state's specific requirements affect timing. We help expedite by handling all paperwork and court coordination."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get emergency funding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For urgent situations, we can often expedite court hearings and provide priority processing. Contact us to discuss emergency funding options."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Fast Can I Get My Structured Settlement Money?",
    "description": "Complete guide to structured settlement payout timing, court approval process, and how to get your money faster.",
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
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.1)'
              }}>
                <h1 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#047857',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.2'
                }}>
                  ⚡ How Fast Can I Get My Money?
                </h1>
                <p style={{
                  fontSize: '1.25rem',
                  color: '#065f46',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}>
                  Complete timeline guide for structured settlement payouts. Most clients receive funds in <strong>24-72 hours</strong> after court approval.
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
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: '#ffffff',
                    padding: '0.875rem 2rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                    border: 'none',
                    transition: 'transform 0.2s ease'
                  }}>
                    💰 Get Your Instant Quote
                  </Link>
                  <Link href="/mint-intelligent-chat" style={{
                    background: '#ffffff',
                    color: '#059669',
                    border: '2px solid #bbf7d0',
                    padding: '0.625rem 1.5rem',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}>
                    <Image 
                      src="/assets/images/mint-mascot.png" 
                      alt="Mint AI" 
                      width={24} 
                      height={24}
                      style={{ borderRadius: '50%' }}
                    />
                    Ask Mint About Timing
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="row g-3">
                  <div className="col-md-4">
                    <div style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '16px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857' }}>{SITE_STATS.avgDays.value}</div>
                      <div style={{ fontSize: '0.9rem', color: '#065f46' }}>{SITE_STATS.avgDays.label}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      borderRadius: '16px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857' }}>24-72h</div>
                      <div style={{ fontSize: '0.9rem', color: '#065f46' }}>After Approval</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Link href={SITE_STATS.aiSupport.link} style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                        borderRadius: '16px',
                        border: '1px solid #bbf7d0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      title={SITE_STATS.aiSupport.description}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857' }}>{SITE_STATS.aiSupport.value}</div>
                        <div style={{ fontSize: '0.9rem', color: '#065f46' }}>{SITE_STATS.aiSupport.label}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-5">
        <article className="mx-auto" style={{ maxWidth: '900px' }}>
          <header className="mb-5">

            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              border: '2px solid #bbf7d0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>⚡</div>
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#047857',
                  margin: 0
                }}>Quick Answer</h2>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontWeight: 600, color: '#047857', marginBottom: '0.5rem' }}>Total Time:</div>
                    <div style={{ color: '#065f46' }}>30-45 days from quote to cash</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontWeight: 600, color: '#047857', marginBottom: '0.5rem' }}>After Court Approval:</div>
                    <div style={{ color: '#065f46' }}>24-72 hours to receive funds</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontWeight: 600, color: '#047857', marginBottom: '0.5rem' }}>Court Approval:</div>
                    <div style={{ color: '#065f46' }}>Typically 2-4 weeks</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontWeight: 600, color: '#047857', marginBottom: '0.5rem' }}>Emergency Cases:</div>
                    <div style={{ color: '#065f46' }}>Can be expedited with priority processing</div>
                  </div>
                </div>
              </div>
              
              {/* Mint AI Quick Help */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '12px',
                border: '1px solid #93c5fd',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <Image 
                    src="/assets/images/mint-mascot.png" 
                    alt="Mint AI" 
                    width={32} 
                    height={32}
                    style={{ borderRadius: '50%' }}
                  />
                  <span style={{ fontWeight: 600, color: '#1d4ed8' }}>Ask Mint AI for personalized timing estimates!</span>
                </div>
                <Link href="/mint-intelligent-chat" style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  Get My Timeline
                </Link>
              </div>
            </div>

            <nav style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#047857',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📚 Table of Contents
              </h2>
              <div className="row g-2">
                <div className="col-md-6">
                  <a href="#timeline" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    ⏱️ Complete Timeline Breakdown
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="#factors" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    ⚡ What Affects Speed
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="#expedite" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    🚀 How to Get Money Faster
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="#emergency" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    🚨 Emergency Funding Options
                  </a>
                </div>
                <div className="col-md-6">
                  <Link href="/state-laws-overview" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    🗺️ State-by-State Differences
                  </Link>
                </div>
                <div className="col-md-6">
                  <a href="#payment-methods" style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#059669',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    💳 How You'll Receive Your Money
                  </a>
                </div>
              </div>
            </nav>
          </header>

          <section id="timeline">
            <h2 className="h3 mb-4">Complete Timeline Breakdown</h2>
            <div className="timeline-container mb-5">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-success">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{width: 40, height: 40}}>
                          <span className="fw-bold">1</span>
                        </div>
                        <h3 className="h6 mb-0">Get Your Quote</h3>
                      </div>
                      <p className="text-muted mb-2"><strong>Time:</strong> Instant</p>
                      <p className="mb-0">Use our calculator to get an immediate quote. No waiting, no phone calls required.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-success">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{width: 40, height: 40}}>
                          <span className="fw-bold">2</span>
                        </div>
                        <h3 className="h6 mb-0">Documentation</h3>
                      </div>
                      <p className="text-muted mb-2"><strong>Time:</strong> 1-3 days</p>
                      <p className="mb-0">We help you gather required documents and complete all paperwork digitally.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-warning">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-3" style={{width: 40, height: 40}}>
                          <span className="fw-bold">3</span>
                        </div>
                        <h3 className="h6 mb-0">Court Filing</h3>
                      </div>
                      <p className="text-muted mb-2"><strong>Time:</strong> 2-4 weeks</p>
                      <p className="mb-0">We file with the court and schedule your hearing. This is typically the longest step.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-success">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{width: 40, height: 40}}>
                          <span className="fw-bold">4</span>
                        </div>
                        <h3 className="h6 mb-0">Get Your Cash</h3>
                      </div>
                      <p className="text-muted mb-2"><strong>Time:</strong> 24-72 hours</p>
                      <p className="mb-0">Once approved, funds are typically in your account within 1-3 business days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>
          <section id="factors" style={{ marginBottom: '3rem' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#047857',
                marginBottom: '1rem'
              }}>
                What Affects How Fast You Get Paid
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto 1.5rem'
              }}>
                Understanding these factors helps you prepare for the fastest possible payout
              </p>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
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
                <Image 
                  src="/assets/images/mint-mascot.png" 
                  alt="Mint AI" 
                  width={20} 
                  height={20}
                  style={{ borderRadius: '50%' }}
                />
                Ask Mint About Your Specific Timeline
              </Link>
            </div>

            <div className="row g-4">
              {/* Speed Up Factors */}
              <div className="col-lg-6">
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  height: '100%',
                  border: '2px solid #bbf7d0',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>⚡</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#047857',
                      margin: 0
                    }}>Factors That Speed Things Up</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { icon: '📄', text: 'Complete documentation ready', desc: 'All papers organized and available' },
                      { icon: '📋', text: 'Clear settlement agreement', desc: 'No ambiguities or missing clauses' },
                      { icon: '⚖️', text: 'Available court dates', desc: 'Flexible scheduling with judge availability' },
                      { icon: '💳', text: 'Electronic payment setup', desc: 'Direct deposit faster than checks' },
                      { icon: '📞', text: 'Responsive communication', desc: 'Quick replies to requests' }
                    ].map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                      }}>
                        <div style={{
                          fontSize: '1.25rem',
                          minWidth: '24px'
                        }}>{item.icon}</div>
                        <div>
                          <div style={{
                            fontWeight: 600,
                            color: '#047857',
                            marginBottom: '0.25rem'
                          }}>{item.text}</div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: '#065f46',
                            opacity: 0.8
                          }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slow Down Factors */}
              <div className="col-lg-6">
                <div style={{
                  background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  height: '100%',
                  border: '2px solid #fbbf24',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>⏳</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#d97706',
                      margin: 0
                    }}>Factors That Can Slow Things Down</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { icon: '❌', text: 'Missing or incomplete documents', desc: 'Delays while gathering paperwork' },
                      { icon: '🔄', text: 'Complex settlement structures', desc: 'Multiple annuities or unusual terms' },
                      { icon: '📅', text: 'Busy court schedules', desc: 'Limited hearing availability' },
                      { icon: '🏛️', text: 'State-specific requirements', desc: 'Additional local regulations' },
                      { icon: '🎄', text: 'Holiday court closures', desc: 'Courts closed during holidays' }
                    ].map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #fbbf24'
                      }}>
                        <div style={{
                          fontSize: '1.25rem',
                          minWidth: '24px'
                        }}>{item.icon}</div>
                        <div>
                          <div style={{
                            fontWeight: 600,
                            color: '#d97706',
                            marginBottom: '0.25rem'
                          }}>{item.text}</div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: '#92400e',
                            opacity: 0.8
                          }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mint AI Insight Box */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginTop: '2rem',
              border: '1px solid #93c5fd',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <Image 
                  src="/assets/images/mint-mascot.png" 
                  alt="Mint AI" 
                  width={40} 
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '1.125rem' }}>💡 Mint AI Tip</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Smart insights for faster processing</div>
                </div>
              </div>
              <p style={{
                color: '#1e40af',
                marginBottom: '1rem',
                fontSize: '1rem',
                lineHeight: 1.6
              }}>
                <strong>Pro Tip:</strong> Our AI can analyze your specific situation and predict your exact timeline based on your state, 
                settlement type, and current court schedules. Get a personalized timeline estimate in seconds!
              </p>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                🔮 Get My Personalized Timeline
              </Link>
            </div>
          </section>

          <div className="section-divider"></div>
          <section id="expedite">
            <h2 className="h3 mt-4 mb-4">How to Get Your Money Faster</h2>
            <div className="bg-light p-4 rounded mb-4">
              <h3 className="h5 fw-bold mb-3">🚀 Our Expedited Service</h3>
              <p>At SmarterPayouts, we specialize in fast processing:</p>
              <ul className="mb-0">
                <li><strong>Document Prep:</strong> We help you gather everything quickly</li>
                <li><strong>Court Coordination:</strong> We work directly with court clerks</li>
                <li><strong>Priority Processing:</strong> Available for urgent situations</li>
                <li><strong>Digital Everything:</strong> No delays with physical paperwork</li>
              </ul>
            </div>
            
            <h4 className="h6 fw-bold mb-3">Tips to Speed Up Your Process:</h4>
            <ol>
              <li className="mb-2"><strong>Have Documents Ready:</strong> Original settlement agreement, annuity contract, recent payment stubs</li>
              <li className="mb-2"><strong>Respond Quickly:</strong> Answer our calls and emails promptly</li>
              <li className="mb-2"><strong>Be Flexible:</strong> Available court dates might be sooner than expected</li>
              <li className="mb-2"><strong>Choose Electronic Payment:</strong> Direct deposit is faster than checks</li>
              <li className="mb-0"><strong>Work with Us:</strong> Our team knows how to navigate each state's requirements</li>
            </ol>
          </section>

          <div className="section-divider"></div>
          <section id="emergency">
            <h2 className="h3 mt-4 mb-4">Emergency Funding Options</h2>
            <div className="alert alert-info mb-4">
              <h4 className="h6 fw-bold mb-2">🚨 Need Money Urgently?</h4>
              <p className="mb-0">If you're facing a financial emergency, we may be able to expedite your case. Contact us immediately to discuss priority processing options.</p>
            </div>
            
            <p>Emergency situations that may qualify for expedited processing:</p>
            <ul>
              <li>Medical emergencies requiring immediate payment</li>
              <li>Foreclosure or eviction proceedings</li>
              <li>Critical home repairs (roof, plumbing, electrical)</li>
              <li>Legal proceedings with urgent deadlines</li>
              <li>Business opportunities with time constraints</li>
            </ul>
            
            <div className="text-center mt-4">
              <Link href="/contact" className="btn btn-warning btn-lg">
                Contact Us for Emergency Processing
              </Link>
            </div>
          </section>

          <div className="section-divider"></div>
          <section id="state-differences">
            <h2 className="h3 mt-4 mb-4">State-by-State Timing Differences</h2>
            <p>Court approval timing varies by state. Here are some general guidelines:</p>
            
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="text-center p-3 bg-success text-white rounded">
                  <h4 className="h6 fw-bold mb-2">Fastest States</h4>
                  <p className="mb-1 small">15-25 days average</p>
                  <p className="mb-0 small">Florida, Texas, Nevada</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 bg-warning text-dark rounded">
                  <h4 className="h6 fw-bold mb-2">Average States</h4>
                  <p className="mb-1 small">25-35 days average</p>
                  <p className="mb-0 small">Most other states</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 bg-secondary text-white rounded">
                  <h4 className="h6 fw-bold mb-2">Slower States</h4>
                  <p className="mb-1 small">35-45 days average</p>
                  <p className="mb-0 small">NY, CA (complex requirements)</p>
                </div>
              </div>
            </div>
            
            <p className="text-muted">
              <Link href="/structured-settlement-laws-by-state" className="text-success">Check your state's specific requirements</Link> to understand what affects timing in your area.
            </p>
          </section>

          <div className="section-divider"></div>
          <section id="payment-methods">
            <h2 className="h3 mt-4 mb-4">How You'll Receive Your Money</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <span style={{fontSize: '1.5rem'}} role="img" aria-label="Bank">🏦</span>
                  </div>
                  <h4 className="h6 fw-bold">Direct Deposit</h4>
                  <p className="text-muted small">Fastest option - typically same day once approved</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <span style={{fontSize: '1.5rem'}} role="img" aria-label="Check">📋</span>
                  </div>
                  <h4 className="h6 fw-bold">Certified Check</h4>
                  <p className="text-muted small">Secure option - 1-2 business days by overnight mail</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <span style={{fontSize: '1.5rem'}} role="img" aria-label="Delivery">🚚</span>
                  </div>
                  <h4 className="h6 fw-bold">In-Person Delivery</h4>
                  <p className="text-muted small">Available in select areas for large amounts</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            marginTop: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Get your instant quote now and see exactly when you could have cash in hand. Ask Mint AI for personalized timing estimates!
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/pricing-calculator" style={{
                background: '#ffffff',
                color: '#047857',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.125rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                💰 Get Your Timeline & Quote
              </Link>
              <Link href="/mint-intelligent-chat" style={{
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.125rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Image 
                  src="/assets/images/mint-mascot.png" 
                  alt="Mint AI" 
                  width={24} 
                  height={24}
                  style={{ borderRadius: '50%' }}
                />
                Ask Mint AI
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}