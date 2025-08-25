import React from 'react';
import ProblemsBadge from './ProblemsBadge';
import ProblemsTitle from './ProblemsTitle';
import ProblemsDescription from './ProblemsDescription';

/**
 * Problems Header Container Component for MintChat
 * 
 * Orchestrates all header elements including badge, title,
 * and description with proper layout and spacing.
 * 
 * @component ProblemsHeaderContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Problems Header Container Component
 * 
 * ## Features
 * - ✅ Combines badge, title, and description
 * - ✅ Centered text alignment
 * - ✅ Proper spacing and hierarchy
 * - ✅ Clean component composition
 * 
 * @example
 * ```tsx
 * import ProblemsHeaderContainer from './ProblemsHeaderContainer';
 * 
 * export default function ProblemsSection() {
 *   return (
 *     <div>
 *       <ProblemsHeaderContainer />
 *       // Problem cards here
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemsHeaderContainer() {
  return (
    <>
      <ProblemsBadge />
      <ProblemsTitle />
      <ProblemsDescription />
    </>
  );
}
