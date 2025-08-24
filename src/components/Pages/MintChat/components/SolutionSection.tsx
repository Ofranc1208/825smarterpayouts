import React from 'react';

/**
 * Solution Section Component
 * 
 * Displays the SmarterPayouts solution introduction section
 * explaining why upfront pricing is the new industry standard.
 * 
 * @component SolutionSection
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Solution Section Component
 * 
 * Introduces the SmarterPayouts solution with clear messaging
 * about transparent pricing and market-based rates.
 */
const SolutionSection: React.FC = () => {
  return (
    <div style={{
      textAlign: "center",
      marginBottom: "3rem"
    }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
        padding: "0.5rem 1rem",
        borderRadius: "24px",
        marginBottom: "1.5rem",
        border: "1px solid #bbf7d0"
      }}>
        <span style={{ fontSize: "1rem" }}>✅</span>
        <span style={{ 
          color: "#047857", 
          fontWeight: "600", 
          fontSize: "0.875rem" 
        }}>
          THE SMARTERPAYOUTS SOLUTION
        </span>
      </div>
      
      <h2 style={{
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1rem",
        lineHeight: "1.2"
      }}>
        Why Upfront Pricing is the New Industry Standard
      </h2>
      
      <p style={{
        fontSize: "1.125rem",
        color: "#6b7280",
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: "1.6"
      }}>
        Get transparent, market-based pricing before you commit. Compare offers 
        intelligently and make informed decisions about your structured settlement.
      </p>
    </div>
  );
};

export default SolutionSection;
