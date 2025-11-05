/**
 * Technology Section Data
 * 
 * Centralized data configuration for technology features and content.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module TechnologyData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { TechnologyFeature } from '../../types';

/**
 * Technology features data
 */
export const TECHNOLOGY_FEATURES: TechnologyFeature[] = [
  {
    title: "AI-Powered Calculator",
    description: "Instant settlement quotes in under 60 seconds with no personal information required.",
    icon: "⚡",
    link: "/get-a-quote",
    linkText: "Get Quote",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)"
  },
  {
    title: "Mint AI Assistant",
    description: "24/7 AI support that guides you through every step of the process.",
    icon: "/assets/images/mint-mascot.png",
    link: "/mint-intelligent-chat",
    linkText: "Chat with Mint",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)"
  }
];

/**
 * Section configuration
 */
export const TECHNOLOGY_CONFIG = {
  title: "Our Innovations",
  description: "Pioneering technology that makes settlement quotes fast, transparent, and accessible.",
  ctaText: "Get started today.",
  ctaButtonText: "Get Your Quote",
  ctaButtonLink: "/get-a-quote"
} as const;
