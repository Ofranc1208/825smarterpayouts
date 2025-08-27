/**
 * Navigation Translation Data
 * 
 * Centralized translation data for navigation components
 * 
 * @module NavigationTranslations
 * @author SmarterPayouts Team
 * @since 2024
 */

// Supported languages
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ar' | 'he';

export interface NavigationTranslations {
  [key: string]: {
    [lang in SupportedLanguage]: string;
  };
}

// Navigation translations
export const navigationTranslations: NavigationTranslations = {
  // Main navigation items
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    pt: 'Início',
    zh: '首页',
    ja: 'ホーム',
    ar: 'الرئيسية',
    he: 'בית'
  },
  'nav.company': {
    en: 'Company Info',
    es: 'Información de la Empresa',
    fr: 'Informations sur l\'Entreprise',
    de: 'Unternehmensinformationen',
    pt: 'Informações da Empresa',
    zh: '公司信息',
    ja: '会社情報',
    ar: 'معلومات الشركة',
    he: 'מידע על החברה'
  },
  'nav.legal': {
    en: 'Legal',
    es: 'Legal',
    fr: 'Juridique',
    de: 'Rechtliches',
    pt: 'Jurídico',
    zh: '法律',
    ja: '法的事項',
    ar: 'قانوني',
    he: 'משפטי'
  },
  'nav.resources': {
    en: 'Resources',
    es: 'Recursos',
    fr: 'Ressources',
    de: 'Ressourcen',
    pt: 'Recursos',
    zh: '资源',
    ja: 'リソース',
    ar: 'الموارد',
    he: 'משאבים'
  },
  'nav.about': {
    en: 'About Us',
    es: 'Acerca de Nosotros',
    fr: 'À Propos de Nous',
    de: 'Über Uns',
    pt: 'Sobre Nós',
    zh: '关于我们',
    ja: '私たちについて',
    ar: 'من نحن',
    he: 'אודותינו'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto',
    fr: 'Contact',
    de: 'Kontakt',
    pt: 'Contato',
    zh: '联系我们',
    ja: 'お問い合わせ',
    ar: 'اتصل بنا',
    he: 'צור קשר'
  },
  'nav.menu': {
    en: 'Menu',
    es: 'Menú',
    fr: 'Menu',
    de: 'Menü',
    pt: 'Menu',
    zh: '菜单',
    ja: 'メニュー',
    ar: 'القائمة',
    he: 'תפריט'
  },
  'nav.close': {
    en: 'Close',
    es: 'Cerrar',
    fr: 'Fermer',
    de: 'Schließen',
    pt: 'Fechar',
    zh: '关闭',
    ja: '閉じる',
    ar: 'إغلاق',
    he: 'סגור'
  },
  'nav.loading': {
    en: 'Loading navigation...',
    es: 'Cargando navegación...',
    fr: 'Chargement de la navigation...',
    de: 'Navigation wird geladen...',
    pt: 'Carregando navegação...',
    zh: '正在加载导航...',
    ja: 'ナビゲーションを読み込んでいます...',
    ar: 'جاري تحميل التنقل...',
    he: 'טוען ניווט...'
  },
  // Accessibility labels
  'nav.aria.main': {
    en: 'Main navigation',
    es: 'Navegación principal',
    fr: 'Navigation principale',
    de: 'Hauptnavigation',
    pt: 'Navegação principal',
    zh: '主导航',
    ja: 'メインナビゲーション',
    ar: 'التنقل الرئيسي',
    he: 'ניווט ראשי'
  },
  'nav.aria.dropdown': {
    en: 'Dropdown menu',
    es: 'Menú desplegable',
    fr: 'Menu déroulant',
    de: 'Dropdown-Menü',
    pt: 'Menu suspenso',
    zh: '下拉菜单',
    ja: 'ドロップダウンメニュー',
    ar: 'القائمة المنسدلة',
    he: 'תפריט נפתח'
  },
  'nav.aria.toggle': {
    en: 'Toggle navigation menu',
    es: 'Alternar menú de navegación',
    fr: 'Basculer le menu de navigation',
    de: 'Navigationsmenü umschalten',
    pt: 'Alternar menu de navegação',
    zh: '切换导航菜单',
    ja: 'ナビゲーションメニューを切り替え',
    ar: 'تبديل قائمة التنقل',
    he: 'החלף תפריט ניווט'
  },
  'nav.aria.language': {
    en: 'Select language',
    es: 'Seleccionar idioma',
    fr: 'Sélectionner la langue',
    de: 'Sprache auswählen',
    pt: 'Selecionar idioma',
    zh: '选择语言',
    ja: '言語を選択',
    ar: 'اختر اللغة',
    he: 'בחר שפה'
  }
};

// RTL languages
export const rtlLanguages: SupportedLanguage[] = ['ar', 'he'];

// Language metadata
export const languageMetadata: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' }
];
