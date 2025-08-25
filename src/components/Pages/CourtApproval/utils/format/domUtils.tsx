// DOM manipulation utilities for Court Approval page

// Check if element is in viewport
export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Smooth scroll to element
export const smoothScrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Get scroll depth percentage
export const getScrollDepth = (): number => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.round((scrollTop / documentHeight) * 100);
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.prepend(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

// Focus management for accessibility
export const focusElement = (elementId: string): boolean => {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
    return true;
  }
  return false;
};

// Add/remove CSS classes safely
export const toggleClass = (elementId: string, className: string, force?: boolean): boolean => {
  const element = document.getElementById(elementId);
  if (element) {
    return element.classList.toggle(className, force);
  }
  return false;
};

// Get element dimensions
export const getElementDimensions = (elementId: string): {
  width: number;
  height: number;
  top: number;
  left: number;
} | null => {
  const element = document.getElementById(elementId);
  if (element) {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left
    };
  }
  return null;
};
