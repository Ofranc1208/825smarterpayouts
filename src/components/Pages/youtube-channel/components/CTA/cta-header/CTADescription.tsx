import React from 'react';

/**
 * CTA Description Component for YouTube Channel
 * 
 * Displays the CTA section description with optimal typography
 * and accessibility features.
 * 
 * @component CTADescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTADescriptionProps {
  /** Description text content */
  description?: string;
  /** Maximum width for text container */
  maxWidth?: string;
}

/**
 * CTA Description Component
 * 
 * ## Features
 * - ✅ Optimal typography and line height
 * - ✅ Responsive text sizing
 * - ✅ Accessibility compliance
 * - ✅ Centered layout with max width
 * 
 * @param props - Component props
 * @returns JSX element for CTA description
 * 
 * @example
 * ```tsx
 * <CTADescription 
 *   description="Get instant answers to your questions..." 
 *   maxWidth="600px"
 * />
 * ```
 */
export default function CTADescription({ 
  description = "Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.",
  maxWidth = "600px"
}: CTADescriptionProps) {
  return (
    <p 
      style={{
        color: '#4b5563',
        fontSize: 'clamp(1rem, 3vw, 1.125rem)',
        marginBottom: '2rem',
        maxWidth: maxWidth,
        margin: '0 auto 2rem',
        lineHeight: '1.6',
        textAlign: 'center'
      }}
    >
      {description}
    </p>
  );
}
