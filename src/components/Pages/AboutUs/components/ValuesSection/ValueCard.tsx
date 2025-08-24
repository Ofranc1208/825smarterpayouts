/**
 * Value Card Component
 * 
 * Individual value card component with hover effects, animations,
 * and accessibility features. Displays company values with icons,
 * titles, and descriptions in an engaging format.
 * 
 * @component ValueCard
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import type { ValueCardProps } from '../../types';

/**
 * Value card component
 * 
 * @param {ValueCardProps} props - Component props
 * @returns {JSX.Element} Interactive value card
 */
export default function ValueCard({
  value,
  index
}: ValueCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle card hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle keyboard focus
   */
  const handleFocus = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      style={{
        background: value.backgroundColor,
        borderRadius: "16px",
        padding: "2rem",
        textAlign: "center",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered 
          ? `0 20px 25px -5px ${value.color}20, 0 10px 10px -5px ${value.color}10`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: `2px solid ${isHovered ? value.color + '40' : 'transparent'}`,
        cursor: "default",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="article"
      aria-labelledby={`value-title-${index}`}
      aria-describedby={`value-desc-${index}`}
    >
      {/* Background Gradient Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${value.color}08, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Value Icon */}
        <div style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${value.color}15, ${value.color}08)`,
          border: `2px solid ${value.color}30`,
          margin: "0 auto 1.5rem",
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)"
        }}>
          <span 
            role="img" 
            aria-label={`${value.title} icon`}
            style={{
              filter: isHovered ? "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" : "none",
              transition: "filter 0.3s ease"
            }}
          >
            {value.icon}
          </span>
        </div>

        {/* Value Title */}
        <h3 
          id={`value-title-${index}`}
          style={{
            fontSize: "1.125rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.75rem",
            lineHeight: "1.4",
            transition: "color 0.3s ease"
          }}
        >
          {value.title}
        </h3>

        {/* Value Description */}
        <p 
          id={`value-desc-${index}`}
          style={{
            fontSize: "0.875rem",
            color: "#374151",
            lineHeight: "1.6",
            margin: "0",
            transition: "color 0.3s ease"
          }}
        >
          {value.description}
        </p>

        {/* Decorative Element */}
        <div 
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
            opacity: isHovered ? 0.8 : 0.3,
            transition: "all 0.3s ease",
            transform: isHovered ? "scale(1.2)" : "scale(1)"
          }}
          aria-hidden="true"
        />
      </div>

      {/* Pulse Animation Ring */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isHovered ? "120%" : "0%",
          height: isHovered ? "120%" : "0%",
          borderRadius: "50%",
          border: `2px solid ${value.color}30`,
          opacity: isHovered ? 0.6 : 0,
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />
    </div>
  );
}
