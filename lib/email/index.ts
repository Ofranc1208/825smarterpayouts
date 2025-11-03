/**
 * Email Module Barrel Export
 * Centralized exports for email service module
 */

// Managers
export { AppointmentEmailManager } from './managers/AppointmentEmailManager';
export { OfferCaptureEmailManager } from './managers/OfferCaptureEmailManager';
export { CustomerEmailManager } from './managers/CustomerEmailManager';

// Templates
export { AppointmentNotificationTemplate } from './templates/AppointmentNotificationTemplate';
export type { AppointmentData } from './templates/AppointmentNotificationTemplate';

export { OfferCaptureNotificationTemplate } from './templates/OfferCaptureNotificationTemplate';
export type { OfferCaptureData } from './templates/OfferCaptureNotificationTemplate';

export { CustomerOfferConfirmationTemplate } from './templates/CustomerOfferConfirmationTemplate';
export type { CustomerOfferData } from './templates/CustomerOfferConfirmationTemplate';

// Utilities
export { EmailTransporter } from './utils/EmailTransporter';
export { EMAIL_CONFIG } from './utils/config';
export * from './utils/formatters';

