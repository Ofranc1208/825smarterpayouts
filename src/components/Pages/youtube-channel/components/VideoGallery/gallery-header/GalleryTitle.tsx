import React from 'react';

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
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}
    >
      {title}
    </h2>
  );
}
