import React from 'react';
import ProblemsHeaderContainer from '../problems-header/ProblemsHeaderContainer';
import ProblemsGrid from '../problems-cards/ProblemsGrid';

/**
 * MintChat Problems Section Component
 * 
 * Main orchestrator component for the MintChat problems section.
 * Combines header content and problem cards with enterprise-grade
 * architecture and optimal visual design.
 * 
 * @component MintChatProblemsSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * MintChat Problems Section Component
 * 
 * ## Architecture
 * - **ProblemsHeaderContainer**: Badge, title, and description
 * - **ProblemsGrid**: Responsive grid of problem cards
 * 
 * ## Features
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Gradient background with subtle shadow
 * - ✅ Centered text alignment
 * - ✅ Clean separation of concerns
 * - ✅ Reusable modular components
 * - ✅ Enterprise-grade documentation
 * 
 * ## Layout
 * - Gradient background: white to light gray
 * - Rounded corners with border
 * - Generous padding and margins
 * - Subtle box shadow for depth
 * 
 * @example
 * ```tsx
 * import MintChatProblemsSection from './MintChatProblemsSection';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <div>
 *       <HeroSection />
 *       <ChatSection />
 *       <MintChatProblemsSection />
 *       // Other sections
 *     </div>
 *   );
 * }
 * ```
 */
export default function MintChatProblemsSection() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      padding: "3rem 2.5rem",
      borderRadius: "20px",
      border: "1px solid #e5e7eb",
      textAlign: "center",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      position: "relative"
    }}>
      <ProblemsHeaderContainer />
      <ProblemsGrid />
    </div>
  );
}
