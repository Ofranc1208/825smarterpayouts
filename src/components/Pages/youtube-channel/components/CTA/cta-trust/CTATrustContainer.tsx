import React from 'react';
import ProTip from './ProTip';
import TrustIndicator from './TrustIndicator';

/**
 * CTA Trust Container Component for YouTube Channel
 * 
 * Orchestrates trust elements including pro tips and trust indicators
 * with consistent spacing and layout.
 * 
 * @component CTATrustContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTATrustContainerProps {
  /** Pro tip text */
  proTip?: string;
  /** Pro tip icon */
  proTipIcon?: string;
  /** Trust indicator text */
  trustText?: string;
  /** Trust indicator icon */
  trustIcon?: string;
  /** Show pro tip */
  showProTip?: boolean;
  /** Show trust indicator */
  showTrustIndicator?: boolean;
}

/**
 * CTA Trust Container Component
 * 
 * ## Architecture
 * - **ProTip**: Helpful tip information
 * - **TrustIndicator**: Credibility and trust elements
 * 
 * ## Features
 * - ✅ Flexible trust element display
 * - ✅ Consistent spacing and alignment
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for CTA trust elements
 * 
 * @example
 * ```tsx
 * <CTATrustContainer 
 *   showProTip={true}
 *   showTrustIndicator={true}
 *   proTip="Mint AI can help you understand..."
 * />
 * ```
 */
export default function CTATrustContainer({
  proTip = "Mint AI can help you understand complex settlement terms and guide you through the decision-making process in real-time.",
  proTipIcon = "💡",
  trustText = "Trusted by thousands of settlement recipients",
  trustIcon = "🛡️",
  showProTip = true,
  showTrustIndicator = false
}: CTATrustContainerProps) {
  // Don't render if no trust elements are shown
  if (!showProTip && !showTrustIndicator) {
    return null;
  }

  return (
    <div>
      {/* Trust Indicator */}
      <TrustIndicator
        text={trustText}
        icon={trustIcon}
        show={showTrustIndicator}
      />

      {/* Pro Tip */}
      <ProTip
        tip={proTip}
        icon={proTipIcon}
      />
    </div>
  );
}
