import React from 'react';

/**
 * Solutions Description Component for MintChat
 * 
 * Displays the descriptive text explaining the benefits
 * of transparent pricing with optimal readability.
 * 
 * @component SolutionsDescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Solutions Description Component
 * 
 * ## Features
 * - ✅ Large, readable font size
 * - ✅ Constrained width for readability
 * - ✅ Centered layout
 * - ✅ Optimal line height
 * 
 * @example
 * ```tsx
 * import SolutionsDescription from './SolutionsDescription';
 * 
 * export default function SolutionsHeader() {
 *   return (
 *     <div>
 *       <SolutionsDescription />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function SolutionsDescription() {
  return (
    <p style={{
      fontSize: "1rem",
      color: "#6b7280",
      maxWidth: "600px",
      margin: "0 auto 1rem",
      lineHeight: "1.5"
    }}>
      Get transparent, market-based pricing before you commit. Compare offers
      intelligently and make informed decisions about your structured settlement.
    </p>
  );
}
