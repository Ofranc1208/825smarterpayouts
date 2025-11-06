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
    let finalText = '';

    await processMessageWithGPT({
      userMessage,
      onStream: (partialText: string) => {
        // Check if the response contains special component markers
        if (partialText.includes('[LOCATION_COMPONENT]')) {
          // Replace the text message with a location component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'LocationCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        } else if (partialText.includes('[CONTACT_COMPONENT]')) {
          // Replace the text message with a contact component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'ContactInfo',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        } else if (partialText.includes('[OSCAR_FRANCIS_COMPONENT]')) {
          // Replace the text message with an Oscar Francis component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'OscarFrancisCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        } else if (partialText.includes('[SAHAR_BAKHSH_COMPONENT]')) {
          // Replace the text message with a Sahar Bakhsh component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'SaharBakhshCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        } else if (partialText.includes('[QUOTE_BUTTON_COMPONENT]')) {
          // Replace the text message with a Quote Button component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'QuoteButton',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        } else if (partialText.includes('[PROCESS_STEPS_COMPONENT]')) {
          // Replace the text message with a Process Steps component message
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'ProcessStepsCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
          setIsTyping(false);
          setIsLoading(false);
          return;
        }

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
      onComplete: (completeText: string) => {
        finalText = completeText;
        
        // Final check for special component markers
        if (completeText.includes('[LOCATION_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'LocationCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        } else if (completeText.includes('[CONTACT_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'ContactInfo',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        } else if (completeText.includes('[OSCAR_FRANCIS_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'OscarFrancisCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        } else if (completeText.includes('[SAHAR_BAKHSH_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'SaharBakhshCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        } else if (completeText.includes('[QUOTE_BUTTON_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'QuoteButton',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        } else if (completeText.includes('[PROCESS_STEPS_COMPONENT]')) {
          setVisibleMessages(prev => {
            const filtered = prev.filter(m => m.id !== botMsgId);
            return [
              ...filtered,
              { 
                id: botMsgId, 
                type: 'component', 
                componentType: 'ProcessStepsCard',
                componentData: {},
                sender: 'bot' 
              }
            ];
          });
        }
        
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
