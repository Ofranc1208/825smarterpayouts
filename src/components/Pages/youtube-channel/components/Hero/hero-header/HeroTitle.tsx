import React from 'react';

/**
 * Hero Title Component for YouTube Channel
 * 
 * Displays the main hero title with gradient text effects
 * and responsive typography.
 * 
 * @component HeroTitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroTitleProps {
  /** Title text content */
  title?: string;
  /** HTML element ID for accessibility */
  id?: string;
}

/**
 * Hero Title Component
 * 
 * ## Features
 * - ✅ Responsive typography with clamp()
 * - ✅ Gradient text effects
 * - ✅ Accessibility compliance
 * - ✅ SEO optimization
 * 
 * @param props - Component props
 * @returns JSX element for hero title
 * 
 * @example
 * ```tsx
 * <HeroTitle 
 *   title="SmarterPayouts Video Library" 
 *   id="hero-title" 
 * />
 * ```
 */
export default function HeroTitle({ 
  title = "SmarterPayouts Video Library",
  id = "hero-title"
}: HeroTitleProps) {
  return (
    <h1 
      id={id}
      style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1.5rem",
        lineHeight: "1.2",
        background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textAlign: "center"
      }}
    >
      {title}
    </h1>
  );
}
