/**
 * Navigation I18n - Enterprise Edition
 * 
 * Modular internationalization system for navigation components
 * 
 * @module NavigationI18n
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Modular Edition
 */

// Core provider and hook
export { 
  NavigationI18nProvider, 
  useNavigationI18n,
  type I18nContextType 
} from './NavigationI18nProvider';

// UI Components
export { LanguageSelector } from './LanguageSelector';
export { RTLWrapper, useRTLStyle, useRTLTextAlign } from './RTLWrapper';

// Translation data and types
export { 
  navigationTranslations, 
  rtlLanguages, 
  languageMetadata,
  type SupportedLanguage,
  type NavigationTranslations 
} from './translations';

// Default export
export { NavigationI18nProvider as default } from './NavigationI18nProvider';
