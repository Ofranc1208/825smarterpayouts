/**
 * Hero Section Component for Info Hub Pages
 * Reusable hero with gradient background
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
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
      padding: "5rem 0 4rem",
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
          margin: "0 auto 2rem",
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
            <Link href="/mint-chat-active?type=calculate&source=info-hub-hero" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(9, 180, 77, 0.2)",
              transition: "transform 0.2s ease"
            }}>💰 Get Your Quote</Link>
            <Link href="/mint-intelligent-chat" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(139, 92, 246, 0.2)",
              transition: "transform 0.2s ease"
            }}>💬 Chat with Mint AI</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

