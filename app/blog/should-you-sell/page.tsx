'use client';

import Link from 'next/link';
import Image from 'next/image';

// Metadata is handled by the parent layout since this is a client component

export default function ShouldYouSell() {
  return (
    <>
      {/* Modern Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "4rem 0 3rem",
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
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 60px rgba(234,179,8,0.12)',
                border: '1px solid rgba(234,179,8,0.25)',
                textAlign: 'center'
              }}>
                {/* Decision Guide Badge */}
                <div style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#059669",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "1rem"
                }}>
                  Decision Guide
                </div>

                <h1 style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "1.5rem",
                  lineHeight: "1.2"
                }}>
                  Should You Sell Your Structured Settlement?
                </h1>

                <p style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  maxWidth: "600px",
                  margin: "0 auto 2rem",
                  lineHeight: "1.6"
                }}>
                  An expert look at the pros, cons, and key factors to help you make the right decision for your financial future.
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
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    📊 See Your Best Offer
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
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    💬 Chat with Mint AI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Article Content */}
      <main style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <article style={{ 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Key Takeaways, Table of Contents, and all existing sections remain as-is for now */}
          {/* --- START EXISTING CONTENT --- */}
          {/* We keep the original JSX from Key Takeaways onward to preserve content while benefiting from new hero */}

          {/* Key Takeaways */}
          <div style={{ 
            background:'#f8fafc', 
            border:'1px solid #f3f4f6',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', color:'#059669' }}>Key Takeaways</h2>
            <ul style={{ 
              color:'#4b5563', 
              lineHeight:'1.6',
              marginBottom: '0',
              paddingLeft: '1.5rem'
            }}>
              <li>Consider selling if you need immediate cash for major life events or opportunities.</li>
              <li>Evaluate your financial situation and future needs carefully.</li>
              <li>Understand the trade-offs between immediate cash and long-term security.</li>
              <li>Get professional advice before making a decision.</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color:'#1f2937'
            }}>Table of Contents</h2>
            <ul style={{ 
              lineHeight:'1.8',
              listStyle: 'none',
              paddingLeft: '0'
            }}>
              <li><a href="#intro" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Should You Sell?</a></li>
              <li><a href="#when-to-sell" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>When to Consider Selling</a></li>
              <li><a href="#when-not-to-sell" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>When to Keep Your Payments</a></li>
              <li><a href="#factors" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Key Factors to Consider</a></li>
              <li><a href="#alternatives" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Alternatives to Selling</a></li>
              <li><a href="#process" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>The Selling Process</a></li>
              <li><a href="#faq" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </nav>

          {/* Article Introduction */}
          <section id="intro" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              💭 Should You Sell Your Structured Settlement?
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem' }}>
              Deciding whether to sell your structured settlement is one of the most important financial 
              decisions you'll make. This comprehensive guide will help you understand when selling makes 
              sense and when it doesn't, so you can make an informed choice that's right for your situation.
            </p>
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem' }}>
              A structured settlement provides you with guaranteed periodic payments for a set period 
              or for life. However, life circumstances can change, and you might find yourself needing 
              a large sum of money now rather than smaller payments over time.
            </p>
          </section>

          {/* When to Consider Selling */}
          <section id="when-to-sell" style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #bbf7d0',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#059669'
              }}>
                ✅ When to Consider Selling
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Financial Emergencies</h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <li>Major medical expenses not covered by insurance</li>
                    <li>Urgent home repairs or unexpected major expenses</li>
                    <li>Debt consolidation to avoid bankruptcy</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Investment Opportunities</h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <li>Starting a business with high potential returns</li>
                    <li>Real estate investment opportunities</li>
                    <li>Education or professional development</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* When NOT to Sell */}
          <section id="when-not-to-sell" style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #fecaca',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#dc2626'
              }}>
                ❌ When to Keep Your Payments
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Lifestyle Purchases</h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <li>Luxury vacations or entertainment</li>
                    <li>New cars or unnecessary upgrades</li>
                    <li>Shopping sprees or impulse purchases</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Financial Uncertainty</h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <li>No clear plan for the lump sum</li>
                    <li>History of poor financial management</li>
                    <li>Pressure from family or friends</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Factors */}
          <section id="factors" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              🔍 Key Factors to Consider
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>💰</span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Financial Need</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    How urgent is your need for cash? Emergency situations may justify selling, 
                    while wants should be carefully evaluated.
                  </p>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>📊</span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Discount Rate</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    Companies will offer less than the total value of your payments. 
                    Understand what you're giving up in the transaction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            border: '1px solid #bbf7d0',
            marginTop: '3rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#059669'
            }}>
              Ready to Explore Your Options?
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Get a free, no-obligation quote to see what your structured settlement is worth. You can also chat with Mint AI for instant guidance.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                💬 Chat with Mint AI
              </Link>
              
              <Link href="/pricing-calculator" style={{
                background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                📊 Get Your Quote
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}