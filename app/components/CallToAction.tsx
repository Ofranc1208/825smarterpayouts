'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <section style={{
      padding: "1rem 0",
      textAlign: "center",
      background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
      borderTop: "1px solid #e5e7eb",
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
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      <div style={{ 
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        position: "relative", 
        zIndex: 1 
      }}>
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "2rem 2rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Ready to Transform Your Financial Future?
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#374151", // Improved contrast for accessibility
            marginBottom: "2.5rem",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: "1.6",
            fontWeight: "400"
          }}>
            Get your instant quote today or chat with our AI assistant for personalized guidance. 
            No personal information required to get started.
          </p>
          
          <div style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem"
          }}>
            <Link href="/pricing-calculator" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 8px 24px rgba(5, 150, 105, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(5, 150, 105, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(5, 150, 105, 0.3)";
            }}>
              <span style={{ 
                fontSize: "1.25rem", 
                fontWeight: "800",
                background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}>⚡</span>
              Get Your Instant Offer
            </Link>
            
            <Link href="/mint-intelligent-chat" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "white",
              color: "#059669",
              padding: "1rem 2rem",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "2px solid #059669",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(5, 150, 105, 0.2)";
              e.currentTarget.style.background = "#f0fdf4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.background = "white";
            }}>
              <Image
                src="/assets/images/mint-mascot.png"
                alt="Mint AI"
                width={30}
                height={30}
                style={{ display: 'inline-block' }}
              />
              Chat with Mint AI
            </Link>
          </div>
          
          <div style={{
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "1px solid #bbf7d0",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <p style={{
              margin: "0",
              fontSize: "1rem",
              color: "#059669",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              <span style={{ 
                fontSize: "1.25rem",
                width: "24px",
                height: "24px",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}>⚡</span>
              <strong>Average processing time: 3-5 business days</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
