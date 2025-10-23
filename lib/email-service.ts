/**
 * Email Service for Appointment Notifications
 * 
 * Sends email notifications when new appointments are booked.
 * Uses Nodemailer with Gmail SMTP (simplest setup).
 * 
 * @author SmarterPayouts Team
 * @since 2025
 */

import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  // Your Gmail address that will send the emails
  from: process.env.GMAIL_USER || 'your-email@gmail.com',
  // Your email address that will receive appointment notifications
  to: process.env.NOTIFICATION_EMAIL || 'your-email@gmail.com',
  // Gmail App Password (not your regular password)
  password: process.env.GMAIL_APP_PASSWORD || '',
};

/**
 * Create email transporter
 */
function createTransporter() {
  if (!EMAIL_CONFIG.password) {
    console.warn('⚠️ Gmail App Password not configured. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_CONFIG.from,
      pass: EMAIL_CONFIG.password,
    },
  });
}

/**
 * Send appointment notification email
 */
export async function sendAppointmentNotification(appointmentData: {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
  submittedAt: any;
}) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('📧 Email notifications disabled. Appointment saved to Firebase only.');
    return { success: false, reason: 'Email not configured' };
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #1f2937; }
          .urgent { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📅 New Appointment Request</h2>
          </div>
          <div class="content">
            <div class="urgent">
              <strong>⚡ URGENT:</strong> Please contact this person within 24 hours to confirm their appointment.
            </div>

            <div class="info-row">
              <span class="label">👤 Name:</span>
              <span class="value">${appointmentData.name}</span>
            </div>

            <div class="info-row">
              <span class="label">📞 Phone:</span>
              <span class="value">${appointmentData.phone}</span>
            </div>

            <div class="info-row">
              <span class="label">📅 Preferred Date:</span>
              <span class="value">${appointmentData.preferredDate}</span>
            </div>

            <div class="info-row">
              <span class="label">⏰ Preferred Time:</span>
              <span class="value">${appointmentData.preferredTime}</span>
            </div>

            <div class="info-row">
              <span class="label">💬 Consultation Type:</span>
              <span class="value">${appointmentData.consultationType}</span>
            </div>

            ${appointmentData.message ? `
            <div class="info-row">
              <span class="label">📝 Message:</span>
              <div class="value" style="margin-top: 5px;">${appointmentData.message}</div>
            </div>
            ` : ''}

            <div class="info-row">
              <span class="label">🔗 Appointment ID:</span>
              <span class="value">${appointmentData.id}</span>
            </div>

            <div class="info-row">
              <span class="label">📅 Submitted:</span>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
          </div>
          <div class="footer">
            <p>This appointment was submitted through the SmarterPayouts website.</p>
            <p>View all appointments in your <a href="https://console.firebase.google.com/project/smarterwebsite-3d25d/firestore/data/appointments">Firebase Console</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `SmarterPayouts Appointments <${EMAIL_CONFIG.from}>`,
      to: EMAIL_CONFIG.to,
      subject: `🔔 New Appointment: ${appointmentData.name} - ${appointmentData.consultationType}`,
      html: emailHtml,
      text: `
New Appointment Request

Contact Information:
- Name: ${appointmentData.name}
- Phone: ${appointmentData.phone}

Appointment Details:
- Preferred Date: ${appointmentData.preferredDate}
- Preferred Time: ${appointmentData.preferredTime}
- Consultation Type: ${appointmentData.consultationType}

${appointmentData.message ? `Message: ${appointmentData.message}` : ''}

Appointment ID: ${appointmentData.id}
Submitted: ${new Date().toLocaleString()}

⚡ URGENT: Please contact this person within 24 hours to confirm their appointment.
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

