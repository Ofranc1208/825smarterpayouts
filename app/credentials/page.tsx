'use client';
import React from 'react';
import Head from 'next/head';

const credentials = [
  {
    title: 'Better Business Bureau',
    description: 'SmarterPayouts is listed with the BBB under their free verification program. While we do not pay for accreditation, our registration allows customers to verify our identity and view public feedback.',
    link: 'https://www.bbb.org/',
    linkText: 'Verify on BBB',
    color: '#fbbf24',
    accentColor: '#f59e0b',
    icon: '🏆'
  },
  {
    title: 'Florida Corporation Registration',
    description: 'SmarterPayouts is a fully registered legal entity in the State of Florida. This official record verifies our legal standing and corporate identity.',
    link: 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName',
    linkText: 'Verify on Sunbiz',
    color: '#059669',
    accentColor: '#047857',
    icon: '📋'
  },
  {
    title: 'Sunbiz Registration',
    description: 'Sunbiz is the official corporate registry for Florida. SmarterPayouts can be found on Sunbiz, validating our formation, structure, and legal representatives.',
    link: 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName',
    linkText: 'View on Sunbiz',
    color: '#fbbf24',
    accentColor: '#f59e0b',
    icon: '🏛️'
  },
  {
    title: 'SSL Certificate of Incorporation',
    description: 'Our website and backend operations are secured with full SSL certification. This ensures secure, encrypted communication for all user activity.',
    link: 'https://www.ssllabs.com/ssltest/analyze.html?d=smarterpayouts.com',
    linkText: 'Check SSL',
    color: '#059669',
    accentColor: '#047857',
    icon: '🔒'
  }
];

export default function CredentialsPage() {
  return (
    <>
      <Head>
        <title>Our Credentials | SmarterPayouts</title>
        <meta name="description" content="Verify SmarterPayouts credentials including BBB registration, Florida corporation status, and SSL certification. Transparent and trustworthy structured settlement company." />
        <meta name="keywords" content="SmarterPayouts credentials, BBB registration, Florida corporation, SSL certificate, structured settlement company verification" />
        
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmarterPayouts",
              "url": "https://smarterpayouts.com",
              "logo": "https://smarterpayouts.com/assets/images/logo.png",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-954-764-9750",
                  "contactType": "customer service",
                  "areaServed": "US",
                  "availableLanguage": "English"
                }
              ],
              "sameAs": [
                "https://www.bbb.org/",
                "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName"
              ]
            })
          }}
        />
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
          padding: '0 1rem'
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
                Verified & Trusted
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                Our Credentials
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6"
              }}>
                SmarterPayouts is a transparent, trustworthy structured settlement company dedicated to providing clear, honest service to our clients nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Grid Section */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {credentials.map((credential, index) => (
            <div key={credential.title}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #f3f4f6",
                height: "100%",
                transition: "all 0.3s ease",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}>
                
                {/* Accent Bar */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "48px",
                  height: "4px",
                  borderRadius: "2px",
                  background: credential.color
                }}></div>

                {/* Modern Icon */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: `linear-gradient(135deg, ${credential.color}, ${credential.accentColor})`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: "2rem",
                    color: "white",
                    boxShadow: `0 8px 16px ${credential.color}40`
                  }}>
                    {credential.icon}
                  </div>
                </div>

                {/* Credential Title */}
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: credential.color,
                  textAlign: "center",
                  marginBottom: "1rem"
                }}>
                  {credential.title}
                </h3>

                {/* Credential Description */}
                <p style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  textAlign: "center"
                }}>
                  {credential.description}
                </p>

                {/* Verify Button */}
                <div style={{ textAlign: "center" }}>
                  <a
                    href={credential.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      background: credential.color,
                      color: "white",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      border: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = credential.accentColor;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = credential.color;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {credential.linkText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section style={{
        background: "#f9fafb",
        padding: "4rem 0"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                Why Trust SmarterPayouts?
              </h2>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                marginBottom: "3rem"
              }}>
                Our credentials demonstrate our commitment to transparency, security, and regulatory compliance.
              </p>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold"
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Transparent Process
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  Clear, honest communication throughout every step of your transaction.
                </p>
              </div>
            </div>
            <div>
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold"
                }}>
                  🔒
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Secure & Compliant
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  Full SSL encryption and regulatory compliance for your peace of mind.
                </p>
              </div>
            </div>
            <div>
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold"
                }}>
                  🏆
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Verified & Trusted
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  BBB registered and Florida corporation with full legal standing.
                </p>
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
        padding: '3rem 1rem'
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
                Ready to Get Started?
              </h2>
              <p style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                opacity: "0.9"
              }}>
                Experience the difference of working with a verified, trustworthy structured settlement company.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/pricing-calculator" style={{
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
                  Get Your Quote
                </a>
                <a href="/contact" style={{
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
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 