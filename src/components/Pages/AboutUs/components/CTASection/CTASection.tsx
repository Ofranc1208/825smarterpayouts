/**
 * CTA Section - Main Component
 * 
 * Streamlined main component that orchestrates the CTA section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component CTASection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import CTABackground from './CTABackground';
import CTAHeader from './CTAHeader';
import CTAButtons from './CTAButtons';
import { CTA_CONFIG, CTA_BUTTONS } from './data';
import type { CTASectionProps } from './types';

/**
 * Main CTA section component
 * 
 * Orchestrates the display of CTA content with proper layout,
 * responsive behavior, and accessibility. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {CTASectionProps} props - Component props
 * @returns {JSX.Element} Complete CTA section
 */
export default function CTASection({
  id = 'cta-section',
  className,
  showSubtitle = true,
  showButtons = true,
  config
}: CTASectionProps = {}): JSX.Element {
  // Merge custom config with default config
  const ctaConfig = { ...CTA_CONFIG, ...config };

  return (
    <CTABackground 
      background={ctaConfig.background}
      layout={ctaConfig.layout}
      style={{ 
        ...(className && { className })
      }}
    >
      <CTAHeader
        title={ctaConfig.title}
        subtitle={ctaConfig.subtitle}
        description={ctaConfig.description}
        showSubtitle={showSubtitle}
        align={ctaConfig.layout.textAlign}
      />

      {showButtons && (
        <CTAButtons
          buttons={CTA_BUTTONS}
          align={ctaConfig.layout.textAlign}
          layout="horizontal"
        />
      )}
    </CTABackground>
  );
}
