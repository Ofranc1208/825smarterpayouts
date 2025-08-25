import { ContactMethod, FAQItem, ContactInfo, CompanyAddress } from '../types';

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'phone',
    icon: '📞',
    title: 'Call Us',
    description: 'Speak directly with our settlement experts. Available Monday-Friday, 9 AM - 6 PM EST.',
    actionText: 'Call Now',
    actionLink: 'tel:+1-800-555-0123',
    type: 'phone'
  },
  {
    id: 'email',
    icon: '✉️',
    title: 'Email Us',
    description: 'Send us your questions and we\'ll respond within 24 hours with personalized assistance.',
    actionText: 'Send Email',
    actionLink: 'mailto:contact@smarterpayouts.com',
    type: 'email'
  },
  {
    id: 'chat',
    icon: '💬',
    title: 'Live Chat',
    description: 'Get instant answers from our AI assistant Mint, available 24/7 to help with your questions.',
    actionText: 'Start Chat',
    actionLink: '/mint-intelligent-chat',
    type: 'chat'
  },
  {
    id: 'location',
    icon: '📍',
    title: 'Visit Us',
    description: 'Meet with our team in person at our headquarters for a comprehensive consultation.',
    actionText: 'Get Directions',
    actionLink: 'https://maps.google.com',
    type: 'location'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'response-time',
    question: 'How quickly can I get a response to my inquiry?',
    answer: 'We respond to all inquiries within 24 hours during business days. For urgent matters, you can call us directly or use our live chat feature for immediate assistance.',
    category: 'general'
  },
  {
    id: 'information-needed',
    question: 'What information should I include in my message?',
    answer: 'Please include details about your structured settlement, any specific questions you have, and the best way to contact you. The more information you provide, the better we can assist you.',
    category: 'form'
  },
  {
    id: 'consultation-cost',
    question: 'Is there a cost for the initial consultation?',
    answer: 'No, our initial consultation is completely free. We\'ll review your situation and provide expert advice with no obligation or upfront costs.',
    category: 'pricing'
  },
  {
    id: 'immediate-contact',
    question: 'Can I speak with someone immediately?',
    answer: 'Yes! You can call us during business hours (Monday-Friday, 9 AM - 6 PM EST) or use our Mint AI chat feature available 24/7 for instant responses.',
    category: 'availability'
  }
];

export const CONTACT_INFO: ContactInfo = {
  phone: '+1-800-555-0123',
  email: 'contact@smarterpayouts.com',
  businessHours: {
    weekdays: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM',
    timezone: 'EST'
  },
  responseTime: '24 hours'
};

export const COMPANY_ADDRESS: CompanyAddress = {
  street: '123 Settlement Street',
  city: 'Financial District',
  state: 'NY',
  zip: '10001',
  country: 'US'
};
