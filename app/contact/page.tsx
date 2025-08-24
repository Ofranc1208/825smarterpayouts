'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Image from 'next/image';
import MintBadge from '../components/MintBadge';

export default function Contact() {
  const [formValidated, setFormValidated] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setFormValidated(true);
    } else {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        form.reset();
        setFormValidated(false);
        setThankYouVisible(true);
        setIsSubmitting(false);
        setTimeout(() => setThankYouVisible(false), 4000);
      }, 1000);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | SmarterPayouts</title>
        <meta name="description" content="Get in touch with SmarterPayouts. Our friendly team is here to help you with your structured settlement questions and needs." />
        <meta name="keywords" content="contact SmarterPayouts, structured settlement contact, settlement company contact" />
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
                Get In Touch
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                Contact Us
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.6"
              }}>
                We're here to help you get the most from your structured settlement. Reach out and our friendly team will respond within 24 hours.
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

      {/* Contact Section */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem'
        }}>
          {/* Contact Form */}
          <div>
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "2.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "1px solid #f3f4f6"
            }}>
              <h2 style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "2rem"
              }}>
                Send us a Message
              </h2>
              <form
                id="contactForm"
                noValidate
                onSubmit={handleSubmit}
                style={{
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label htmlFor="name" style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem"
                    }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jane Doe"
                      required
                      style={{
                        width: '100%',
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#059669";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {formValidated && (
                      <div style={{
                        color: "#dc2626",
                        fontSize: "0.875rem",
                        marginTop: "0.5rem"
                      }}>Please enter your name.</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem"
                    }}>
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@email.com"
                      required
                      style={{
                        width: '100%',
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#059669";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {formValidated && (
                      <div style={{
                        color: "#dc2626",
                        fontSize: "0.875rem",
                        marginTop: "0.5rem"
                      }}>Please enter a valid email address.</div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label htmlFor="subject" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    required
                    style={{
                      width: '100%',
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {formValidated && (
                    <div style={{
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      marginTop: "0.5rem"
                    }}>Please enter a subject.</div>
                  )}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label htmlFor="message" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Type your message here..."
                    required
                    style={{
                      width: '100%',
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      resize: "vertical",
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  ></textarea>
                  {formValidated && (
                    <div style={{
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      marginTop: "0.5rem"
                    }}>Please enter your message.</div>
                  )}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting 
                        ? "#9ca3af" 
                        : "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 2rem",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: isSubmitting ? "0.7" : "1"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  {thankYouVisible && (
                    <div
                      id="thankYouMessage"
                      style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "8px",
                        color: "#059669",
                        fontWeight: "600"
                      }}
                      aria-live="polite"
                    >
                      ✅ Thank you! We'll be in touch shortly.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "2.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "1px solid #f3f4f6",
              height: "100%"
            }}>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "2rem"
              }}>
                Contact Information
              </h3>
              
              <div style={{ marginBottom: "2rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #059669, #047857)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.25rem"
                  }}>
                    📧
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Email
                    </div>
                    <a
                      href="mailto:info@smarterpayouts.com"
                      style={{
                        color: "#059669",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "1rem"
                      }}
                    >
                      info@smarterpayouts.com
                    </a>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.25rem"
                  }}>
                    📞
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Phone
                    </div>
                    <a
                      href="tel:+19547649750"
                      style={{
                        color: "#059669",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "1rem"
                      }}
                    >
                      (954) 764-9750
                    </a>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #059669, #047857)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.25rem"
                  }}>
                    ⏰
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Hours
                    </div>
                    <div style={{
                      fontWeight: "500",
                      fontSize: "1rem",
                      color: "#1f2937"
                    }}>
                      Mon–Fri, 9am – 6pm EST
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.25rem",
                    flexShrink: "0"
                  }}>
                    📍
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Address
                    </div>
                    <div style={{
                      fontWeight: "500",
                      fontSize: "1rem",
                      color: "#1f2937",
                      lineHeight: "1.4"
                    }}>
                      433 Plaza Real, Suite 275<br />
                      Boca Raton, FL 33432
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}>
                <iframe
                  width="100%"
                  height="200"
                  loading="lazy"
                  src="https://www.google.com/maps?q=433+Plaza+Real,+Boca+Raton,+FL+33432&output=embed"
                  title="SmarterPayouts Location"
                  aria-label="Map showing SmarterPayouts location in Boca Raton, FL"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mint AI Promotion Section */}
      <section style={{
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        padding: "3rem 0"
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
                padding: "2.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  marginBottom: "1.5rem"
                }}>
                  <Image
                    src="/assets/images/mint-mascot.png"
                    alt="Mint AI Mascot"
                    width={120}
                    height={120}
                    style={{ display: 'inline-block' }}
                  />
                </div>
                <h2 style={{
                  fontSize: "1.35rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "1rem"
                }}>
                  Need Instant Help? Chat with Mint AI
                </h2>
                <p style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  marginBottom: "2rem",
                  lineHeight: "1.6"
                }}>
                  Get immediate answers to your structured settlement questions 24/7 with our AI assistant. No personal information required - just instant, helpful guidance.
                </p>
                <Link href="/mint-intelligent-chat" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  color: "white",
                  padding: "0.75rem 2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
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
                  Start Chatting with Mint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              width: '100%'
            }}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <h2 style={{
                  fontSize: "1.75rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "2rem",
                  textAlign: "center"
                }}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <details style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1rem"
                  }}>
                    <summary style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      cursor: "pointer",
                      fontSize: "1.1rem"
                    }}>
                      How quickly will I get a response?
                    </summary>
                    <div style={{
                      marginTop: "0.75rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      We respond to all inquiries within 24 hours, Monday through Friday. For instant help, try our <Link href="/mint-intelligent-chat" style={{ color: "#8b5cf6", fontWeight: "600", textDecoration: "underline" }}>Mint AI chatbot</Link> available 24/7.
                    </div>
                  </details>
                  <details style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1rem"
                  }}>
                    <summary style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      cursor: "pointer",
                      fontSize: "1.1rem"
                    }}>
                      Can I get a quote without a phone call?
                    </summary>
                    <div style={{
                      marginTop: "0.75rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      Yes! Use our <Link href="/pricing-calculator" style={{ color: "#059669", fontWeight: "600", textDecoration: "underline" }}>Early Payout Calculator</Link> for an instant, no-obligation quote online. You can also learn about <Link href="/how-fast-can-i-get-my-money" style={{ color: "#059669", fontWeight: "600", textDecoration: "underline" }}>how quickly you can get your money</Link>.
                    </div>
                  </details>
                  <details style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1rem"
                  }}>
                    <summary style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      cursor: "pointer",
                      fontSize: "1.1rem"
                    }}>
                      Is my information confidential?
                    </summary>
                    <div style={{
                      marginTop: "0.75rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      Absolutely. We never share your information and all messages are handled securely and privately.
                    </div>
                  </details>
                  <details style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1rem"
                  }}>
                    <summary style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      cursor: "pointer",
                      fontSize: "1.1rem"
                    }}>
                      What if I need urgent help?
                    </summary>
                    <div style={{
                      marginTop: "0.75rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      If your situation is urgent, mention it in your message and we'll prioritize your request. For immediate assistance, our <Link href="/mint-intelligent-chat" style={{ color: "#8b5cf6", fontWeight: "600", textDecoration: "underline" }}>Mint AI chatbot</Link> is available 24/7.
                    </div>
                  </details>
                  <details style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1rem"
                  }}>
                    <summary style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      cursor: "pointer",
                      fontSize: "1.1rem"
                    }}>
                      What is Mint AI and how can it help me?
                    </summary>
                    <div style={{
                      marginTop: "0.75rem",
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      Mint is our AI-powered assistant that can answer your structured settlement questions instantly, 24/7. No personal information required - just ask questions and get immediate, helpful guidance. Perfect for quick questions about the process, requirements, or general information.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
