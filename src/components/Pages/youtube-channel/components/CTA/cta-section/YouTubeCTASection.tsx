import React from 'react';
import CTABackground from './CTABackground';
import CTAContent from './CTAContent';

/**
 * YouTube CTA Section Component - Enterprise Edition
 * 
 * Main orchestrator component for the YouTube Channel CTA section.
 * Combines background styling with content in an ultra-modular architecture.
 * 
 * @component YouTubeCTASection
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

interface YouTubeCTASectionProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom Mint AI chat URL */
  mintChatUrl?: string;
  /** Optional custom calculator URL */
  calculatorUrl?: string;
  /** Optional background color theme */
  theme?: 'green' | 'blue' | 'purple';
  /** Show pro tip */
  showProTip?: boolean;
  /** Show trust indicator */
  showTrustIndicator?: boolean;
}

/**
 * YouTube CTA Section Component - Enterprise Edition
 * 
 * ## Architecture
 * - **CTABackground**: Theme-based background with pattern overlays
 * - **CTAContent**: Header, buttons, and trust elements orchestration
 *   - **CTAHeaderContainer**: Icon, title, description
 *   - **CTAButtonsContainer**: Mint chat and calculator CTAs
 *   - **CTATrustContainer**: Pro tips and trust indicators
 * 
 * ## Features
 * - ✅ Ultra-modular component architecture
 * - ✅ Theme-based styling with multiple color schemes
 * - ✅ Responsive design with mobile optimization
 * - ✅ Accessibility compliance (WCAG 2.1 AA)
 * - ✅ Interactive hover effects and animations
 * - ✅ SEO optimization with proper heading structure
 * - ✅ Trust elements and credibility indicators
 * 
 * ## Performance Optimizations
 * - ✅ Efficient CSS-in-JS with minimal re-renders
 * - ✅ Optimized background patterns
 * - ✅ Smooth transitions and animations
 * 
 * @param props - Component props
 * @returns JSX element for complete YouTube CTA section
 * 
 * @example
 * ```tsx
 * <YouTubeCTASection 
 *   title="Want Personalized Guidance?"
 *   description="Get instant answers..."
 *   theme="green"
 *   showProTip={true}
 * />
 * ```
 */
export default function YouTubeCTASection({
  title = "Want Personalized Guidance?",
  description = "Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.",
  mintChatUrl = "/mint-intelligent-chat",
  calculatorUrl = "/pricing-calculator",
  theme = 'green',
  showProTip = true,
  showTrustIndicator = false
}: YouTubeCTASectionProps) {
  // Get theme color for content
  const getThemeColor = () => {
    const themes = {
      green: '#059669',
      blue: '#2563eb',
      purple: '#7c3aed'
    };
    return themes[theme];
  };

  return (
    <CTABackground theme={theme}>
      <CTAContent
        icon="🎯"
        title={title}
        description={description}
        mintChatUrl={mintChatUrl}
        calculatorUrl={calculatorUrl}
        themeColor={getThemeColor()}
        showProTip={showProTip}
        showTrustIndicator={showTrustIndicator}
      />
    </CTABackground>
  );
}
