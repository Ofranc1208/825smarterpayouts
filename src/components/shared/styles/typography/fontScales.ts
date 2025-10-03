/**
 * 🎨 FONT SCALES - Typography Constants
 * 
 * Core typography scales: font sizes, weights, line heights, letter spacing.
 * This is the foundation of the typography system.
 * 
 * @module FontScales
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                              TYPOGRAPHY CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  /**
   * Font Size Scale
   * Follows a consistent scale for all text elements
   */
  fontSize: {
    // Heading sizes (from large to small)
    heading: {
      h1: 'clamp(1.75rem, 4.5vw, 2.75rem)', // Main hero headings (28-44px) - Reduced 15%
      h2: '2rem',                            // Section titles (32px) - User requested size
      h3: '1.75rem',                         // Sub-section titles (28px) - Reduced 15%
      h4: '1.375rem',                        // Card headings (22px) - Reduced 15%
      h5: '1.125rem',                        // Small card headings (18px) - Reduced 15%
      h6: '1rem',                            // Tertiary headings (16px) - Reduced 15%
    },
    
    // Body text sizes
    body: {
      xlarge: '1.25rem',                    // 20px - Large featured text
      large: '1.125rem',                    // 18px - Prominent body text
      medium: '1rem',                       // 16px - Standard body text
      small: '0.875rem',                    // 14px - Small text, captions
      xsmall: '0.75rem',                    // 12px - Badges, labels
    },
  },

  /**
   * Font Weight Scale
   * Consistent weights for different text purposes
   */
  fontWeight: {
    regular: '400',                         // Body text
    medium: '500',                          // Links, emphasized text
    semibold: '600',                        // Sub-headings, strong emphasis
    bold: '700',                            // Main headings, buttons
    extrabold: '800',                       // Special emphasis (icons, numbers)
  },

  /**
   * Line Height Scale
   * Different line heights for different text purposes
   */
  lineHeight: {
    tight: '1.2',                           // Large headings, numbers
    snug: '1.3',                            // Card headings
    normal: '1.5',                          // Standard body text
    relaxed: '1.6',                         // Comfortable reading
    loose: '1.7',                           // FAQ answers, long text
  },

  /**
   * Letter Spacing
   * For badges, labels, and special text
   */
  letterSpacing: {
    tight: '-0.5px',
    normal: '0',
    wide: '0.5px',
    wider: '1px',
  },
} as const;

export default TYPOGRAPHY;

