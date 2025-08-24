'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type ValueItemProps = {
  icon: string;
  title: string;
  text: string;
  link: string;
};

const ValueItem: React.FC<ValueItemProps> = ({ icon, title, text, link }) => (
  <div style={{ width: "100%" }}>
    <Link href={link} style={{ textDecoration: "none", color: "#1f2937" }}>
      <div style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "16px",
        padding: "2rem 1.5rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.15)";
        e.currentTarget.style.borderColor = "#667eea";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}>
        {/* Icon Container - consistent with InternalLinks */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          fontSize: "1.5rem",
          color: "#475569"
        }}>
          {icon}
        </div>
        
        <h6 style={{
          fontWeight: "600",
          color: "#1f2937",
          fontSize: "1.1rem",
          marginBottom: "0.5rem",
          lineHeight: "1.3"
        }}>{title}</h6>
        <p style={{
          color: "#6b7280",
          fontSize: "0.875rem",
          margin: 0,
          lineHeight: "1.5",
          fontWeight: "400"
        }}>{text}</p>
      </div>
    </Link>
  </div>
);

// Custom responsive hook for ValueProps (4-column grid)
const useValuePropsGrid = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [gridColumns, setGridColumns] = useState('1fr');

  useEffect(() => {
    setIsMounted(true);
    
    const updateGrid = () => {
      const width = window.innerWidth;
      if (width >= 992) {
        setGridColumns('repeat(4, 1fr)'); // lg: 4 columns
      } else if (width >= 768) {
        setGridColumns('repeat(2, 1fr)'); // md: 2 columns
      } else if (width >= 576) {
        setGridColumns('repeat(2, 1fr)'); // sm: 2 columns
      } else {
        setGridColumns('1fr'); // xs: 1 column
      }
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  return { isMounted, gridColumns };
};

const ValueProps: React.FC = () => {
  const { isMounted, gridColumns } = useValuePropsGrid();

  return (
  <section style={{
    padding: "1rem 0",
    background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
    position: "relative"
  }}>
    {/* Floating elements for modern look */}
    <div style={{
      position: "absolute",
      top: "10%",
      left: "5%",
      width: "100px",
      height: "100px",
      background: "radial-gradient(circle, rgba(76, 29, 149, 0.1) 0%, transparent 70%)",
      borderRadius: "50%",
      animation: "float 6s ease-in-out infinite"
    }}></div>
    <div style={{
      position: "absolute",
      bottom: "15%",
      right: "8%",
      width: "80px",
      height: "80px",
      background: "radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)",
      borderRadius: "50%",
      animation: "float 8s ease-in-out infinite reverse"
    }}></div>
    
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
      position: "relative",
      zIndex: 1
    }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem" 
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)",
          border: "1px solid #c4b5fd",
          borderRadius: "24px",
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#7c3aed",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          Why Choose Us
        </div>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: "800",
          color: "#1f2937",
          marginBottom: "1rem",
          background: "linear-gradient(135deg, #1f2937 0%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          The SmarterPayouts Advantage
        </h2>
        <p style={{
          fontSize: "1.25rem",
          color: "#374151",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.7"
        }}>
          Advanced technology meets personalized service for the ultimate structured settlement experience
        </p>
      </div>
      
      {/* New Split Layout Design */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMounted ? (window.innerWidth >= 768 ? "1fr 1fr" : "1fr") : "1fr",
        gap: "3rem",
        alignItems: "start"
      }}>
        {/* Left Side - Primary Benefits */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #059669",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(8px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(5, 150, 105, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#059669"
              }}>
                AI
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "0.5rem"
              }}>AI-Powered Instant Quotes</h3>
              <p style={{
                color: "#374151",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Get accurate valuations in seconds using our proprietary machine learning algorithms trained on thousands of settlements.
              </p>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #7c3aed",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(8px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(124, 58, 237, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#7c3aed"
              }}>
                🛡️
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "0.5rem"
              }}>Zero Privacy Compromise</h3>
              <p style={{
                color: "#374151",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Start your evaluation without providing personal information. Your privacy is protected throughout the entire process.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Secondary Benefits */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #dc2626",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(8px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(220, 38, 38, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#dc2626"
              }}>
                ⚖️
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "0.5rem"
              }}>Full Legal Support</h3>
              <p style={{
                color: "#374151",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Our experienced legal team manages all court procedures, ensuring 100% compliance and fastest possible approval.
              </p>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #0891b2",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(8px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(8, 145, 178, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#0891b2"
              }}>
                24/7
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "0.5rem"
              }}>Always Accessible</h3>
              <p style={{
                color: "#374151",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Access our platform anytime, anywhere. Mobile-optimized for seamless experience across all devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CSS animations */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `}</style>
  </section>
  );
};

export default ValueProps;
