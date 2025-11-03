/**
 * Email Configuration
 * Centralized configuration for email service
 */

export const EMAIL_CONFIG = {
  // Gmail address that will send the emails
  from: process.env.GMAIL_USER || 'smarterpayouts4@gmail.com',
  // Email address that will receive notifications
  to: process.env.NOTIFICATION_EMAIL || 'smarterpayouts4@gmail.com',
  // Gmail App Password (not your regular password)
  password: process.env.GMAIL_APP_PASSWORD || '',
};

// Log configuration on first load (only in server-side context)
if (typeof window === 'undefined') {
  console.log('📧 [Email Config] Notification Email:', EMAIL_CONFIG.to);
  console.log('📧 [Email Config] From Email:', EMAIL_CONFIG.from);
  console.log('📧 [Email Config] Gmail App Password configured:', !!EMAIL_CONFIG.password);
}

