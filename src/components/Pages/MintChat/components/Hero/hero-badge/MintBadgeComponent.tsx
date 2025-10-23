import React from 'react';

/**
 * Mint AI Badge Component for MintChat Hero
 * 
 * A reusable badge component for displaying Mint AI branding
 * across the chat interface. Supports different variants and
 * custom styling with enterprise-grade implementation.
 * 
 * @component MintBadgeComponent
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface MintBadgeProps {
  /** Badge variant for different display styles */
  variant?: 'default' | 'compact';
  /** Custom styles to apply to the badge */
  style?: React.CSSProperties;
}

/**
 * Mint AI Badge Component
 * 
 * Displays the Mint AI branding with consistent styling
 * and optional variants for different use cases.
 * 
 * ## Features
 * - ✅ Multiple variants (default, compact)
 * - ✅ Custom styling support
 * - ✅ Consistent branding colors
 * - ✅ Responsive design
 * - ✅ Accessibility compliant
 * 
 * @param variant - Badge style variant
 * @param style - Additional custom styles
 * @example
 * ```tsx
 * <MintBadgeComponent variant="compact" />
 * <MintBadgeComponent variant="default" style={{ marginTop: '1rem' }} />
 * ```
 */
export default function MintBadgeComponent({ 
  variant = 'default', 
  style = {} 
}: MintBadgeProps) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      padding: variant === 'compact' ? '0.375rem 0.75rem' : '0.5rem 1rem',
      borderRadius: '20px',
      border: '1px solid #bbf7d0',
      fontSize: variant === 'compact' ? '0.75rem' : '0.875rem',
      fontWeight: '600',
      color: '#047857',
      ...style
    }}>
      <img
        src="/assets/images/mint-mascot.png"
        alt="Mint AI"
        style={{
          width: variant === 'compact' ? '14px' : '16px',
          height: variant === 'compact' ? '14px' : '16px',
          objectFit: 'contain',
          marginRight: '0.25rem',
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
      />
      Mint AI
    </div>
  );
}
