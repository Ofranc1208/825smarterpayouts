/**
 * STEP 3A: Integration Tests - Calculation Service with Real Data
 * 
 * Testing the calculation service with realistic data flows that would
 * come from our UI components. This validates the integration between
 * our fixed components and the calculation engine.
 */

import { CalculationService } from './calculationService';
import type { GuaranteedFormData, LCPFormData } from '../types';

describe('CalculationService Integration Tests', () => {
  
  // ✅ Test realistic guaranteed payment scenarios
  describe('Guaranteed Payment Integration', () => {
    
    it('should handle typical user input from guaranteed form', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '1500',
        startDate: '2025-01-01',
        endDate: '2030-12-31',
        paymentMode: 'Monthly',
        annualIncrease: 2
      };

      const result = CalculationService.calculateGuaranteed(formData);

      expect(result).toEqual({
        npv: expect.any(Number),
        minPayout: expect.any(Number),
        maxPayout: expect.any(Number),
        paymentMode: 'Monthly',
        paymentAmount: '1500',
        annualIncrease: 2,
        startDate: '2025-01-01',
        endDate: '2030-12-31'
      });

      // Validate reasonable ranges
      expect(result.npv).toBeGreaterThan(0);
      expect(result.minPayout).toBeGreaterThan(0);
      expect(result.maxPayout).toBeGreaterThan(result.minPayout);
      expect(result.minPayout).toBeLessThan(result.npv);
    });

    it('should handle guaranteed lump sum from our fixed component', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '', // Not used for lump sum
        startDate: '', // Not used for lump sum
        endDate: '', // Not used for lump sum
        paymentMode: 'Lump Sum',
        annualIncrease: 0,
        payments: [
          { amount: '50000', lumpSumDate: '2025-07-01' },
          { amount: '30000', lumpSumDate: '2025-12-01' }
        ]
      };

      const result = CalculationService.calculateGuaranteed(formData);

      expect(result).toEqual({
        npv: expect.any(Number),
        minPayout: expect.any(Number),
        maxPayout: expect.any(Number),
        paymentMode: 'Lump Sum',
        paymentAmount: 80000, // Total of payments
        annualIncrease: 0,
        startDate: '2025-07-01', // Earliest date
        endDate: '2025-12-01' // Latest date
      });

      // Validate calculation integrity
      expect(result.npv).toBeGreaterThan(70000); // Should be close to but less than 80000
      expect(result.npv).toBeLessThan(80000);
    });

    it('should handle edge case: single guaranteed payment', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '100', // Minimum allowed
        startDate: '2025-01-01',
        endDate: '2025-01-01', // Same day
        paymentMode: 'Monthly',
        annualIncrease: 0
      };

      const result = CalculationService.calculateGuaranteed(formData);

      expect(result.npv).toBeGreaterThan(0);
      expect(result.minPayout).toBeGreaterThan(0);
      expect(result.maxPayout).toBeGreaterThan(result.minPayout);
    });
  });

  // ✅ Test realistic LCP scenarios
  describe('LCP Integration', () => {
    
    it('should handle typical LCP form data from our components', () => {
      const formData: LCPFormData = {
        paymentData: {
          paymentMode: 'Monthly',
          amount: '2000'
        },
        detailsData: {
          annualIncrease: 3,
          startDate: '2025-01-01',
          endDate: '2030-12-31'
        },
        profileData: {
          ageRange: '65-70',
          gender: 'Male',
          bodyFrame: 'Medium'
        },
        lifestyleData: {
          weight: '180'
        },
        healthData: {
          smoke: 'Never',
          health: 'Good',
          cardiac: 'No'
        }
      };

      const result = CalculationService.calculateLCP(formData);

      expect(result).toEqual({
        npv: expect.any(Number),
        minPayout: expect.any(Number),
        maxPayout: expect.any(Number),
        familyProtectionNPV: expect.any(Number),
        paymentData: expect.objectContaining({
          paymentMode: 'Monthly',
          amount: '2000'
        }),
        detailsData: expect.objectContaining({
          annualIncrease: 3,
          startDate: '2025-01-01',
          endDate: '2030-12-31'
        }),
        profileData: expect.objectContaining({
          ageRange: '65-70',
          gender: 'Male',
          bodyFrame: 'Medium'
        }),
        lifestyleData: expect.objectContaining({
          weight: '180'
        }),
        healthData: expect.objectContaining({
          smoke: 'Never',
          health: 'Good',
          cardiac: 'No'
        }),
        lcpKeys: expect.any(Array)
      });

      // LCP-specific validations
      expect(result.familyProtectionNPV).toBeGreaterThan(0);
      expect(result.minPayout).toBeGreaterThanOrEqual(25000); // Our minimum adjustment
      expect(result.maxPayout).toBeLessThanOrEqual(result.npv - 15000); // Our maximum adjustment
    });

    it('should handle LCP lump sum integration from our fixed component', () => {
      const formData: LCPFormData = {
        paymentData: {
          paymentMode: 'Lump Sum',
          amount: '' // Not used for lump sum
        },
        detailsData: {
          annualIncrease: 0,
          startDate: '', // Not used for lump sum
          endDate: '' // Not used for lump sum
        },
        profileData: {
          ageRange: '70-75',
          gender: 'Female',
          bodyFrame: 'Small'
        },
        lifestyleData: {
          weight: '140'
        },
        healthData: {
          smoke: 'Former',
          health: 'Fair',
          cardiac: 'Yes'
        },
        lumpSumPayments: [
          { amount: '75000', lumpSumDate: '2025-06-01' }
        ]
      };

      const result = CalculationService.calculateLCP(formData);

      expect(result.paymentData.paymentMode).toBe('Lump Sum');
      expect(result.familyProtectionNPV).toBeGreaterThan(0);
      expect(result.npv).toBeGreaterThan(0);
      expect(result.npv).toBeLessThan(75000); // Should be discounted
    });
  });

  // ✅ Test data flow consistency
  describe('Data Flow Integration', () => {
    
    it('should maintain data consistency between components and calculations', () => {
      // Simulate data coming from our form components
      const componentOutput = {
        paymentAmount: '1200',
        startDate: '2025-01-01',
        endDate: '2027-12-31',
        paymentMode: 'Quarterly' as const,
        annualIncrease: 1.5
      };

      const calculationInput: GuaranteedFormData = {
        ...componentOutput,
        annualIncrease: componentOutput.annualIncrease
      };

      const result = CalculationService.calculateGuaranteed(calculationInput);

      // Verify data flows correctly through the system
      expect(result.paymentAmount).toBe(componentOutput.paymentAmount);
      expect(result.startDate).toBe(componentOutput.startDate);
      expect(result.endDate).toBe(componentOutput.endDate);
      expect(result.paymentMode).toBe(componentOutput.paymentMode);
      expect(result.annualIncrease).toBe(componentOutput.annualIncrease);
    });

    it('should handle validation edge cases that components might send', () => {
      // Test data that passes component validation but needs service handling
      const edgeCaseData: GuaranteedFormData = {
        paymentAmount: '100.00', // Decimal input
        startDate: '2025-12-31', // End of year
        endDate: '2025-12-31', // Same day
        paymentMode: 'Annual',
        annualIncrease: 0
      };

      const result = CalculationService.calculateGuaranteed(edgeCaseData);

      expect(result.npv).toBeGreaterThan(0);
      expect(typeof result.npv).toBe('number');
      expect(Number.isFinite(result.npv)).toBe(true);
    });
  });

  // ✅ Test calculation accuracy with realistic scenarios
  describe('Calculation Accuracy Integration', () => {
    
    it('should produce consistent results for the same input', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '1000',
        startDate: '2025-01-01',
        endDate: '2026-01-01',
        paymentMode: 'Monthly',
        annualIncrease: 0
      };

      const result1 = CalculationService.calculateGuaranteed(formData);
      const result2 = CalculationService.calculateGuaranteed(formData);

      expect(result1).toEqual(result2);
    });

    it('should handle large payment amounts correctly', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '10000000', // Max allowed: $10M
        startDate: '2025-01-01',
        endDate: '2025-02-01',
        paymentMode: 'Monthly',
        annualIncrease: 0
      };

      const result = CalculationService.calculateGuaranteed(formData);

      expect(result.npv).toBeGreaterThan(9000000);
      expect(result.npv).toBeLessThan(10000000);
      expect(Number.isFinite(result.npv)).toBe(true);
    });

    it('should apply adjustments correctly in integration', () => {
      const formData: LCPFormData = {
        paymentData: {
          paymentMode: 'Monthly',
          amount: '5000'
        },
        detailsData: {
          annualIncrease: 0,
          startDate: '2025-01-01',
          endDate: '2025-12-31'
        },
        profileData: {
          ageRange: '60-65',
          gender: 'Male',
          bodyFrame: 'Large'
        },
        lifestyleData: {
          weight: '200'
        },
        healthData: {
          smoke: 'Never',
          health: 'Excellent',
          cardiac: 'No'
        }
      };

      const result = CalculationService.calculateLCP(formData);

      // Verify our fixed adjustments are applied
      expect(result.minPayout).toBeGreaterThanOrEqual(25000);
      expect(result.maxPayout).toBeLessThanOrEqual(result.npv - 15000);
    });
  });

  // ✅ Test error handling integration
  describe('Error Handling Integration', () => {
    
    it('should handle missing payment data gracefully', () => {
      const invalidData: GuaranteedFormData = {
        paymentAmount: '',
        startDate: '',
        endDate: '',
        paymentMode: 'Monthly',
        annualIncrease: 0
      };

      expect(() => {
        CalculationService.calculateGuaranteed(invalidData);
      }).toThrow();
    });

    it('should handle invalid lump sum data gracefully', () => {
      const invalidLumpSum: GuaranteedFormData = {
        paymentAmount: '',
        startDate: '',
        endDate: '',
        paymentMode: 'Lump Sum',
        annualIncrease: 0,
        payments: [] // Empty payments array
      };

      expect(() => {
        CalculationService.calculateGuaranteed(invalidLumpSum);
      }).toThrow('Missing payments for Guaranteed Lump Sum calculation');
    });
  });
});

/**
 * 🎯 STEP 3A SUMMARY:
 * 
 * ✅ Integration between UI components and calculation service tested
 * ✅ Realistic data flows from forms to calculations validated
 * ✅ Lump sum functionality integration verified (our recent fix)
 * ✅ Edge cases and error handling tested
 * ✅ Data consistency across the system ensured
 * ✅ Calculation accuracy with real-world scenarios validated
 */