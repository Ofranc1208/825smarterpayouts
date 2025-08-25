/**
 * Hero Header Module
 * 
 * Exports all header-related components for the MintChat hero section.
 * Provides clean, modular access to subtitle, title, description, and
 * the main container component.
 * 
 * @module HeroHeader
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main container component (default export)
export { default } from './HeroHeaderContainer';

// Individual components for granular access
export { default as HeroHeaderContainer } from './HeroHeaderContainer';
export { default as HeroSubtitle } from './HeroSubtitle';
export { default as HeroTitle } from './HeroTitle';
export { default as HeroDescription } from './HeroDescription';
