/**
 * Navigation I18n Provider - Enterprise Edition
 * 
 * Core internationalization provider for navigation components
 * 
 * @module NavigationI18nProvider
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { track } from '@vercel/analytics';
import { SupportedLanguage, navigationTranslations, rtlLanguages } from './translations';

export interface I18nContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
  formatNumber: (num: number) => string;
  formatDate: (date: Date) => string;
  getDirection: () => 'ltr' | 'rtl';
}

// Create i18n context
const I18nContext = createContext<I18nContextType | null>(null);

interface NavigationI18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: SupportedLanguage;
  enableAutoDetect?: boolean;
  enablePersistence?: boolean;
  enableAnalytics?: boolean;
}

/**
 * Navigation I18n Provider
 */
export const NavigationI18nProvider: React.FC<NavigationI18nProviderProps> = ({
  children,
  defaultLanguage = 'en',
  enableAutoDetect = true,
  enablePersistence = true,
  enableAnalytics = true
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(defaultLanguage);

  /**
   * Auto-detect user language
   */
  useEffect(() => {
    if (!enableAutoDetect || typeof window === 'undefined') return;

    const detectLanguage = (): SupportedLanguage => {
      // Check localStorage first (if persistence enabled)
      if (enablePersistence) {
        const stored = localStorage.getItem('navigation-language') as SupportedLanguage;
        if (stored && Object.keys(navigationTranslations['nav.home']).includes(stored)) {
          return stored;
        }
      }

      // Check browser language
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      if (Object.keys(navigationTranslations['nav.home']).includes(browserLang)) {
        return browserLang;
      }

      return defaultLanguage;
    };

    const detectedLang = detectLanguage();
    if (detectedLang !== currentLanguage) {
      setCurrentLanguage(detectedLang);
    }
  }, [enableAutoDetect, enablePersistence, defaultLanguage, currentLanguage]);

  /**
   * Set language and persist
   */
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    const previousLang = currentLanguage;
    setCurrentLanguage(lang);
    
    if (typeof window !== 'undefined') {
      // Persist language preference
      if (enablePersistence) {
        localStorage.setItem('navigation-language', lang);
      }
      
      // Update document attributes
      document.documentElement.lang = lang;
      document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    }

    // Track language change
    if (enableAnalytics && previousLang !== lang) {
      track('navigation_language_change', {
        from: previousLang,
        to: lang,
        timestamp: Date.now()
      });
    }
  }, [currentLanguage, enablePersistence, enableAnalytics]);

  /**
   * Translation function
   */
  const t = useCallback((key: string, fallback?: string): string => {
    const translation = navigationTranslations[key];
    
    if (!translation) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key}`);
      }
      return fallback || key;
    }

    return translation[currentLanguage] || translation.en || fallback || key;
  }, [currentLanguage]);

  /**
   * Check if current language is RTL
   */
  const isRTL = rtlLanguages.includes(currentLanguage);

  /**
   * Get text direction
   */
  const getDirection = useCallback((): 'ltr' | 'rtl' => {
    return isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  /**
   * Format number according to locale
   */
  const formatNumber = useCallback((num: number): string => {
    try {
      return new Intl.NumberFormat(currentLanguage).format(num);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to format number for locale ${currentLanguage}:`, error);
      }
      return num.toString();
    }
  }, [currentLanguage]);

  /**
   * Format date according to locale
   */
  const formatDate = useCallback((date: Date): string => {
    try {
      return new Intl.DateTimeFormat(currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to format date for locale ${currentLanguage}:`, error);
      }
      return date.toLocaleDateString();
    }
  }, [currentLanguage]);

  const contextValue: I18nContextType = {
    currentLanguage,
    setLanguage,
    t,
    isRTL,
    formatNumber,
    formatDate,
    getDirection
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * Hook to use i18n context
 */
export const useNavigationI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useNavigationI18n must be used within NavigationI18nProvider');
  }
  return context;
};

export default NavigationI18nProvider;
