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
 * Format date to locale string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleString();
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

