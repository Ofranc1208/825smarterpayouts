/**
 * Hero Section Component for Info Hub Pages
 * Reusable hero with gradient background and optimized spacing
 *
 * NO CSS FILES - All styles inline
 * Uses COLORS from shared/styles
 * Optimized padding for cleaner layout
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS } from '@/src/components/shared/styles';

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  showCTAs?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = "Knowledge Center",
  title,
  subtitle,
  showCTAs = true
}) => {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      padding: "3rem 0 2rem",
      position: "relative",
      overflow: "hidden",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: COLORS.primary.main,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "1rem"
        }}>
          {badge}
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "700",
          color: COLORS.text.primary,
          marginBottom: "1.5rem",
          lineHeight: "1.2"
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: "1.125rem",
          color: COLORS.text.tertiary,
          maxWidth: "600px",
          margin: "0 auto 1.5rem",
          lineHeight: "1.6"
        }}>
          {subtitle}
        </p>
        {showCTAs && (
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Button
              as="a"
              href="/mint-chat-active?type=calculate&source=info-hub-hero"
              variant="technology-primary"
              size="sm"
              enhancedHover={true}
              shimmer={true}
            >
              💰 Get Your Quote
            </Button>
            <Button
              as="a"
              href="/mint-intelligent-chat?chat=open&feature=calculator"
              variant="mint-chat"
              size="sm"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              💬 Chat with Mint AI
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

