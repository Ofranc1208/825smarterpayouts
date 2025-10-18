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

    const intentResult = snapshot 
      ? await fetchIntent(snapshot, message) 
      : { intent: 'AMBIGUOUS', value: message };

    switch (intentResult.intent) {
      case 'FORM_ANSWER':
        // Let the stepper components handle the form logic
        break;

      case 'ASK_QUESTION':
        await this.handleQuestionIntent(newUserMessage);
        break;

      case 'SPEAK_TO_AGENT':
        await this.handleAgentRequest();
        break;

      case 'AMBIGUOUS':
      default:
        await this.handleAmbiguousIntent();
        break;
    }
  }

  private async handleQuestionIntent(userMessage: TextMessage): Promise<void> {
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

  private async handleAmbiguousIntent(): Promise<void> {
    const { processMessageWithGPT, setVisibleMessages, setIsTyping, setIsLoading, currentStep, triggerReprompt } = this.config;

    const botMsgId = generateUniqueId();
    let isFirstChunk = true;

    await processMessageWithGPT({
      userMessage: {
        id: generateUniqueId(),
        type: 'text',
        text: "I'm not quite sure I understand. Could you please rephrase?",
        sender: 'user',
      },
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
}
