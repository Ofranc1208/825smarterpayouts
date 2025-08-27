/**
 * Language Selector Component
 * 
 * Dropdown component for selecting navigation language
 * 
 * @module LanguageSelector
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';
import { useNavigationI18n } from './NavigationI18nProvider';
import { SupportedLanguage, languageMetadata } from './translations';

interface LanguageSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'dropdown' | 'buttons';
  showFlags?: boolean;
  compact?: boolean;
}

/**
 * Language Selector Component
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className, 
  style,
  variant = 'dropdown',
  showFlags = true,
  compact = false
}) => {
  const { currentLanguage, setLanguage, t, isRTL } = useNavigationI18n();

  if (variant === 'buttons') {
    return (
      <LanguageSelectorButtons 
        className={className}
        style={style}
        showFlags={showFlags}
        compact={compact}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        t={t}
        isRTL={isRTL}
      />
    );
  }

  return (
    <LanguageSelectorDropdown 
      className={className}
      style={style}
      showFlags={showFlags}
      compact={compact}
      currentLanguage={currentLanguage}
      setLanguage={setLanguage}
      t={t}
      isRTL={isRTL}
    />
  );
};

/**
 * Dropdown variant of language selector
 */
interface LanguageSelectorVariantProps {
  className?: string;
  style?: React.CSSProperties;
  showFlags: boolean;
  compact: boolean;
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageSelectorDropdown: React.FC<LanguageSelectorVariantProps> = ({
  className,
  style,
  showFlags,
  compact,
  currentLanguage,
  setLanguage,
  t,
  isRTL
}) => {
  const selectorStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style
  };

  const selectStyle: React.CSSProperties = {
    padding: compact ? '0.25rem 0.5rem' : '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    backgroundColor: 'white',
    fontSize: compact ? '0.75rem' : '0.875rem',
    cursor: 'pointer',
    direction: isRTL ? 'rtl' : 'ltr',
    minWidth: compact ? '80px' : '120px'
  };

  return (
    <div className={className} style={selectorStyle}>
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        style={selectStyle}
        aria-label={t('nav.aria.language', 'Select language')}
      >
        {languageMetadata.map(lang => (
          <option key={lang.code} value={lang.code}>
            {showFlags ? `${lang.flag} ` : ''}{compact ? lang.code.toUpperCase() : lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Button variant of language selector
 */
const LanguageSelectorButtons: React.FC<LanguageSelectorVariantProps> = ({
  className,
  style,
  showFlags,
  compact,
  currentLanguage,
  setLanguage,
  t,
  isRTL
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem',
    direction: isRTL ? 'rtl' : 'ltr',
    ...style
  };

  const buttonStyle: React.CSSProperties = {
    padding: compact ? '0.25rem 0.5rem' : '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    backgroundColor: 'white',
    fontSize: compact ? '0.75rem' : '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: compact ? '40px' : '60px'
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  };

  return (
    <div 
      className={className} 
      style={containerStyle}
      role="radiogroup"
      aria-label={t('nav.aria.language', 'Select language')}
    >
      {languageMetadata.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={currentLanguage === lang.code ? activeButtonStyle : buttonStyle}
          aria-pressed={currentLanguage === lang.code}
          aria-label={`${t('nav.aria.language', 'Select language')}: ${lang.name}`}
          title={lang.name}
        >
          {showFlags ? lang.flag : ''}{compact ? '' : ` ${lang.code.toUpperCase()}`}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
