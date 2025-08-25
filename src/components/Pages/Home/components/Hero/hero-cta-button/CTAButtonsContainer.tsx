'use client';

import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

/**
 * CTA Buttons Container Component
 * 
 * Orchestrates the primary and secondary CTA buttons
 * with proper layout and spacing.
 * 
 * @component CTAButtonsContainer
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function CTAButtonsContainer() {
  return (
    <div style={{ 
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center'
    }}>
      <PrimaryButton />
      <SecondaryButton />
    </div>
  );
}
