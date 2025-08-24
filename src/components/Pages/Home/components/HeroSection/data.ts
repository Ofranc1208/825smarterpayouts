/**
 * Hero Section Data
 * 
 * Centralized data configuration for hero section content.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module HeroData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { HeroSectionProps, CTAButton } from '../../types';

/**
 * Hero CTA buttons configuration
 */
export const HERO_CTA_BUTTONS: CTAButton[] = [
  {
    text: "How Our Process Works",
    url: "/main",
    variant: "primary",
    icon: "📋",
    ariaLabel: "Learn about our settlement process"
  },
  {
    text: "Early Payout Calculator",
    url: "/pricing-calculator",
    variant: "secondary",
    icon: "🧮",
    ariaLabel: "Calculate your settlement value"
  }
];

/**
 * Hero section configuration
 */
export const HERO_CONFIG: Required<HeroSectionProps> = {
  title: "Get the Highest Early Payout for Your Future Payments",
  subtitle: "Industry's First AI-Powered Self-Quoting Platform",
  description: "You're in control — Mint, our AI assistant, handles the rest.",
  primaryButton: HERO_CTA_BUTTONS[0],
  secondaryButton: HERO_CTA_BUTTONS[1],
  videoUrl: "/assets/videos/promos/counting-cash.mp4",
  imageUrl: "/assets/images/hero-fallback.jpg"
} as const;
