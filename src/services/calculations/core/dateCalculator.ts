// ============================================================================
// 📅 DATE CALCULATOR - Core Date Utility Functions
// ============================================================================
// Pure functions for date calculations used across all calculation services.
// No dependencies on external services.

/**
 * Calculate the number of months from today to a target date
 * 
 * @param targetDate - The target date string (YYYY-MM-DD)
 * @returns Number of months from today (can be negative if date is in the past)
 */
export function calculateMonthsFromToday(targetDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  const yearsDiff = target.getFullYear() - today.getFullYear();
  const monthsDiff = target.getMonth() - today.getMonth();
  const daysDiff = target.getDate() - today.getDate();
  
  // Use 30.44 days per month average (365.25 / 12)
  return yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
}

/**
 * Calculate the difference in months between two dates
 * 
 * @param startDate - Start date string (YYYY-MM-DD)
 * @param endDate - End date string (YYYY-MM-DD)
 * @returns Number of months between the dates
 */
export function calculateMonthsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  const daysDiff = end.getDate() - start.getDate();
  
  return yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
}

/**
 * Add months to a date
 * 
 * @param date - The base date
 * @param months - Number of months to add
 * @returns New date with months added
 */
export function addMonthsToDate(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);
  
  // Handle month-end edge cases (e.g., Jan 31 + 1 month = Feb 28/29)
  if (result.getDate() < day) {
    result.setDate(0); // Set to last day of previous month
  }
  
  return result;
}

/**
 * Check if a date is in the past
 * 
 * @param dateString - Date string to check (YYYY-MM-DD)
 * @returns True if date is in the past
 */
export function isDateInPast(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  
  return target < today;
}

/**
 * Normalize a date to midnight (00:00:00)
 * 
 * @param date - Date to normalize
 * @returns New date at midnight
 */
export function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Parse date string and return normalized Date object
 * 
 * @param dateString - Date string (YYYY-MM-DD)
 * @returns Normalized Date object
 */
export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return normalizeDate(date);
}

