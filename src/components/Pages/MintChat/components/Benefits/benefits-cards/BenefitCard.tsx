import React from 'react';

/**
 * Benefit Card Component for MintChat
 * 
 * Displays individual benefit cards with icon, title, description,
 * and highlight section. Features customizable colors and styling.
 * 
 * @component BenefitCard
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface BenefitCardProps {
  /** Icon emoji to display */
  icon: string;
  /** Benefit title */
  title: string;
  /** Benefit description */
  description: string;
  /** Highlight text */
  highlight: string;
  /** Background color/gradient */
  backgroundColor: string;
  /** Border color */
  borderColor: string;
  /** Icon background gradient */
  iconBackground: string;
  /** Highlight text color */
  highlightColor: string;
  /** Highlight background color */
  highlightBackground: string;
}

/**
 * Benefit Card Component
 * 
 * ## Features
 * - ✅ Icon with custom background
 * - ✅ Title, description, and highlight layout
 * - ✅ Customizable color schemes
 * - ✅ Gradient backgrounds and shadows
 * - ✅ Responsive design
 * 
 * @param icon - Emoji icon to display
 * @param title - Benefit title text
 * @param description - Benefit description text
 * @param highlight - Highlight/callout text
 * @param backgroundColor - Card background color/gradient
 * @param borderColor - Card border color
 * @param iconBackground - Icon background gradient
 * @param highlightColor - Highlight text color
 * @param highlightBackground - Highlight background color
 * 
 * @example
 * ```tsx
 * import BenefitCard from './BenefitCard';
 * 
 * export default function BenefitsGrid() {
 *   return (
 *     <div>
 *       <BenefitCard
 *         icon="🔍"
 *         title="Complete Price Transparency"
 *         description="Unlike traditional companies..."
 *         highlight="Traditional companies often markup prices..."
 *         backgroundColor="linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)"
 *         borderColor="#bbf7d0"
 *         iconBackground="linear-gradient(135deg, #059669 0%, #047857 100%)"
 *         highlightColor="#047857"
 *         highlightBackground="rgba(5, 150, 105, 0.1)"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default function BenefitCard({
  icon,
  title,
  description,
  highlight,
  backgroundColor,
  borderColor,
  iconBackground,
  highlightColor,
  highlightBackground
}: BenefitCardProps) {
  return (
    <div style={{
      background: backgroundColor,
      padding: "2rem",
      borderRadius: "16px",
      border: `1px solid ${borderColor}`,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: iconBackground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}>
        <span style={{ fontSize: "1.5rem", color: "white" }}>{icon}</span>
      </div>
      
      <h3 style={{
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1rem"
      }}>
        {title}
      </h3>
      
      <p style={{
        color: "#374151",
        lineHeight: "1.6",
        marginBottom: "1rem"
      }}>
        {description}
      </p>
      
      <div style={{
        padding: "1rem",
        background: highlightBackground,
        borderRadius: "8px",
        fontSize: "0.875rem",
        color: highlightColor,
        fontWeight: "500"
      }}>
        {highlight}
      </div>
    </div>
  );
}
