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
      console.error(
        '❌ [OfferCaptureEmailManager] Email transporter not available. Offer capture saved to Firebase only.'
      );
      console.error('❌ [OfferCaptureEmailManager] Check GMAIL_APP_PASSWORD and GMAIL_USER environment variables.');
      return { success: false, reason: 'Email not configured - transporter not available' };
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

      console.log('📧 [OfferCaptureEmailManager] Sending email to:', EMAIL_CONFIG.to);
      console.log('📧 [OfferCaptureEmailManager] From:', EMAIL_CONFIG.from);
      console.log('📧 [OfferCaptureEmailManager] Subject:', template.getSubject());
      
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ [OfferCaptureEmailManager] Offer capture email sent successfully!');
      console.log('✅ [OfferCaptureEmailManager] Message ID:', info.messageId);
      console.log('✅ [OfferCaptureEmailManager] Email sent to:', EMAIL_CONFIG.to);
      console.log('✅ [OfferCaptureEmailManager] Response:', info.response);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ [OfferCaptureEmailManager] Failed to send offer capture email');
      console.error('❌ [OfferCaptureEmailManager] Error:', error);
      if (error instanceof Error) {
        console.error('❌ [OfferCaptureEmailManager] Error message:', error.message);
        console.error('❌ [OfferCaptureEmailManager] Error stack:', error.stack);
        
        // Check for common Gmail errors
        if (error.message.includes('Invalid login')) {
          console.error('❌ [OfferCaptureEmailManager] Gmail authentication failed. Check GMAIL_APP_PASSWORD.');
        }
        if (error.message.includes('535') || error.message.includes('5.7.8')) {
          console.error('❌ [OfferCaptureEmailManager] Gmail App Password is invalid or expired. Generate a new one.');
        }
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

