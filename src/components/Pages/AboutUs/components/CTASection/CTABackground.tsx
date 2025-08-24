/**
 * CTA Background Component
 * 
 * Reusable background wrapper component for the CTA section with
 * gradient background, responsive container, and proper layout.
 * 
 * @component CTABackground
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { CTABackgroundProps } from './types';

/**
 * CTA background wrapper component
 * 
 * @param {CTABackgroundProps} props - Component props
 * @returns {JSX.Element} CTA background wrapper
 */
export default function CTABackground({
  background,
  layout,
  children,
  style = {}
}: CTABackgroundProps): JSX.Element {
  return (
    <section 
      style={{
        background: background.gradient,
        padding: background.padding,
        ...style
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: layout.textAlign
        }}>
          <div style={{
            maxWidth: layout.maxWidth
          }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
