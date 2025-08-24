/**
 * Technology Feature Card Component
 * 
 * Individual feature card component with hover effects, animations,
 * and interactive elements. Features accessibility support and
 * performance optimizations.
 * 
 * @component TechnologyFeatureCard
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import type { FeatureCardProps } from '../../types';

/**
 * Technology feature card component
 * 
 * @param {FeatureCardProps} props - Component props
 * @returns {JSX.Element} Interactive feature card
 */
export default function TechnologyFeatureCard({
  feature,
  index,
  onClick
}: FeatureCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle card hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle card click
   */
  const handleClick = useCallback(() => {
    if (feature.link) {
      window.open(feature.link, '_self');
    }
    onClick?.();
  }, [feature.link, onClick]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: isHovered 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        cursor: feature.link ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onClick={feature.link ? handleClick : undefined}
      onKeyDown={feature.link ? handleKeyDown : undefined}
      tabIndex={feature.link ? 0 : -1}
      role={feature.link ? "button" : "article"}
      aria-label={feature.link ? `Learn more about ${feature.title}` : undefined}
    >
      {/* Background Gradient Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: feature.gradient || feature.color || "#059669",
          opacity: isHovered ? 1 : 0.7,
          transition: "opacity 0.3s ease"
        }}
        aria-hidden="true"
      />

      {/* Feature Icon */}
      <div style={{
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${feature.color || '#059669'}15, ${feature.color || '#059669'}08)`,
        border: `2px solid ${feature.color || '#059669'}20`,
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)"
      }}>
        <span role="img" aria-label={`${feature.title} icon`}>
          {feature.icon}
        </span>
      </div>

      {/* Feature Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Feature Title */}
        <h3 style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "1rem",
          lineHeight: "1.4"
        }}>
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p style={{
          fontSize: "0.875rem",
          color: "#6b7280",
          lineHeight: "1.6",
          marginBottom: feature.link ? "2rem" : "0",
          flex: 1
        }}>
          {feature.description}
        </p>

        {/* Feature Link/Button */}
        {feature.link && feature.linkText && (
          <div style={{
            marginTop: "auto"
          }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: feature.color || "#059669",
                fontWeight: "600",
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
                transform: isHovered ? "translateX(4px)" : "translateX(0)"
              }}
              aria-hidden="true" // Parent handles the interaction
            >
              {feature.linkText}
              <span style={{
                fontSize: "1rem",
                transition: "transform 0.2s ease",
                transform: isHovered ? "translateX(2px)" : "translateX(0)"
              }}>
                →
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${feature.color || '#059669'}03, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />
    </div>
  );
}
