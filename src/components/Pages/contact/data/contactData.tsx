import { ContactMethod, FAQItem, ContactInfo, CompanyAddress } from '../types';

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'phone',
    icon: '📞',
    title: 'Call Us',
    description: 'Speak directly with our settlement experts. Available Monday-Friday, 9 AM - 6 PM EST.',
    actionText: 'Call Now',
    actionLink: 'tel:+1-561-583-1280',
    type: 'phone'
  },
  {
    id: 'email',
    icon: '✉️',
    title: 'Email Us',
    description: 'Send us your questions and we\'ll respond within 24 hours with personalized assistance.',
    actionText: 'Send Email',
    actionLink: 'mailto:info@smarterpayouts.com',
    type: 'email'
  },
  {
    id: 'location',
    icon: '📍',
    title: 'Visit Us',
    description: '15257 Amberly Dr Ste 233\nTampa, FL 33647\nUnited States',
    actionText: 'Get Directions',
    actionLink: 'https://maps.google.com/maps?q=15257+Amberly+Dr+Ste+233,+Tampa,+FL+33647',
    type: 'location'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'response-time',
    question: 'How quickly can I get a response?',
    answer: 'We respond within 24 hours. For urgent matters, please call us.',
    category: 'general'
  },
  {
    id: 'information-needed',
    question: 'What information should I include?',
    answer: 'Include details about your structured settlement and how to contact you.',
    category: 'form'
  },
  {
    id: 'consultation-cost',
    question: 'Is the consultation free?',
    answer: 'Yes, completely free with no obligation.',
    category: 'pricing'
  },
  {
    id: 'immediate-contact',
    question: 'Can I speak with someone immediately?',
    answer: 'Call us during business hours for immediate assistance.',
    category: 'availability'
  }
];

export const CONTACT_INFO: ContactInfo = {
  phone: '+1-561-583-1280',
  email: 'info@smarterpayouts.com',
  businessHours: {
    weekdays: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM',
    timezone: 'EST'
  },
  responseTime: '24 hours'
};

export const COMPANY_ADDRESS: CompanyAddress = {
  street: '15257 Amberly Dr Ste 233',
  city: 'Tampa',
  state: 'FL',
  zip: '33647',
  country: 'US'
};
