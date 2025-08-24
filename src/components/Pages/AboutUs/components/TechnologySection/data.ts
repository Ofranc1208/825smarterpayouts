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
    description: "Get real-time settlement valuations in under 60 seconds using our proprietary algorithms and market data.",
    icon: "⚡",
    link: "/pricing-calculator",
    linkText: "Try Calculator",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
  },
  {
    title: "Mint AI Assistant",
    description: "24/7 intelligent support powered by advanced AI to guide you through every step of your settlement journey.",
    icon: "🤖",
    link: "/mint-intelligent-chat",
    linkText: "Chat with Mint",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
  },
  {
    title: "Digital-First Platform",
    description: "Streamlined online experience with secure document upload, e-signatures, and real-time progress tracking.",
    icon: "💻",
    link: "/get-a-quote",
    linkText: "Get Started",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)"
  },
  {
    title: "Blockchain Security",
    description: "Military-grade encryption and blockchain technology ensure your personal and financial data stays protected.",
    icon: "🔐",
    color: "#dc2626",
    gradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
  }
];

/**
 * Section configuration
 */
export const TECHNOLOGY_CONFIG = {
  title: "Groundbreaking Technology Innovations",
  subtitle: "Leading the Industry with Cutting-Edge Solutions",
  description: "We've revolutionized the structured settlement industry with innovative technology that puts you in control. Our platform combines artificial intelligence, real-time data processing, and user-centric design to deliver the fastest, most accurate settlement valuations in the market.",
  ctaText: "Experience the difference technology makes in your settlement journey.",
  ctaButtonText: "Explore Our Platform",
  ctaButtonLink: "/get-a-quote"
} as const;
