// Contact Page Core Types

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  data: ContactFormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errors: Partial<ContactFormData>;
}

export interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  type: 'phone' | 'email' | 'chat' | 'location';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BusinessHours {
  weekdays: string;
  hours: string;
  timezone: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  businessHours: BusinessHours;
  responseTime: string;
}

export interface CompanyAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
