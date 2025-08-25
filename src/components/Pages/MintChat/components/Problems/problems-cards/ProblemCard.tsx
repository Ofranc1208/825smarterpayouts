import React from 'react';

/**
 * Problem Card Component for MintChat
 * 
 * Displays individual problem cards with icon, title, and description.
 * Used to highlight specific industry problems with visual appeal.
 * 
 * @component ProblemCard
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface ProblemCardProps {
  /** Icon emoji to display */
  icon: string;
  /** Problem title */
  title: string;
  /** Problem description */
  description: string;
}

/**
 * Problem Card Component
 * 
 * ## Features
 * - ✅ Icon, title, and description layout
 * - ✅ Gradient background with subtle shadow
 * - ✅ Red color scheme for problem emphasis
 * - ✅ Responsive design
 * - ✅ Clean typography hierarchy
 * 
 * @param icon - Emoji icon to display
 * @param title - Problem title text
 * @param description - Problem description text
 * 
 * @example
 * ```tsx
 * import ProblemCard from './ProblemCard';
 * 
 * export default function ProblemsGrid() {
 *   return (
 *     <div>
 *       <ProblemCard
 *         icon="💰"
 *         title="Higher Profit Margins"
 *         description="Without transparency, they inflate prices 15-30% above market rates"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemCard({ icon, title, description }: ProblemCardProps) {
  return (
    <div style={{
      padding: "1.25rem",
      background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      borderRadius: "12px",
      border: "1px solid #e5e5e5",
      boxShadow: "0 1px 6px rgba(0, 0, 0, 0.06)"
    }}>
      <div style={{
        fontSize: "1.75rem",
        marginBottom: "0.75rem"
      }}>
        {icon}
      </div>
      <h4 style={{
        fontSize: "1rem",
        fontWeight: "700",
        color: "#dc2626",
        marginBottom: "0.5rem"
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: "0.875rem",
        color: "#6b7280",
        lineHeight: "1.5"
      }}>
        {description}
      </p>
    </div>
  );
}
