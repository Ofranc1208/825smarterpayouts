'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import MintBadge from '../components/MintBadge';

const faqs = [
  {
    id: 1,
    question: "Is it legal to sell my structured settlement?",
    answer: "Yes, selling your structured settlement is 100% legal. The process is court-approved to ensure it's in your best interest, with all transactions reviewed by a judge.",
    category: "Legal"
  },
  {
    id: 2,
    question: "How do I get a quote?",
    answer: "Use our structured settlement calculator to get an instant, secure quote — no personal data, no phone calls. Just your payment details and timing.",
    category: "Process"
  },
  {
    id: 3,
    question: "How does court approval work?",
    answer: "Once you accept your quote, we handle the court paperwork. The judge will review your case in a short hearing — typically within 30 days — to ensure everything is fair and legal.",
    category: "Legal"
  },
  {
    id: 4,
    question: "How fast can I get paid?",
    answer: "Many of our clients receive funds in as little as 24–72 hours after court approval. We offer direct deposit, paper check, or secure digital transfer.",
    category: "Timing"
  },
  {
    id: 5,
    question: "What are the benefits of selling my structured settlement?",
    answer: "Selling allows you to access your future funds now — to eliminate debt, pay medical bills, invest, or improve your quality of life. Our process is transparent, fast, and court-approved.",
    category: "Benefits"
  },
  {
    id: 6,
    question: "Do I need a lawyer?",
    answer: "You don't need a lawyer to start, but you are always encouraged to seek independent legal or financial advice. We make sure everything is done clearly and transparently.",
    category: "Legal"
  },
  {
    id: 7,
    question: "What makes SmarterPayouts different?",
    answer: "We're the first company to offer 100% digital quoting — no cold calls, no pressure. Built by legal and tech experts, our platform is built for you: fast, safe, and human-first.",
    category: "Company"
  },
  {
    id: 8,
    question: "What's the difference between a structured settlement and an annuity?",
    answer: "A structured settlement is tax-free and comes from a legal settlement, while annuities are typically taxable investments. Structured settlements offer unique legal protections and are designed for injury compensation.",
    category: "Education"
  },
  {
    id: 9,
    question: "Can I sell my settlement if I live in any state?",
    answer: "Yes, structured settlement sales are legal in all 50 states, but each state has specific court approval requirements. We're licensed to work nationwide and know each state's requirements.",
    category: "Legal"
  },
  {
    id: 10,
    question: "How much will court approval cost me?",
    answer: "Court filing fees are typically $100-$500 depending on your state. At SmarterPayouts, we handle all court costs and paperwork for you at no additional charge — they're included in our service.",
    category: "Costs"
  },
  {
    id: 11,
    question: "Will selling affect my taxes?",
    answer: "The lump sum you receive from selling may have different tax implications than your regular payments. We recommend consulting with a tax professional, and can connect you with qualified CPAs if needed.",
    category: "Taxes"
  },
  {
    id: 12,
    question: "What if I only want to sell some of my payments?",
    answer: "Absolutely! You can sell just a portion of your future payments and keep the rest. This is called a 'partial sale' and many clients choose this option to balance immediate needs with future security.",
    category: "Process"
  },
];

