/**
 * Offer Capture Email Manager
 * Handles sending offer capture notification emails
 */

import { EmailTransporter } from '../utils/EmailTransporter';
import { EMAIL_CONFIG } from '../utils/config';
import {
  OfferCaptureNotificationTemplate,
  OfferCaptureData,
} from '../templates/OfferCaptureNotificationTemplate';

export class OfferCaptureEmailManager {
  private transporter = EmailTransporter.getInstance();

  async sendOfferCaptureNotification(captureData: OfferCaptureData) {
    const transporter = this.transporter.getTransporter();

    if (!transporter) {
      console.log(
        '📧 Email notifications disabled. Offer capture saved to Firebase only.'
      );
      return { success: false, reason: 'Email not configured' };
    }

    try {
      const template = new OfferCaptureNotificationTemplate(captureData);

      const mailOptions = {
        from: `SmarterPayouts Offers <${EMAIL_CONFIG.from}>`,
        to: EMAIL_CONFIG.to,
        subject: template.getSubject(),
        html: template.generate(),
        text: template.generateText(),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Offer capture email sent successfully:', info.messageId);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send offer capture email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

