/**
 * Benefits Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular benefits section implementation for MintChat.
 * Provides enterprise-grade architecture with clean separation of concerns
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * Benefits/
 * ├── benefits-cards/       ← Benefit cards and grid
 * │   ├── BenefitCard.tsx
 * │   ├── BenefitsGrid.tsx
 * │   └── index.tsx
 * ├── benefits-section/     ← Main section orchestrator
 * │   ├── MintChatBenefitsSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatBenefitsSection from '@/components/Pages/MintChat/components/Benefits';
 * 
 * // Named import (alternative)
 * import { MintChatBenefitsSection } from '@/components/Pages/MintChat/components/Benefits';
 * 
 * // Granular imports for customization
 * import { BenefitsGrid, BenefitCard } from '@/components/Pages/MintChat/components/Benefits';
 * ```
 * 
 * @module Benefits
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main benefits section component export
export { default } from './benefits-section';
export { default as MintChatBenefitsSection } from './benefits-section';

// Sub-module exports for granular access
export { default as BenefitsGrid } from './benefits-cards';

// Individual component exports (for advanced customization)
export { BenefitCard } from './benefits-cards';
