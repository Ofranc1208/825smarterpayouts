/**
 * Email Configuration
 * Centralized configuration for email service
 */

export const EMAIL_CONFIG = {
  // Gmail address that will send the emails
  from: process.env.GMAIL_USER || 'your-email@gmail.com',
  // Email address that will receive notifications
  to: process.env.NOTIFICATION_EMAIL || 'your-email@gmail.com',
  // Gmail App Password (not your regular password)
  password: process.env.GMAIL_APP_PASSWORD || '',
};

