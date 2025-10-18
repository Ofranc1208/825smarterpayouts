'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  
  // Don't show footer on dedicated chat page
  if (pathname === '/mint-chat-active') {
    return null;
  }
  return (
    <footer style={{
      background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      color: "#e5e7eb",
      borderTop: "1px solid #374151"
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2.5rem 1rem 1.5rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem"
        }}>
          
          {/* Company Info */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem"
            }}>
              <Image
                src="/assets/images/mint-mascot.png"
                alt="SmarterPayouts"
                width={32}
                height={32}
                style={{ borderRadius: "50%" }}
              />
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#ffffff",
                margin: 0
              }}>
                SmarterPayouts
              </h3>
            </div>
            <p style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
              lineHeight: "1.6",
              margin: "0 0 1rem 0"
            }}>
              Transform your future payments into immediate cash with our AI-powered platform. Fast, secure, and court-approved.
            </p>
            <Link href="/mint-intelligent-chat" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#10b981",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#059669"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#10b981"}>
              💬 Chat with Mint AI
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: "1rem"
            }}>
              Quick Links
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              {[
                { href: "/get-a-quote", label: "Get a Quote" },
                { href: "/get-your-cash", label: "Get Your Cash" },
                { href: "/about", label: "About Us" },
                { href: "/faqs", label: "FAQs" },
                { href: "/testimonials", label: "Reviews" }
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fbbf24"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: "1rem"
            }}>
              Resources
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              {[
                { href: "/articles", label: "Articles" },
                { href: "/structured-settlement-info-hub", label: "Info Hub" },
                { href: "/youtube-channel", label: "YouTube" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fbbf24"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: "1rem"
            }}>
              Legal
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/structured-settlement-laws", label: "Federal Law" },
                { href: "/structured-settlement-laws-by-state", label: "Laws by State" },
                { href: "/credentials", label: "Credentials" }
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fbbf24"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid #374151",
        padding: "1rem 0"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0
          }}>
            &copy; 2025 SmarterPayouts.com - All rights reserved
          </p>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "#6b7280"
          }}>
            <span>Powered by</span>
            <Image
              src="/assets/images/mint-mascot.png"
              alt="Mint AI"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
            />
            <span style={{ color: "#10b981", fontWeight: "600" }}>Mint AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