const categories = [
  { name: "All", icon: "📋" },
  { name: "Legal", icon: "⚖️" },
  { name: "Process", icon: "🔄" },
  { name: "Timing", icon: "⏰" },
  { name: "Benefits", icon: "💎" },
  { name: "Company", icon: "🏢" },
  { name: "Education", icon: "📚" },
  { name: "Costs", icon: "💰" },
  { name: "Taxes", icon: "📊" },
];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqs, setOpenFaqs] = useState<number[]>([1]);

  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setOpenFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | SmarterPayouts</title>
        <meta name="description" content="Get answers to common questions about selling structured settlements, court approval process, and getting your cash quickly and securely." />
        <meta name="keywords" content="structured settlement FAQ, selling structured settlement questions, court approval FAQ, settlement payout questions" />
      </Head>

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
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              <MintBadge variant="compact" style={{ marginBottom: "2rem" }} />
              <div style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#059669",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem"
              }}>
                Get Your Answers
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                Frequently Asked Questions
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.6"
              }}>
                Everything you need to know about selling your structured settlement, the court approval process, and how to get your cash quickly and securely.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
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
              textAlign: "center",
              marginBottom: "3rem"
            }}>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                Browse by Category
              </h2>
              <p style={{
                fontSize: "1rem",
                color: "#6b7280",
                marginBottom: "2rem"
              }}>
                Find answers to your specific questions by selecting a category below
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: "0.5rem",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 0.5rem",
                    borderRadius: "7px",
                    border: "none",
                    background: activeCategory === category.name 
                      ? "linear-gradient(135deg, #09b44d 0%, #059669 100%)"
                      : "white",
                    color: activeCategory === category.name ? "white" : "#6b7280",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: activeCategory === category.name 
                      ? "0 4px 10px rgba(9, 180, 77, 0.18)"
                      : "0 1px 4px rgba(0, 0, 0, 0.06)",
                    minHeight: "54px",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.name) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.name) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.06)";
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: "1.05rem",
                    opacity: activeCategory === category.name ? "1" : "0.8"
                  }}>
                    {category.icon}
                  </span>
                  <span style={{
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    textAlign: "center"
                  }}>
                    {category.name}
                  </span>
                  {activeCategory === category.name && (
                    <div style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      height: "2px",
                      background: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "0 0 7px 7px"
                    }}></div>
                  )}
                </button>
              ))}
            </div>
            <div style={{
              textAlign: "center",
              marginTop: "2rem",
              padding: "1rem",
              background: "#f0fdf4",
              borderRadius: "8px",
              border: "1px solid #bbf7d0"
            }}>
              <p style={{
                margin: "0",
                fontSize: "0.9rem",
                color: "#059669",
                fontWeight: "500"
              }}>
                📊 Showing {filteredFaqs.length} of {faqs.length} questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            width: '100%'
          }}>
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "1px solid #f3f4f6"
            }}>
              {filteredFaqs.map((faq) => (
                <div key={faq.id} style={{
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "1rem"
                }}>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: "100%",
                      padding: "1.5rem",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <h3 style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0",
                      lineHeight: "1.4"
                    }}>
                      {faq.question}
                    </h3>
                    <span style={{
                      fontSize: "1.25rem",
                      color: "#059669",
                      transition: "transform 0.2s ease",
                      transform: openFaqs.includes(faq.id) ? "rotate(45deg)" : "rotate(0deg)"
                    }}>
                      +
                    </span>
                  </button>
                  {openFaqs.includes(faq.id) && (
                    <div style={{
                      padding: "0 1.5rem 1.5rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      {faq.answer.includes('structured settlement calculator') ? (
                        <>
                          Use our{' '}
                          <Link
                            href="/pricing-calculator"
                            style={{
                              color: "#059669",
                              fontWeight: "600",
                              textDecoration: "underline"
                            }}
                          >
                            structured settlement calculator
                          </Link>{' '}
                          to get an instant, secure quote — no personal data, no phone calls. Just your payment details and timing.
                        </>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{
        background: "#f9fafb",
        padding: "4rem 0"
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
              textAlign: 'center',
              width: '100%'
            }}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "3rem 2rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold"
                }}>
                  🛡️
                </div>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "1rem"
                }}>
                  SmarterPayouts is 100% Compliant
                </h2>
                <p style={{
                  color: "#6b7280",
                  fontSize: "1.125rem",
                  marginBottom: "2rem"
                }}>
                  Secure, court-approved, and built for your peace of mind.
                </p>
                <blockquote style={{
                  fontStyle: "italic",
                  fontSize: "1.125rem",
                  color: "#4b5563",
                  margin: "2rem 0",
                  padding: "1rem",
                  borderLeft: "4px solid #059669",
                  background: "#f0fdf4"
                }}>
                  "The FAQ made everything clear. I felt confident and informed every step of the way!"
                  <footer style={{
                    marginTop: "1rem",
                    fontSize: "0.95rem",
                    color: "#6b7280",
                    fontWeight: "600"
                  }}>
                    — L. Carter, New York
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center',
            width: '100%'
          }}>
            <div style={{
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              borderRadius: "16px",
              padding: "3rem 2rem",
              color: "white"
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                marginBottom: "1rem"
              }}>
                Still Have Questions?
              </h2>
              <p style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                opacity: "0.9"
              }}>
                Our team is here to help you understand every step of the process. You can also chat with Mint AI for instant answers 24/7.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/mint-intelligent-chat" style={{
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
                <Link href="/contact" style={{
                  background: "white",
                  color: "#059669",
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
                  Contact Us
                </Link>
                <Link href="/pricing-calculator" style={{
                  border: "2px solid white",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "white";
                }}>
                  Get Your Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
