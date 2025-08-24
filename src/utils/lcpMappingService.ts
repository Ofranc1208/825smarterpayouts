// ========================================
// 🗺️ LCP Mapping Service - Centralized Form Data Mapping
// ========================================
// This service consolidates all hardcoded mapping logic from LCP files
// and provides a single source of truth for form value → calculation key mappings

import { adjustmentMap } from '../../app/utils/npvConfig';

// 📝 Type definitions for form data structure
export interface LCPFormData {
  paymentData?: { paymentMode: string; amount: string };
  detailsData?: { annualIncrease: number; startDate: string; endDate: string };
  profileData?: { ageRange: string; gender: string; bodyFrame: string };
  lifestyleData?: { weight: string };
  healthData?: { smoke: string; health: string; cardiac: string };
}

// 🗂️ Mapping Dictionaries - Single Source of Truth
const FORM_VALUE_MAPPINGS = {
  // 🎂 Age Range Mappings
  ageRange: {
    '18–25': 'age-18-25',
    '26–35': 'age-26-35', 
    '36–45': 'age-36-45',
    '46–50': 'age-46-50',
    '51–56': 'age-51-56',
    '57–65': 'age-57-65'
  },

  // ⚧️ Gender Mappings
  gender: {
    'Male': 'gender-male',
    'Female': 'gender-female',
    'Other': 'gender-female' // Default fallback
  },

  // 📏 Body Frame Mappings
  bodyFrame: {
    'Small': 'build-small',
    'Medium': 'build-medium',
    'Large': 'build-tall'
  },

  // ⚖️ Weight Category Mappings
  weight: {
    'Underweight': 'underweight',
    'Normal Weight': 'normal',
    'Overweight': 'overweight',
    'Obesity': 'obese',
    'Severe Obesity': 'severe-obese'
  },

  // 🚬 Smoking Status Mappings
  smoke: {
    'Yes': 'smoke-yes',
    'No': 'smoke-no'
  },

  // ❤️ Health Status Mappings
  health: {
    'Great': 'health-great',
    'Normal': 'health-normal',
    'Fair': 'health-fair',
    'Below Fair': 'health-belowfair'
  },

  // 💓 Cardiac Condition Mappings
  cardiac: {
    'Normal': 'cardiac-normal',
    'Medicated': 'cardiac-medicated',
    'High': 'cardiac-high',
    'Not Sure': 'cardiac-unsure'
  }
} as const;

// 🧮 LCP Mapping Service Class
export class LCPMappingService {
  
  /**
   * 🎯 Main mapping function: Convert form data to calculation keys
   * This replaces all hardcoded mapping logic in LCP files
   */
  public static mapFormValuesToCalculationKeys(formData: LCPFormData): string[] {
    const keys: string[] = [];

    // 🎂 Process Age Range
    if (formData.profileData?.ageRange) {
      const ageKey = this.mapAgeRange(formData.profileData.ageRange);
      if (ageKey) keys.push(ageKey);
    }

    // ⚧️ Process Gender
    if (formData.profileData?.gender) {
      const genderKey = this.mapGender(formData.profileData.gender);
      if (genderKey) keys.push(genderKey);
    }

    // 📏 Process Body Frame
    if (formData.profileData?.bodyFrame) {
      const frameKey = this.mapBodyFrame(formData.profileData.bodyFrame);
      if (frameKey) keys.push(frameKey);
    }

    // ⚖️ Process Weight Category
    if (formData.lifestyleData?.weight) {
      const weightKey = this.mapWeight(formData.lifestyleData.weight);
      if (weightKey) keys.push(weightKey);
    }

    // 🚬 Process Smoking Status
    if (formData.healthData?.smoke) {
      const smokeKey = this.mapSmoking(formData.healthData.smoke);
      if (smokeKey) keys.push(smokeKey);
    }

    // ❤️ Process Health Status
    if (formData.healthData?.health) {
      const healthKey = this.mapHealth(formData.healthData.health);
      if (healthKey) keys.push(healthKey);
    }

    // 💓 Process Cardiac Condition
    if (formData.healthData?.cardiac) {
      const cardiacKey = this.mapCardiac(formData.healthData.cardiac);
      if (cardiacKey) keys.push(cardiacKey);
    }

    // 🧹 Filter out any null/undefined values and return unique keys
    return keys.filter(Boolean);
  }

  /**
   * 🔍 Validation: Check if all mapped keys exist in adjustmentMap
   */
  public static validateMappedKeys(keys: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    keys.forEach(key => {
      if (adjustmentMap.hasOwnProperty(key)) {
        valid.push(key);
      } else {
        invalid.push(key);
      }
    });

    return { valid, invalid };
  }

  /**
   * 📊 Get available adjustment factors for mapped keys
   */
  public static getAdjustmentFactors(keys: string[]): Record<string, number> {
    const factors: Record<string, number> = {};
    
    keys.forEach(key => {
      if (adjustmentMap.hasOwnProperty(key)) {
        factors[key] = adjustmentMap[key];
      }
    });

    return factors;
  }

  /**
   * 🎯 Get all available configuration keys from adjustmentMap
   */
  public static getAvailableConfigKeys(): string[] {
    return Object.keys(adjustmentMap);
  }

  // 🔧 Private mapping helper methods
  private static mapAgeRange(ageRange: string): string | null {
    // Handle both formats: '18–25' and '18-25'
    const normalizedRange = ageRange.replace('–', '-');
    return FORM_VALUE_MAPPINGS.ageRange[ageRange as keyof typeof FORM_VALUE_MAPPINGS.ageRange] || null;
  }

  private static mapGender(gender: string): string | null {
    return FORM_VALUE_MAPPINGS.gender[gender as keyof typeof FORM_VALUE_MAPPINGS.gender] || null;
  }

  private static mapBodyFrame(bodyFrame: string): string | null {
    return FORM_VALUE_MAPPINGS.bodyFrame[bodyFrame as keyof typeof FORM_VALUE_MAPPINGS.bodyFrame] || null;
  }

  private static mapWeight(weight: string): string | null {
    return FORM_VALUE_MAPPINGS.weight[weight as keyof typeof FORM_VALUE_MAPPINGS.weight] || null;
  }

  private static mapSmoking(smoke: string): string | null {
    return FORM_VALUE_MAPPINGS.smoke[smoke as keyof typeof FORM_VALUE_MAPPINGS.smoke] || null;
  }

  private static mapHealth(health: string): string | null {
    return FORM_VALUE_MAPPINGS.health[health as keyof typeof FORM_VALUE_MAPPINGS.health] || null;
  }

  private static mapCardiac(cardiac: string): string | null {
    return FORM_VALUE_MAPPINGS.cardiac[cardiac as keyof typeof FORM_VALUE_MAPPINGS.cardiac] || null;
  }
}

// 🚀 Convenience export for the main mapping function
export const mapLCPFormToCalculationKeys = LCPMappingService.mapFormValuesToCalculationKeys;

// 📈 Export mapping dictionaries for potential external use
export const LCP_FORM_MAPPINGS = FORM_VALUE_MAPPINGS;

 