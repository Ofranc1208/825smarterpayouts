import React from 'react';
import BenefitCard from './BenefitCard';

/**
 * Benefits Grid Component for MintChat
 * 
 * Displays a responsive grid of benefit cards showing
 * why SmarterPayouts is better than traditional companies.
 * 
 * @component BenefitsGrid
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Benefits Grid Component
 * 
 * ## Features
 * - ✅ Responsive CSS Grid layout
 * - ✅ Auto-fit columns with minimum width
 * - ✅ Consistent gap spacing
 * - ✅ Predefined benefit data with color schemes
 * 
 * ## Benefits Displayed
 * 1. Complete Price Transparency (Green theme)
 * 2. Fair Market-Based Rates (Blue theme)
 * 3. Compare Before You Commit (Yellow theme)
 * 4. Zero Pressure Environment (Purple theme)
 * 
 * @example
 * ```tsx
 * import BenefitsGrid from './BenefitsGrid';
 * 
 * export default function BenefitsSection() {
 *   return (
 *     <div>
 *       <BenefitsHeader />
 *       <BenefitsGrid />
 *     </div>
 *   );
 * }
 * ```
 */
export default function BenefitsGrid() {
  const benefits = [
    {
      icon: "🔍",
      title: "Complete Price Transparency",
      description: "Unlike traditional companies that hide pricing to maximize profit margins, we provide upfront quotes based on current market averages. No surprises, no hidden fees, no pressure tactics.",
      highlight: "Traditional companies often markup prices 15-30% above market rates to increase profit margins",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
      borderColor: "#bbf7d0",
      iconBackground: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      highlightColor: "#047857",
      highlightBackground: "rgba(5, 150, 105, 0.1)"
    },
    {
      icon: "📊",
      title: "Fair Market-Based Rates",
      description: "Our AI-powered platform calculates offers based on real market data and industry averages, not inflated profit targets. You get competitive rates that reflect true market value.",
      highlight: "Market-average pricing ensures you receive 15-20% more than traditional company offers",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
      borderColor: "#93c5fd",
      iconBackground: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
      highlightColor: "#1d4ed8",
      highlightBackground: "rgba(29, 78, 216, 0.1)"
    },
    {
      icon: "⚖️",
      title: "Compare Before You Commit",
      description: "Get multiple quotes instantly and compare offers side-by-side. Traditional companies discourage comparison shopping because they rely on information asymmetry to maximize profits.",
      highlight: "Comparison shopping can increase your settlement value by 25-40%",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
      borderColor: "#fbbf24",
      iconBackground: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      highlightColor: "#d97706",
      highlightBackground: "rgba(245, 158, 11, 0.1)"
    },
    {
      icon: "🚫",
      title: "Zero Pressure Environment",
      description: "Research and compare at your own pace. No aggressive sales tactics, no phone calls, no personal information required. Many traditional companies use high-pressure sales because they need to close deals quickly.",
      highlight: "Take your time to make the right decision - no sales pressure or deadlines",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)",
      borderColor: "#c084fc",
      iconBackground: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
      highlightColor: "#7c3aed",
      highlightBackground: "rgba(124, 58, 237, 0.1)"
    }
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "2rem",
      marginBottom: "0"
    }}>
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          highlight={benefit.highlight}
          backgroundColor={benefit.backgroundColor}
          borderColor={benefit.borderColor}
          iconBackground={benefit.iconBackground}
          highlightColor={benefit.highlightColor}
          highlightBackground={benefit.highlightBackground}
        />
      ))}
    </div>
  );
}
