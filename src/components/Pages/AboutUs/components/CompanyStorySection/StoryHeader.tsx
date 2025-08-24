/**
 * Story Header Component
 * 
 * Reusable header component for the company story section with title
 * and optional subtitle. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component StoryHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { StoryHeaderProps } from './types';

/**
 * Company story section header component
 * 
 * @param {StoryHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive story header
 */
export default function StoryHeader({
  title,
  subtitle,
  align = 'center'
}: StoryHeaderProps): JSX.Element {
  const textAlign = align as React.CSSProperties['textAlign'];

  return (
    <>
      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#047857",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "0.5rem",
          textAlign
        }}>
          {subtitle}
        </div>
      )}

      {/* Main Title */}
      <h2 style={{
        fontSize: "2rem",
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: "2rem",
        textAlign
      }}>
        {title}
      </h2>
    </>
  );
}
