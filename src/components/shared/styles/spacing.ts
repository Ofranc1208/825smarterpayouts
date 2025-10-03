import { CSSProperties } from 'react';

/**
 * 📏 GLOBAL SPACING DESIGN SYSTEM
 * 
 * Centralized spacing scales for the ENTIRE application.
 * This file is the single source of truth for ALL pages (Main, GetAQuote, etc.)
 * All values follow an 8px grid system for visual harmony.
 * 
 * 📍 Originally established on Main page, now moved to global shared for consistency.
 * 
 * Usage:
 * import { SPACING, SPACING_PRESETS } from '@/src/components/shared/styles/spacing';
 * 
 * style={getSectionSpacing('standard')}
 * padding: SPACING.card.standard
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                              SPACING CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

export const SPACING = {
  /**
   * Base spacing units (8px grid system)
   */
  unit: {
    xxs: '0.25rem',    // 4px
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    xxl: '2.5rem',     // 40px
    xxxl: '3rem',      // 48px
    xxxxl: '4rem',     // 64px
  },

  /**
   * Section spacing (vertical padding for major sections)
   * Ensures consistent breathing room between sections
   */
  section: {
    compact: '3rem 0',        // 48px top/bottom (Stats, MiniFAQ, Testimonials)
    standard: '4rem 0',       // 64px top/bottom (Most sections)
    spacious: '5rem 0',       // 80px top/bottom (Hero, featured sections)
    hero: '3rem 0 5rem 0',    // Special hero spacing (48px top, 80px bottom)
  },

  /**
   * Card padding (internal spacing for cards)
   * Different sizes for different card types
   */
  card: {
    compact: '1.5rem',        // 24px (Stat ribbons, small cards)
    standard: '2rem',         // 32px (Most cards)
    comfortable: '2.5rem',    // 40px (Testimonials, featured cards)
    spacious: '3rem',         // 48px (Hero cards, CTA boxes)
  },

  /**
   * Grid gaps (spacing between grid items)
   */
  grid: {
    tight: '1rem',            // 16px (Mobile, compact grids)
    standard: '1.5rem',       // 24px (Most grids)
    comfortable: '2rem',      // 32px (Desktop, spacious layouts)
    spacious: '2.5rem',       // 40px (Featured sections)
  },

  /**
   * Stack spacing (vertical spacing between stacked elements)
   */
  stack: {
    xs: '0.5rem',             // 8px
    sm: '1rem',               // 16px
    md: '1.5rem',             // 24px
    lg: '2rem',               // 32px
    xl: '2.5rem',             // 40px
    xxl: '3rem',              // 48px
  },

  /**
   * Inline spacing (horizontal spacing between inline elements)
   */
  inline: {
    xs: '0.25rem',            // 4px
    sm: '0.5rem',             // 8px
    md: '1rem',               // 16px
    lg: '1.5rem',             // 24px
    xl: '2rem',               // 32px
  },

  /**
   * Container spacing (max-width and horizontal padding)
   */
  container: {
    maxWidth: '1200px',
    padding: '0 1rem',        // 16px horizontal padding (shorthand for styles)
    paddingX: '0 1rem',       // 16px horizontal padding
    paddingXLarge: '0 2rem',  // 32px horizontal padding (desktop)
    
    /** 
     * Complete container styles object (ready to use)
     * Combines maxWidth, padding, and margin centering
     */
    styles: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    } as React.CSSProperties,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
//                              HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get section spacing styles
 * 
 * @param variant - Spacing variant (compact, standard, spacious, hero)
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with section padding
 * 
 * @example
 * <section style={getSectionSpacing('standard')}>
 */
export const getSectionSpacing = (
  variant: 'compact' | 'standard' | 'spacious' | 'hero' = 'standard',
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    padding: SPACING.section[variant],
    ...customStyles,
  };
};

/**
 * Get card padding styles
 * 
 * @param variant - Padding variant (compact, standard, comfortable, spacious)
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with card padding
 * 
 * @example
 * <div style={getCardPadding('standard')}>
 */
export const getCardPadding = (
  variant: 'compact' | 'standard' | 'comfortable' | 'spacious' = 'standard',
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    padding: SPACING.card[variant],
    ...customStyles,
  };
};

