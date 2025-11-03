/**
 * Base Email Template
 * Shared utilities and base structure for email templates
 */

import { EMAIL_STYLES } from './EmailStyles';

export abstract class BaseEmailTemplate {
  /**
   * Generate HTML email with base structure
   */
  protected generateHtml(
    title: string,
    content: string,
    customStyles: string = ''
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${EMAIL_STYLES.base}
          ${customStyles}
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
      </html>
    `.trim();
  }

  /**
   * Generate info row HTML
   */
  protected infoRow(label: string, value: string): string {
    return `
      <div class="info-row">
        <span class="label">${label}</span>
        <span class="value">${value}</span>
      </div>
    `;
  }

  /**
   * Generate urgent notice HTML
   */
  protected urgentNotice(message: string): string {
    return `
      <div class="urgent">
        <strong>⚡ ${message}</strong>
      </div>
    `;
  }

  /**
   * Generate footer HTML
   */
  protected footer(message: string, linkText?: string, linkUrl?: string): string {
    return `
      <div class="footer">
        <p>${message}</p>
        ${linkText && linkUrl ? `<p>${linkText} <a href="${linkUrl}">${linkUrl}</a></p>` : ''}
      </div>
    `;
  }

  /**
   * Abstract method to generate HTML content
   */
  abstract generate(): string;

  /**
   * Abstract method to generate plain text version
   */
  abstract generateText(): string;
}

