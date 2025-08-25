import React from 'react';

/**
 * Chat Background Component for MintChat
 * 
 * Provides the gradient background styling for the chat section
 * with optimal visual appeal and readability.
 * 
 * @component ChatBackground
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Chat Background Component
 * 
 * ## Features
 * - ✅ Subtle gradient background
 * - ✅ Optimal contrast for readability
 * - ✅ Responsive design
 * - ✅ Performance optimized
 * 
 * ## Design
 * - Gradient: Light gray to slightly darker gray
 * - Direction: Top to bottom
 * - Colors: #f9fafb to #f3f4f6
 * 
 * @example
 * ```tsx
 * import ChatBackground from './ChatBackground';
 * 
 * export default function ChatSection() {
 *   return (
 *     <main style={{ position: 'relative' }}>
 *       <ChatBackground />
 *       // Chat content here
 *     </main>
 *   );
 * }
 * ```
 */
export default function ChatBackground() {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%)",
      zIndex: -1
    }} />
  );
}
