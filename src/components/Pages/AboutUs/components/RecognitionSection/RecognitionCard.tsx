/**
 * Recognition Card Component
 * 
 * Individual recognition card component with hover effects, animations,
 * and accessibility features. Displays credentials, awards, and certifications
 * in an engaging and trustworthy format.
 * 
 * @component RecognitionCard
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import type { RecognitionCardProps } from '../../types';

/**
 * Recognition card component
 * 
 * @param {RecognitionCardProps} props - Component props
 * @returns {JSX.Element} Interactive recognition card
 */
export default function RecognitionCard({
  recognition,
  index
}: RecognitionCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle card hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle card click for external links
   */
  const handleClick = useCallback(() => {
    if (recognition.link) {
      window.open(recognition.link, '_blank', 'noopener,noreferrer');
    }
  }, [recognition.link]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  /**
   * Get type-specific styling
   */
  const getTypeStyles = useCallback(() => {
    const typeStyles = {
      certification: {
        borderColor: '#059669',
        iconBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        glowColor: '#059669'
      },
      award: {
        borderColor: '#d97706',
        iconBg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        glowColor: '#d97706'
      },
      license: {
        borderColor: '#2563eb',
        iconBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        glowColor: '#2563eb'
      },
      accreditation: {
        borderColor: '#dc2626',
        iconBg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        glowColor: '#dc2626'
      }
    };
    return typeStyles[recognition.type] || typeStyles.certification;
  }, [recognition.type]);

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "2rem",
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px ${typeStyles.borderColor}40`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: `2px solid ${isHovered ? typeStyles.borderColor + '60' : 'transparent'}`,
        cursor: recognition.link ? "pointer" : "default",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onClick={recognition.link ? handleClick : undefined}
      onKeyDown={recognition.link ? handleKeyDown : undefined}
      tabIndex={recognition.link ? 0 : -1}
      role={recognition.link ? "button" : "article"}
      aria-label={recognition.link ? `Learn more about ${recognition.title}` : undefined}
      aria-labelledby={`recognition-title-${index}`}
      aria-describedby={`recognition-desc-${index}`}
    >
      {/* Background Glow Effect */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, ${typeStyles.glowColor}08, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Recognition Icon */}
        <div style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: isHovered ? typeStyles.iconBg : `${typeStyles.borderColor}15`,
          border: `2px solid ${typeStyles.borderColor}30`,
          margin: "0 auto 1.5rem",
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)"
        }}>
          <span 
            role="img" 
            aria-label={`${recognition.title} icon`}
            style={{
              filter: isHovered ? "drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3))" : "none",
              transition: "filter 0.3s ease"
            }}
          >
            {recognition.icon}
          </span>
        </div>

        {/* Recognition Title */}
        <h3 
          id={`recognition-title-${index}`}
          style={{
            fontSize: "1.125rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.75rem",
            lineHeight: "1.4",
            transition: "color 0.3s ease"
          }}
        >
          {recognition.title}
        </h3>

        {/* Recognition Description */}
        <p 
          id={`recognition-desc-${index}`}
          style={{
            fontSize: "0.875rem",
            color: "#374151",
            lineHeight: "1.6",
            margin: "0",
            transition: "color 0.3s ease"
          }}
        >
          {recognition.description}
        </p>

        {/* External Link Indicator */}
        {recognition.link && (
          <div style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            color: typeStyles.borderColor,
            fontSize: "0.75rem",
            fontWeight: "600",
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.3s ease"
          }}>
            <span>View Credential</span>
            <span style={{
              transform: isHovered ? "translateX(2px)" : "translateX(0)",
              transition: "transform 0.2s ease"
            }}>
              →
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: `${typeStyles.borderColor}20`,
          color: typeStyles.borderColor,
          padding: "0.25rem 0.5rem",
          borderRadius: "12px",
          fontSize: "0.625rem",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          opacity: isHovered ? 1 : 0.6,
          transition: "opacity 0.3s ease"
        }}>
          {recognition.type}
        </div>
      </div>

      {/* Shimmer Effect on Hover */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: "0%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${typeStyles.borderColor}20, transparent)`,
          transform: isHovered ? "translateX(200%)" : "translateX(-100%)",
          transition: "transform 0.6s ease",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />
    </div>
  );
}
