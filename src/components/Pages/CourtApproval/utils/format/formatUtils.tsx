// Formatting utilities for Court Approval page
import type { ProcessStep } from '../../types/courtApprovalTypes';

// Format currency values
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format large numbers with abbreviations
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format time durations
export const formatDuration = (days: number): string => {
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month' : `${months} months`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year' : `${years} years`;
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
    return `+1 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7)}`;
  }
  
  return phone; // Return original if format not recognized
};

// Calculate process completion percentage
export const calculateProcessCompletion = (steps: ProcessStep[], currentStep: number): number => {
  if (!steps.length) return 0;
  return Math.round((currentStep / steps.length) * 100);
};

// Get next process step
export const getNextProcessStep = (steps: ProcessStep[], currentStep: number): ProcessStep | null => {
  const nextIndex = currentStep;
  return nextIndex < steps.length ? steps[nextIndex] : null;
};
