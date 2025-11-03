/**
 * Validation Utilities for Offer Capture Overlay
 * 
 * Pure functions for validating and formatting user input
 */

/**
 * Validates email address format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Filters and validates email input as user types
 * Prevents invalid characters and ensures proper email format
 */
export function filterEmailInput(value: string): string {
  // Remove invalid characters (keep letters, numbers, @, ., -, _)
  let filtered = value.replace(/[^a-zA-Z0-9@._-]/g, '');
  
  // Prevent multiple @ symbols
  const atCount = (filtered.match(/@/g) || []).length;
  if (atCount > 1) {
    const firstAt = filtered.indexOf('@');
    filtered = filtered.slice(0, firstAt + 1) + filtered.slice(firstAt + 1).replace(/@/g, '');
  }
  
  // Prevent @ at the start
  if (filtered.startsWith('@')) {
    filtered = filtered.slice(1);
  }
  
  // Prevent consecutive dots before @
  filtered = filtered.replace(/\.\.+/g, '.');
  
  // Prevent . right after @
  filtered = filtered.replace(/@\./g, '@');
  
  // Limit length to reasonable email length
  if (filtered.length > 254) {
    filtered = filtered.slice(0, 254);
  }
  
  return filtered;
}

/**
 * Validates US phone number format (10 digits)
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
}

/**
 * Formats phone number as user types
 * Converts: 1234567890 -> (123) 456-7890
 */
export function formatPhoneNumber(value: string): string {
  const phoneNumber = value.replace(/\D/g, '');
  
  if (phoneNumber.length >= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  } else if (phoneNumber.length >= 3) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else if (phoneNumber.length > 0) {
    return `(${phoneNumber}`;
  }
  return phoneNumber;
}

/**
 * Extracts and validates phone number from message text
 * Supports various formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
 * Returns the phone number if valid, null otherwise
 */
export function extractPhoneNumberFromText(text: string): string | null {
  // First, try to find 10-digit sequences (US phone number)
  // This regex looks for phone numbers in various formats
  const phonePatterns = [
    /\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, // (123) 456-7890, 123-456-7890, etc.
    /\b\d{10}\b/g, // 1234567890
  ];
  
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      for (const match of matches) {
        const digitsOnly = match.replace(/\D/g, '');
        // Check for 10 digits
        if (digitsOnly.length === 10) {
          return digitsOnly;
        }
        // Check for 11 digits starting with 1 (US country code)
        if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
          return digitsOnly.slice(1); // Remove the leading 1
        }
      }
    }
  }
  
  return null;
}

/**
 * Validates that message contains a valid phone number
 */
export function validateMessageContainsPhone(message: string): boolean {
  const phoneNumber = extractPhoneNumberFromText(message);
  return phoneNumber !== null && phoneNumber.length === 10;
}

