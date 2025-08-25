import React from 'react';
import GalleryTitle from './GalleryTitle';
import GalleryDescription from './GalleryDescription';

/**
 * Gallery Header Container Component for YouTube Channel
 * 
 * Orchestrates all gallery header elements including title and description
 * with consistent spacing and layout.
 * 
 * @component GalleryHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface GalleryHeaderContainerProps {
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Title element ID for accessibility */
  titleId?: string;
  /** Show description */
  showDescription?: boolean;
}

/**
 * Gallery Header Container Component
 * 
 * ## Architecture
 * - **GalleryTitle**: Main gallery title with gradient
 * - **GalleryDescription**: Descriptive text content (optional)
 * 
 * ## Features
 * - ✅ Consistent spacing and alignment
 * - ✅ Responsive layout
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for complete gallery header
 * 
 * @example
 * ```tsx
 * <GalleryHeaderContainer 
 *   title="Featured Videos"
 *   description="Educational content..."
 *   showDescription={true}
 * />
 * ```
 */
export default function GalleryHeaderContainer({
  title = "Featured Videos",
  description = "Explore our educational video content covering structured settlements, financial planning, and expert insights.",
  titleId = "gallery-title",
  showDescription = false
}: GalleryHeaderContainerProps) {
  return (
    <div 
      style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}
    >
      {/* Main Title */}
      <GalleryTitle title={title} id={titleId} />

      {/* Description (optional) */}
      {showDescription && (
        <GalleryDescription description={description} />
      )}
    </div>
  );
}
