/**
 * Customer Offer Confirmation Email Template
 * Generates HTML and text for customer offer confirmation emails
 */

import { BaseEmailTemplate } from './base/BaseEmailTemplate';
import { formatCurrency } from '../utils/formatters';

export interface CustomerOfferData {
  email: string;
  offerCode: string;
  calculatorType: 'guaranteed' | 'lcp';
  minOffer: number;
  maxOffer: number;
  familyProtectionValue?: number; // Only for LCP
}

export class CustomerOfferConfirmationTemplate extends BaseEmailTemplate {
  constructor(private customerData: CustomerOfferData) {
    super();
  }

  generate(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Offer from SmarterPayouts</title>
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
        <p style="margin-bottom: 8px; color: #1f2937;">Dear Valued Client,</p>
        <p style="margin: 0;">Thank you for using SmarterPayouts. We're excited to share your personalized offer!</p>
      </div>

      <!-- Offer Section -->
      <div style="margin-bottom: 35px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 1.5rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin: 0 0 0.25rem 0; letter-spacing: 0.02em; text-transform: uppercase;">Early Payout Offer</h2>
          <p style="font-size: 0.75rem; color: #6b7280; font-weight: 500; letter-spacing: 0.05em; margin: 0;">STRUCTURED SETTLEMENT VALUATION</p>
        </div>

        <!-- Minimum Payout -->
        <div style="margin-bottom: 1.25rem; padding: 0.875rem 1rem; background: #f9fafb; border-radius: 6px; border: 1px solid #d1d5db; text-align: center;">
          <p style="font-size: 0.75rem; color: #6b7280; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">Minimum Payout</p>
          <p style="font-size: 1.125rem; font-weight: 700; color: #4b5563; margin: 0;">${formatCurrency(this.customerData.minOffer, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <!-- Maximum Payout -->
        <div style="text-align: center; margin-bottom: 1.25rem; padding: 1.5rem 1.25rem; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; border: 2px solid #22c55e;">
          <p style="font-size: 0.75rem; color: #15803d; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.1em; text-transform: uppercase;">Maximum Payout</p>
          <p style="font-size: 2.25rem; font-weight: 800; color: #15803d; margin: 0; line-height: 1; letter-spacing: -0.02em;">${formatCurrency(this.customerData.maxOffer, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        ${this.customerData.calculatorType === 'lcp' && this.customerData.familyProtectionValue ? `
        <!-- Family Protection Value (LCP only) -->
        <div style="padding: 0.875rem 1rem; background: #f9fafb; border-radius: 6px; border: 1px solid #d1d5db; text-align: center;">
          <p style="font-size: 0.75rem; color: #6b7280; font-weight: 600; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; text-transform: uppercase;">Family Protection Value</p>
          <p style="font-size: 1.56rem; font-weight: 700; color: #16a34a; margin: 0;">${formatCurrency(this.customerData.familyProtectionValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        ` : ''}

        <!-- Footer Note -->
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #e5e7eb; text-align: center;">
          <p style="font-size: 0.65rem; color: #9ca3af; margin: 0; line-height: 1.5;">
            This offer is based on the information you provided and represents an estimated range.<br />
            Final terms subject to verification and approval.
          </p>
        </div>
      </div>

      <!-- Bonus Message -->
      <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 10px; padding: 22px; margin: 30px 0; text-align: center;">
        <p style="font-size: 15px; color: #92400e; margin: 0; font-weight: 600; line-height: 1.5;">
          You may qualify for up to <span style="font-size: 17px;">$5,000</span> bonus towards closing your structured settlement!
        </p>
      </div>

      <!-- Contact Section -->
      <div style="text-align: center; margin: 40px 0 30px; padding: 30px 25px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
        <p style="font-size: 17px; color: #1f2937; margin-bottom: 18px; font-weight: 600;">Ready to Get Started?</p>
        <div style="font-size: 28px; font-weight: 700; color: #22c55e; margin-bottom: 12px; letter-spacing: -0.5px;">
          <a href="tel:+15615831280" style="color: #22c55e; text-decoration: none;">+1-561-583-1280</a>
        </div>
        <p style="font-size: 13px; color: #6b7280; margin: 0;">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
      </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #1f2937; font-size: 15px; margin: 5px 0; font-weight: 600;">SmarterPayouts</p>
      <p style="margin-top: 15px; font-size: 11px; color: #9ca3af; margin: 0;">
        This email was sent because you requested an offer quote from SmarterPayouts.
      </p>
      
      <!-- Legal Disclaimers -->
      <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: left;">
        <p style="font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Important Disclaimers</p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Illustrative Purposes:</strong> The offer amounts shown above are estimates for illustration purposes only. Actual payout amounts may vary based on verification of your structured settlement documents, court approval requirements, and final due diligence.
        </p>
        ${this.customerData.calculatorType === 'lcp' ? `
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Health and Life Contingency Factors:</strong> For life-contingent payment structures, final offer amounts are subject to review of medical records, life expectancy assessments, and actuarial analysis. Offers may be adjusted based on health conditions, age, gender, smoking status, and other risk factors.
        </p>
        ` : ''}
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Interest Rates and Market Conditions:</strong> Offer amounts are calculated using current market interest rates and discount factors. Rates are subject to change based on prevailing market conditions at the time of final agreement and court approval.
        </p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Regulatory Requirements:</strong> All structured settlement transfers require court approval in accordance with state and federal laws, including the Periodic Payment Settlement Act. Final terms must comply with applicable regulations and may require judicial review.
        </p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">No Guarantee of Approval:</strong> This offer does not guarantee approval of your structured settlement transfer. Final approval is subject to court review, verification of documents, compliance with all legal requirements, and satisfactory completion of due diligence.
        </p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Subject to Change:</strong> All terms, rates, and amounts are subject to change until a final purchase agreement is executed and approved by the appropriate court. SmarterPayouts reserves the right to modify or withdraw this offer based on new information or changed circumstances.
        </p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0 0 10px 0;">
          <strong style="color: #6b7280; font-weight: 600;">Not Financial Advice:</strong> This communication is not intended as financial, legal, or tax advice. You should consult with qualified professionals, including financial advisors, attorneys, and tax professionals, before making decisions regarding your structured settlement.
        </p>
        <p style="font-size: 9px; color: #9ca3af; line-height: 1.6; margin: 0;">
          <strong style="color: #6b7280; font-weight: 600;">Licensed Services:</strong> SmarterPayouts works with licensed brokers in all 50 US states. Services are provided in accordance with applicable state and federal regulations governing structured settlement transfers.
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
Congratulations! You Qualify for an Early Payout Option

Dear Valued Client,

Thank you for using SmarterPayouts. We're excited to share your personalized offer!

Early Payout Offer - STRUCTURED SETTLEMENT VALUATION

Minimum Payout: ${formatCurrency(this.customerData.minOffer, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Maximum Payout: ${formatCurrency(this.customerData.maxOffer, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${this.customerData.familyProtectionValue ? `Family Protection Value: ${formatCurrency(this.customerData.familyProtectionValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}

Offer Code: ${this.customerData.offerCode}

You may qualify for up to $5,000 bonus towards closing your structured settlement!

Ready to Get Started?
Call us: +1-561-583-1280
Monday - Friday, 9:00 AM - 6:00 PM EST

Visit us: smarterpayouts.com

This offer is based on the information you provided and represents an estimated range.
Final terms subject to verification and approval.

SmarterPayouts
    `.trim();
  }

  getSubject(): string {
    return `🎉 Your Structured Settlement Offer - ${this.customerData.offerCode}`;
  }
}

