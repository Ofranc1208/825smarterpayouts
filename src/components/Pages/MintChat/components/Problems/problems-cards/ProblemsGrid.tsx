import React from 'react';
import ProblemCard from './ProblemCard';

/**
 * Problems Grid Component for MintChat
 * 
 * Displays a responsive grid of problem cards showing
 * why traditional companies hide pricing.
 * 
 * @component ProblemsGrid
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Problems Grid Component
 * 
 * ## Features
 * - ✅ Responsive CSS Grid layout
 * - ✅ Auto-fit columns with minimum width
 * - ✅ Consistent gap spacing
 * - ✅ Predefined problem data
 * 
 * ## Problems Displayed
 * 1. Higher Profit Margins
 * 2. Prevent Comparison Shopping
 * 3. High-Pressure Sales Tactics
 * 
 * @example
 * ```tsx
 * import ProblemsGrid from './ProblemsGrid';
 * 
 * export default function ProblemsSection() {
 *   return (
 *     <div>
 *       <ProblemsHeader />
 *       <ProblemsGrid />
 *     </div>
 *   );
 * }
 * ```
 */
export default function ProblemsGrid() {
  const problems = [
    {
      icon: "💰",
      title: "Higher Profit Margins",
      description: "Without transparency, they inflate prices 15-30% above market rates"
    },
    {
      icon: "🚫",
      title: "Prevent Comparison Shopping",
      description: "By hiding pricing, they discourage you from shopping around"
    },
    {
      icon: "📞",
      title: "High-Pressure Sales Tactics",
      description: "They rely on aggressive phone calls and pressure tactics"
    }
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      marginTop: "1rem"
    }}>
      {problems.map((problem, index) => (
        <ProblemCard
          key={index}
          icon={problem.icon}
          title={problem.title}
          description={problem.description}
        />
      ))}
    </div>
  );
}
