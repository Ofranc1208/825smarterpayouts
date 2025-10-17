/**
 * CTA Section Data
 * 
 * Centralized data configuration for call-to-action section content.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module CTAData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { CTAConfig, CTAButton } from './types';

/**
 * CTA section configuration
 */
export const CTA_CONFIG: CTAConfig = {
  title: 'Ready to Experience the Future?',
  subtitle: 'Get Started Today',
  description: 'Join thousands of clients who have already discovered the SmarterPayouts difference. Get your instant quote today or chat with Mint AI for immediate assistance.',
  background: {
    gradient: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 100%)",
    padding: "4rem 0"
  },
  layout: {
    maxWidth: '800px',
    textAlign: 'center'
  }
} as const;

/**
 * CTA buttons configuration
 */
export const CTA_BUTTONS: CTAButton[] = [
  {
    id: 'instant-offer',
    text: 'Get Your Instant Offer',
    href: '/mint-intelligent-chat',
    ariaLabel: 'Get your instant structured settlement quote',
    variant: 'primary',
    gradient: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
    size: 'large',
    icon: null
  },
  {
    id: 'mint-ai-chat',
    text: 'Chat with Mint AI',
    href: '/mint-intelligent-chat?chat=open&feature=calculator',
    ariaLabel: 'Chat with Mint AI assistant for immediate assistance',
    variant: 'secondary',
    gradient: "linear-gradient(135deg, #fbc233 0%, #f59e0b 100%)",
    size: 'large',
    icon: null
  }
];

/**
 * CTA animation configuration
 */
export const CTA_ANIMATIONS = {
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
  },
  buttonReset: {
    transform: 'translateY(0)',
    boxShadow: 'none',
    transition: 'all 0.2s ease'
  }
} as const;
