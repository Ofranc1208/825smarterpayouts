/**
 * Offer Capture Notification Email Template
 * Generates HTML and text for offer capture notification emails
 */

import { BaseEmailTemplate } from './base/BaseEmailTemplate';
import { EMAIL_STYLES } from './base/EmailStyles';
import { formatCurrency, formatDate, formatCalculatorType, formatDeliveryMethod, cleanPhoneNumber } from '../utils/formatters';

export interface OfferCaptureData {
  id: string;
  offerCode: string;
  calculatorType: 'guaranteed' | 'lcp';
  email: string | null;
  phone: string | null;
  message?: string | null; // Customer message for "Send Message" tab
  deliveryMethod: 'email' | 'sms';
  minOffer: number;
  maxOffer: number;
  submittedAt: any;
}

export class OfferCaptureNotificationTemplate extends BaseEmailTemplate {
  constructor(private captureData: OfferCaptureData) {
    super();
  }

  generate(): string {
    const content = `
      <div class="header">
        <h2>💰 New Offer Capture</h2>
      </div>
      <div class="content">
        ${this.urgentNotice(
          'HIGH PRIORITY: A potential client has submitted their contact information for a quote. Please contact them promptly.'
        )}
        
        <div class="offer-range">
          <div style="margin-bottom: 5px;"><strong>Offer Range:</strong></div>
          <div class="offer-amount">
            ${formatCurrency(this.captureData.minOffer)} - ${formatCurrency(this.captureData.maxOffer)}
          </div>
        </div>
        
        ${this.infoRow('🎫 Offer Code:', `<span style="font-family: monospace; font-size: 1.1em; font-weight: bold;">${this.captureData.offerCode}</span>`)}
        ${this.infoRow('📊 Calculator Type:', formatCalculatorType(this.captureData.calculatorType))}
        
        ${this.captureData.email ? `
          <div class="info-row">
            <span class="label">📧 Email:</span>
            <span class="value"><a href="mailto:${this.captureData.email}">${this.captureData.email}</a></span>
          </div>
        ` : ''}
        
        ${this.captureData.phone ? `
          <div class="info-row">
            <span class="label">📞 Phone:</span>
            <span class="value"><a href="tel:${cleanPhoneNumber(this.captureData.phone)}">${this.captureData.phone}</a></span>
          </div>
        ` : ''}
        
        ${this.captureData.message ? `
          <div class="info-row" style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 1rem;">
            <span class="label">💬 Customer Message:</span>
            <div class="value" style="margin-top: 8px; padding: 0.75rem; background: white; border-radius: 4px; white-space: pre-wrap; line-height: 1.6;">${this.captureData.message}</div>
          </div>
        ` : ''}
        
        ${this.infoRow('📨 Delivery Method:', formatDeliveryMethod(this.captureData.deliveryMethod))}
        ${this.infoRow('🔗 Capture ID:', this.captureData.id)}
        ${this.infoRow('📅 Submitted:', formatDate())}
      </div>
      ${this.footer(
        'This offer capture was submitted through the SmarterPayouts calculator.',
        'View all captures in your',
        'https://console.firebase.google.com/project/smarterwebsite-3d25d/firestore/data/offer-captures'
      )}
    `;

    const customStyles = `
      ${EMAIL_STYLES.offerRange}
    `;

    return this.generateHtml('New Offer Capture', content, customStyles);
  }

  generateText(): string {
    return `
New Offer Capture

Offer Details:
- Offer Code: ${this.captureData.offerCode}
- Calculator Type: ${formatCalculatorType(this.captureData.calculatorType)}
- Offer Range: ${formatCurrency(this.captureData.minOffer)} - ${formatCurrency(this.captureData.maxOffer)}

Contact Information:
${this.captureData.email ? `- Email: ${this.captureData.email}` : ''}
${this.captureData.phone ? `- Phone: ${this.captureData.phone}` : ''}
${this.captureData.message ? `\nCustomer Message:\n${this.captureData.message}` : ''}

Delivery Method: ${formatDeliveryMethod(this.captureData.deliveryMethod)}

Capture ID: ${this.captureData.id}
Submitted: ${formatDate()}

⚡ HIGH PRIORITY: Please contact this person promptly about their offer.
    `.trim();
  }

  getSubject(): string {
    return `💰 New Offer Capture: ${this.captureData.offerCode} - ${formatCurrency(this.captureData.minOffer)}-${formatCurrency(this.captureData.maxOffer)}`;
  }
}

