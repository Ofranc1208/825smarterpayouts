/**
 * Email Styles
 * Shared CSS styles for email templates
 */

export const EMAIL_STYLES = {
  base: `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
    .label { font-weight: bold; color: #374151; }
    .value { color: #1f2937; }
    .urgent { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  `,
  offerRange: `
    .offer-range { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 15px; border-left: 4px solid #3b82f6; margin: 15px 0; border-radius: 4px; }
    .offer-amount { font-size: 1.5em; font-weight: bold; color: #1e40af; }
  `,
};

