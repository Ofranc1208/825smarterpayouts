/**
 * Technology Section Header Component
 * 
 * Reusable header component for the technology section with title,
 * subtitle, and description. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component TechnologyHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { SectionHeaderProps } from '../../types';

/**
 * Technology section header component
 * 
 * @param {SectionHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive section header
 */
export default function TechnologyHeader({
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
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem",
            background: "rgba(5, 150, 105, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid rgba(5, 150, 105, 0.2)",
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
          background: "linear-gradient(135deg, #1f2937 0%, #059669 100%)",
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
