'use client';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const platforms = [
  {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    gradient: 'linear-gradient(135deg, #1877F2 0%, #166FE5 100%)',
    desc: 'Follow us on Facebook to stay updated with our latest news and community posts.',
    link: '#'
  },
  {
    name: 'X',
    icon: '𝕏',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    desc: 'Join us on X for real-time updates, tips, and industry insights.',
    link: '#'
  },
  {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    gradient: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
    desc: 'Connect with us on Instagram for behind-the-scenes content and company highlights.',
    link: '#'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    gradient: 'linear-gradient(135deg, #0A66C2 0%, #0077B5 100%)',
    desc: 'Follow our LinkedIn page for professional updates and business news.',
    link: '#'
  },
];

export default function SocialMediaPage() {
  return (
    <>
      <Head>
        <title>Social Media | SmarterPayouts</title>
        <meta name="description" content="Connect with SmarterPayouts on social media for the latest news, tips, and updates about structured settlements." />
        <meta name="keywords" content="SmarterPayouts social media, Facebook, X, Instagram, LinkedIn, structured settlement updates" />
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
              <div style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#059669",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem"
              }}>
                Connect With Us
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                Social Media
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6"
              }}>
                Follow us on social media to stay up to date with the latest news, tips, and updates from SmarterPayouts. We love connecting with our community!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Platforms Grid */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {platforms.map((platform, index) => (
            <div key={platform.name}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #f3f4f6",
                height: "100%",
                transition: "all 0.3s ease",
                position: "relative",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
              onClick={() => window.open(platform.link, '_blank')}>
                
                {/* Platform Icon */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: platform.gradient,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: "2.5rem",
                    color: "white",
                    boxShadow: `0 8px 16px ${platform.color}40`
                  }}>
                    {platform.icon}
                  </div>
                </div>

                {/* Platform Name */}
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: platform.color,
                  textAlign: "center",
                  marginBottom: "1rem"
                }}>
                  {platform.name}
                </h3>

                {/* Platform Description */}
                <p style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  lineHeight: "1.6",
                  textAlign: "center",
                  marginBottom: "1.5rem"
                }}>
                  {platform.desc}
                </p>

                {/* Follow Button */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    display: "inline-block",
                    background: platform.gradient,
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    border: "none"
                  }}>
                    Follow on {platform.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
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
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              maxWidth: '800px'
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                Join Our Community
              </h2>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                marginBottom: "3rem"
              }}>
                Stay connected with thousands of clients who trust SmarterPayouts for their structured settlement needs.
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
                  📈
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Latest Updates
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  Get real-time updates about structured settlement news and industry changes.
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
                  💡
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Expert Tips
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  Receive valuable insights and tips from our structured settlement experts.
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
                  🤝
                </div>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem"
                }}>
                  Community Support
                </h3>
                <p style={{
                  color: "#6b7280",
                  fontSize: "0.95rem"
                }}>
                  Connect with others who have gone through similar experiences.
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
                Ready to Connect?
              </h2>
              <p style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                opacity: "0.9"
              }}>
                Follow us on your favorite platform and stay updated with the latest from SmarterPayouts. You can also chat with Mint AI for instant assistance anytime.
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
                <Link href="/pricing-calculator" style={{
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
                </Link>
                <Link href="/contact" style={{
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 