// Validation utilities for Court Approval page

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

// Validate required field
export const isValidRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Validate minimum length
export const isValidMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

// Validate maximum length
export const isValidMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// Validate numeric input
export const isValidNumber = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

// Validate positive number
export const isValidPositiveNumber = (value: string): boolean => {
  const num = parseFloat(value);
  return isValidNumber(value) && num > 0;
};

// Validate date format (YYYY-MM-DD)
export const isValidDate = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Validate URL format
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate form data
export const validateFormData = (data: Record<string, any>, rules: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && !isValidRequired(value)) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (rule.email && !isValidEmail(value)) {
      errors[field] = 'Please enter a valid email address';
      return;
    }
    
    if (rule.phone && !isValidPhoneNumber(value)) {
      errors[field] = 'Please enter a valid phone number';
      return;
    }
    
    if (rule.minLength && !isValidMinLength(value, rule.minLength)) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      return;
    }
    
    if (rule.maxLength && !isValidMaxLength(value, rule.maxLength)) {
      errors[field] = `${field} must be no more than ${rule.maxLength} characters`;
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
