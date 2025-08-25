'use client';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

export const validateSubject = (subject: string): ValidationResult => {
  if (!subject.trim()) {
    return { isValid: false, message: 'Subject is required' };
  }
  
  if (subject.trim().length < 5) {
    return { isValid: false, message: 'Subject must be at least 5 characters' };
  }
  
  return { isValid: true };
};

export const validateMessage = (message: string): ValidationResult => {
  if (!message.trim()) {
    return { isValid: false, message: 'Message is required' };
  }
  
  if (message.trim().length < 10) {
    return { isValid: false, message: 'Message must be at least 10 characters' };
  }
  
  return { isValid: true };
};

export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { [key: string]: ValidationResult } => {
  return {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    subject: validateSubject(formData.subject),
    message: validateMessage(formData.message)
  };
};
