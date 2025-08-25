import React from 'react';

/**
 * Problems Title Component for MintChat
 * 
 * Displays the main title for the industry problems section
 * with responsive typography and impactful styling.
 * 
 * @component ProblemsTitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Problems Title Component
 * 
 * ## Features
 * - ✅ Responsive font sizing
 * - ✅ Red color scheme for urgency
 * - ✅ Optimal line height
 * - ✅ Semantic H2 heading
 * 
 * @example
 * ```tsx
 * import ProblemsTitle from './ProblemsTitle';
 * 
 * export default function ProblemsHeader() {
 *   return (
 *     <div>
 *       <ProblemsTitle />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemsTitle() {
  return (
    <h2 style={{
      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
      fontWeight: "700",
      color: "#b91c1c",
      marginBottom: "1.5rem",
      lineHeight: "1.2"
    }}>
      Why Traditional Settlement Companies Don't Offer Upfront Pricing
    </h2>
  );
}
