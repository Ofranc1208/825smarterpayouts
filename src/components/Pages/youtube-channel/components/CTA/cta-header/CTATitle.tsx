import React from 'react';

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
        fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
        fontWeight: '700',
        marginBottom: '1rem',
        color: themeColor,
        background: `linear-gradient(135deg, ${themeColor} 0%, #1f2937 100%)`,
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
