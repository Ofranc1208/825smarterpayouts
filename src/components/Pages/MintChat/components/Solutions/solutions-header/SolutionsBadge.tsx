import React from 'react';

/**
 * Solutions Badge Component for MintChat
 * 
 * Displays the "THE SMARTERPAYOUTS SOLUTION" badge with
 * green color scheme and checkmark icon.
 * 
 * @component SolutionsBadge
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Solutions Badge Component
 * 
 * ## Features
 * - ✅ Checkmark icon and text
 * - ✅ Green color scheme for positive messaging
 * - ✅ Gradient background
 * - ✅ Rounded corners and border
 * 
 * @example
 * ```tsx
 * import SolutionsBadge from './SolutionsBadge';
 * 
 * export default function SolutionsHeader() {
 *   return (
 *     <div>
 *       <SolutionsBadge />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function SolutionsBadge() {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      background: "#ecfdf5",
      padding: "0.375rem 0.75rem",
      borderRadius: "16px",
      marginBottom: "1rem",
      border: "1px solid #bbf7d0"
    }}>
      <span style={{ fontSize: "0.875rem" }}>✅</span>
      <span style={{
        color: "#047857",
        fontWeight: "600",
        fontSize: "0.75rem"
      }}>
        THE SMARTERPAYOUTS SOLUTION
      </span>
    </div>
  );
}
