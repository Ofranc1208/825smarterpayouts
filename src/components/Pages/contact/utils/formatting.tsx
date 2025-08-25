'use client';

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as +1 (XXX) XXX-XXXX
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if can't format
};

export const formatBusinessHours = (hours: {
  open: string;
  close: string;
  timezone: string;
}): string => {
  return `${hours.open} - ${hours.close} ${hours.timezone}`;
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .slice(0, 1000); // Limit length
};

export const formatSubmissionData = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  source: string;
} => {
  return {
    name: sanitizeInput(formData.name),
    email: sanitizeInput(formData.email),
    subject: sanitizeInput(formData.subject),
    message: sanitizeInput(formData.message),
    timestamp: new Date().toISOString(),
    source: 'contact_page'
  };
};

export const generateFormId = (): string => {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
