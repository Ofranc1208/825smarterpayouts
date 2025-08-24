import React from 'react';

/**
 * Industry Problems Section Component
 * 
 * Displays the industry problems section explaining why
 * traditional settlement companies don't offer upfront pricing.
 * Includes problem cards with icons and descriptions.
 * 
 * @component IndustryProblemsSection
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Individual Problem Card Component
 */
interface ProblemCardProps {
  icon: string;
  title: string;
  description: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => (
  <div style={{
    padding: "1.25rem",
    background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.06)"
  }}>
    <div style={{
      fontSize: "1.75rem",
      marginBottom: "0.75rem"
    }}>
      {icon}
    </div>
    <h4 style={{
      fontSize: "1rem",
      fontWeight: "700",
      color: "#dc2626",
      marginBottom: "0.5rem"
    }}>
      {title}
    </h4>
    <p style={{
      fontSize: "0.875rem",
      color: "#6b7280",
      lineHeight: "1.5"
    }}>
      {description}
    </p>
  </div>
);

/**
 * Industry Problems Section Component
 * 
 * Explains the problems with traditional settlement companies
 * and why they hide pricing from customers.
 */
const IndustryProblemsSection: React.FC = () => {
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
      background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      padding: "2.5rem 2rem",
      borderRadius: "16px",
      border: "1px solid #e5e5e5",
      textAlign: "center",
      marginBottom: "4rem",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "linear-gradient(135deg, #fef9f9 0%, #fef2f2 100%)",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        marginBottom: "1.25rem",
        border: "1px solid #f5b5b5"
      }}>
        <span style={{ fontSize: "1rem" }}>⚠️</span>
        <span style={{ color: "#dc2626", fontWeight: "600", fontSize: "0.875rem" }}>
          INDUSTRY PROBLEM
        </span>
      </div>
      
      <h2 style={{
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        fontWeight: "700",
        color: "#b91c1c",
        marginBottom: "1.5rem",
        lineHeight: "1.2"
      }}>
        Why Traditional Settlement Companies Don't Offer Upfront Pricing
      </h2>
      
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
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.25rem"
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
    </div>
  );
};

export default IndustryProblemsSection;
