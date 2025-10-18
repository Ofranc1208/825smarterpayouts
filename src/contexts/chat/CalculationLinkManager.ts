/**
 * Calculation Link Manager - Orchestra Pattern
 * 
 * Manages the addition of calculation links to chat based on flow state
 */

import { ComponentMessage, TextMessage } from '../../hooks/useConversationalForm';
import { generateUniqueId } from './utils';

export class CalculationLinkManager {
  private addedLCPLinkRef: { current: boolean } = { current: false };
  private addedGuaranteedLinkRef: { current: boolean } = { current: false };

  constructor(
    private setVisibleMessages: React.Dispatch<React.SetStateAction<any[]>>,
    private sessionId: string
  ) {}

  handleLCPFlow(currentStep: string | null): void {
    if (currentStep && currentStep.startsWith('lcp_') && !this.addedLCPLinkRef.current) {
      const calculationLinkMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        componentType: 'CalculationLink',
        componentData: {
          text: 'Start Your Calculation →',
          href: `/calculations/lcp?sessionId=${this.sessionId}`,
          style: this.getCalculationLinkStyle()
        }
      };

      this.setVisibleMessages(prev => [...prev, calculationLinkMessage]);
      this.addedLCPLinkRef.current = true;
    }
  }

  handleGuaranteedFlow(currentStep: string | null): void {
    const guaranteedSteps = ['mode', 'amount', 'increase', 'dates', 'review', 'offer'];
    
    if (currentStep && guaranteedSteps.includes(currentStep) && !this.addedGuaranteedLinkRef.current) {
      const botMessage: TextMessage = {
        id: generateUniqueId(),
        type: 'text',
        text: "Perfect! Guaranteed Payments. Let's get your exact payout value — quick and simple. 🔒",
        sender: 'bot'
      };

      const calculationLinkMessage: ComponentMessage = {
        id: generateUniqueId(),
        type: 'component',
        componentType: 'CalculationLink',
        componentData: {
          text: 'Start Your Calculation →',
          href: `/calculations/guaranteed?sessionId=${this.sessionId}`,
          style: this.getCalculationLinkStyle()
        }
      };

      this.setVisibleMessages(prev => [...prev, botMessage, calculationLinkMessage]);
      this.addedGuaranteedLinkRef.current = true;
    }
  }

  private getCalculationLinkStyle() {
    return {
      display: 'inline-block',
      maxWidth: '280px',
      width: '100%',
      padding: '16px 24px',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      color: '#047857',
      border: '2px solid #059669',
      borderRadius: '14px',
      textAlign: 'center',
      margin: '8px auto',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '700',
      fontSize: '0.95rem',
      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }
}
