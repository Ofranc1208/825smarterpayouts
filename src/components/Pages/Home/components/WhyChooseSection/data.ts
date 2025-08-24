/**
 * Why Choose Section Data
 * 
 * Centralized data configuration for feature benefits and statistics.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module WhyChooseData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { FeatureBenefit, Statistic } from '../../types';

/**
 * Feature benefits data
 */
export const FEATURE_BENEFITS: FeatureBenefit[] = [
  {
    title: "Instant AI-Powered Quotes",
    description: "Get real-time settlement valuations in under 60 seconds using our proprietary algorithms and Mint AI assistant.",
    icon: "🤖",
    link: "/pricing-calculator",
    linkText: "Try Calculator",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
    backgroundColor: "#f8fffe"
  },
  {
    title: "No Pushy Sales Calls",
    description: "Self-service platform means no pressure, no interruptions. You control the entire process from start to finish.",
    icon: "🚫",
    color: "#dc2626",
    gradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    backgroundColor: "#fef2f2"
  },
  {
    title: "Complete Transparency",
    description: "See exactly how your quote is calculated. No hidden fees, no surprise charges, no fine print.",
    icon: "👁️",
    color: "#059669",
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    backgroundColor: "#f0fdf4"
  },
  {
    title: "Anonymous & Secure",
    description: "No personal information required for quotes. Your privacy is protected with bank-level security.",
    icon: "🔒",
    color: "#2563eb",
    gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    backgroundColor: "#eff6ff"
  },
  {
    title: "Court-Approved Process",
    description: "Every transaction follows proper legal procedures with full court approval and regulatory compliance.",
    icon: "⚖️",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
    backgroundColor: "#faf5ff"
  },
  {
    title: "Mint AI Assistant",
    description: "24/7 intelligent support powered by advanced AI to guide you through every step of your settlement journey.",
    icon: "💬",
    link: "/mint-intelligent-chat",
    linkText: "Chat with Mint",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
    backgroundColor: "#faf5ff"
  }
];

/**
 * Statistics data
 */
export const STATISTICS_DATA: Statistic[] = [
  {
    value: "$2M+",
    label: "Paid Out",
    description: "Total settlements processed",
    link: "/testimonials",
    color: "#059669"
  },
  {
    value: "35-55",
    label: "Days Average",
    description: "Time to complete process",
    link: "/how-fast-can-i-get-my-money",
    color: "#2563eb"
  },
  {
    value: "BBB",
    label: "Registered",
    description: "Better Business Bureau accredited",
    link: "/credentials",
    color: "#dc2626"
  },
  {
    value: "24/7",
    label: "AI Support",
    description: "Mint AI assistant availability",
    link: "/mint-intelligent-chat",
    color: "#8b5cf6"
  }
];

/**
 * Section configuration
 */
export const WHY_CHOOSE_CONFIG = {
  title: "Why Choose SmarterPayouts?",
  subtitle: "Industry's First AI-Powered Self-Quoting Platform",
  description: "Get instant quotes in seconds with Mint, our AI assistant. Experience the future of structured settlement transactions.",
  sectionId: "why-choose"
} as const;
