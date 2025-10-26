/**
 * Fuzzy String Matching Utility
 * 
 * Handles typos, spelling variations, and spacing issues in user input
 * to ensure the AI responds correctly even with imperfect input.
 */

/**
 * Calculate Levenshtein distance between two strings
 * (measures how many single-character edits are needed to change one word into another)
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity score between two strings (0-1, where 1 is identical)
 */
function similarityScore(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1.0;
  
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
}

/**
 * Normalize string for comparison
 * - Convert to lowercase
 * - Remove extra spaces
 * - Remove punctuation
 * - Handle common variations
 */
export function normalizeString(input: string): string {
  return input
    .toLowerCase()
    .trim()
    // Remove punctuation
    .replace(/[.,!?;:'"()]/g, '')
    // Normalize spaces (multiple spaces to single space)
    .replace(/\s+/g, ' ')
    // Handle common brand name variations
    .replace(/smarterpayouts?/g, 'smarter payouts')
    .replace(/smarter\s*pay\s*outs?/g, 'smarter payouts');
}

/**
 * Check if input matches a pattern with fuzzy matching
 * 
 * @param input - User input string
 * @param patterns - Array of patterns to match against
 * @param threshold - Similarity threshold (0-1, default 0.75 = 75% match)
 * @returns true if any pattern matches above threshold
 */
export function fuzzyMatch(
  input: string,
  patterns: string[],
  threshold: number = 0.75
): boolean {
  const normalizedInput = normalizeString(input);

  for (const pattern of patterns) {
    const normalizedPattern = normalizeString(pattern);
    const score = similarityScore(normalizedInput, normalizedPattern);

    // Also check if the pattern is contained within the input (for longer queries)
    const containsPattern = normalizedInput.includes(normalizedPattern);
    const patternContainsInput = normalizedPattern.includes(normalizedInput);

    if (score >= threshold || containsPattern || patternContainsInput) {
      return true;
    }
  }

  return false;
}

/**
 * Find the best matching pattern from a list
 * 
 * @param input - User input string
 * @param patterns - Array of patterns to match against
 * @returns Object with matched pattern and confidence score, or null if no good match
 */
export function findBestMatch(
  input: string,
  patterns: string[],
  threshold: number = 0.75
): { pattern: string; score: number } | null {
  const normalizedInput = normalizeString(input);
  let bestMatch: { pattern: string; score: number } | null = null;

  for (const pattern of patterns) {
    const normalizedPattern = normalizeString(pattern);
    const score = similarityScore(normalizedInput, normalizedPattern);

    // Also check containment for partial matches
    const containsPattern = normalizedInput.includes(normalizedPattern);
    const patternContainsInput = normalizedPattern.includes(normalizedInput);

    // Boost score if there's containment
    const finalScore = containsPattern || patternContainsInput ? Math.max(score, 0.85) : score;

    if (finalScore >= threshold && (!bestMatch || finalScore > bestMatch.score)) {
      bestMatch = { pattern, score: finalScore };
    }
  }

  return bestMatch;
}

/**
 * Predefined question patterns for common queries
 */
export const QUESTION_PATTERNS = {
  WHY_WORK_WITH_US: [
    'why work with smarterpayouts',
    'why work with smarter payouts',
    'why work with us',
    'why choose smarterpayouts',
    'why choose smarter payouts',
    'why should i work with you',
    'why should i choose you',
    'what makes you different',
    'why use smarterpayouts',
    'why use smarter payouts'
  ],
  WHAT_DO_YOU_DO: [
    'what do you do',
    'what does smarterpayouts do',
    'what does smarter payouts do',
    'what is smarterpayouts',
    'what is smarter payouts',
    'tell me about smarterpayouts',
    'tell me about smarter payouts'
  ],
  HOW_DOES_IT_WORK: [
    'how does it work',
    'how does the process work',
    'what is the process',
    'whats the process',
    'explain the process',
    'walk me through the process'
  ],
  HOW_MANY_CUSTOMERS: [
    'how many customers',
    'how many clients',
    'how many people have you helped',
    'how many customers do you have',
    'how many clients do you have'
  ],
  HOW_MUCH_DONE: [
    'how much have you done',
    'how much money',
    'total payouts',
    'how much have you paid out',
    'how much in payments'
  ],
  HOW_LONG_IN_BUSINESS: [
    'how long have you been in business',
    'how long have you been around',
    'when were you founded',
    'when did you start',
    'how old is the company'
  ],
  HOW_TO_CONTACT: [
    'how do i contact you',
    'how can i reach you',
    'contact information',
    'phone number',
    'email address',
    'how to get in touch'
  ]
};

/**
 * Match user input to a known question category
 * 
 * @param input - User input string
 * @param threshold - Similarity threshold (default 0.70 for more tolerance)
 * @returns Question category key or null
 */
export function matchQuestionCategory(
  input: string,
  threshold: number = 0.70
): keyof typeof QUESTION_PATTERNS | null {
  for (const [category, patterns] of Object.entries(QUESTION_PATTERNS)) {
    if (fuzzyMatch(input, patterns, threshold)) {
      return category as keyof typeof QUESTION_PATTERNS;
    }
  }
  return null;
}

