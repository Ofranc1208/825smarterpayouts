import React from 'react';

/**
 * Problems Description Component for MintChat
 * 
 * Displays the descriptive text explaining why companies
 * hide pricing, with optimal readability and layout.
 * 
 * @component ProblemsDescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Problems Description Component
 * 
 * ## Features
 * - ✅ Large, readable font size
 * - ✅ Constrained width for readability
 * - ✅ Centered layout
 * - ✅ Optimal line height
 * 
 * @example
 * ```tsx
 * import ProblemsDescription from './ProblemsDescription';
 * 
 * export default function ProblemsHeader() {
 *   return (
 *     <div>
 *       <ProblemsDescription />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemsDescription() {
  return (
    <p style={{
      fontSize: "1.125rem",
      color: "#6b7280",
      maxWidth: "700px",
      margin: "0 auto 2rem",
      lineHeight: "1.6"
    }}>
      Most companies hide their pricing to maximize profits at your expense. 
      Here's exactly why they don't want you to see upfront costs:
    </p>
  );
}
