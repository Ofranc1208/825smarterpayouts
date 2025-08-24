import React from 'react';

/**
 * Benefits Grid Component
 * 
 * Displays a grid of benefits showing why SmarterPayouts
 * is better than traditional settlement companies.
 * Each benefit has an icon, title, description, and highlight.
 * 
 * @component BenefitsGrid
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Individual Benefit Card Component
 */
interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  highlight: string;
  backgroundColor: string;
  borderColor: string;
  iconBackground: string;
  highlightColor: string;
  highlightBackground: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  highlight,
  backgroundColor,
  borderColor,
  iconBackground,
  highlightColor,
  highlightBackground
}) => (
  <div style={{
    background: backgroundColor,
    padding: "2rem",
    borderRadius: "16px",
    border: `1px solid ${borderColor}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
  }}>
    <div style={{
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: iconBackground,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1.5rem"
    }}>
      <span style={{ fontSize: "1.5rem", color: "white" }}>{icon}</span>
    </div>
    
    <h3 style={{
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem"
    }}>
      {title}
    </h3>
    
    <p style={{
      color: "#374151",
      lineHeight: "1.6",
      marginBottom: "1rem"
    }}>
      {description}
    </p>
    
    <div style={{
      padding: "1rem",
      background: highlightBackground,
      borderRadius: "8px",
      fontSize: "0.875rem",
      color: highlightColor,
      fontWeight: "500"
    }}>
      {highlight}
    </div>
  </div>
);

/**
 * Benefits Grid Component
 * 
 * Renders a responsive grid of benefit cards showcasing
 * the advantages of using SmarterPayouts over traditional companies.
 */
const BenefitsGrid: React.FC = () => {
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
      marginBottom: "3rem"
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
};

export default BenefitsGrid;
