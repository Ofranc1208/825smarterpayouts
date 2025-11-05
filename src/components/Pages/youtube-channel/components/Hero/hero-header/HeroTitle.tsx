import React from 'react';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

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
        ...TEXT_PRESETS.heroTitle,
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        color: COLORS.neutral.gray900,
        marginBottom: "1.5rem",
        lineHeight: "1.2",
        background: COLORS.titleGradients.grayToGreen,
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
