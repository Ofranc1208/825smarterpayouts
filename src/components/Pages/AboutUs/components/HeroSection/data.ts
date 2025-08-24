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

import type { HeroConfig, HeroCTAButton } from '../../types';

/**
 * Hero section configuration
 */
export const HERO_CONFIG: HeroConfig = {
  badge: {
    variant: 'compact',
    text: 'About SmarterPayouts'
  },
  title: 'Revolutionizing Structured Settlements with AI',
  subtitle: 'About SmarterPayouts',
  description: "We're not just another settlement company. We're the first AI-powered platform that puts you in control of your financial future with instant quotes, intelligent assistance, and groundbreaking technology.",
  background: {
    gradient: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
    padding: "4rem 0 3rem"
  }
} as const;

/**
 * Hero CTA buttons configuration
 */
export const HERO_CTA_BUTTONS: HeroCTAButton[] = [
  {
    id: 'instant-offer',
    text: 'Get Your Instant Offer',
    href: '/pricing-calculator',
    ariaLabel: 'Get your instant structured settlement quote',
    variant: 'primary',
    gradient: "linear-gradient(135deg, #09b44d 0%, #047857 100%)",
    icon: null
  },
  {
    id: 'mint-ai',
    text: '💬 Meet Mint AI',
    href: '/mint-intelligent-chat',
    ariaLabel: 'Chat with Mint AI assistant for structured settlement help',
    variant: 'secondary',
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    icon: '💬'
  }
];

/**
 * Hero animation configuration
 */
export const HERO_ANIMATIONS = {
  fadeIn: {
    duration: 800,
    delay: 200,
    easing: 'ease-out'
  },
  slideUp: {
    duration: 600,
    delay: 400,
    easing: 'ease-out'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  }
} as const;
