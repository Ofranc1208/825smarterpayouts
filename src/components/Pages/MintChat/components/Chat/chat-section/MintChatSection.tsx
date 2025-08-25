import React from 'react';
import ChatBackground from './ChatBackground';
import ChatContainer from '../chat-interface/ChatContainer';

/**
 * MintChat Section Component
 * 
 * Main orchestrator component for the MintChat chat section.
 * Combines background styling and chat interface with enterprise-grade
 * architecture and optimal performance.
 * 
 * @component MintChatSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * MintChat Section Component
 * 
 * ## Architecture
 * - **ChatBackground**: Gradient background styling
 * - **ChatContainer**: Chat interface with responsive layout
 * 
 * ## Features
 * - ✅ Responsive design with mobile-first approach
 * - ✅ Optimized for Core Web Vitals
 * - ✅ Accessibility compliant layout
 * - ✅ Clean separation of concerns
 * - ✅ Reusable modular components
 * - ✅ Enterprise-grade documentation
 * 
 * ## Layout
 * - Uses semantic `<main>` element
 * - Relative positioning for background
 * - Auto height with bottom padding
 * - Responsive padding: 0 0 2rem
 * 
 * @example
 * ```tsx
 * import MintChatSection from './MintChatSection';
 * 
 * export default function MintChatPage() {
 *   return (
 *     <div>
 *       <HeroSection />
 *       <MintChatSection />
 *       // Other sections
 *     </div>
 *   );
 * }
 * ```
 */
export default function MintChatSection() {
  return (
    <main style={{
      position: "relative",
      minHeight: "auto",
      padding: "0 0 2rem"
    }}>
      <ChatBackground />
      <ChatContainer />
    </main>
  );
}
