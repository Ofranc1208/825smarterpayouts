/**
 * Problems Cards Module
 * 
 * Exports all card-related components for the MintChat problems section.
 * Provides clean, modular access to individual problem cards and
 * the responsive grid layout.
 * 
 * @module ProblemsCards
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main grid component (default export)
export { default } from './ProblemsGrid';

// Individual components for granular access
export { default as ProblemsGrid } from './ProblemsGrid';
export { default as ProblemCard } from './ProblemCard';
