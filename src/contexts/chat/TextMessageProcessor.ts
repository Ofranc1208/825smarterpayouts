/**
 * Text Message Processor - Orchestra Pattern
 * 
 * Handles all text message processing including intent classification
 */

import { TextMessage } from '../../hooks/useConversationalForm';
import { MessageProcessorConfig } from './types';
import { generateUniqueId } from './utils';

export class TextMessageProcessor {
  private config: MessageProcessorConfig;

  constructor(config: MessageProcessorConfig) {
    this.config = config;
  }

  async processTextMessage(message: string, newUserMessage: TextMessage): Promise<void> {
    const { fetchIntent, snapshot } = this.config;

    // Check if we're in a form flow that needs intent classification
    const isInFormFlow = snapshot && snapshot.stepId && snapshot.question;

    if (isInFormFlow) {
      // Only use intent classification when actively in a form step
      const intentResult = await fetchIntent(snapshot, message);

      switch (intentResult.intent) {
        case 'FORM_ANSWER':
          // Let the stepper components handle the form logic
          break;

        case 'ASK_QUESTION':
          await this.handleConversationalResponse(newUserMessage);
          break;

        case 'SPEAK_TO_AGENT':
          await this.handleAgentRequest();
          break;

        case 'AMBIGUOUS':
        default:
          await this.handleConversationalResponse(newUserMessage);
          break;
      }
    } else {
      // Not in a form flow - handle as natural conversation
      // Let GPT handle the conversation naturally with enhanced prompt
      await this.handleConversationalResponse(newUserMessage);
    }
  }

  /**
   * Unified conversational response handler
   * Lets GPT handle the conversation naturally with enhanced prompt
   */
  private async handleConversationalResponse(userMessage: TextMessage): Promise<void> {
    const { processMessageWithGPT, setVisibleMessages, setIsTyping, setIsLoading, currentStep, triggerReprompt } = this.config;

    const botMsgId = generateUniqueId();
    let isFirstChunk = true;

    await processMessageWithGPT({
      userMessage,
      onStream: (partialText: string) => {
        if (isFirstChunk) {
          setIsTyping(false);
          setVisibleMessages(prev => [
            ...prev,
            { id: botMsgId, type: 'text', text: partialText, sender: 'bot' }
          ]);
          isFirstChunk = false;
        } else {
          setVisibleMessages(prev => prev.map(m => 
            m.id === botMsgId ? { ...m, text: partialText } : m
          ));
        }
      },
      onComplete: () => {
        setIsTyping(false);
        setIsLoading(false);
      },
      setVisibleMessages,
      currentStep,
      triggerReprompt
    });
  }

  private async handleAgentRequest(): Promise<void> {
    const { setVisibleMessages } = this.config;

    setVisibleMessages(prev => [
      ...prev,
      {
        id: generateUniqueId(),
        type: 'text',
        text: 'One moment, I will find a payment specialist to assist you.',
        sender: 'bot',
      }
    ]);
  }
}
