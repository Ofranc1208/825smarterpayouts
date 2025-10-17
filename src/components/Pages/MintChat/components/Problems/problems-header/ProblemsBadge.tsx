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
      gap: "0.375rem",
      background: "#fef2f2",
      padding: "0.375rem 0.75rem",
      borderRadius: "16px",
      marginBottom: "1rem",
      border: "1px solid #fecaca"
    }}>
      <span style={{ fontSize: "0.875rem" }}>⚠️</span>
      <span style={{
        color: "#dc2626",
        fontWeight: "600",
        fontSize: "0.75rem"
      }}>
        INDUSTRY PROBLEM
      </span>
    </div>
  );
}
