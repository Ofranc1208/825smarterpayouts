/**
 * Hero Background Component
 * 
 * Wrapper component that provides the background styling and container
 * for all hero section content. Uses design system tokens for consistent
 * backgrounds, spacing, and layout.
 * 
 * @component
 * @param {HeroBackgroundProps} props - Component props
 * @param {ReactNode} props.children - Content to render inside the hero background
 * @returns {JSX.Element} Rendered hero background wrapper
 * 
 * @example
 * <HeroBackground>
 *   <HeroBadge />
 *   <HeroTitle />
 *   <HeroDescription />
 * </HeroBackground>
 */

import { ReactNode } from 'react';
import { COLORS, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

interface HeroBackgroundProps {
  /** Child components to render inside the hero section */
  children: ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section style={{
      background: COLORS.backgrounds.greenLight,
      padding: `${SPACING.unit.xxl} 0`,
      textAlign: 'center',
      borderBottom: `1px solid ${COLORS.borders.light}`
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.padding
      }}>
        {children}
      </div>
    </section>
  );
}
