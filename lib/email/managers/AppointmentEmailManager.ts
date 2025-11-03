/**
 * Appointment Email Manager
 * Handles sending appointment notification emails
 */

import { EmailTransporter } from '../utils/EmailTransporter';
import { EMAIL_CONFIG } from '../utils/config';
import { AppointmentNotificationTemplate, AppointmentData } from '../templates/AppointmentNotificationTemplate';

export class AppointmentEmailManager {
  private transporter = EmailTransporter.getInstance();

  async sendAppointmentNotification(appointmentData: AppointmentData) {
    const transporter = this.transporter.getTransporter();

    if (!transporter) {
      console.log(
        '📧 Email notifications disabled. Appointment saved to Firebase only.'
      );
      return { success: false, reason: 'Email not configured' };
    }

    try {
      const template = new AppointmentNotificationTemplate(appointmentData);

      const mailOptions = {
        from: `SmarterPayouts Appointments <${EMAIL_CONFIG.from}>`,
        to: EMAIL_CONFIG.to,
        subject: template.getSubject(),
        html: template.generate(),
        text: template.generateText(),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

