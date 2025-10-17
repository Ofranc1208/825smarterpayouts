// Calculator Message Service - Handles user choice logging
// ========================================================

import { LCPPaymentData, LCPDetailsData, LCPProfileData, LCPLifestyleData, LCPHealthData } from '../../../types';

export class CalculatorMessageService {
  /**
   * Log user choice as message
   */
  static logUserChoice(
    text: string, 
    logUserChoiceAsMessage: (text: string) => void
  ): void {
    console.log('[CalculatorMessage] Logging user choice:', text);
    logUserChoiceAsMessage(text);
  }

  /**
   * Format guaranteed mode selection message
   */
  static formatModeSelection(mode: string): string {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  }

  /**
   * Format increase rate selection message
   */
  static formatIncreaseSelection(rate: number): string {
    return `${rate}% annual increase`;
  }

  /**
   * Format payment amount message
   */
  static formatPaymentAmount(amount: string): string {
    return `Payment amount: $${amount}`;
  }

  /**
   * Format payment period message
   */
  static formatPaymentPeriod(startDate: string, endDate: string): string {
    return `Payment period: ${startDate} to ${endDate}`;
  }

  /**
   * Format LCP payment data message
   */
  static formatLCPPayment(data: { paymentMode: string; amount: string }): string {
    return `${data.paymentMode}: $${data.amount}`;
  }

  /**
   * Get standard messages for common actions
   */
  static getStandardMessages() {
    return {
      CALCULATE_OFFER: 'Calculate my offer',
      CALCULATE_LCP_OFFER: 'Calculate LCP offer',
      DETAILS_PROVIDED: 'Details provided',
      PROFILE_PROVIDED: 'Profile information provided',
      LIFESTYLE_PROVIDED: 'Lifestyle information provided',
      HEALTH_PROVIDED: 'Health information provided'
    };
  }

  /**
   * Validate message content
   */
  static isValidMessage(text: string): boolean {
    return typeof text === 'string' && text.trim().length > 0;
  }

  /**
   * Sanitize message content
   */
  static sanitizeMessage(text: string): string {
    return text.trim().substring(0, 200); // Limit message length
  }
}
