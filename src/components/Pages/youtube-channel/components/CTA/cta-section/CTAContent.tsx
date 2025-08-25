import React from 'react';
import CTAHeaderContainer from '../cta-header/CTAHeaderContainer';
import CTAButtonsContainer from '../cta-buttons/CTAButtonsContainer';
import CTATrustContainer from '../cta-trust/CTATrustContainer';

/**
 * CTA Content Component for YouTube Channel
 * 
 * Orchestrates the main CTA content including header, buttons,
 * and trust elements with consistent spacing and layout.
 * 
 * @component CTAContent
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTAContentProps {
  /** Icon emoji or text */
  icon?: string;
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Mint AI chat URL */
  mintChatUrl?: string;
  /** Calculator URL */
  calculatorUrl?: string;
  /** Theme color */
  themeColor?: string;
  /** Show pro tip */
  showProTip?: boolean;
  /** Show trust indicator */
  showTrustIndicator?: boolean;
}

/**
 * CTA Content Component
 * 
 * ## Architecture
 * - **CTAHeaderContainer**: Icon, title, and description
 * - **CTAButtonsContainer**: Mint chat and calculator buttons
 * - **CTATrustContainer**: Pro tips and trust indicators
 * 
 * ## Features
 * - ✅ Consistent content spacing
 * - ✅ Theme-based styling
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for CTA content
 * 
 * @example
 * ```tsx
 * <CTAContent 
 *   title="Want Personalized Guidance?"
 *   description="Get instant answers..."
 *   themeColor="#059669"
 * />
 * ```
 */
export default function CTAContent({
  icon = "🎯",
  title = "Want Personalized Guidance?",
  description = "Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.",
  mintChatUrl = "/mint-intelligent-chat",
  calculatorUrl = "/pricing-calculator",
  themeColor = "#059669",
  showProTip = true,
  showTrustIndicator = false
}: CTAContentProps) {
  return (
    <>
      {/* Header Section */}
      <CTAHeaderContainer
        icon={icon}
        title={title}
        description={description}
        titleId="cta-title"
        themeColor={themeColor}
      />

      {/* CTA Buttons */}
      <CTAButtonsContainer
        mintChatUrl={mintChatUrl}
        calculatorUrl={calculatorUrl}
        mintChatText="Chat with Mint AI"
        calculatorText="Calculate Value"
      />

      {/* Trust Elements */}
      <CTATrustContainer
        showProTip={showProTip}
        showTrustIndicator={showTrustIndicator}
        proTip="Mint AI can help you understand complex settlement terms and guide you through the decision-making process in real-time."
        trustText="Trusted by thousands of settlement recipients"
      />
    </>
  );
}
