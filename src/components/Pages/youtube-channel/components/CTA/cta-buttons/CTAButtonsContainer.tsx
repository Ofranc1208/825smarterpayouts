import React from 'react';
import MintChatCTAButton from './MintChatCTAButton';
import CalculatorCTAButton from './CalculatorCTAButton';

/**
 * CTA Buttons Container Component for YouTube Channel
 * 
 * Orchestrates CTA buttons with consistent spacing,
 * responsive layout, and accessibility features.
 * 
 * @component CTAButtonsContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTAButtonsContainerProps {
  /** Mint AI chat URL */
  mintChatUrl?: string;
  /** Calculator URL */
  calculatorUrl?: string;
  /** Mint chat button text */
  mintChatText?: string;
  /** Calculator button text */
  calculatorText?: string;
}

/**
 * CTA Buttons Container Component
 * 
 * ## Architecture
 * - **MintChatCTAButton**: Mint AI chat interface CTA
 * - **CalculatorCTAButton**: Settlement calculator CTA
 * 
 * ## Features
 * - ✅ Responsive flexbox layout
 * - ✅ Consistent button spacing
 * - ✅ Accessibility compliance
 * - ✅ Mobile-friendly wrapping
 * 
 * @param props - Component props
 * @returns JSX element for CTA buttons container
 * 
 * @example
 * ```tsx
 * <CTAButtonsContainer 
 *   mintChatUrl="/mint-intelligent-chat"
 *   calculatorUrl="/pricing-calculator"
 * />
 * ```
 */
export default function CTAButtonsContainer({
  mintChatUrl = "/mint-intelligent-chat",
  calculatorUrl = "/pricing-calculator",
  mintChatText = "Chat with Mint AI",
  calculatorText = "Calculate Value"
}: CTAButtonsContainerProps) {
  return (
    <div 
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
      role="group"
      aria-label="Call-to-action buttons"
    >
      {/* Mint AI Button */}
      <MintChatCTAButton 
        mintChatUrl={mintChatUrl}
        text={mintChatText}
        ariaLabel="Chat with Mint AI Assistant for personalized guidance"
      />
      
      {/* Calculator Button */}
      <CalculatorCTAButton 
        calculatorUrl={calculatorUrl}
        text={calculatorText}
        ariaLabel="Use our calculator to estimate your settlement value"
      />
    </div>
  );
}
