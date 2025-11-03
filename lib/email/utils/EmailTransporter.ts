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
    if (!EMAIL_CONFIG.password) {
      console.warn(
        '⚠️ Gmail App Password not configured. Email notifications disabled.'
      );
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

