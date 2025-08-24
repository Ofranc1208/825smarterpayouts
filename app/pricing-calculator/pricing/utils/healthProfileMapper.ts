// ========================================
// 🗺️ Health Profile Mapper - Convert Form Values to Calculation Keys
// ========================================
// This service maps the health questionnaire form values to the calculation keys
// that the NPV system expects, completely independent from the SRC folder

export interface HealthProfile {
  ageRange: string;
  gender: string;
  bodyFrame: string;
  weight: string;
  smoke: string;
  health: string;
  cardiac: string;
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

// 🧮 Health Profile Mapper Class
export class HealthProfileMapper {
  
  /**
   * 🎯 Main mapping function: Convert form data to calculation keys
   * This maps the health questionnaire responses to the keys the NPV system expects
   */
  public static mapFormValuesToCalculationKeys(formData: HealthProfile): string[] {
    const keys: string[] = [];

    // 🎂 Process Age Range
    if (formData.ageRange) {
      const ageKey = this.mapAgeRange(formData.ageRange);
      if (ageKey) keys.push(ageKey);
    }

    // ⚧️ Process Gender
    if (formData.gender) {
      const genderKey = this.mapGender(formData.gender);
      if (genderKey) keys.push(genderKey);
    }

    // 📏 Process Body Frame
    if (formData.bodyFrame) {
      const frameKey = this.mapBodyFrame(formData.bodyFrame);
      if (frameKey) keys.push(frameKey);
    }

    // ⚖️ Process Weight Category
    if (formData.weight) {
      const weightKey = this.mapWeight(formData.weight);
      if (weightKey) keys.push(weightKey);
    }

    // 🚬 Process Smoking Status
    if (formData.smoke) {
      const smokeKey = this.mapSmoking(formData.smoke);
      if (smokeKey) keys.push(smokeKey);
    }

    // ❤️ Process Health Status
    if (formData.health) {
      const healthKey = this.mapHealth(formData.health);
      if (healthKey) keys.push(healthKey);
    }

    // 💓 Process Cardiac Condition
    if (formData.cardiac) {
      const cardiacKey = this.mapCardiac(formData.cardiac);
      if (cardiacKey) keys.push(cardiacKey);
    }

    // 🧹 Filter out any null/undefined values and return unique keys
    return keys.filter(Boolean);
  }

  /**
   * 🎂 Map age range to calculation key
   */
  private static mapAgeRange(ageRange: string): string | null {
    return FORM_VALUE_MAPPINGS.ageRange[ageRange as keyof typeof FORM_VALUE_MAPPINGS.ageRange] || null;
  }

  /**
   * ⚧️ Map gender to calculation key
   */
  private static mapGender(gender: string): string | null {
    return FORM_VALUE_MAPPINGS.gender[gender as keyof typeof FORM_VALUE_MAPPINGS.gender] || null;
  }

  /**
   * 📏 Map body frame to calculation key
   */
  private static mapBodyFrame(bodyFrame: string): string | null {
    return FORM_VALUE_MAPPINGS.bodyFrame[bodyFrame as keyof typeof FORM_VALUE_MAPPINGS.bodyFrame] || null;
  }

  /**
   * ⚖️ Map weight to calculation key
   */
  private static mapWeight(weight: string): string | null {
    return FORM_VALUE_MAPPINGS.weight[weight as keyof typeof FORM_VALUE_MAPPINGS.weight] || null;
  }

  /**
   * 🚬 Map smoking status to calculation key
   */
  private static mapSmoking(smoke: string): string | null {
    return FORM_VALUE_MAPPINGS.smoke[smoke as keyof typeof FORM_VALUE_MAPPINGS.smoke] || null;
  }

  /**
   * ❤️ Map health status to calculation key
   */
  private static mapHealth(health: string): string | null {
    return FORM_VALUE_MAPPINGS.health[health as keyof typeof FORM_VALUE_MAPPINGS.health] || null;
  }

  /**
   * 💓 Map cardiac condition to calculation key
   */
  private static mapCardiac(cardiac: string): string | null {
    return FORM_VALUE_MAPPINGS.cardiac[cardiac as keyof typeof FORM_VALUE_MAPPINGS.cardiac] || null;
  }

  /**
   * 🔍 Get all available form values for a specific category
   * Useful for debugging or validation
   */
  public static getAvailableValues(category: keyof typeof FORM_VALUE_MAPPINGS): string[] {
    return Object.keys(FORM_VALUE_MAPPINGS[category]);
  }

  /**
   * 🔍 Get all available calculation keys for a specific category
   * Useful for debugging or validation
   */
  public static getAvailableCalculationKeys(category: keyof typeof FORM_VALUE_MAPPINGS): string[] {
    return Object.values(FORM_VALUE_MAPPINGS[category]);
  }
}
