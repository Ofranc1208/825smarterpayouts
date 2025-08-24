import { CalculationService } from './calculationService';
import { GuaranteedFormData, LCPFormData } from '../types';

describe('CalculationService', () => {
  describe('calculateGuaranteed', () => {
    it('returns correct minPayout and maxPayout for valid input', () => {
      // Arrange
      const formData: GuaranteedFormData = {
        paymentAmount: '50000',
        paymentMode: 'Monthly',
        annualIncrease: 2,
        startDate: '2024-01-01',
        endDate: '2034-01-01',
      };
      // Act
      const result = CalculationService.calculateGuaranteed(formData);
      // Assert
      expect(result).toHaveProperty('minPayout');
      expect(result).toHaveProperty('maxPayout');
      expect(result.minPayout).toBeLessThanOrEqual(result.maxPayout);
      expect(result.npv).toBeGreaterThan(0);
    });

    it('throws an error if paymentAmount is missing', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if paymentAmount is zero', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '0',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/invalid payment amount/i);
    });

    it('throws an error if paymentAmount is negative', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '-1000',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/invalid payment amount/i);
    });

    it('throws an error if paymentAmount is not a number', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: 'abc',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/invalid payment amount/i);
    });

    it('throws an error if startDate is missing', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '1000',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if endDate is missing', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '1000',
        paymentMode: 'Monthly',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if paymentMode is missing', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '1000',
        paymentMode: '',
        annualIncrease: 0,
        startDate: '2024-01-01',
        endDate: '2025-01-01',
      };
      expect(() => CalculationService.calculateGuaranteed(formData)).toThrow(/missing required fields/i);
    });
  });

  describe('calculateLCP', () => {
    const baseLCPFormData: LCPFormData = {
      paymentData: { paymentMode: 'Monthly', amount: '50000' },
      detailsData: { annualIncrease: 2, startDate: '2024-01-01', endDate: '2039-01-01' },
      profileData: { ageRange: '36–45', gender: 'Male', bodyFrame: 'Medium' },
      lifestyleData: { weight: 'Normal Weight' },
      healthData: { smoke: 'No', health: 'Great', cardiac: 'Normal' },
    };

    it('returns correct npv and payout values for valid input', () => {
      const result = CalculationService.calculateLCP(baseLCPFormData);
      expect(result).toHaveProperty('npv');
      expect(result).toHaveProperty('minPayout');
      expect(result).toHaveProperty('maxPayout');
      expect(result.npv).toBeGreaterThan(0);
      expect(result.minPayout).toBeLessThanOrEqual(result.maxPayout);
    });

    it('applies amount adjustments correctly for LCP calculations', () => {
      const result = CalculationService.calculateLCP(baseLCPFormData);
      
      // The amount adjustments should be applied to minPayout and maxPayout
      // AMOUNT_ADJUSTMENTS.min = 25000, AMOUNT_ADJUSTMENTS.max = 15000
      // The actual NPV should be higher than the minPayout by at least 25000
      // and higher than the maxPayout by at least 15000
      expect(result.npv).toBeGreaterThan(result.minPayout + 25000);
      expect(result.npv).toBeGreaterThan(result.maxPayout + 15000);
    });

    it('applies amount adjustments correctly for quarterly LCP calculations', () => {
      const quarterlyFormData = {
        ...baseLCPFormData,
        paymentData: { paymentMode: 'Quarterly', amount: '50000' }
      };
      const result = CalculationService.calculateLCP(quarterlyFormData);
      
      // Verify amount adjustments are applied for quarterly payments
      expect(result.npv).toBeGreaterThan(result.minPayout + 25000);
      expect(result.npv).toBeGreaterThan(result.maxPayout + 15000);
    });

    it('applies amount adjustments correctly for semi-annually LCP calculations', () => {
      const semiAnnuallyFormData = {
        ...baseLCPFormData,
        paymentData: { paymentMode: 'Semiannually', amount: '50000' }
      };
      const result = CalculationService.calculateLCP(semiAnnuallyFormData);
      
      // Verify amount adjustments are applied for semi-annually payments
      expect(result.npv).toBeGreaterThan(result.minPayout + 25000);
      expect(result.npv).toBeGreaterThan(result.maxPayout + 15000);
    });

    it('applies amount adjustments correctly for annually LCP calculations', () => {
      const annuallyFormData = {
        ...baseLCPFormData,
        paymentData: { paymentMode: 'Annually', amount: '50000' }
      };
      const result = CalculationService.calculateLCP(annuallyFormData);
      
      // Verify amount adjustments are applied for annually payments
      expect(result.npv).toBeGreaterThan(result.minPayout + 25000);
      expect(result.npv).toBeGreaterThan(result.maxPayout + 15000);
    });

    it('correctly maps and applies all lifestyle factors for discount rate calculations', () => {
      const comprehensiveFormData = {
        ...baseLCPFormData,
        profileData: { 
          ageRange: '36–45', 
          gender: 'Male', 
          bodyFrame: 'Medium' 
        },
        lifestyleData: { 
          weight: 'Overweight' 
        },
        healthData: { 
          smoke: 'No', 
          health: 'Great', 
          cardiac: 'Normal' 
        }
      };
      
      const result = CalculationService.calculateLCP(comprehensiveFormData);
      
      // Verify that LCP keys are being generated
      expect(result.lcpKeys).toBeDefined();
      expect(result.lcpKeys.length).toBeGreaterThan(0);
      
      // Verify that the calculation includes all lifestyle factors
      expect(result.lcpKeys).toContain('age-36-45'); // Age factor
      expect(result.lcpKeys).toContain('gender-male'); // Gender factor
      expect(result.lcpKeys).toContain('build-medium'); // Body frame factor
      expect(result.lcpKeys).toContain('overweight'); // Weight factor
      expect(result.lcpKeys).toContain('smoke-no'); // Smoking factor
      expect(result.lcpKeys).toContain('health-great'); // Health factor
      expect(result.lcpKeys).toContain('cardiac-normal'); // Cardiac factor
    });

    it('throws an error if healthData is missing', () => {
      const formData = { ...baseLCPFormData, healthData: undefined as any };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required form data/i);
    });

    it('throws an error if amount is zero', () => {
      const formData = { ...baseLCPFormData, paymentData: { paymentMode: 'Monthly', amount: '0' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if amount is negative', () => {
      const formData = { ...baseLCPFormData, paymentData: { paymentMode: 'Monthly', amount: '-1000' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if amount is not a number', () => {
      const formData = { ...baseLCPFormData, paymentData: { paymentMode: 'Monthly', amount: 'abc' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow();
    });

    it('throws an error if startDate is missing', () => {
      const formData = { ...baseLCPFormData, detailsData: { annualIncrease: 2, startDate: '', endDate: '2039-01-01' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if endDate is missing', () => {
      const formData = { ...baseLCPFormData, detailsData: { annualIncrease: 2, startDate: '2024-01-01', endDate: '' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required fields/i);
    });

    it('throws an error if paymentMode is missing', () => {
      const formData = { ...baseLCPFormData, paymentData: { paymentMode: '', amount: '50000' } };
      expect(() => CalculationService.calculateLCP(formData)).toThrow(/missing required fields/i);
    });
  });

  describe('calculateComparison', () => {
    it('returns both LCP and Guaranteed results for valid input', () => {
      const lcpFormData: LCPFormData = {
        paymentData: { paymentMode: 'Monthly', amount: '50000' },
        detailsData: { annualIncrease: 2, startDate: '2024-01-01', endDate: '2039-01-01' },
        profileData: { ageRange: '36–45', gender: 'Male', bodyFrame: 'Medium' },
        lifestyleData: { weight: 'Normal Weight' },
        healthData: { smoke: 'No', health: 'Great', cardiac: 'Normal' },
      };
      const guaranteedFormData: GuaranteedFormData = {
        paymentAmount: '50000',
        paymentMode: 'Monthly',
        annualIncrease: 2,
        startDate: '2024-01-01',
        endDate: '2034-01-01',
      };
      const result = CalculationService.calculateComparison(lcpFormData, guaranteedFormData);
      expect(result).toHaveProperty('lcp');
      expect(result).toHaveProperty('guaranteed');
      expect(result.lcp.npv).toBeGreaterThan(0);
      expect(result.guaranteed.npv).toBeGreaterThan(0);
    });
  });

  describe('validateLCPFormData', () => {
    it('returns isValid false and errors for missing fields', () => {
      const formData: LCPFormData = {
        paymentData: { paymentMode: '', amount: '' },
        detailsData: { annualIncrease: 2, startDate: '', endDate: '' },
        profileData: { ageRange: '', gender: '', bodyFrame: '' },
        lifestyleData: { weight: '' },
        healthData: { smoke: '', health: '', cardiac: '' },
      };
      const result = CalculationService.validateLCPFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateGuaranteedFormData', () => {
    it('returns isValid true for valid data', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '50000',
        paymentMode: 'Monthly',
        annualIncrease: 2,
        startDate: '2024-01-01',
        endDate: '2034-01-01',
      };
      const result = CalculationService.validateGuaranteedFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('returns isValid false and errors for missing fields', () => {
      const formData: GuaranteedFormData = {
        paymentAmount: '',
        paymentMode: '',
        annualIncrease: 0,
        startDate: '',
        endDate: '',
      };
      const result = CalculationService.validateGuaranteedFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
}); 