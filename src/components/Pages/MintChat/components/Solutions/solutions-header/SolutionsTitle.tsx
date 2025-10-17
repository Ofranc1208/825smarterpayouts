import React from 'react';

/**
 * Solutions Title Component for MintChat
 * 
 * Displays the main title for the solutions section
 * with responsive typography and professional styling.
 * 
 * @component SolutionsTitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Solutions Title Component
 * 
 * ## Features
 * - ✅ Responsive font sizing
 * - ✅ Professional dark color scheme
 * - ✅ Optimal line height
 * - ✅ Semantic H2 heading
 * 
 * @example
 * ```tsx
 * import SolutionsTitle from './SolutionsTitle';
 * 
 * export default function SolutionsHeader() {
 *   return (
 *     <div>
 *       <SolutionsTitle />
 *       // Other header content
 *     </div>
 *   );
 * }
 * ```
 */
export default function SolutionsTitle() {
  return (
    <h2 style={{
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.75rem",
      lineHeight: "1.3"
    }}>
      Why Upfront Pricing is the New Industry Standard
    </h2>
  );
}
