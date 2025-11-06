/**
 * Email Formatters
 * Shared formatting utilities for email templates
 */

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Format date to US format (MM/DD/YYYY)
 */
export function formatDate(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Format date string (YYYY-MM-DD) to US format (MM/DD/YYYY)
 */
export function formatDateString(dateString: string): string {
  if (!dateString) return dateString;
  
  // Handle ISO format (YYYY-MM-DD)
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }
  
  // If already in US format or other format, try to parse and reformat
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return formatDate(date);
  }
  
  return dateString; // Return as-is if can't parse
}

/**
 * Format calculator type display name
 */
export function formatCalculatorType(
  calculatorType: 'guaranteed' | 'lcp'
): string {
  return calculatorType === 'guaranteed'
    ? 'Guaranteed Payments'
    : 'Life-Contingent Payments (LCP)';
}

/**
 * Format delivery method display name
 */
export function formatDeliveryMethod(deliveryMethod: 'email' | 'sms'): string {
  return deliveryMethod === 'email' ? 'Email' : 'SMS/Text Message';
}

/**
 * Clean phone number for tel: links
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

