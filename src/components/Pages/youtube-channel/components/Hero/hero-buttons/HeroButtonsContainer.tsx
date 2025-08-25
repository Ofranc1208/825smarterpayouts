import React from 'react';
import SubscribeButton from './SubscribeButton';
import MintChatButton from './MintChatButton';

/**
 * Hero Buttons Container Component for YouTube Channel
 * 
 * Orchestrates hero CTA buttons with consistent spacing,
 * responsive layout, and accessibility features.
 * 
 * @component HeroButtonsContainer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroButtonsContainerProps {
  /** YouTube channel URL */
  channelUrl?: string;
  /** Mint AI chat URL */
  mintChatUrl?: string;
  /** Subscribe button text */
  subscribeText?: string;
  /** Mint chat button text */
  mintChatText?: string;
}

/**
 * Hero Buttons Container Component
 * 
 * ## Architecture
 * - **SubscribeButton**: YouTube channel subscription CTA
 * - **MintChatButton**: Mint AI chat interface CTA
 * 
 * ## Features
 * - ✅ Responsive flexbox layout
 * - ✅ Consistent button spacing
 * - ✅ Accessibility compliance
 * - ✅ Mobile-friendly wrapping
 * 
 * @param props - Component props
 * @returns JSX element for hero buttons container
 * 
 * @example
 * ```tsx
 * <HeroButtonsContainer 
 *   channelUrl="https://www.youtube.com/@smarterpayouts"
 *   mintChatUrl="/mint-intelligent-chat"
 * />
 * ```
 */
export default function HeroButtonsContainer({
  channelUrl = "https://www.youtube.com/@smarterpayouts",
  mintChatUrl = "/mint-intelligent-chat",
  subscribeText = "Subscribe to Channel", // Removed icon from text
  mintChatText = "Chat with Mint AI" // Removed icon from text
}: HeroButtonsContainerProps) {
  return (
    <div 
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
      role="group"
      aria-label="Hero call-to-action buttons"
    >
      {/* Subscribe Button */}
      <SubscribeButton 
        channelUrl={channelUrl}
        text={subscribeText}
        icon="📺"
        ariaLabel="Subscribe to SmarterPayouts YouTube Channel"
      />
      
      {/* Mint AI Button */}
      <MintChatButton 
        mintChatUrl={mintChatUrl}
        text={mintChatText}
        icon="💬"
        ariaLabel="Chat with Mint AI Assistant"
      />
    </div>
  );
}
