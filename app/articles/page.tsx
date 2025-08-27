'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Metadata handled by parent layout since this is a client component

// Article data structure
const articles = [
  {
    id: 'structured-settlements',
    title: 'Structured Settlements',
    description: 'Understand how structured settlements work, their benefits, and key decisions before cashing out.',
    image: '/assets/images/court1.jpg',
    imageAlt: 'Courtroom with judge - Structured Settlements Explained',
    href: '/blog/structured-settlements',
    featured: true
  },
  {
    id: 'should-you-sell',
    title: 'Should You Sell Your Structured Settlement?',
    description: 'Explore when it\'s smart to sell your payments and what you should watch out for in the process.',
    image: '/assets/images/sell.jpg',
    imageAlt: 'Person considering selling settlement - Should You Sell Your Settlement?',
    href: '/blog/should-you-sell',
    featured: false
  },
  {
    id: 'how-fast-payout',
    title: 'How Fast Is a Settlement Payout?',
    description: 'Learn how long it typically takes to receive your payout and how SmarterPayouts speeds up the process.',
    image: '/assets/images/online.jpg',
    imageAlt: 'Laptop showing online payout - How Fast Is a Settlement Payout?',
    href: '/blog/how-fast-payout',
    featured: false
  }
];

// FAQ data structure
const faqData = [
  {
    id: 'frequency',
    question: 'How often are new articles published?',
    answer: 'We add new articles and resources every month. Subscribe to our newsletter below to get notified when new content is published.'
  },
  {
    id: 'requests',
    question: 'Can I request a topic?',
    answer: 'Absolutely! Use our contact form to suggest topics or questions you\'d like us to cover.'
  },
  {
    id: 'expert-review',
    question: 'Are your articles reviewed by experts?',
    answer: 'Yes. All content is reviewed by structured settlement professionals for accuracy and clarity.'
  }
];

// Hero Section Component
function HeroSection() {
  return (
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
            maxWidth: '800px',
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
              SmarterPayouts Resources
            </h1>
            <p style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: "1.6"
            }}>
              Expert advice, financial insights, and structured settlement tips — all in one place. Learn from industry professionals.
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
                Get Your Instant Offer
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
    </section>
  );
}

// Article Card Component
function ArticleCard({ article }: { article: any }) {
  return (
    <div>
      <article style={{
        background: 'white',
        borderRadius: '0.5rem',
        height: '100%',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={400}
          height={220}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '400/220',
            objectFit: 'contain',
            background: '#fff'
          }}
          loading="lazy"
        />
        <div style={{ padding: '1.5rem' }}>
          <h5 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: '#1f2937'
          }}>
            {article.title}
            {article.featured && (
              <span style={{
                background: '#059669',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                marginLeft: '0.5rem'
              }}>
                Featured
              </span>
            )}
          </h5>
          <p style={{
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            {article.description}
          </p>
          <Link 
            href={article.href}
            style={{
              color: '#059669',
              border: '1px solid #059669',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#059669';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#059669';
            }}
          >
            Read More
          </Link>
        </div>
      </article>
    </div>
  );
}

// Testimonial Component
function TestimonialSection() {
  return (
    <div style={{ 
      marginTop: '3rem',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%'
      }}>
        <blockquote style={{
          textAlign: 'center',
          padding: '2rem',
          background: '#f8fafc',
          borderRadius: '0.75rem',
          border: 'none',
          margin: 0
        }}>
          <p style={{
            fontSize: '1.125rem',
            color: '#374151',
            marginBottom: '1rem',
            fontStyle: 'italic'
          }}>
            "The articles helped me understand my options and make the best decision for my family."
          </p>
          <footer style={{
            color: '#6b7280',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            D. Nguyen, Illinois
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ faq, isLast }: { faq: any; isLast: boolean }) {
  return (
    <details style={{ marginBottom: isLast ? 0 : '1rem' }}>
      <summary style={{
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '0.5rem 0',
        color: '#1f2937'
      }}>
        {faq.question}
      </summary>
      <div style={{
        marginTop: '0.5rem',
        color: '#6b7280',
        lineHeight: '1.6',
        paddingLeft: '1rem'
      }}>
        {faq.answer}
      </div>
    </details>
  );
}

// Newsletter Subscription Component
function NewsletterSubscription() {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 640);
    };
    
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    if (email) {
      // Here you would integrate with your email service provider
      alert('Thank you for subscribing! You\'ll receive updates about new articles and resources.');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '2.5rem',
      borderRadius: '1rem',
      border: '1px solid #bbf7d0',
      marginTop: '3rem',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>📬</span>
        <h2 style={{
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: '0.75rem',
          fontSize: '1.75rem'
        }}>
          Stay Updated with New Articles
        </h2>
        <p style={{
          color: '#4b5563',
          fontSize: '1.125rem',
          lineHeight: '1.6',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          Get expert insights, tips, and guides delivered straight to your inbox. 
          Never miss important updates about structured settlements. You can also chat with Mint AI anytime for instant help.
        </p>
      </div>
      
      <form onSubmit={handleSubscribe} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          flexDirection: isWideScreen ? 'row' : 'column'
        }}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            style={{
              flex: 1,
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#059669';
              e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Subscribe
          </button>
        </div>
      </form>
      
      <p style={{
        color: '#6b7280',
        fontSize: '0.875rem',
        marginTop: '1rem',
        marginBottom: 0
      }}>
        📧 Monthly updates • 🔒 No spam • ✅ Unsubscribe anytime
      </p>
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '3rem'
    }}>
      <h2 style={{
        fontWeight: 'bold',
        color: '#059669',
        marginBottom: '1.5rem',
        fontSize: '1.5rem'
      }}>
        Articles FAQ
      </h2>
      {faqData.map((faq, index) => (
        <FAQItem 
          key={faq.id} 
          faq={faq} 
          isLast={index === faqData.length - 1}
        />
      ))}
    </div>
  );
}

// Final CTA Component
function FinalCTA() {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '2rem',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <Link 
        href="/mint-intelligent-chat"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        💬 Chat with Mint AI
      </Link>
      <Link 
        href="/faqs"
        style={{
          color: '#059669',
          border: '1px solid #059669',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: '500',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#059669';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#059669';
        }}
      >
        Browse All FAQs & Topics
      </Link>
    </div>
  );
}

// Bottom CTA Component
function BottomCTA() {
  return (
    <div style={{
      textAlign: 'center',
      margin: '3rem 0',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      borderRadius: '1rem'
    }}>
      <Link 
        href="/pricing-calculator"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '2rem',
          fontSize: '1.125rem',
          fontWeight: 'bold',
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
        }}
      >
        Get Your Instant Offer
      </Link>
    </div>
  );
}

// Main Articles Page Component
export default function Articles() {
  return (
    <>
      <HeroSection />
      
      <section aria-label="Structured Settlement Resources and Articles" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        <TestimonialSection />
        <NewsletterSubscription />
        <FAQSection />
        <FinalCTA />
      </section>
      
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <BottomCTA />
      </div>
    </>
  );
}