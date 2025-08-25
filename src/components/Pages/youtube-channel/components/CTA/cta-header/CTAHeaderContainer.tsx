import React from 'react';
import CTAIcon from './CTAIcon';
import CTATitle from './CTATitle';
import CTADescription from './CTADescription';

/**
 * CTA Header Container Component for YouTube Channel
 * 
 * Orchestrates all CTA header elements including icon, title,
 * and description with consistent spacing and layout.
 * 
 * @component CTAHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTAHeaderContainerProps {
  /** Icon emoji or text */
  icon?: string;
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Title element ID for accessibility */
  titleId?: string;
  /** Theme color */
  themeColor?: string;
}

/**
 * CTA Header Container Component
 * 
 * ## Architecture
 * - **CTAIcon**: Visual icon with drop shadow
 * - **CTATitle**: Main CTA title with gradient
 * - **CTADescription**: Descriptive text content
 * 
 * ## Features
 * - ✅ Consistent spacing and alignment
 * - ✅ Theme-based styling
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for complete CTA header
 * 
 * @example
 * ```tsx
 * <CTAHeaderContainer 
 *   title="Want Personalized Guidance?"
 *   description="Get instant answers..."
 *   themeColor="#059669"
 * />
 * ```
 */
export default function CTAHeaderContainer({
  icon = "🎯",
  title = "Want Personalized Guidance?",
  description = "Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.",
  titleId = "cta-title",
  themeColor = "#059669"
}: CTAHeaderContainerProps) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Icon */}
      <CTAIcon icon={icon} size="2.5rem" />

      {/* Title */}
      <CTATitle 
        title={title} 
        id={titleId} 
        themeColor={themeColor}
      />

      {/* Description */}
      <CTADescription description={description} />
    </div>
  );
}
