/**
 * Customer Appointment Confirmation Email Template
 * Generates HTML and text for customer appointment confirmation emails
 */

import { BaseEmailTemplate } from './base/BaseEmailTemplate';
import { formatDateString } from '../utils/formatters';

export interface CustomerAppointmentData {
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
  appointmentId: string;
}

export class CustomerAppointmentConfirmationTemplate extends BaseEmailTemplate {
  constructor(private appointmentData: CustomerAppointmentData) {
    super();
  }

  generate(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - SmarterPayouts</title>
  <style>
    @media only screen and (max-width: 600px) {
      .header-container { padding: 20px 20px 15px !important; }
      .header-title { font-size: 22px !important; }
      .content-padding { padding: 25px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background: #f3f4f6; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0; background: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <!-- Logo Section -->
          <tr>
            <td class="header-container" style="background: #ffffff; padding: 30px 30px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://smarterpayouts.com/assets/images/emailtemplate.png" alt="SmarterPayouts" style="max-width: 230px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Content -->
          <tr>
            <td class="content-padding" style="padding: 35px 30px; background: #ffffff;">
      <!-- Greeting -->
      <div style="font-size: 15px; color: #4b5563; margin-bottom: 35px; line-height: 1.7;">
        <p style="margin-bottom: 8px; color: #1f2937; font-size: 17px; font-weight: 600;">Dear ${this.appointmentData.name},</p>
        <p style="margin: 0;">Thank you for scheduling a consultation with SmarterPayouts! We've received your appointment request and look forward to speaking with you.</p>
      </div>

      <!-- Confirmation Section -->
      <div style="margin-bottom: 35px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 1.5rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin: 0 0 0.25rem 0; letter-spacing: 0.02em; text-transform: uppercase;">Appointment Request Confirmed</h2>
          <p style="font-size: 0.75rem; color: #6b7280; font-weight: 500; letter-spacing: 0.05em; margin: 0;">YOUR CONSULTATION DETAILS</p>
        </div>

        <!-- Appointment Details -->
        <div style="background: #f9fafb; border-radius: 10px; padding: 1.5rem; border: 1px solid #e5e7eb; margin-bottom: 1.25rem;">
          <div style="margin-bottom: 1rem;">
            <p style="font-size: 0.75rem; color: #6b7280; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">📅 Preferred Date</p>
            <p style="font-size: 1.125rem; font-weight: 700; color: #1f2937; margin: 0;">${formatDateString(this.appointmentData.preferredDate)}</p>
          </div>
          
          <div style="margin-bottom: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 0.75rem; color: #6b7280; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">⏰ Preferred Time</p>
            <p style="font-size: 1.125rem; font-weight: 700; color: #1f2937; margin: 0;">${this.appointmentData.preferredTime}</p>
          </div>
          
          <div style="padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 0.75rem; color: #6b7280; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">💬 Consultation Type</p>
            <p style="font-size: 1.125rem; font-weight: 700; color: #1f2937; margin: 0;">${this.appointmentData.consultationType}</p>
          </div>
        </div>

        ${this.appointmentData.message ? `
        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
          <p style="font-size: 0.75rem; color: #92400e; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">📝 Your Message</p>
          <p style="font-size: 14px; color: #78350f; margin: 0; line-height: 1.6;">${this.appointmentData.message}</p>
        </div>
        ` : ''}
      </div>

      <!-- Next Steps -->
      <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 10px; padding: 22px; margin: 30px 0; text-align: center;">
        <p style="font-size: 15px; color: #1e40af; margin: 0; font-weight: 600; line-height: 1.5;">
          Our team will contact you within 24 hours to confirm your appointment details and answer any questions you may have.
        </p>
      </div>

      <!-- Contact Section -->
      <div style="text-align: center; margin: 40px 0 30px; padding: 30px 25px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
        <p style="font-size: 17px; color: #1f2937; margin-bottom: 20px; font-weight: 600;">Need to Reach Us?</p>
        
        <div style="margin-bottom: 16px;">
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Call our office at:</p>
          <div style="font-size: 22px; font-weight: 700; color: #22c55e; margin-bottom: 12px; letter-spacing: -0.5px;">
            <a href="tel:+18552143510" style="color: #22c55e; text-decoration: none;">855-214-3510</a>
          </div>
          <p style="font-size: 13px; color: #6b7280; margin: 0;">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
        </div>

        <div style="margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Office Address:</p>
          <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.6;">
            15257 Amberly Dr Ste 233<br />
            Tampa, FL 33647
          </p>
        </div>

        <div style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Email us at:</p>
          <p style="font-size: 14px; color: #22c55e; margin: 0; font-weight: 600;">
            <a href="mailto:info@smarterpayouts.com" style="color: #22c55e; text-decoration: none;">info@smarterpayouts.com</a>
          </p>
        </div>
      </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #1f2937; font-size: 15px; margin: 5px 0; font-weight: 600;">SmarterPayouts</p>
      <p style="margin-top: 15px; font-size: 11px; color: #9ca3af; margin: 0;">
        This email confirms your appointment request with SmarterPayouts. We look forward to speaking with you soon!
      </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  generateText(): string {
    return `
Appointment Request Confirmed - SmarterPayouts

Dear ${this.appointmentData.name},

Thank you for scheduling a consultation with SmarterPayouts! We've received your appointment request and look forward to speaking with you.

APPOINTMENT DETAILS

Preferred Date: ${formatDateString(this.appointmentData.preferredDate)}
Preferred Time: ${this.appointmentData.preferredTime}
Consultation Type: ${this.appointmentData.consultationType}

${this.appointmentData.message ? `Your Message: ${this.appointmentData.message}\n` : ''}
Our team will contact you within 24 hours to confirm your appointment details and answer any questions you may have.

Need to Reach Us?

Call our office at: 855-214-3510
Monday - Friday, 9:00 AM - 6:00 PM EST

Office Address: 15257 Amberly Dr Ste 233, Tampa, FL 33647

Email us at: info@smarterpayouts.com

Visit us: smarterpayouts.com

SmarterPayouts
    `.trim();
  }

  getSubject(): string {
    return `📅 Appointment Request Confirmed - ${formatDateString(this.appointmentData.preferredDate)}`;
  }
}