/**
 * Get container styles (max-width and padding)
 * 
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with container styles
 * 
 * @example
 * <div style={getContainerStyles()}>
 */
export const getContainerStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    maxWidth: SPACING.container.maxWidth,
    margin: '0 auto',
    padding: SPACING.container.paddingX,
    ...customStyles,
  };
};

/**
 * Get grid styles with gap
 * 
 * @param columns - Grid columns (e.g., 'repeat(auto-fit, minmax(250px, 1fr))')
 * @param gap - Gap variant (tight, standard, comfortable, spacious)
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with grid styles
 * 
 * @example
 * <div style={getGridStyles('repeat(3, 1fr)', 'standard')}>
 */
export const getGridStyles = (
  columns: string,
  gap: 'tight' | 'standard' | 'comfortable' | 'spacious' = 'standard',
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    display: 'grid',
    gridTemplateColumns: columns,
    gap: SPACING.grid[gap],
    ...customStyles,
  };
};

/**
 * Get flex styles with gap
 * 
 * @param gap - Gap size from SPACING.inline
 * @param direction - Flex direction
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with flex styles
 * 
 * @example
 * <div style={getFlexStyles('md', 'row')}>
 */
export const getFlexStyles = (
  gap: keyof typeof SPACING.inline,
  direction: 'row' | 'column' = 'row',
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    display: 'flex',
    flexDirection: direction,
    gap: SPACING.inline[gap],
    ...customStyles,
  };
};

/**
 * Get stack spacing (vertical spacing between elements)
 * 
 * @param size - Stack size (xs, sm, md, lg, xl, xxl)
 * @returns Margin bottom value
 * 
 * @example
 * marginBottom: getStackSpacing('lg')
 */
export const getStackSpacing = (
  size: keyof typeof SPACING.stack
): string => {
  return SPACING.stack[size];
};

// ═══════════════════════════════════════════════════════════════════════════════
//                          COMMON SPACING PRESETS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Pre-configured spacing styles for common use cases
 */
export const SPACING_PRESETS = {
  // Section containers
  sectionContainer: {
    maxWidth: SPACING.container.maxWidth,
    margin: '0 auto',
    padding: SPACING.container.paddingX,
    position: 'relative' as const,
    zIndex: 1,
  },

  // Section with standard spacing
  section: {
    padding: SPACING.section.standard,
    position: 'relative' as const,
  },

  // Section with compact spacing
  sectionCompact: {
    padding: SPACING.section.compact,
    position: 'relative' as const,
  },

  // Hero section spacing
  heroSection: {
    padding: SPACING.section.hero,
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },

  // Standard card
  card: {
    padding: SPACING.card.standard,
    borderRadius: '16px',
  },

  // Stat ribbon
  statRibbon: {
    padding: SPACING.card.compact,
    borderRadius: '12px',
  },

  // Testimonial card
  testimonialCard: {
    padding: SPACING.card.comfortable,
    borderRadius: '16px',
  },

  // Grid with standard gap
  gridStandard: {
    display: 'grid' as const,
    gap: SPACING.grid.standard,
  },

  // Grid with comfortable gap
  gridComfortable: {
    display: 'grid' as const,
    gap: SPACING.grid.comfortable,
  },

  // Stack elements with medium spacing
  stackMedium: {
    marginBottom: SPACING.stack.md,
  },

  // Stack elements with large spacing
  stackLarge: {
    marginBottom: SPACING.stack.lg,
  },
} as const;

/**
 * Responsive spacing utilities
 * For breakpoints and responsive adjustments
 */
export const RESPONSIVE_SPACING = {
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },

  // Padding adjustments for different screen sizes
  sectionMobile: '2rem 0',        // 32px on mobile
  sectionTablet: '3rem 0',        // 48px on tablet
  sectionDesktop: '4rem 0',       // 64px on desktop
  
  cardMobile: '1.5rem',           // 24px on mobile
  cardTablet: '2rem',             // 32px on tablet
  cardDesktop: '2rem',            // 32px on desktop
} as const;

export default SPACING;

