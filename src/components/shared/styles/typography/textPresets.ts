/**
 * 🎯 TEXT PRESETS - Pre-configured Typography Styles
 * 
 * Common text style combinations for frequent use cases.
 * These presets ensure consistency across the application.
 * 
 * @module TextPresets
 */

import { TYPOGRAPHY } from './fontScales';
import { getHeadingStyles, getBodyStyles, getCardTitleStyles } from './textHelpers';

// ═══════════════════════════════════════════════════════════════════════════════
//                          COMMON TEXT STYLE PRESETS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Pre-configured text styles for common use cases
 */
export const TEXT_PRESETS = {
  // Hero section
  heroTitle: getHeadingStyles('h1'),
  heroSubtitle: getBodyStyles('large', 'regular'),
  h1: getHeadingStyles('h1'),
  
  // Section headers
  sectionTitle: getHeadingStyles('h2'),
  sectionSubtitle: getBodyStyles('large', 'regular'),
  h2: getHeadingStyles('h2'),
  h3: getHeadingStyles('h3'),
  
  // Eyebrow text
  eyebrow: {
    fontSize: '0.875rem',
    fontWeight: '600' as any,
    color: '#059669',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  
  // Body text
  body: getBodyStyles('medium', 'regular'),
  bodyLarge: getBodyStyles('large', 'regular'),
  caption: getBodyStyles('small', 'regular'),
  captionBold: getBodyStyles('small', 'semibold'),
  
  // Card styles
  cardTitle: getCardTitleStyles('medium'),
  cardText: getBodyStyles('medium', 'regular'),
  cardSubtext: getBodyStyles('small', 'regular'),
  
  // Stat ribbons
  statNumber: {
    fontSize: '1.75rem',
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  statLabel: getBodyStyles('small', 'medium'),
  
  // Testimonials
  testimonialText: {
    fontSize: '1.1rem',
    fontWeight: TYPOGRAPHY.fontWeight.regular,
    lineHeight: TYPOGRAPHY.lineHeight.loose,
    fontStyle: 'italic' as const,
  },
  testimonialAuthor: {
    fontSize: '1.1rem',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  
  // FAQ
  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  faqAnswer: getBodyStyles('medium', 'regular', { lineHeight: TYPOGRAPHY.lineHeight.loose }),
  
  // Links
  link: getBodyStyles('medium', 'medium'),
  linkSmall: getBodyStyles('small', 'medium'),
} as const;

export default TEXT_PRESETS;

