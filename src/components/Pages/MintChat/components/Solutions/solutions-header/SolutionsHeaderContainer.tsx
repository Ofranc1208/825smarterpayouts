import React from 'react';
import SolutionsBadge from './SolutionsBadge';
import SolutionsTitle from './SolutionsTitle';
import SolutionsDescription from './SolutionsDescription';

/**
 * Solutions Header Container Component for MintChat
 * 
 * Orchestrates all header elements including badge, title,
 * and description with proper layout and spacing.
 * 
 * @component SolutionsHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Solutions Header Container Component
 * 
 * ## Features
 * - ✅ Combines badge, title, and description
 * - ✅ Centered text alignment
 * - ✅ Proper spacing and hierarchy
 * - ✅ Clean component composition
 * 
 * @example
 * ```tsx
 * import SolutionsHeaderContainer from './SolutionsHeaderContainer';
 * 
 * export default function SolutionsSection() {
 *   return (
 *     <div>
 *       <SolutionsHeaderContainer />
 *       // Additional content here
 *     </div>
 *   );
 * }
 * ```
 */
export default function SolutionsHeaderContainer() {
  return (
    <>
      <SolutionsBadge />
      <SolutionsTitle />
      <SolutionsDescription />
    </>
  );
}
