import React from 'react';
import HeroBadge from './HeroBadge';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';

/**
 * Hero Header Container Component for YouTube Channel
 * 
 * Orchestrates all hero header elements including badge, title,
 * and description with consistent spacing and layout.
 * 
 * @component HeroHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroHeaderContainerProps {
  /** Badge text */
  badgeText?: string;
  /** Badge icon */
  badgeIcon?: string;
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Title element ID for accessibility */
  titleId?: string;
}

/**
 * Hero Header Container Component
 * 
 * ## Architecture
 * - **HeroBadge**: YouTube channel badge
 * - **HeroTitle**: Main hero title with gradient
 * - **HeroDescription**: Descriptive text content
 * 
 * ## Features
 * - ✅ Consistent spacing and alignment
 * - ✅ Responsive layout
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for complete hero header
 * 
 * @example
 * ```tsx
 * <HeroHeaderContainer 
 *   title="SmarterPayouts Video Library"
 *   description="Educational video content..."
 * />
 * ```
 */
export default function HeroHeaderContainer({
  badgeText = "YouTube Channel",
  badgeIcon = "📺",
  title = "SmarterPayouts Video Library",
  description = "Learn about structured settlements, early payouts, and financial strategies through our educational video content.",
  titleId = "hero-title"
}: HeroHeaderContainerProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {/* Badge */}
      <HeroBadge text={badgeText} icon={badgeIcon} />
      
      {/* Main Title */}
      <HeroTitle title={title} id={titleId} />

      {/* Description */}
      <HeroDescription description={description} />
    </div>
  );
}
