import React from 'react';
import ChatManagerWrapper from './ChatManagerWrapper';

/**
 * Chat Container Component for MintChat
 * 
 * Provides the container layout and styling for the chat interface
 * with responsive design and optimal spacing.
 * 
 * @component ChatContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Chat Container Component
 * 
 * ## Features
 * - ✅ Responsive container layout
 * - ✅ Optimal max-width and centering
 * - ✅ Consistent padding and spacing
 * - ✅ Clean separation of concerns
 * 
 * ## Layout
 * - Max width: 1200px
 * - Centered with auto margins
 * - Responsive padding: 0 1rem
 * 
 * @example
 * ```tsx
 * import ChatContainer from './ChatContainer';
 * 
 * export default function ChatSection() {
 *   return (
 *     <section>
 *       <ChatContainer />
 *     </section>
 *   );
 * }
 * ```
 */
export default function ChatContainer() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem"
    }}>
      <ChatManagerWrapper />
    </div>
  );
}
