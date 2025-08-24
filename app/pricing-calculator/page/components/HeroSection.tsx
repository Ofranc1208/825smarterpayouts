import React from 'react';

export default function HeroSection() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      padding: "1rem 0 0.5rem",
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
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            {/* Mint AI Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              padding: '0.375rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid #09b44d',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#059669',
              marginBottom: "0.5rem"
            }}>
              🤖 Mint AI
            </div>
            
            <div style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "0.25rem"
            }}>
              Settlement Calculator
            </div>
            
            <h1 style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "0.5rem",
              lineHeight: "1.2"
            }}>
              Calculate Your Settlement Value
            </h1>
            
            <p style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              maxWidth: "450px",
              margin: "0 auto 0.5rem",
              lineHeight: "1.4"
            }}>
              Get instant, accurate quotes using our manual calculator. No personal information required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
