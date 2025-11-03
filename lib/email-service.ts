/**
 * Email Service - Orchestrator
 * 
 * Coordinates email operations using the Orchestra Pattern.
 * Delegates to specialized managers for each email type.
 * 
 * @author SmarterPayouts Team
 * @since 2025
 */

import { AppointmentEmailManager } from './email/managers/AppointmentEmailManager';
import { OfferCaptureEmailManager } from './email/managers/OfferCaptureEmailManager';
import { CustomerEmailManager } from './email/managers/CustomerEmailManager';

// Type exports for backward compatibility
export type {
  AppointmentData,
} from './email/templates/AppointmentNotificationTemplate';

export type {
  OfferCaptureData,
} from './email/templates/OfferCaptureNotificationTemplate';

export type {
  CustomerOfferData,
} from './email/templates/CustomerOfferConfirmationTemplate';

/**
 * Email Service Orchestrator
 * Coordinates all email operations
 */
class EmailServiceOrchestrator {
  private appointmentManager = new AppointmentEmailManager();
  private offerCaptureManager = new OfferCaptureEmailManager();
  private customerManager = new CustomerEmailManager();

  /**
   * Send appointment notification email
   */
  async sendAppointmentNotification(appointmentData: {
    id: string;
    name: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    consultationType: string;
    message?: string;
    submittedAt: any;
  }) {
    return this.appointmentManager.sendAppointmentNotification(appointmentData);
  }

  /**
   * Send offer capture notification email
   */
  async sendOfferCaptureNotification(captureData: {
    id: string;
    offerCode: string;
    calculatorType: 'guaranteed' | 'lcp';
    email: string | null;
    phone: string | null;
    message?: string | null;
    deliveryMethod: 'email' | 'sms';
    minOffer: number;
    maxOffer: number;
    submittedAt: any;
  }) {
    return this.offerCaptureManager.sendOfferCaptureNotification(captureData);
  }

  /**
   * Send customer offer confirmation email
   */
  async sendCustomerOfferConfirmation(customerData: {
    email: string;
    offerCode: string;
    calculatorType: 'guaranteed' | 'lcp';
    minOffer: number;
    maxOffer: number;
    familyProtectionValue?: number;
  }) {
    return this.customerManager.sendCustomerOfferConfirmation(customerData);
  }
}

// Create singleton instance
const emailService = new EmailServiceOrchestrator();

// Export functions for backward compatibility
export async function sendAppointmentNotification(appointmentData: {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
  submittedAt: any;
}) {
  return emailService.sendAppointmentNotification(appointmentData);
}

export async function sendOfferCaptureNotification(captureData: {
  id: string;
  offerCode: string;
  calculatorType: 'guaranteed' | 'lcp';
  email: string | null;
  phone: string | null;
  message?: string | null;
  deliveryMethod: 'email' | 'sms';
  minOffer: number;
  maxOffer: number;
  submittedAt: any;
}) {
  return emailService.sendOfferCaptureNotification(captureData);
}

export async function sendCustomerOfferConfirmation(customerData: {
  email: string;
  offerCode: string;
  calculatorType: 'guaranteed' | 'lcp';
  minOffer: number;
  maxOffer: number;
  familyProtectionValue?: number;
}) {
  return emailService.sendCustomerOfferConfirmation(customerData);
}
