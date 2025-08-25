import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

/**
 * YouTube Hero Section Component - Enterprise Edition
 * 
 * Main orchestrator component for the YouTube Channel hero section.
 * Combines background styling with content in an ultra-modular architecture.
 * 
 * @component YouTubeHeroSection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

interface YouTubeHeroSectionProps {
  /** Optional custom title override */
  title?: string;
  /** Optional custom description override */
  description?: string;
  /** Optional custom YouTube channel URL */
  channelUrl?: string;
  /** Optional custom Mint AI chat URL */
  mintChatUrl?: string;
  /** Badge text */
  badgeText?: string;
  /** Badge icon */
  badgeIcon?: string;
}

/**
 * YouTube Hero Section Component - Enterprise Edition
 * 
 * ## Architecture
 * - **HeroBackground**: Gradient background with pattern overlays
 * - **HeroContent**: Header and buttons orchestration
 *   - **HeroHeaderContainer**: Badge, title, description
 *   - **HeroButtonsContainer**: Subscribe and Mint chat CTAs
 * 
 * ## Features
 * - ✅ Ultra-modular component architecture
 * - ✅ Responsive design with mobile optimization
 * - ✅ Accessibility compliance (WCAG 2.1 AA)
 * - ✅ Interactive hover effects and animations
 * - ✅ SEO optimization with proper heading structure
 * - ✅ Brand-consistent styling and colors
 * 
 * ## Performance Optimizations
 * - ✅ Efficient CSS-in-JS with minimal re-renders
 * - ✅ Optimized background patterns
 * - ✅ Smooth transitions and animations
 * 
 * @param props - Component props
 * @returns JSX element for complete YouTube hero section
 * 
 * @example
 * ```tsx
 * <YouTubeHeroSection 
 *   title="SmarterPayouts Video Library"
 *   description="Educational video content..."
 *   channelUrl="https://www.youtube.com/@smarterpayouts"
 * />
 * ```
 */
export default function YouTubeHeroSection({
  title = "SmarterPayouts Video Library",
  description = "Learn about structured settlements, early payouts, and financial strategies through our educational video content.",
  channelUrl = "https://www.youtube.com/@smarterpayouts",
  mintChatUrl = "/mint-intelligent-chat",
  badgeText = "YouTube Channel",
  badgeIcon = "📺"
}: YouTubeHeroSectionProps) {
  return (
    <HeroBackground>
      <HeroContent
        badgeText={badgeText}
        badgeIcon={badgeIcon}
        title={title}
        description={description}
        channelUrl={channelUrl}
        mintChatUrl={mintChatUrl}
      />
    </HeroBackground>
  );
}
