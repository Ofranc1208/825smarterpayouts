/**
 * Email Transporter
 * Manages Nodemailer transporter creation and configuration
 */

import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from './config';

export class EmailTransporter {
  private static instance: EmailTransporter | null = null;
  private transporter: nodemailer.Transporter | null = null;

  private constructor() {
    this.transporter = this.createTransporter();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): EmailTransporter {
    if (!EmailTransporter.instance) {
      EmailTransporter.instance = new EmailTransporter();
    }
    return EmailTransporter.instance;
  }

  /**
   * Create email transporter
   */
  private createTransporter(): nodemailer.Transporter | null {
    console.log('📧 [EmailTransporter] Creating transporter...');
    console.log('📧 [EmailTransporter] From:', EMAIL_CONFIG.from);
    console.log('📧 [EmailTransporter] Password configured:', !!EMAIL_CONFIG.password);
    console.log('📧 [EmailTransporter] Password length:', EMAIL_CONFIG.password?.length || 0);
    
    if (!EMAIL_CONFIG.password) {
      console.error(
        '❌ Gmail App Password not configured. Email notifications disabled.'
      );
      console.error('❌ Set GMAIL_APP_PASSWORD environment variable.');
      return null;
    }

    if (!EMAIL_CONFIG.from) {
      console.error(
        '❌ Gmail User not configured. Email notifications disabled.'
      );
      console.error('❌ Set GMAIL_USER environment variable.');
      return null;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_CONFIG.from,
          pass: EMAIL_CONFIG.password,
        },
      });

      // Verify the connection (async, but we'll catch errors when sending)
      transporter.verify().then(() => {
        console.log('✅ [EmailTransporter] SMTP connection verified successfully');
      }).catch((verifyError) => {
        console.error('❌ [EmailTransporter] SMTP verification failed:', verifyError);
        if (verifyError instanceof Error) {
          console.error('❌ [EmailTransporter] Verification error:', verifyError.message);
          if (verifyError.message.includes('Invalid login') || verifyError.message.includes('535') || verifyError.message.includes('5.7.8')) {
            console.error('❌ [EmailTransporter] Gmail App Password is invalid or expired. Please generate a new one at: https://myaccount.google.com/apppasswords');
          }
        }
      });

      console.log('✅ [EmailTransporter] Transporter created successfully');
      return transporter;
    } catch (error) {
      console.error('❌ [EmailTransporter] Failed to create transporter:', error);
      return null;
    }
  }

  /**
   * Get transporter instance
   */
  getTransporter(): nodemailer.Transporter | null {
    return this.transporter;
  }

  /**
   * Check if email is configured
   */
  isConfigured(): boolean {
    return this.transporter !== null;
  }
}

