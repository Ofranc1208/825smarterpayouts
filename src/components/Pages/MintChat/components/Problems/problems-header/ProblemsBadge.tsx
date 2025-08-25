import React from 'react';

/**
 * Problems Badge Component for MintChat
 * 
 * Displays the "INDUSTRY PROBLEM" warning badge with
 * appropriate styling and visual indicators.
 * 
 * @component ProblemsBadge
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Problems Badge Component
 * 
 * ## Features
 * - ✅ Warning icon and text
 * - ✅ Red color scheme for urgency
 * - ✅ Gradient background
 * - ✅ Rounded corners and border
 * 
 * @example
 * ```tsx
 * import ProblemsBadge from './ProblemsBadge';
 * 
 * export default function ProblemsHeader() {
 *   return (
 *     <div>
 *       <ProblemsBadge />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemsBadge() {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "linear-gradient(135deg, #fef9f9 0%, #fef2f2 100%)",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      marginBottom: "1.25rem",
      border: "1px solid #f5b5b5"
    }}>
      <span style={{ fontSize: "1rem" }}>⚠️</span>
      <span style={{ 
        color: "#dc2626", 
        fontWeight: "600", 
        fontSize: "0.875rem" 
      }}>
        INDUSTRY PROBLEM
      </span>
    </div>
  );
}
