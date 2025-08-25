/**
 * Hero Module - YouTube Channel Enterprise Edition
 * 
 * Complete ultra-modular Hero implementation for YouTube Channel.
 * Provides enterprise-grade hero section with clean separation
 * of concerns and optimal user experience.
 * 
 * ## Module Structure
 * ```
 * Hero/
 * ├── hero-header/          ← Badge, title, and description
 * │   ├── HeroBadge.tsx
 * │   ├── HeroTitle.tsx
 * │   ├── HeroDescription.tsx
 * │   ├── HeroHeaderContainer.tsx
 * │   └── index.tsx
 * ├── hero-buttons/         ← Subscribe and Mint chat CTAs
 * │   ├── SubscribeButton.tsx
 * │   ├── MintChatButton.tsx
 * │   ├── HeroButtonsContainer.tsx
 * │   └── index.tsx
 * ├── hero-section/         ← Main hero orchestrator
 * │   ├── HeroBackground.tsx
 * │   ├── HeroContent.tsx
 * │   ├── YouTubeHeroSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import YouTubeHeroSection from '@/components/Pages/youtube-channel/components/Hero';
 * 
 * // Named import (alternative)
 * import { YouTubeHeroSection } from '@/components/Pages/youtube-channel/components/Hero';
 * 
 * // Granular imports for customization
 * import { HeroBadge, SubscribeButton } from '@/components/Pages/youtube-channel/components/Hero';
 * ```
 * 
 * @module Hero
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main hero section component export
export { default } from './hero-section';
export { default as YouTubeHeroSection } from './hero-section';

// Sub-module exports for granular access
export { HeroBadge, HeroTitle, HeroDescription, HeroHeaderContainer } from './hero-header';
export { SubscribeButton, MintChatButton, HeroButtonsContainer } from './hero-buttons';
export { HeroBackground, HeroContent } from './hero-section';
