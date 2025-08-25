import React from 'react';
import HeroHeaderContainer from '../hero-header/HeroHeaderContainer';
import HeroButtonsContainer from '../hero-buttons/HeroButtonsContainer';

/**
 * Hero Content Component for YouTube Channel
 * 
 * Orchestrates the main hero content including header
 * and buttons with consistent spacing and layout.
 * 
 * @component HeroContent
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroContentProps {
  /** Badge text */
  badgeText?: string;
  /** Badge icon */
  badgeIcon?: string;
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** YouTube channel URL */
  channelUrl?: string;
  /** Mint AI chat URL */
  mintChatUrl?: string;
}

/**
 * Hero Content Component
 * 
 * ## Architecture
 * - **HeroHeaderContainer**: Badge, title, and description
 * - **HeroButtonsContainer**: Subscribe and Mint chat buttons
 * 
 * ## Features
 * - ✅ Consistent content spacing
 * - ✅ Responsive layout
 * - ✅ Accessibility compliance
 * - ✅ Modular component composition
 * 
 * @param props - Component props
 * @returns JSX element for hero content
 * 
 * @example
 * ```tsx
 * <HeroContent 
 *   title="SmarterPayouts Video Library"
 *   description="Educational video content..."
 * />
 * ```
 */
export default function HeroContent({
  badgeText = "YouTube Channel",
  badgeIcon = "📺",
  title = "SmarterPayouts Video Library",
  description = "Learn about structured settlements, early payouts, and financial strategies through our educational video content.",
  channelUrl = "https://www.youtube.com/@smarterpayouts",
  mintChatUrl = "/mint-intelligent-chat"
}: HeroContentProps) {
  return (
    <>
      {/* Header Section */}
      <HeroHeaderContainer
        badgeText={badgeText}
        badgeIcon={badgeIcon}
        title={title}
        description={description}
        titleId="hero-title"
      />

      {/* CTA Buttons */}
      <HeroButtonsContainer
        channelUrl={channelUrl}
        mintChatUrl={mintChatUrl}
        subscribeText="Subscribe to Channel"
        mintChatText="Chat with Mint AI"
      />
    </>
  );
}
