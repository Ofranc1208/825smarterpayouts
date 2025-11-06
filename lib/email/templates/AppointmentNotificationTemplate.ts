/**
 * Appointment Notification Email Template
 * Generates HTML and text for appointment notification emails
 */

import { BaseEmailTemplate } from './base/BaseEmailTemplate';
import { formatDate, formatDateString } from '../utils/formatters';

export interface AppointmentData {
  id: string;
  name: string;
  email?: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
  submittedAt: any;
}

export class AppointmentNotificationTemplate extends BaseEmailTemplate {
  constructor(private appointmentData: AppointmentData) {
    super();
  }

  generate(): string {
    const content = `
      <div class="header">
        <h2>📅 New Appointment Request</h2>
      </div>
      <div class="content">
        ${this.urgentNotice(
          'URGENT: Please contact this person within 24 hours to confirm their appointment.'
        )}
        
        ${this.infoRow('👤 Name:', this.appointmentData.name)}
        ${this.infoRow('📧 Email:', this.appointmentData.email || 'Not provided')}
        ${this.infoRow('📞 Phone:', this.appointmentData.phone)}
        ${this.infoRow('📅 Preferred Date:', formatDateString(this.appointmentData.preferredDate))}
        ${this.infoRow('⏰ Preferred Time:', this.appointmentData.preferredTime)}
        ${this.infoRow('💬 Consultation Type:', this.appointmentData.consultationType)}
        
        ${this.appointmentData.message ? `
          <div class="info-row">
            <span class="label">📝 Message:</span>
            <div class="value" style="margin-top: 5px;">${this.appointmentData.message}</div>
          </div>
        ` : ''}
        
        ${this.infoRow('🔗 Appointment ID:', this.appointmentData.id)}
        ${this.infoRow('📅 Submitted:', formatDate())}
      </div>
      ${this.footer(
        'This appointment was submitted through the SmarterPayouts website.',
        'View all appointments in your',
        'https://console.firebase.google.com/project/smarterwebsite-3d25d/firestore/data/appointments'
      )}
    `;

    return this.generateHtml('New Appointment Request', content);
  }

  generateText(): string {
    return `
New Appointment Request

Contact Information:
- Name: ${this.appointmentData.name}
- Email: ${this.appointmentData.email || 'Not provided'}
- Phone: ${this.appointmentData.phone}

Appointment Details:
- Preferred Date: ${formatDateString(this.appointmentData.preferredDate)}
- Preferred Time: ${this.appointmentData.preferredTime}
- Consultation Type: ${this.appointmentData.consultationType}

${this.appointmentData.message ? `Message: ${this.appointmentData.message}` : ''}

Appointment ID: ${this.appointmentData.id}
Submitted: ${formatDate()}

⚡ URGENT: Please contact this person within 24 hours to confirm their appointment.
    `.trim();
  }

  getSubject(): string {
    return `🔔 New Appointment: ${this.appointmentData.name} - ${this.appointmentData.consultationType}`;
  }
}

