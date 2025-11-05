import React from 'react';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

/**
 * CTA Title Component for YouTube Channel
 * 
 * Displays the CTA section title with gradient text effects
 * and responsive typography.
 * 
 * @component CTATitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTATitleProps {
  /** Title text content */
  title?: string;
  /** HTML element ID for accessibility */
  id?: string;
  /** Theme color for gradient */
  themeColor?: string;
}

/**
 * CTA Title Component
 * 
 * ## Features
 * - ✅ Responsive typography with clamp()
 * - ✅ Dynamic gradient text effects
 * - ✅ Accessibility compliance
 * - ✅ Theme-based styling
 * 
 * @param props - Component props
 * @returns JSX element for CTA title
 * 
 * @example
 * ```tsx
 * <CTATitle 
 *   title="Want Personalized Guidance?" 
 *   id="cta-title"
 *   themeColor="#059669"
 * />
 * ```
 */
export default function CTATitle({ 
  title = "Want Personalized Guidance?",
  id = "cta-title",
  themeColor = "#059669"
}: CTATitleProps) {
  return (
    <h2 
      id={id}
      style={{
        ...TEXT_PRESETS.heroTitle,
        fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
        color: COLORS.neutral.gray900,
        marginBottom: '1rem',
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center'
      }}
    >
      {title}
    </h2>
  );
}
