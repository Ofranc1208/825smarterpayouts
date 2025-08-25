/**
 * MintChat Components Module - Enterprise Edition
 * 
 * Central export hub for all MintChat page components.
 * Provides clean, modular architecture with enterprise-grade structure
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * components/
 * ├── Hero/                 ← Ultra-modular hero section (NEW)
 * │   ├── hero-badge/
 * │   ├── hero-header/
 * │   └── hero-section/
 * ├── ChatSection.tsx       ← Chat interface (TO BE MODULARIZED)
 * ├── IndustryProblemsSection.tsx  ← Problems section (TO BE MODULARIZED)
 * ├── SolutionSection.tsx   ← Solutions section (TO BE MODULARIZED)
 * ├── BenefitsGrid.tsx      ← Benefits section (TO BE MODULARIZED)
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * import {
 *   HeroSection,
 *   ChatSection,
 *   IndustryProblemsSection,
 *   SolutionSection,
 *   BenefitsGrid
 * } from '@/components/Pages/MintChat/components';
 * ```
 * 
 * @module MintChatComponents
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// ✅ ENTERPRISE-GRADE MODULAR COMPONENTS
export { default as SEOHead } from './SEO'; // Ultra-modular SEO structure ✅
export { default as HeroSection } from './Hero'; // Ultra-modular Hero structure ✅
export { default as ChatSection } from './Chat'; // Ultra-modular Chat structure ✅
export { default as IndustryProblemsSection } from './Problems'; // Ultra-modular Problems structure ✅
export { default as SolutionSection } from './Solutions'; // Ultra-modular Solutions structure ✅
export { default as BenefitsGrid } from './Benefits'; // Ultra-modular Benefits structure ✅

// 🎉 ALL COMPONENTS NOW ENTERPRISE-GRADE MODULAR!

// 🛡️ ENTERPRISE FEATURES
export { default as ErrorBoundary } from './ErrorBoundary';

// 📝 DEPRECATED COMPONENTS (Safe to delete after verification)
// - ChatSection.tsx (replaced by Chat/)
// - IndustryProblemsSection.tsx (replaced by Problems/)
// - SolutionSection.tsx (replaced by Solutions/)
// - BenefitsGrid.tsx (replaced by Benefits/)
