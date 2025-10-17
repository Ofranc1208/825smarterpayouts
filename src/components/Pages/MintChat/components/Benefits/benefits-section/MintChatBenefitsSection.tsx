import React from 'react';
import BenefitsGrid from '../benefits-cards/BenefitsGrid';

/**
 * MintChat Benefits Section Component
 * 
 * Main orchestrator component for the MintChat benefits section.
 * Displays the benefits grid with enterprise-grade architecture
 * and optimal visual design.
 * 
 * @component MintChatBenefitsSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * MintChat Benefits Section Component
 * 
 * ## Architecture
 * - **BenefitsGrid**: Responsive grid of benefit cards
 * 
 * ## Features
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Four distinct benefit cards with color themes
 * - ✅ Clean separation of concerns
 * - ✅ Reusable modular components
 * - ✅ Enterprise-grade documentation
 * - ✅ Optimal spacing and layout
 * 
 * ## Benefits Showcased
 * 1. **Complete Price Transparency** - Green theme
 * 2. **Fair Market-Based Rates** - Blue theme
 * 3. **Compare Before You Commit** - Yellow theme
 * 4. **Zero Pressure Environment** - Purple theme
 * 
 * @example
 * ```tsx
 * import MintChatBenefitsSection from './MintChatBenefitsSection';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <div>
 *       <HeroSection />
 *       <ChatSection />
 *       <ProblemsSection />
 *       <SolutionsSection />
 *       <MintChatBenefitsSection />
 *     </div>
 *   );
 * }
 * ```
 */
export default function MintChatBenefitsSection() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%)",
      padding: "3rem 2.5rem",
      borderRadius: "20px",
      border: "1px solid #e9d5ff",
      boxShadow: "0 4px 20px rgba(139, 92, 246, 0.1)",
      position: "relative"
    }}>
      <BenefitsGrid />
    </div>
  );
}
