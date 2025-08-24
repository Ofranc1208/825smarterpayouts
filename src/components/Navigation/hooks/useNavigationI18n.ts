import { useState, useEffect, useCallback } from 'react';
import { 
  NavigationTranslations, 
  NAVIGATION_TRANSLATIONS, 
  DEFAULT_LANGUAGE, 
  SUPPORTED_LANGUAGES,
  SupportedLanguage 
} from '../i18n';

/**
 * Navigation Internationalization Hook
 * 
 * Provides i18n functionality for navigation components including:
 * - Language detection and switching
 * - Translation retrieval
 * - RTL support detection
 * - Persistent language preferences
 * 
 * @hook useNavigationI18n
 * @author SmarterPayouts Team
 * @since 2024
 */

interface UseNavigationI18nReturn {
  /** Current language code */
  currentLanguage: string;
  /** Current language object */
  language: SupportedLanguage;
  /** Translations for current language */
  t: NavigationTranslations;
  /** Whether current language is RTL */
  isRTL: boolean;
  /** Available languages */
  availableLanguages: SupportedLanguage[];
  /** Change language function */
  changeLanguage: (languageCode: string) => void;
  /** Get translation by key */
  translate: (key: keyof NavigationTranslations) => string;
}

/**
 * Navigation I18n Hook
 * 
 * Manages internationalization for navigation components with
 * automatic language detection and persistent preferences
 */
export const useNavigationI18n = (): UseNavigationI18nReturn => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);

  // Initialize language from browser/localStorage
  useEffect(() => {
    const initializeLanguage = () => {
      // Try to get saved language preference
      const savedLanguage = localStorage.getItem('navigation-language');
      if (savedLanguage && NAVIGATION_TRANSLATIONS[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
        return;
      }

      // Detect browser language
      const browserLanguage = navigator.language.split('-')[0];
      if (NAVIGATION_TRANSLATIONS[browserLanguage]) {
        setCurrentLanguage(browserLanguage);
        return;
      }

      // Fallback to default
      setCurrentLanguage(DEFAULT_LANGUAGE);
    };

    initializeLanguage();
  }, []);

  // Get current language object
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || 
                   SUPPORTED_LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE)!;

  // Get translations for current language
  const t = NAVIGATION_TRANSLATIONS[currentLanguage] || NAVIGATION_TRANSLATIONS[DEFAULT_LANGUAGE];

  // Check if current language is RTL
  const isRTL = language.rtl;

  // Change language function
  const changeLanguage = useCallback((languageCode: string) => {
    if (NAVIGATION_TRANSLATIONS[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('navigation-language', languageCode);
      
      // Update document direction for RTL support
      const newLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
      if (newLanguage) {
        document.documentElement.dir = newLanguage.rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = languageCode;
      }
    }
  }, []);

  // Translation helper function
  const translate = useCallback((key: keyof NavigationTranslations): string => {
    return t[key] || NAVIGATION_TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;
  }, [t]);

  // Update document attributes when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  return {
    currentLanguage,
    language,
    t,
    isRTL,
    availableLanguages: SUPPORTED_LANGUAGES,
    changeLanguage,
    translate
  };
};
