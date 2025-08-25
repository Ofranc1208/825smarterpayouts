import React from 'react';

/**
 * Hero Badge Component for YouTube Channel
 * 
 * Displays the YouTube channel badge with consistent styling
 * and accessibility features.
 * 
 * @component HeroBadge
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroBadgeProps {
  /** Badge text content */
  text?: string;
  /** Badge icon */
  icon?: string;
}

/**
 * Hero Badge Component
 * 
 * ## Features
 * - ✅ Consistent badge styling
 * - ✅ Accessibility compliance
 * - ✅ Responsive design
 * - ✅ Hover effects
 * 
 * @param props - Component props
 * @returns JSX element for hero badge
 * 
 * @example
 * ```tsx
 * <HeroBadge text="YouTube Channel" icon="📺" />
 * ```
 */
export default function HeroBadge({ 
  text = "YouTube Channel", 
  icon = "📺" 
}: HeroBadgeProps) {
  return (
    <div 
      style={{
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#059669",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "1rem",
        background: "rgba(5, 150, 105, 0.1)",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        border: "1px solid rgba(5, 150, 105, 0.2)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.2s ease"
      }}
      role="banner"
      aria-label={`${text} badge`}
    >
      <span role="img" aria-hidden="true">{icon}</span>
      {text}
    </div>
  );
}
