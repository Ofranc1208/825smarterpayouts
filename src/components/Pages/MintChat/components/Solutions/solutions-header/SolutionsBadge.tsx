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
      gap: "0.5rem",
      background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      padding: "0.5rem 1rem",
      borderRadius: "24px",
      marginBottom: "1.5rem",
      border: "1px solid #bbf7d0"
    }}>
      <span style={{ fontSize: "1rem" }}>✅</span>
      <span style={{ 
        color: "#047857", 
        fontWeight: "600", 
        fontSize: "0.875rem" 
      }}>
        THE SMARTERPAYOUTS SOLUTION
      </span>
    </div>
  );
}
