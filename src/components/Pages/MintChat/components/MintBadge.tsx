import React from 'react';

/**
 * Mint AI Badge Component
 * 
 * A reusable badge component for displaying Mint AI branding
 * across the chat interface. Supports different variants and
 * custom styling.
 * 
 * @component MintBadge
 * @author SmarterPayouts Team
 * @since 2024
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
 * @param variant - Badge style variant
 * @param style - Additional custom styles
 */
const MintBadge: React.FC<MintBadgeProps> = ({ 
  variant = 'default', 
  style = {} 
}) => {
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
      🤖 Mint AI
    </div>
  );
};

export default MintBadge;
