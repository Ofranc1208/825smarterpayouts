// Navigation Core Types

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

export interface DropdownMenu {
  id: string;
  trigger: string;
  items: NavigationItem[];
  isOpen?: boolean;
}

export interface NavigationState {
  isMobileMenuOpen: boolean;
  activeDropdown: string | null;
  searchQuery: string;
  isSearchOpen: boolean;
  currentPath: string;
}

export interface NavigationActions {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleDropdown: (dropdownId: string) => void;
  closeAllDropdowns: () => void;
  setSearchQuery: (query: string) => void;
  toggleSearch: () => void;
  setCurrentPath: (path: string) => void;
}

export interface NavigationProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'transparent' | 'solid';
  showSearch?: boolean;
  showMobileMenu?: boolean;
}

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

export interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
  dropdownMenus: DropdownMenu[];
  onDropdownToggle: (dropdownId: string) => void;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
}
