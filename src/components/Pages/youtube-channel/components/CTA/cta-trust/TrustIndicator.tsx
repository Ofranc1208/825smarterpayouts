import React from 'react';

/**
 * Trust Indicator Component for YouTube Channel CTA
 * 
 * Displays trust indicators and credibility elements
 * with consistent styling and accessibility features.
 * 
 * @component TrustIndicator
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface TrustIndicatorProps {
  /** Indicator text */
  text?: string;
  /** Indicator icon */
  icon?: string;
  /** Show indicator */
  show?: boolean;
}

/**
 * Trust Indicator Component
 * 
 * ## Features
 * - ✅ Trust and credibility display
 * - ✅ Accessibility compliance
 * - ✅ Consistent styling
 * - ✅ Optional visibility control
 * 
 * @param props - Component props
 * @returns JSX element for trust indicator
 * 
 * @example
 * ```tsx
 * <TrustIndicator 
 *   text="Trusted by thousands of settlement recipients"
 *   icon="🛡️"
 *   show={true}
 * />
 * ```
 */
export default function TrustIndicator({ 
  text = "Trusted by thousands of settlement recipients",
  icon = "🛡️",
  show = true
}: TrustIndicatorProps) {
  if (!show) {
    return null;
  }

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        background: 'rgba(5, 150, 105, 0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(5, 150, 105, 0.2)'
      }}
    >
      <span role="img" aria-hidden="true">{icon}</span>
      <span 
        style={{
          fontSize: '0.875rem',
          color: '#059669',
          fontWeight: '600'
        }}
      >
        {text}
      </span>
    </div>
  );
}
