'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SITE_STATS, SITE_LINKS } from '../config/siteConfig';

// Re-export for backward compatibility
export { SITE_STATS, SITE_LINKS };

export default function InternalLinks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section style={{
      padding: "1rem 0",
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      position: "relative"
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "120px",
        height: "120px",
        background: "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
        borderRadius: "50%"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        width: "80px",
        height: "80px",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
        borderRadius: "50%"
      }}></div>
      
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            border: "1px solid #93c5fd",
            borderRadius: "24px",
            padding: "0.5rem 1rem",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#1d4ed8",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Expert Resources
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #1f2937 0%, #1d4ed8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Everything You Need to Know
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#374151",
            lineHeight: "1.6",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            From legal insights to AI-powered tools, explore our comprehensive knowledge center
          </p>
        </div>
        {/* Featured AI Tool - Clean & Performance Optimized */}
        <div style={{ marginBottom: "3rem" }}>
          
          <Link href="/mint-intelligent-chat" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "1.5rem" : "2rem",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(29, 78, 216, 0.12)";
              e.currentTarget.style.borderColor = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}>
              
              {/* Centered AI Badge */}
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #93c5fd",
                flexShrink: 0,
                position: "relative"
              }}>
                <Image
                  src="/assets/images/mint-mascot.png"
                  alt="Mint AI Assistant"
                  width={40}
                  height={40}
                  style={{ display: 'inline-block' }}
                />
              </div>
              
              {/* Content */}
              <div style={{ flex: 1, maxWidth: "400px" }}>
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.75rem"
                }}>
                  🔥 FEATURED AI TOOL
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                  lineHeight: "1.3"
                }}>
                  Chat with Mint AI Assistant
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: "#374151",
                  margin: 0,
                  lineHeight: "1.5"
                }}>
                  Get instant answers about your settlement, legal requirements, and personalized guidance from our industry-first AI assistant.
                </p>
              </div>
              
              {/* Centered Action Arrow */}
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.25rem",
                flexShrink: 0,
                transition: "transform 0.3s ease",
                boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)"
              }}>
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Supporting Resources Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          <Link href="/review-offer" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
              borderRadius: "16px",
              padding: "2rem",
              border: "1px solid #f3f4f6",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#f3f4f6";
            }}>
              <div style={{
                width: "12px",
                height: "40px",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                borderRadius: "6px",
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>Review Process Guide</h4>
                <p style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  margin: 0
                }}>Learn our transparent review methodology</p>
              </div>
            </div>
          </Link>

          <Link href="/court-approval" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
              borderRadius: "16px",
              padding: "2rem",
              border: "1px solid #f3f4f6",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#7c3aed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#f3f4f6";
            }}>
              <div style={{
                width: "12px",
                height: "40px",
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                borderRadius: "6px",
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>Legal Requirements</h4>
                <p style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  margin: 0
                }}>Understand court approval procedures</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      

    </section>
  );
}
