import React from 'react';
import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';

/**
 * Hero Description Component for YouTube Channel
 * 
 * Displays the hero description text with optimal typography
 * and accessibility features.
 * 
 * @component HeroDescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroDescriptionProps {
  /** Description text content */
  description?: string;
  /** Maximum width for text container */
  maxWidth?: string;
}

/**
 * Hero Description Component
 * 
 * ## Features
 * - ✅ Optimal typography and line height
 * - ✅ Responsive text sizing
 * - ✅ Accessibility compliance
 * - ✅ Centered layout with max width
 * 
 * @param props - Component props
 * @returns JSX element for hero description
 * 
 * @example
 * ```tsx
 * <HeroDescription 
 *   description="Learn about structured settlements..." 
 *   maxWidth="600px"
 * />
 * ```
 */
export default function HeroDescription({ 
  description = "Learn about structured settlements, early payouts, and financial strategies through our educational video content.",
  maxWidth = "600px"
}: HeroDescriptionProps) {
  return (
    <p 
      style={{
        fontSize: TYPOGRAPHY.fontSize.body.medium,
        color: COLORS.text.secondary,
        maxWidth: maxWidth,
        margin: "0 auto 2rem",
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        textAlign: "center"
      }}
    >
      {description}
    </p>
  );
}
