/**
 * Solutions Header Module
 * 
 * Exports all header-related components for the MintChat solutions section.
 * Provides clean, modular access to badge, title, description, and
 * the main container component.
 * 
 * @module SolutionsHeader
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main container component (default export)
export { default } from './SolutionsHeaderContainer';

// Individual components for granular access
export { default as SolutionsHeaderContainer } from './SolutionsHeaderContainer';
export { default as SolutionsBadge } from './SolutionsBadge';
export { default as SolutionsTitle } from './SolutionsTitle';
export { default as SolutionsDescription } from './SolutionsDescription';
