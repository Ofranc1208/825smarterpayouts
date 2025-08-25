/**
 * Problems Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular problems section implementation for MintChat.
 * Provides enterprise-grade architecture with clean separation of concerns
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * Problems/
 * ├── problems-header/      ← Header components (badge, title, description)
 * │   ├── ProblemsBadge.tsx
 * │   ├── ProblemsTitle.tsx
 * │   ├── ProblemsDescription.tsx
 * │   ├── ProblemsHeaderContainer.tsx
 * │   └── index.tsx
 * ├── problems-cards/       ← Problem cards and grid
 * │   ├── ProblemCard.tsx
 * │   ├── ProblemsGrid.tsx
 * │   └── index.tsx
 * ├── problems-section/     ← Main section orchestrator
 * │   ├── MintChatProblemsSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatProblemsSection from '@/components/Pages/MintChat/components/Problems';
 * 
 * // Named import (alternative)
 * import { MintChatProblemsSection } from '@/components/Pages/MintChat/components/Problems';
 * 
 * // Granular imports for customization
 * import { ProblemsHeaderContainer, ProblemsGrid } from '@/components/Pages/MintChat/components/Problems';
 * ```
 * 
 * @module Problems
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main problems section component export
export { default } from './problems-section';
export { default as MintChatProblemsSection } from './problems-section';

// Sub-module exports for granular access
export { default as ProblemsHeaderContainer } from './problems-header';
export { default as ProblemsGrid } from './problems-cards';

// Individual component exports (for advanced customization)
export { ProblemsBadge, ProblemsTitle, ProblemsDescription } from './problems-header';
export { ProblemCard } from './problems-cards';
