/**
 * Hero Background Component
 * 
 * Reusable background wrapper component for the hero section with
 * gradient background, responsive container, and proper accessibility.
 * 
 * @component HeroBackground
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import React from 'react';
import type { HeroBackgroundProps } from './types';

/**
 * Hero background wrapper component
 * 
 * @param {HeroBackgroundProps} props - Component props
 * @returns {JSX.Element} Hero background wrapper
 */
export default function HeroBackground({
  background,
  children,
  style = {}
}: HeroBackgroundProps): JSX.Element {
  return (
    <section 
      aria-labelledby="hero-heading" 
      style={{
        background: background.gradient,
        padding: background.padding,
        position: "relative",
        overflow: "hidden",
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
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
