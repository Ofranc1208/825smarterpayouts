// General utility functions for Court Approval page
import type { FAQItem } from '../../types/courtApprovalTypes';

// Filter FAQs by category
export const filterFAQsByCategory = (faqs: FAQItem[], category?: string): FAQItem[] => {
  if (!category) return faqs;
  return faqs.filter(faq => faq.category === category);
};

// Search FAQs by keyword
export const searchFAQs = (faqs: FAQItem[], keyword: string): FAQItem[] => {
  if (!keyword.trim()) return faqs;
  
  const searchTerm = keyword.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm)
  );
};

// Generate unique ID for components
export const generateId = (prefix: string = 'court-approval'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function for search/input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll/resize events
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

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert string to title case
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
