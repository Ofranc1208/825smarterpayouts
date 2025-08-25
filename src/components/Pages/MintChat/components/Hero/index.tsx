/**
 * Hero Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular hero section implementation for MintChat.
 * Provides enterprise-grade architecture with clean separation of concerns
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * Hero/
 * ├── hero-badge/           ← Mint AI badge components
 * │   ├── MintBadgeComponent.tsx
 * │   ├── HeroBadgeContainer.tsx
 * │   └── index.tsx
 * ├── hero-header/          ← Header text components
 * │   ├── HeroSubtitle.tsx
 * │   ├── HeroTitle.tsx
 * │   ├── HeroDescription.tsx
 * │   ├── HeroHeaderContainer.tsx
 * │   └── index.tsx
 * ├── hero-section/         ← Main section orchestrator
 * │   ├── HeroBackground.tsx
 * │   ├── HeroContent.tsx
 * │   ├── MintChatHeroSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatHeroSection from '@/components/Pages/MintChat/components/Hero';
 * 
 * // Named import (alternative)
 * import { MintChatHeroSection } from '@/components/Pages/MintChat/components/Hero';
 * 
 * // Granular imports for customization
 * import { HeroBadgeContainer, HeroHeaderContainer } from '@/components/Pages/MintChat/components/Hero';
 * ```
 * 
 * @module Hero
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main hero section component export
export { default } from './hero-section';
export { default as MintChatHeroSection } from './hero-section';

// Sub-module exports for granular access
export { default as HeroBadgeContainer } from './hero-badge';
export { default as HeroHeaderContainer } from './hero-header';

// Individual component exports (for advanced customization)
export { MintBadgeComponent } from './hero-badge';
export { HeroSubtitle, HeroTitle, HeroDescription } from './hero-header';
export { HeroBackground, HeroContent } from './hero-section';
