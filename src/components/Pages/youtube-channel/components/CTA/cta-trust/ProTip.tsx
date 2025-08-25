import React from 'react';

/**
 * Pro Tip Component for YouTube Channel CTA
 * 
 * Displays helpful pro tip information with consistent styling
 * and accessibility features.
 * 
 * @component ProTip
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface ProTipProps {
  /** Pro tip text content */
  tip?: string;
  /** Pro tip icon */
  icon?: string;
}

/**
 * Pro Tip Component
 * 
 * ## Features
 * - ✅ Consistent styling with background
 * - ✅ Accessibility compliance
 * - ✅ Visual enhancement with borders
 * - ✅ Responsive design
 * 
 * @param props - Component props
 * @returns JSX element for pro tip
 * 
 * @example
 * ```tsx
 * <ProTip 
 *   tip="Mint AI can help you understand complex settlement terms..."
 *   icon="💡"
 * />
 * ```
 */
export default function ProTip({ 
  tip = "Mint AI can help you understand complex settlement terms and guide you through the decision-making process in real-time.",
  icon = "💡"
}: ProTipProps) {
  return (
    <div 
      style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.8)'
      }}
    >
      <p 
        style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: 0,
          fontStyle: 'italic',
          textAlign: 'center'
        }}
      >
        <span role="img" aria-hidden="true">{icon}</span> <strong>Pro Tip:</strong> {tip}
      </p>
    </div>
  );
}
