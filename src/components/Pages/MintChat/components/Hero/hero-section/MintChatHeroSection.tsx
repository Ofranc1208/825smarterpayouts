import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

/**
 * MintChat Hero Section Component
 * 
 * Main orchestrator component for the MintChat hero section.
 * Combines background, content, and layout with enterprise-grade
 * architecture and optimal performance.
 * 
 * @component MintChatHeroSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * MintChat Hero Section Component
 * 
 * ## Architecture
 * - **HeroBackground**: Gradient background with decorative patterns
 * - **HeroContent**: Badge and header content with proper layout
 * 
 * ## Features
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Optimized for Core Web Vitals
 * - ✅ Accessibility compliant layout
 * - ✅ Clean separation of concerns
 * - ✅ Reusable modular components
 * 
 * @example
 * ```tsx
 * import MintChatHeroSection from './MintChatHeroSection';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <main>
 *       <MintChatHeroSection />
 *       // Other sections
 *     </main>
 *   );
 * }
 * ```
 */
export default function MintChatHeroSection() {
  return (
    <section style={{
      padding: "1rem 0 0.5rem",
      position: "relative",
      overflow: "hidden"
    }}>
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
