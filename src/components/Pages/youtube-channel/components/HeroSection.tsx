/**
 * YouTube Channel Hero Section Component
 * 
 * Hero section for the YouTube channel page featuring the main title,
 * description, and primary call-to-action buttons. Includes hover effects,
 * responsive design, and accessibility features.
 * 
 * @component HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';

/**
 * Props for the HeroSection component
 */
interface HeroSectionProps {
  /** Optional custom title override */
  title?: string;
  /** Optional custom description override */
  description?: string;
  /** Optional custom YouTube channel URL */
  channelUrl?: string;
  /** Optional custom Mint AI chat URL */
  mintChatUrl?: string;
}

/**
 * Hero section component for YouTube channel page
 * 
 * @param {HeroSectionProps} props - Component props
 * @returns {JSX.Element} Hero section with title, description, and CTA buttons
 */
export default function HeroSection({
  title = "SmarterPayouts Video Library",
  description = "Learn about structured settlements, early payouts, and financial strategies through our educational video content.",
  channelUrl = "https://www.youtube.com/@smarterpayouts",
  mintChatUrl = "/mint-intelligent-chat"
}: HeroSectionProps): JSX.Element {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  /**
   * Handle button hover state
   */
  const handleButtonHover = useCallback((buttonId: string | null) => {
    setHoveredButton(buttonId);
  }, []);

  /**
   * Get button styles based on hover state
   */
  const getButtonStyles = useCallback((buttonId: string, baseStyles: React.CSSProperties) => {
    const isHovered = hoveredButton === buttonId;
    return {
      ...baseStyles,
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      boxShadow: isHovered ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
      transition: "all 0.2s ease"
    };
  }, [hoveredButton]);

  return (
    <section 
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "4rem 0 3rem",
        position: "relative",
        overflow: "hidden"
      }}
      aria-labelledby="hero-title"
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Badge */}
          <div style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem",
            background: "rgba(5, 150, 105, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid rgba(5, 150, 105, 0.2)"
          }}>
            📺 YouTube Channel
          </div>
          
          {/* Main Title */}
          <h1 
            id="hero-title"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
              background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: "1.6"
          }}>
            {description}
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {/* Subscribe Button */}
            <a 
              href={channelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Subscribe to SmarterPayouts YouTube Channel"
              style={getButtonStyles("subscribe", {
                display: "inline-block",
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                fontSize: "1rem"
              })}
              onMouseEnter={() => handleButtonHover("subscribe")}
              onMouseLeave={() => handleButtonHover(null)}
              onFocus={() => handleButtonHover("subscribe")}
              onBlur={() => handleButtonHover(null)}
            >
              📺 Subscribe to Channel
            </a>
            
            {/* Mint AI Button */}
            <a 
              href={mintChatUrl}
              aria-label="Chat with Mint AI Assistant"
              style={getButtonStyles("mint", {
                display: "inline-block",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                fontSize: "1rem"
              })}
              onMouseEnter={() => handleButtonHover("mint")}
              onMouseLeave={() => handleButtonHover(null)}
              onFocus={() => handleButtonHover("mint")}
              onBlur={() => handleButtonHover(null)}
            >
              💬 Chat with Mint AI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
