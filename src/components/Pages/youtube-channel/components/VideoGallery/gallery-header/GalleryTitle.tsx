import React from 'react';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

/**
 * Gallery Title Component for YouTube Channel
 * 
 * Displays the video gallery section title with consistent styling
 * and accessibility features.
 * 
 * @component GalleryTitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface GalleryTitleProps {
  /** Title text content */
  title?: string;
  /** HTML element ID for accessibility */
  id?: string;
}

/**
 * Gallery Title Component
 * 
 * ## Features
 * - ✅ Responsive typography
 * - ✅ Accessibility compliance
 * - ✅ Consistent brand styling
 * - ✅ SEO optimization
 * 
 * @param props - Component props
 * @returns JSX element for gallery title
 * 
 * @example
 * ```tsx
 * <GalleryTitle 
 *   title="Featured Videos" 
 *   id="gallery-title" 
 * />
 * ```
 */
export default function GalleryTitle({ 
  title = "Featured Videos",
  id = "gallery-title"
}: GalleryTitleProps) {
  return (
    <h2 
      id={id}
      style={{
        ...TEXT_PRESETS.heroTitle,
        fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
        color: COLORS.neutral.gray900,
        marginBottom: "1rem",
        textAlign: "center",
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}
    >
      {title}
    </h2>
  );
}
