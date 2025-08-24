'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" style={{
      padding: "1rem 0 4rem 0",
      textAlign: "center", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        position: "relative",
        zIndex: 1
      }}>
        {/* Shiny Silver Mint AI Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
          border: "1px solid #cbd5e1",
          borderRadius: "16px",
          padding: "0.25rem 0.625rem",
          marginTop: "1rem",
          marginBottom: "1.25rem",
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#475569",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)"
        }}>
          <div style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #cbd5e1",
            flexShrink: 0,
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.8)"
          }}>
            <Image
              src="/assets/images/mint-mascot.png"
              alt="Mint AI"
              width={10}
              height={10}
              style={{ display: 'inline-block' }}
            />
          </div>
          <span>Powered by Mint AI</span>
        </div>

        <h1 id="hero-heading" style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: "700",
          color: "#047857", // Darker green for better contrast
          lineHeight: "1.2",
          marginBottom: "1rem"
        }}>
          Revolutionize Your Financial Future
        </h1>
        
        <p style={{
          fontSize: "1.125rem",
          color: "#374151",
          maxWidth: "700px",
          margin: "0 auto 1.5rem",
          lineHeight: "1.6",
          fontWeight: "400"
        }}>
          Turn your future structured settlement payments into fast, upfront cash — with zero out-of-pocket cost and a fully court-approved process.
        </p>
        
        <div style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1.5rem"
        }}>
          <Link href="/pricing-calculator" 
            aria-label="Get your instant structured settlement quote with our AI-powered calculator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#22c55e",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
              border: "2px solid #15803d"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(34, 197, 94, 0.4)";
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.borderColor = "#14532d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
              e.currentTarget.style.background = "#22c55e";
              e.currentTarget.style.borderColor = "#15803d";
            }}>
            <span style={{ fontSize: "1rem" }}>⚡</span>
            Get Instant Quote
          </Link>
          
          <Link href="/mint-intelligent-chat" 
            aria-label="Chat with our AI assistant for personalized guidance"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#fbbf24",
              color: "#78350f",
              padding: "0.75rem 1.5rem",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              border: "2px solid #d97706",
              boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(251, 191, 36, 0.4)";
              e.currentTarget.style.background = "#f59e0b";
              e.currentTarget.style.borderColor = "#b45309";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(251, 191, 36, 0.3)";
              e.currentTarget.style.background = "#fbbf24";
              e.currentTarget.style.borderColor = "#d97706";
            }}>
            
            {/* Visible Mint icon */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "1px solid #064e3b"
            }}>
              <Image
                src="/assets/images/mint-mascot.png"
                alt="Mint AI"
                width={20}
                height={20}
                style={{ 
                  display: 'inline-block',
                  filter: 'brightness(1.2) contrast(1.1)'
                }}
              />
            </div>
            
            <span>Chat with Mint AI</span>
          </Link>
        </div>

        <p style={{
          color: "#6b7280",
          maxWidth: "680px",
          margin: "0 auto 0 auto",
          fontSize: "1rem",
          lineHeight: "1.6",
          fontWeight: "400"
        }}>
          Our{' '}
          <Link href="/pricing-calculator" style={{
            color: "#047857", // Improved contrast
            textDecoration: "underline",
            fontWeight: "500"
          }}>
            Early Payout Calculator
          </Link>{' '}
          gives you a private, instant quote. No calls, no sales pressure, and no personal data required.
        </p>
      </div>
      <style jsx>{`
        .hero-section-spaced {
          padding-top: 4rem;
          padding-bottom: 1rem;
        }
        .hero-content-wrapper {
          margin-bottom: 2rem;
        }
        .hero-cta-bottom {
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .hero-section-spaced {
            padding-top: 2rem;
            padding-bottom: 1rem;
          }
          .hero-content-wrapper {
            margin-bottom: 0;
          }
          .hero-cta-bottom {
            margin-bottom: 1rem;
          }
        }
        @media (max-width: 400px) {
          .hero-section-spaced {
            padding-top: 1.5rem;
            padding-bottom: 0.5rem;
          }
          .hero-cta-bottom {
            margin-bottom: 0.5rem;
          }
        }
        
        /* Optimized Animations for Performance */
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes livePulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.1); 
          }
        }
      `}</style>
    </section>
  );
}

