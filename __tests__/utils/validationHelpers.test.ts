/**
 * STEP 1: Enterprise-Grade Testing - Pure Function Validation Tests
 * 
 * Following 2024 Next.js testing best practices:
 * - Pure function testing (no React rendering)
 * - No state changes or side effects
 * - Isolated logic validation
 * - Based on Jest + Testing Library standards
 * 
 * This ensures our validation logic is bulletproof
 * before we even touch component testing.
 */

import {
  validatePaymentAmount,
  validateDateRange,
  validateOfferThreshold,
  sanitizeNumericInput,
  formatCurrency,
  formatCurrencyWithCents,
  VALIDATION_RULES
} from '../../app/utils/validationHelpers';

describe('Validation Helpers - Pure Function Tests', () => {
  
  // ✅ STEP 1A: Payment Amount Validation
  describe('validatePaymentAmount', () => {
    
    it('should accept valid payment amounts', () => {
      const validAmounts = ['100', '1000', '50000', '10000000', '123.45', '999.99'];
      
      validAmounts.forEach(amount => {
        const result = validatePaymentAmount(amount);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject amounts below minimum ($100)', () => {
      const invalidAmounts = ['99', '50', '0', '1'];
      
      invalidAmounts.forEach(amount => {
        const result = validatePaymentAmount(amount);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at least $100');
      });
    });

    it('should reject amounts above maximum ($10M)', () => {
      const invalidAmounts = ['10000001', '50000000', '999999999'];
      
      invalidAmounts.forEach(amount => {
        const result = validatePaymentAmount(amount);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('cannot exceed $10,000,000');
      });
    });

    it('should reject forbidden characters', () => {
      const invalidAmounts = ['100*', '500#', '1000@', '2000!', 'abc123'];
      
      invalidAmounts.forEach(amount => {
        const result = validatePaymentAmount(amount);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('invalid characters');
      });
    });

    it('should reject more than 2 decimal places', () => {
      const invalidAmounts = ['100.123', '500.4567', '1000.999'];
      
      invalidAmounts.forEach(amount => {
        const result = validatePaymentAmount(amount);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at most 2 decimal places');
      });
    });

    it('should handle empty and invalid inputs', () => {
      const invalidInputs = ['', '   ', 'abc', 'NaN', 'undefined'];
      
      invalidInputs.forEach(input => {
        const result = validatePaymentAmount(input);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  // ✅ STEP 1B: Date Range Validation
  describe('validateDateRange', () => {
    
    const today = new Date();
    const futureDate1 = new Date(today.getTime() + (365 * 24 * 60 * 60 * 1000)); // +1 year
    const futureDate2 = new Date(today.getTime() + (2 * 365 * 24 * 60 * 60 * 1000)); // +2 years
    
    it('should accept valid date ranges', () => {
      const startDate = futureDate1.toISOString().split('T')[0];
      const endDate = futureDate2.toISOString().split('T')[0];
      
      const result = validateDateRange(startDate, endDate);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject end date before start date', () => {
      const startDate = futureDate2.toISOString().split('T')[0];
      const endDate = futureDate1.toISOString().split('T')[0];
      
      const result = validateDateRange(startDate, endDate);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('End date must be after start date');
    });

    it('should reject date ranges shorter than 6 months', () => {
      const startDate = futureDate1.toISOString().split('T')[0];
      const shortEndDate = new Date(futureDate1.getTime() + (30 * 24 * 60 * 60 * 1000)); // +30 days
      const endDate = shortEndDate.toISOString().split('T')[0];
      
      const result = validateDateRange(startDate, endDate);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('minimum period of 6 months');
    });

    it('should reject date ranges longer than 30 years', () => {
      const startDate = futureDate1.toISOString().split('T')[0];
      const longEndDate = new Date(futureDate1.getTime() + (31 * 365 * 24 * 60 * 60 * 1000)); // +31 years
      const endDate = longEndDate.toISOString().split('T')[0];
      
      const result = validateDateRange(startDate, endDate);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('maximum period of 30 years');
    });

    it('should handle empty date inputs', () => {
      const validCombinations = [
        ['', '2025-01-01'],
        ['2025-01-01', ''],
        ['', '']
      ];
      
      validCombinations.forEach(([start, end]) => {
        const result = validateDateRange(start, end);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    // ✅ NEW VALIDATION RULES TESTS
    it('should reject start dates less than 3 months in the future', () => {
      const today = new Date();
      
      // Test dates 1 and 2 months in the future (should fail)
      const oneMonthFuture = new Date(today);
      oneMonthFuture.setMonth(oneMonthFuture.getMonth() + 1);
      
      const twoMonthsFuture = new Date(today);
      twoMonthsFuture.setMonth(twoMonthsFuture.getMonth() + 2);
      
      const validEndDate = new Date(oneMonthFuture);
      validEndDate.setMonth(validEndDate.getMonth() + 6); // 6 months after start
      
      const startDate1 = oneMonthFuture.toISOString().split('T')[0];
      const startDate2 = twoMonthsFuture.toISOString().split('T')[0];
      const endDate = validEndDate.toISOString().split('T')[0];
      
      const result1 = validateDateRange(startDate1, endDate);
      expect(result1.isValid).toBe(false);
      expect(result1.error).toContain('3 months in the future');
      
      const result2 = validateDateRange(startDate2, endDate);
      expect(result2.isValid).toBe(false);
      expect(result2.error).toContain('3 months in the future');
    });

    it('should accept start dates 3 or more months in the future', () => {
      const today = new Date();
      
      // Test date exactly 3 months in the future (should pass)
      const threeMonthsFuture = new Date(today);
      threeMonthsFuture.setMonth(threeMonthsFuture.getMonth() + 3);
      
      // End date 6 months after start date
      const endDate = new Date(threeMonthsFuture);
      endDate.setMonth(endDate.getMonth() + 6);
      
      const startDateStr = threeMonthsFuture.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const result = validateDateRange(startDateStr, endDateStr);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject end dates less than 6 months after start date', () => {
      const today = new Date();
      
      // Valid start date (4 months in future)
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() + 4);
      
      // Invalid end dates (3 and 5 months after start)
      const endDate1 = new Date(startDate);
      endDate1.setMonth(endDate1.getMonth() + 3);
      
      const endDate2 = new Date(startDate);
      endDate2.setMonth(endDate2.getMonth() + 5);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDate1Str = endDate1.toISOString().split('T')[0];
      const endDate2Str = endDate2.toISOString().split('T')[0];
      
      const result1 = validateDateRange(startDateStr, endDate1Str);
      expect(result1.isValid).toBe(false);
      expect(result1.error).toContain('6 months after the start date');
      
      const result2 = validateDateRange(startDateStr, endDate2Str);
      expect(result2.isValid).toBe(false);
      expect(result2.error).toContain('6 months after the start date');
    });

    it('should accept end dates 6 or more months after start date', () => {
      const today = new Date();
      
      // Valid start date (4 months in future)
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() + 4);
      
      // Valid end date (exactly 6 months after start)
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const result = validateDateRange(startDateStr, endDateStr);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  // ✅ STEP 1C: Offer Threshold Validation
  describe('validateOfferThreshold', () => {
    
    it('should allow offers above $5,000 threshold', () => {
      const validOffers = [5000, 5001, 10000, 50000, 100000];
      
      validOffers.forEach(offer => {
        const result = validateOfferThreshold(offer, offer + 1000);
        expect(result.shouldShowOffer).toBe(true);
        expect(result.message).toBeUndefined();
      });
    });

    it('should reject offers below $5,000 threshold', () => {
      const invalidOffers = [0, 1000, 2500, 4999];
      
      invalidOffers.forEach(offer => {
        const result = validateOfferThreshold(offer, offer + 1000);
        expect(result.shouldShowOffer).toBe(false);
        expect(result.message).toContain('$5,000');
      });
    });
  });

  // ✅ STEP 1D: Input Sanitization
  describe('sanitizeNumericInput', () => {
    
    it('should preserve valid numeric characters', () => {
      const validInputs = [
        { input: '123', expected: '123' },
        { input: '123.45', expected: '123.45' },
        { input: '1,000', expected: '1000' },
        { input: '  500  ', expected: '500' }
      ];
      
      validInputs.forEach(({ input, expected }) => {
        expect(sanitizeNumericInput(input)).toBe(expected);
      });
    });

    it('should remove forbidden characters', () => {
      const invalidInputs = [
        { input: '123*', expected: '123' },
        { input: '500#abc', expected: '500' },
        { input: '$1,000', expected: '1000' },
        { input: '123@#$%', expected: '123' }
      ];
      
      invalidInputs.forEach(({ input, expected }) => {
        expect(sanitizeNumericInput(input)).toBe(expected);
      });
    });
  });

  // ✅ STEP 1E: Currency Formatting
  describe('Currency Formatting', () => {
    
    it('should format currency correctly', () => {
      const testCases = [
        { input: 1000, expected: '$1,000' },
        { input: 50000, expected: '$50,000' },
        { input: 1500000, expected: '$1,500,000' }
      ];
      
      testCases.forEach(({ input, expected }) => {
        expect(formatCurrency(input)).toBe(expected);
      });
    });

    it('should format currency with cents correctly', () => {
      const testCases = [
        { input: 1000.50, expected: '$1,000.50' },
        { input: 50000.99, expected: '$50,000.99' },
        { input: 1500000.00, expected: '$1,500,000.00' }
      ];
      
      testCases.forEach(({ input, expected }) => {
        expect(formatCurrencyWithCents(input)).toBe(expected);
      });
    });
  });

  // ✅ STEP 1F: Validation Rules Constants
  describe('VALIDATION_RULES constants', () => {
    
    it('should have correct payment amount limits', () => {
      expect(VALIDATION_RULES.PAYMENT_AMOUNT.MIN).toBe(100);
      expect(VALIDATION_RULES.PAYMENT_AMOUNT.MAX).toBe(10_000_000);
      expect(VALIDATION_RULES.PAYMENT_AMOUNT.MAX_DECIMAL_PLACES).toBe(2);
    });

    it('should have correct offer thresholds', () => {
      expect(VALIDATION_RULES.OFFER_THRESHOLDS.MIN_PAYOUT).toBe(5_000);
    });

    it('should have correct date rules', () => {
      expect(VALIDATION_RULES.DATE_RULES.MIN_PERIOD_MONTHS).toBe(6);
      expect(VALIDATION_RULES.DATE_RULES.MAX_PERIOD_YEARS).toBe(30);
      expect(VALIDATION_RULES.DATE_RULES.MIN_START_MONTHS_FUTURE).toBe(3);
      expect(VALIDATION_RULES.DATE_RULES.MIN_END_MONTHS_FROM_START).toBe(6);
    });

    it('should have forbidden patterns defined', () => {
      expect(VALIDATION_RULES.FORBIDDEN_PATTERNS).toHaveLength(2);
      expect(Array.isArray(VALIDATION_RULES.FORBIDDEN_PATTERNS)).toBe(true);
    });
  });
});

/**
 * 🎯 STEP 1 SUMMARY:
 * 
 * ✅ Created comprehensive pure function tests
 * ✅ No React rendering or state changes
 * ✅ No risk of infinite loops
 * ✅ Enterprise-grade test coverage
 * ✅ Following 2024 best practices
 * 
 * This validates our validation logic is rock-solid
 * before we move to component testing in Step 2.
 */