/**
 * Appointment Email Manager
 * Handles sending appointment notification emails
 */

import { EmailTransporter } from '../utils/EmailTransporter';
import { EMAIL_CONFIG } from '../utils/config';
import { AppointmentNotificationTemplate, AppointmentData } from '../templates/AppointmentNotificationTemplate';
import { CustomerAppointmentConfirmationTemplate, CustomerAppointmentData } from '../templates/CustomerAppointmentConfirmationTemplate';

export class AppointmentEmailManager {
  /**
   * Get transporter instance (lazy initialization)
   * Only creates the transporter when actually needed, not at module load time
   */
  private getTransporter() {
    return EmailTransporter.getInstance().getTransporter();
  }

  async sendAppointmentNotification(appointmentData: AppointmentData) {
    const transporter = this.getTransporter();

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

      console.log('📧 [AppointmentEmailManager] Sending email to:', EMAIL_CONFIG.to);
      console.log('📧 [AppointmentEmailManager] From:', EMAIL_CONFIG.from);
      
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      console.log('✅ Email sent to:', EMAIL_CONFIG.to);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async sendCustomerAppointmentConfirmation(appointmentData: CustomerAppointmentData) {
    const transporter = this.getTransporter();

    if (!transporter) {
      console.log(
        '📧 Email notifications disabled. Customer appointment confirmation not sent.'
      );
      return { success: false, reason: 'Email not configured' };
    }

    try {
      const template = new CustomerAppointmentConfirmationTemplate(appointmentData);

      const mailOptions = {
        from: `SmarterPayouts <${EMAIL_CONFIG.from}>`,
        to: appointmentData.email,
        subject: template.getSubject(),
        html: template.generate(),
        text: template.generateText(),
      };

      console.log('📧 [AppointmentEmailManager] Sending customer confirmation email to:', appointmentData.email);
      console.log('📧 [AppointmentEmailManager] From:', EMAIL_CONFIG.from);
      
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Customer appointment confirmation email sent successfully:', info.messageId);
      console.log('✅ Email sent to:', appointmentData.email);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send customer appointment confirmation email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

