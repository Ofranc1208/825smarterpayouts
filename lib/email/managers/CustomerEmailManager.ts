/**
 * Customer Email Manager
 * Handles sending customer offer confirmation emails
 */

import { EmailTransporter } from '../utils/EmailTransporter';
import { EMAIL_CONFIG } from '../utils/config';
import {
  CustomerOfferConfirmationTemplate,
  CustomerOfferData,
} from '../templates/CustomerOfferConfirmationTemplate';

export class CustomerEmailManager {
  private transporter = EmailTransporter.getInstance();

  async sendCustomerOfferConfirmation(customerData: CustomerOfferData) {
    const transporter = this.transporter.getTransporter();

    if (!transporter) {
      console.log(
        '📧 Email notifications disabled. Customer email not sent.'
      );
      return { success: false, reason: 'Email not configured' };
    }

    try {
      const template = new CustomerOfferConfirmationTemplate(customerData);

      const mailOptions = {
        from: `SmarterPayouts <${EMAIL_CONFIG.from}>`,
        to: customerData.email,
        subject: template.getSubject(),
        html: template.generate(),
        text: template.generateText(),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Customer offer confirmation email sent successfully:', info.messageId);
      console.log('📧 Sent to:', customerData.email);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send customer offer confirmation email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

