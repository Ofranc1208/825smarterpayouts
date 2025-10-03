/**
 * CTA Buttons Component
 * 
 * Reusable call-to-action buttons component for the CTA section.
 * Uses the shared Button component for consistency across the application.
 * 
 * @component CTAButtons
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import Button from '../../../../shared/Button/Button';
import type { CTAButtonsProps } from './types';

/**
 * CTA buttons component
 * 
 * @param {CTAButtonsProps} props - Component props
 * @returns {JSX.Element} CTA buttons
 */
export default function CTAButtons({
  buttons,
  align = 'center',
  layout = 'horizontal',
  gap = '1rem'
}: CTAButtonsProps): JSX.Element {
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
