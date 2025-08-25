/**
 * Solutions Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular solutions section implementation for MintChat.
 * Provides enterprise-grade architecture with clean separation of concerns
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * Solutions/
 * ├── solutions-header/     ← Header components (badge, title, description)
 * │   ├── SolutionsBadge.tsx
 * │   ├── SolutionsTitle.tsx
 * │   ├── SolutionsDescription.tsx
 * │   ├── SolutionsHeaderContainer.tsx
 * │   └── index.tsx
 * ├── solutions-section/    ← Main section orchestrator
 * │   ├── MintChatSolutionsSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatSolutionsSection from '@/components/Pages/MintChat/components/Solutions';
 * 
 * // Named import (alternative)
 * import { MintChatSolutionsSection } from '@/components/Pages/MintChat/components/Solutions';
 * 
 * // Granular imports for customization
 * import { SolutionsHeaderContainer } from '@/components/Pages/MintChat/components/Solutions';
 * ```
 * 
 * @module Solutions
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main solutions section component export
export { default } from './solutions-section';
export { default as MintChatSolutionsSection } from './solutions-section';

// Sub-module exports for granular access
export { default as SolutionsHeaderContainer } from './solutions-header';

// Individual component exports (for advanced customization)
export { SolutionsBadge, SolutionsTitle, SolutionsDescription } from './solutions-header';
