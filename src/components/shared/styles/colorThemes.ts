/**
 * 🎨 GLOBAL COLOR THEME DESIGN SYSTEM
 * 
 * Centralized color palette for the ENTIRE application.
 * This file is the single source of truth for ALL pages (Main, GetAQuote, etc.)
 * 
 * 📍 Originally established on Main page, now moved to global shared for consistency.
 * 
 * Usage:
 * import { COLORS } from '@/src/components/shared/styles/colorThemes';
 * color: COLORS.primary.main
 */

export const COLORS = {
  // Primary Green Theme (Main brand color)
  primary: {
    main: '#059669',        // Emerald-600
    dark: '#047857',        // Emerald-700
    light: '#10b981',       // Emerald-500
    lighter: '#34d399',     // Emerald-400
    lightest: '#6ee7b7',    // Emerald-300
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    gradientLight: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },

  // Secondary Colors
  secondary: {
    green: '#22c55e',       // Green-500 (used in Hero buttons)
    greenDark: '#16a34a',   // Green-600
    greenDarker: '#15803d', // Green-700
    greenDarkest: '#14532d', // Green-800
  },

  // Accent Colors
  accent: {
    purple: '#7c3aed',      // Violet-600 (ValueProps)
    purpleDark: '#6d28d9',  // Violet-700
    purpleLight: '#c4b5fd', // Violet-300
    red: '#dc2626',         // Red-600 (Legal support)
    blue: '#1d4ed8',        // Blue-700 (InternalLinks)
    blueLight: '#93c5fd',   // Blue-300
    cyan: '#0891b2',        // Cyan-600 (24/7 section)
    gold: '#fbbf24',        // Amber-400 (Chat button)
    goldDark: '#f59e0b',    // Amber-500
    goldDarker: '#d97706',  // Amber-600
    goldDarkest: '#b45309', // Amber-700
    goldText: '#78350f',    // Amber-900
  },

  // Neutral Grays
  neutral: {
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },

  // Border Colors
  borders: {
    light: '#f3f4f6',       // Gray-100
    medium: '#e5e7eb',      // Gray-200
    dark: '#d1d5db',        // Gray-300
    green: '#bbf7d0',       // Green-200
    blue: '#93c5fd',        // Blue-300
    purple: '#c4b5fd',      // Purple-300
  },

  // Background Colors
  backgrounds: {
    white: '#ffffff',
    lightGray: '#f8fafc',   // Slate-50
    slate: '#f1f5f9',       // Slate-100
    cream: '#f8fafb',
    greenPale: '#f0fdf4',   // Green-50
    
    // Gradient Backgrounds
    whiteToGray: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    whiteToSlate: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
    slateGradient: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
    
    // Green Gradients
    greenLight: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    greenLighter: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    
    // Purple Gradients
    purpleLight: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
    
    // Blue Gradients
    blueLight: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    blueLighter: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    
    // Red Gradients
    redLight: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
  },

  // Text Colors
  text: {
    primary: '#1f2937',     // Gray-800 (main headings)
    secondary: '#374151',   // Gray-700 (body text)
    tertiary: '#6b7280',    // Gray-500 (subtle text)
    light: '#9ca3af',       // Gray-400
    white: '#ffffff',
    green: '#047857',       // Emerald-700
    greenDark: '#065f46',   // Emerald-800
  },

  // Title Gradients (for gradient text)
  titleGradients: {
    grayToGreen: 'linear-gradient(135deg, #1f2937 0%, #059669 100%)',
    grayToGray: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    grayToPurple: 'linear-gradient(135deg, #1f2937 0%, #7c3aed 100%)',
    grayToBlue: 'linear-gradient(135deg, #1f2937 0%, #1d4ed8 100%)',
  },

  // Shadow Colors (rgba for opacity)
  shadows: {
    green: 'rgba(5, 150, 105, 0.3)',
    greenLight: 'rgba(5, 150, 105, 0.15)',
    greenLighter: 'rgba(5, 150, 105, 0.08)',
    purple: 'rgba(124, 58, 237, 0.15)',
    blue: 'rgba(29, 78, 216, 0.12)',
    blueLight: 'rgba(29, 78, 216, 0.3)',
    red: 'rgba(220, 38, 38, 0.15)',
    cyan: 'rgba(8, 145, 178, 0.15)',
    gold: 'rgba(251, 191, 36, 0.3)',
    goldLight: 'rgba(251, 191, 36, 0.4)',
    black: 'rgba(0, 0, 0, 0.08)',
    blackMedium: 'rgba(0, 0, 0, 0.12)',
  },

  // Radial Gradient Colors (for background decorations)
  radialGradients: {
    greenLight: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
    greenLighter: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
    greenLightest: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 50%)',
    purpleLight: 'radial-gradient(circle, rgba(76, 29, 149, 0.1) 0%, transparent 70%)',
  },
} as const;

/**
 * Helper function to create custom gradients
 */
export const createGradient = (from: string, to: string, angle: number = 135) => {
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`;
};

/**
 * Helper function to create rgba color with opacity
 */
export const withOpacity = (color: string, opacity: number) => {
  // Simple helper for rgba colors
  // For hex colors, you'd need a conversion function
  return color.replace(')', `, ${opacity})`).replace('rgb(', 'rgba(');
};

