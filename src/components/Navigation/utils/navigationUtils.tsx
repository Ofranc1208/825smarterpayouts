'use client';
import { NavigationItem } from '../types';

export const isActiveLink = (href: string, currentPath: string): boolean => {
  if (href === '/' && currentPath === '/') return true;
  if (href !== '/' && currentPath.startsWith(href)) return true;
  return false;
};

export const findNavigationItem = (
  items: NavigationItem[], 
  id: string
): NavigationItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findNavigationItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const flattenNavigationItems = (items: NavigationItem[]): NavigationItem[] => {
  const flattened: NavigationItem[] = [];
  
  const flatten = (items: NavigationItem[]) => {
    items.forEach(item => {
      flattened.push(item);
      if (item.children) {
        flatten(item.children);
      }
    });
  };
  
  flatten(items);
  return flattened;
};

export const generateBreadcrumbs = (
  currentPath: string, 
  navigationItems: NavigationItem[]
): Array<{ name: string; href: string }> => {
  const pathSegments = currentPath.split('/').filter(Boolean);
  const breadcrumbs: Array<{ name: string; href: string }> = [
    { name: 'Home', href: '/' }
  ];

  let currentHref = '';
  pathSegments.forEach((segment, index) => {
    currentHref += `/${segment}`;
    const item = findNavigationItem(navigationItems, segment);
    
    breadcrumbs.push({
      name: item?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentHref
    });
  });

  return breadcrumbs;
};

export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .slice(0, 100);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
