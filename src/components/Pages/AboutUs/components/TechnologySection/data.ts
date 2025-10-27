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
    title: "Instant Quote Engine",
    description: "Real-time settlement valuations in under 60 seconds.",
    icon: "⚡",
    link: "/pricing-calculator",
    linkText: "Try Calculator",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
  },
  {
    title: "Mint AI Assistant",
    description: "24/7 AI support guides you through every step.",
    icon: "/assets/images/mint-mascot.png",
    link: "/mint-intelligent-chat",
    linkText: "Chat with Mint",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
  },
  {
    title: "Digital-First Platform",
    description: "Secure online experience with document upload and tracking.",
    icon: "💻",
    link: "/get-a-quote",
    linkText: "Get Started",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)"
  },
  {
    title: "Blockchain Security",
    description: "Military-grade encryption protects your data.",
    icon: "🔐",
    color: "#dc2626",
    gradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
  }
];

/**
 * Section configuration
 */
export const TECHNOLOGY_CONFIG = {
  title: "Technology",
  description: "AI-powered platform for instant quotes with no personal info required.",
  ctaText: "Get started today.",
  ctaButtonText: "Get Started",
  ctaButtonLink: "/get-a-quote"
} as const;
