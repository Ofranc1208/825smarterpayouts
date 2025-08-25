/**
 * Problems Header Module
 * 
 * Exports all header-related components for the MintChat problems section.
 * Provides clean, modular access to badge, title, description, and
 * the main container component.
 * 
 * @module ProblemsHeader
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main container component (default export)
export { default } from './ProblemsHeaderContainer';

// Individual components for granular access
export { default as ProblemsHeaderContainer } from './ProblemsHeaderContainer';
export { default as ProblemsBadge } from './ProblemsBadge';
export { default as ProblemsTitle } from './ProblemsTitle';
export { default as ProblemsDescription } from './ProblemsDescription';
