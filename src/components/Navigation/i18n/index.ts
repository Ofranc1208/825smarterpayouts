/**
 * Navigation Internationalization Module
 * 
 * Provides i18n support for navigation components with:
 * - Multi-language support
 * - RTL (Right-to-Left) language support
 * - Dynamic language switching
 * - Fallback to default language
 * 
 * @module NavigationI18n
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface NavigationTranslations {
  // Main navigation items
  home: string;
  mintAiChat: string;
  earlyPayoutCalculator: string;
  
  // Dropdown sections
  whyUs: string;
  companyInfo: string;
  resources: string;
  process: string;
  legal: string;
  
  // Common actions
  search: string;
  searchPlaceholder: string;
  navigation: string;
  openMenu: string;
  closeMenu: string;
  
  // Accessibility labels
  mainNavigation: string;
  skipToContent: string;
  logoAlt: string;
  
  // Error messages
  navigationError: string;
  retry: string;
  loading: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false },
];

export const DEFAULT_LANGUAGE = 'en';

/**
 * Navigation translations for all supported languages
 */
export const NAVIGATION_TRANSLATIONS: Record<string, NavigationTranslations> = {
  en: {
    home: 'Home',
    mintAiChat: 'Mint AI Chat',
    earlyPayoutCalculator: 'Early Payout Calculator',
    whyUs: 'Why Us',
    companyInfo: 'Company Info',
    resources: 'Resources',
    process: 'Process',
    legal: 'Legal',
    search: 'Search',
    searchPlaceholder: 'Search...',
    navigation: 'Navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNavigation: 'Main navigation',
    skipToContent: 'Skip to content',
    logoAlt: 'Smarter Payouts Logo',
    navigationError: 'Navigation Error: Something went wrong with the navigation.',
    retry: 'Retry',
    loading: 'Loading...'
  },
  
  es: {
    home: 'Inicio',
    mintAiChat: 'Chat IA Mint',
    earlyPayoutCalculator: 'Calculadora de Pago Anticipado',
    whyUs: 'Por Qué Nosotros',
    companyInfo: 'Información de la Empresa',
    resources: 'Recursos',
    process: 'Proceso',
    legal: 'Legal',
    search: 'Buscar',
    searchPlaceholder: 'Buscar...',
    navigation: 'Navegación',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainNavigation: 'Navegación principal',
    skipToContent: 'Saltar al contenido',
    logoAlt: 'Logo de Smarter Payouts',
    navigationError: 'Error de Navegación: Algo salió mal con la navegación.',
    retry: 'Reintentar',
    loading: 'Cargando...'
  },
  
  fr: {
    home: 'Accueil',
    mintAiChat: 'Chat IA Mint',
    earlyPayoutCalculator: 'Calculateur de Paiement Anticipé',
    whyUs: 'Pourquoi Nous',
    companyInfo: 'Informations sur l\'Entreprise',
    resources: 'Ressources',
    process: 'Processus',
    legal: 'Légal',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher...',
    navigation: 'Navigation',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mainNavigation: 'Navigation principale',
    skipToContent: 'Aller au contenu',
    logoAlt: 'Logo Smarter Payouts',
    navigationError: 'Erreur de Navigation: Quelque chose s\'est mal passé avec la navigation.',
    retry: 'Réessayer',
    loading: 'Chargement...'
  },
  
  de: {
    home: 'Startseite',
    mintAiChat: 'Mint KI Chat',
    earlyPayoutCalculator: 'Vorzeitige Auszahlungsrechner',
    whyUs: 'Warum Wir',
    companyInfo: 'Firmeninformationen',
    resources: 'Ressourcen',
    process: 'Prozess',
    legal: 'Rechtliches',
    search: 'Suchen',
    searchPlaceholder: 'Suchen...',
    navigation: 'Navigation',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    mainNavigation: 'Hauptnavigation',
    skipToContent: 'Zum Inhalt springen',
    logoAlt: 'Smarter Payouts Logo',
    navigationError: 'Navigationsfehler: Etwas ist mit der Navigation schief gelaufen.',
    retry: 'Wiederholen',
    loading: 'Wird geladen...'
  },
  
  ar: {
    home: 'الرئيسية',
    mintAiChat: 'دردشة منت الذكية',
    earlyPayoutCalculator: 'حاسبة الدفع المبكر',
    whyUs: 'لماذا نحن',
    companyInfo: 'معلومات الشركة',
    resources: 'الموارد',
    process: 'العملية',
    legal: 'قانوني',
    search: 'بحث',
    searchPlaceholder: 'بحث...',
    navigation: 'التنقل',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    mainNavigation: 'التنقل الرئيسي',
    skipToContent: 'انتقل إلى المحتوى',
    logoAlt: 'شعار سمارتر بايوتس',
    navigationError: 'خطأ في التنقل: حدث خطأ في التنقل.',
    retry: 'إعادة المحاولة',
    loading: 'جاري التحميل...'
  },
  
  zh: {
    home: '首页',
    mintAiChat: 'Mint AI 聊天',
    earlyPayoutCalculator: '提前支付计算器',
    whyUs: '为什么选择我们',
    companyInfo: '公司信息',
    resources: '资源',
    process: '流程',
    legal: '法律',
    search: '搜索',
    searchPlaceholder: '搜索...',
    navigation: '导航',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    mainNavigation: '主导航',
    skipToContent: '跳转到内容',
    logoAlt: 'Smarter Payouts 标志',
    navigationError: '导航错误：导航出现问题。',
    retry: '重试',
    loading: '加载中...'
  }
};
