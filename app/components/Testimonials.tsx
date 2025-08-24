'use client';

import React, { useState, useEffect } from 'react';

interface TestimonialProps {
  text: string;
  author: string;
  rating: number;
  avatar?: string;
}

const Testimonial = ({ text, author, rating, avatar }: TestimonialProps) => (
  <div style={{ width: "100%" }}>
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderRadius: "20px",
      padding: "2.5rem 2rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e5e7eb",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(5, 150, 105, 0.15)";
      e.currentTarget.style.borderColor = "#047857"; // Improved contrast
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08)";
      e.currentTarget.style.borderColor = "#e5e7eb";
    }}>
      {/* Quote Icon */}
      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "2rem",
        fontSize: "2rem",
        color: "#047857", // Improved contrast
        opacity: "0.3"
      }}>
        "
      </div>
      
      {/* Rating Stars */}
      <div style={{
        display: "flex",
        gap: "0.25rem",
        marginBottom: "1.5rem"
      }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{
            color: i < rating ? "#fbbf24" : "#d1d5db",
            fontSize: "1.25rem"
          }}>
            ★
          </span>
        ))}
      </div>
      
      {/* Testimonial Text */}
      <p style={{
        fontSize: "1.1rem",
        lineHeight: "1.7",
        color: "#374151",
        marginBottom: "2rem",
        flex: "1",
        fontStyle: "italic",
        fontWeight: "400"
      }}>
        "{text}"
      </p>
      
      {/* Author Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }}>
        {/* Avatar */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)"
        }}>
          {avatar || author.charAt(0).toUpperCase()}
        </div>
        
        {/* Author Info */}
        <div>
          <h6 style={{
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#1f2937"
          }}>
            {author}
          </h6>
          <p style={{
            margin: "0",
            fontSize: "0.875rem",
            color: "#6b7280",
            fontWeight: "400"
          }}>
            Satisfied Client
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Custom responsive hook for Testimonials (3-column grid)
const useTestimonialsGrid = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [gridColumns, setGridColumns] = useState('1fr');

  useEffect(() => {
    setIsMounted(true);
    
    const updateGrid = () => {
      const width = window.innerWidth;
      if (width >= 992) {
        setGridColumns('repeat(3, 1fr)'); // lg: 3 columns
      } else if (width >= 768) {
        setGridColumns('repeat(2, 1fr)'); // md: 2 columns
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

export default function Testimonials() {
  const { isMounted, gridColumns } = useTestimonialsGrid();
  return (
    <section style={{
      padding: "0.5rem 0",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "3rem" 
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
            What Our Clients Say
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Join thousands of satisfied clients who have transformed their financial future with us
          </p>
        </div>
        <div style={{
          display: isMounted ? "grid" : "block",
          gridTemplateColumns: isMounted ? gridColumns : "1fr",
          gap: "1.5rem",
          alignItems: "stretch"
        }}>
          <Testimonial 
            text="Everything was fast and smooth. They were transparent and helpful throughout the entire process. I got my money much faster than expected!" 
            author="Jamie L." 
            rating={5}
          />
          <Testimonial 
            text="No personal info needed to get started. That made me feel safe and comfortable. The AI calculator gave me an instant quote!" 
            author="Daniel K." 
            rating={5}
          />
          <Testimonial 
            text="Court approval sounded scary, but they handled everything professionally. The process was much easier than I imagined." 
            author="Alexis M." 
            rating={5}
          />
        </div>
      </div>
    </section>
  );
}
