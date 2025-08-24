/**
 * Recognition Section Header Component
 * 
 * Reusable header component for the recognition section with title,
 * subtitle, and description. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component RecognitionHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { SectionHeaderProps } from '../../types';

/**
 * Recognition section header component
 * 
 * @param {SectionHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive section header
 */
export default function RecognitionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  maxWidth = '800px'
}: SectionHeaderProps): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      textAlign: align,
      marginBottom: '3rem'
    }}>
      <div style={{
        maxWidth: maxWidth
      }}>
        {/* Subtitle Badge */}
        {subtitle && (
          <div style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#dc2626",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem",
            background: "rgba(220, 38, 38, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid rgba(220, 38, 38, 0.2)",
            display: "inline-block"
          }}>
            {subtitle}
          </div>
        )}

        {/* Main Title */}
        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: description ? "1.5rem" : "0",
          lineHeight: "1.2",
          background: "linear-gradient(135deg, #1f2937 0%, #dc2626 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            color: "#374151",
            lineHeight: "1.7",
            margin: "0"
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
