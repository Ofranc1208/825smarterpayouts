'use client';

import Link from 'next/link';
import Image from 'next/image';
import MintBadge from '../components/MintBadge';

// Note: metadata is now handled by the parent layout since this is a client component

const blogPosts = [
  { 
    slug: 'structured-settlements', 
    title: 'Understanding Structured Settlements',
    description: 'Complete guide to structured settlements: what they are, how they work, and tax implications.',
    readTime: '8 min read',
    category: 'Education',
    icon: '📚',
    image: '/assets/images/court1.jpg',
    imageAlt: 'Courtroom with judge - Structured Settlements Explained'
  },
  { 
    slug: 'should-you-sell', 
    title: 'Should You Sell Your Settlement?',
    description: 'Key factors to consider when deciding whether to sell your structured settlement payments.',
    readTime: '6 min read',
    category: 'Decision Guide',
    icon: '🤔',
    image: '/assets/images/sell.jpg',
    imageAlt: 'Person considering selling settlement - Should You Sell Your Settlement?'
  },
  { 
    slug: 'how-fast-payout', 
    title: 'How Fast Can You Get Your Payout?',
    description: 'Timeline and process for receiving cash from your structured settlement sale.',
    readTime: '5 min read',
    category: 'Process',
    icon: '⚡',
    image: '/assets/images/online.jpg',
    imageAlt: 'Laptop showing online payout - How Fast Is a Settlement Payout?'
  },
  { 
    slug: 'court-approval-tips', 
    title: 'Court Approval Tips & Process',
    description: 'Everything you need to know about court approval for structured settlement sales.',
    readTime: '7 min read',
    category: 'Legal',
    icon: '⚖️',
    image: '/assets/images/court1.jpg',
    imageAlt: 'Legal documents and gavel - Court Approval Tips'
  }
];

export default function Blog() {
  return (
    <>
      {/* Modern Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #e5e7eb'
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
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.1)',
              textAlign: 'center'
            }}>
              <MintBadge variant="compact" style={{ marginBottom: "1.5rem" }} />
              
              {/* Expert Insights Badge */}
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
                <span style={{ fontSize: '1.25rem' }}>💡</span>
                <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.875rem' }}>EXPERT INSIGHTS</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: '700',
                color: '#1f2937',
                lineHeight: '1.2',
                marginBottom: '1rem'
              }}>
                Structured Settlement Blog
              </h1>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                Expert insights, guides, and tips to help you make informed decisions about your structured settlement.
              </p>

              {/* Blog Stats */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: '#059669'
              }}>
                <span>📖 Expert Articles</span>
                <span>•</span>
                <span>🎯 Actionable Advice</span>
                <span>•</span>
                <span>📊 Industry Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section style={{ 
        background: '#f9fafb', 
        padding: '4rem 0' 
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
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Latest Articles
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Stay informed with the latest insights from our structured settlement experts.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              {blogPosts.map((post) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '2rem',
                      height: '100%',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #f3f4f6',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = '#059669';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = '#f3f4f6';
                    }}>
                      
                      {/* Category Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                          color: '#059669',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: '1px solid #a7f3d0'
                        }}>
                          {post.category}
                        </span>
                        <span style={{ fontSize: '1.5rem' }}>{post.icon}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.75rem',
                        lineHeight: '1.3'
                      }}>
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {post.description}
                      </p>

                      {/* Read Time */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          color: '#9ca3af',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>🕒</span>
                          {post.readTime}
                        </span>
                        <span style={{
                          color: '#059669',
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}>
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            Ready to Explore Your Options?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Get your free, instant quote and see what your structured settlement payments are worth.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing-calculator" style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
            }}>
              📊 Get Your Instant Quote
            </Link>

            <Link href="/mint-intelligent-chat" style={{
              background: 'white',
              color: '#059669',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid #059669',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f0fdf4';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Image
                src="/assets/images/mint-mascot.png"
                alt="Mint AI"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
              />
              Chat with Mint AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}