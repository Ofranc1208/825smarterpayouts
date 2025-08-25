import React from 'react';

/**
 * Gallery Description Component for YouTube Channel
 * 
 * Displays the video gallery section description with optimal typography
 * and accessibility features.
 * 
 * @component GalleryDescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface GalleryDescriptionProps {
  /** Description text content */
  description?: string;
  /** Maximum width for text container */
  maxWidth?: string;
}

/**
 * Gallery Description Component
 * 
 * ## Features
 * - ✅ Optimal typography and line height
 * - ✅ Responsive text sizing
 * - ✅ Accessibility compliance
 * - ✅ Centered layout with max width
 * 
 * @param props - Component props
 * @returns JSX element for gallery description
 * 
 * @example
 * ```tsx
 * <GalleryDescription 
 *   description="Explore our educational video content..." 
 *   maxWidth="700px"
 * />
 * ```
 */
export default function GalleryDescription({ 
  description = "Explore our educational video content covering structured settlements, financial planning, and expert insights.",
  maxWidth = "700px"
}: GalleryDescriptionProps) {
  return (
    <p 
      style={{
        fontSize: "1rem",
        color: "#6b7280",
        maxWidth: maxWidth,
        margin: "0 auto 2rem",
        lineHeight: "1.6",
        textAlign: "center"
      }}
    >
      {description}
    </p>
  );
}
