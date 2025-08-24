/**
 * CTA Header Component
 * 
 * Reusable header component for the CTA section with title,
 * subtitle, and description. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component CTAHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { CTAHeaderProps } from './types';

/**
 * CTA section header component
 * 
 * @param {CTAHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive CTA header
 */
export default function CTAHeader({
  title,
  subtitle,
  description,
  align = 'center',
  showSubtitle = true
}: CTAHeaderProps): JSX.Element {
  const textAlign = align as React.CSSProperties['textAlign'];

  return (
    <>
      {/* Subtitle */}
      {showSubtitle && subtitle && (
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
        marginBottom: "1.5rem",
        textAlign
      }}>
        {title}
      </h2>

      {/* Description */}
      <p style={{
        fontSize: "1.125rem",
        color: "#374151",
        marginBottom: "2rem",
        lineHeight: "1.6",
        textAlign
      }}>
        {description}
      </p>
    </>
  );
}
