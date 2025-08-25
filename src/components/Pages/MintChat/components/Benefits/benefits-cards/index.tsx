/**
 * Benefits Cards Module
 * 
 * Exports all card-related components for the MintChat benefits section.
 * Provides clean, modular access to individual benefit cards and
 * the responsive grid layout.
 * 
 * @module BenefitsCards
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main grid component (default export)
export { default } from './BenefitsGrid';

// Individual components for granular access
export { default as BenefitsGrid } from './BenefitsGrid';
export { default as BenefitCard } from './BenefitCard';
