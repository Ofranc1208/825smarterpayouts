import React from 'react';

/**
 * CTA Icon Component for YouTube Channel
 * 
 * Displays the CTA section icon with consistent styling
 * and accessibility features.
 * 
 * @component CTAIcon
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTAIconProps {
  /** Icon emoji or text */
  icon?: string;
  /** Icon size */
  size?: string;
}

/**
 * CTA Icon Component
 * 
 * ## Features
 * - ✅ Consistent icon styling
 * - ✅ Accessibility compliance
 * - ✅ Visual enhancement with drop shadow
 * - ✅ Responsive sizing
 * 
 * @param props - Component props
 * @returns JSX element for CTA icon
 * 
 * @example
 * ```tsx
 * <CTAIcon icon="🎯" size="2.5rem" />
 * ```
 */
export default function CTAIcon({ 
  icon = "🎯", 
  size = "2.5rem" 
}: CTAIconProps) {
  return (
    <div 
      style={{
        fontSize: size,
        marginBottom: '1rem',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        textAlign: 'center'
      }}
      role="img"
      aria-label="Call to action icon"
    >
      {icon}
    </div>
  );
}
