/**
 * Hero CTA Component
 * 
 * Reusable call-to-action buttons component for the hero section.
 * Uses the shared Button component for consistency across the application.
 * 
 * @component HeroCTA
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import React from 'react';
import Button from '../../../../shared/Button/Button';
import type { HeroCTAProps } from './types';

/**
 * Hero CTA buttons component
 * 
 * @param {HeroCTAProps} props - Component props
 * @returns {JSX.Element} Hero CTA buttons
 */
export default function HeroCTA({
  buttons,
  align = 'center',
  layout = 'horizontal',
  gap = '0.75rem'
}: HeroCTAProps): JSX.Element {
  const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  const flexDirection = layout === 'vertical' ? 'column' : 'row';

  return (
    <div style={{
      display: "flex",
      gap,
      justifyContent,
      flexWrap: "wrap",
      flexDirection
    }}>
      {buttons.map((button) => (
        <Button
          key={button.id}
          as="a"
          href={button.href}
          variant={button.id === 'instant-offer' ? 'technology-primary' : 'technology-secondary'}
          size="lg"
          enhancedHover={true}
          shimmer={true}
          shimmerDelay={button.id === 'instant-offer' ? 0 : 1}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
}
