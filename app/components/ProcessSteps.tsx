'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface StepCardProps {
  to: string;
  icon: string;
  title: string;
  text: string;
}

const StepCard = ({ to, icon, title, text }: StepCardProps) => {
  const stepNumber = icon; // Now using the icon field for step numbers
  
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Link href={to} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "20px",
          padding: "2rem 1.5rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-12px) scale(1.03)";
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(5, 150, 105, 0.2)";
          e.currentTarget.style.borderColor = "#059669";
          e.currentTarget.style.background = "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)";
        }}>
          {/* Clean Step Number Circle */}
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "800",
            color: "white",
            boxShadow: "0 8px 24px rgba(5, 150, 105, 0.3)",
            position: "relative"
          }}>
            {/* Simple outer ring */}
            <div style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #059669, #047857)",
              zIndex: -1,
              opacity: 0.3
            }}></div>
            
            <span>{stepNumber}</span>
          </div>
          
          <h3 style={{
            fontWeight: "700",
            color: "#1f2937",
            fontSize: "1.375rem",
            marginBottom: "1rem",
            lineHeight: "1.3"
          }}>{title}</h3>
          <p style={{
            color: "#374151",
            fontSize: "1rem",
            margin: 0,
            lineHeight: "1.6",
            fontWeight: "400"
          }}>{text}</p>
          
          {/* Premium accent */}
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #f0fdf4 0%, transparent 100%)",
            borderRadius: "0 20px 0 40px"
          }}></div>
        </div>
      </Link>
    </div>
  );
};

// Custom hook for responsive grid - Next.js 14.3 stable approach
const useResponsiveGrid = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [gridColumns, setGridColumns] = useState('1fr');

  useEffect(() => {
    setIsMounted(true);
    
    const updateGrid = () => {
      const width = window.innerWidth;
      if (width >= 992) {
        setGridColumns('repeat(4, 1fr)'); // lg: 4 columns
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

export default function ProcessSteps() {
  const { isMounted, gridColumns } = useResponsiveGrid();

  return (
    <section style={{
      padding: "1rem 0",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      position: "relative"
    }}>
      {/* Modern Timeline Background */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, #e5e7eb 20%, #059669 50%, #e5e7eb 80%, transparent 100%)",
        zIndex: 0
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
            background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
            border: "1px solid #bbf7d0",
            borderRadius: "24px",
            padding: "0.5rem 1rem",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#047857",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            How It Works
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            From Quote to Cash in 4 Simple Steps
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#374151",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.7"
          }}>
            Our AI-powered platform streamlines the entire process, making it faster and more transparent than ever before
          </p>
        </div>
        <div style={{
          display: isMounted ? "grid" : "block",
          gridTemplateColumns: isMounted ? gridColumns : "1fr",
          gap: "1.5rem",
          alignItems: "stretch",
          textAlign: "center"
        }}>
          <StepCard
            to="/pricing-calculator"
            icon="1"
            title="Get Instant Quote"
            text="Our AI-powered calculator analyzes your settlement and provides an instant, personalized quote with no personal information required."
          />
          <StepCard
            to="/review-offer"
            icon="2"
            title="Review Terms"
            text="Compare our transparent offer with competitors. No hidden fees, no pressure tactics - just clear, honest pricing."
          />
          <StepCard
            to="/court-approval"
            icon="3"
            title="Legal Process"
            text="Our experienced legal team handles all court filings and proceedings while keeping you informed every step of the way."
          />
          <StepCard
            to="/get-your-cash"
            icon="4"
            title="Receive Funds"
            text="Get your money fast via secure wire transfer or certified check - typically within 2-5 business days after approval."
          />
        </div>
      </div>

    </section>
  );
}
