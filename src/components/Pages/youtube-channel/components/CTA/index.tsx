/**
 * CTA Module - YouTube Channel Enterprise Edition
 * 
 * Complete ultra-modular CTA implementation for YouTube Channel.
 * Provides enterprise-grade call-to-action section with clean separation
 * of concerns and optimal user experience.
 * 
 * ## Module Structure
 * ```
 * CTA/
 * ├── cta-header/           ← Icon, title, and description
 * │   ├── CTAIcon.tsx
 * │   ├── CTATitle.tsx
 * │   ├── CTADescription.tsx
 * │   ├── CTAHeaderContainer.tsx
 * │   └── index.tsx
 * ├── cta-buttons/          ← Mint chat and calculator CTAs
 * │   ├── MintChatCTAButton.tsx
 * │   ├── CalculatorCTAButton.tsx
 * │   ├── CTAButtonsContainer.tsx
 * │   └── index.tsx
 * ├── cta-trust/            ← Pro tips and trust indicators
 * │   ├── ProTip.tsx
 * │   ├── TrustIndicator.tsx
 * │   ├── CTATrustContainer.tsx
 * │   └── index.tsx
 * ├── cta-section/          ← Main CTA orchestrator
 * │   ├── CTABackground.tsx
 * │   ├── CTAContent.tsx
 * │   ├── YouTubeCTASection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import YouTubeCTASection from '@/components/Pages/youtube-channel/components/CTA';
 * 
 * // Named import (alternative)
 * import { YouTubeCTASection } from '@/components/Pages/youtube-channel/components/CTA';
 * 
 * // Granular imports for customization
 * import { CTAIcon, MintChatCTAButton } from '@/components/Pages/youtube-channel/components/CTA';
 * ```
 * 
 * @module CTA
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main CTA section component export
export { default } from './cta-section';
export { default as YouTubeCTASection } from './cta-section';

// Sub-module exports for granular access
export { CTAIcon, CTATitle, CTADescription, CTAHeaderContainer } from './cta-header';
export { MintChatCTAButton, CalculatorCTAButton, CTAButtonsContainer } from './cta-buttons';
export { ProTip, TrustIndicator, CTATrustContainer } from './cta-trust';
export { CTABackground, CTAContent } from './cta-section';
