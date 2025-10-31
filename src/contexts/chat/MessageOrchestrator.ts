/**
 * Message Orchestrator - Orchestra Pattern
 * 
 * Central coordinator for all message processing
 */

import { Message, TextMessage, FileMessage } from '../../hooks/useConversationalForm';
import { MessageProcessorConfig } from './types';
import { generateUniqueId } from './utils';
import { TextMessageProcessor } from './TextMessageProcessor';
import { FileMessageProcessor } from './FileMessageProcessor';

export class MessageOrchestrator {
  private textProcessor: TextMessageProcessor;
  private fileProcessor: FileMessageProcessor;
  private config: MessageProcessorConfig;

  constructor(config: MessageProcessorConfig) {
    this.config = config;
    this.textProcessor = new TextMessageProcessor(config);
    this.fileProcessor = new FileMessageProcessor(config);
  }

  async processMessage(message: string | FileMessage): Promise<void> {
    const { setVisibleMessages, setIsTyping, setIsLoading } = this.config;

    // Create user message
    const newUserMessage = this.createUserMessage(message);
    
    // Add user message to chat
    setVisibleMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      if (typeof message === 'string') {
        await this.textProcessor.processTextMessage(message, newUserMessage as TextMessage);
      } else {
        await this.fileProcessor.processFileMessage(message);
      }
    } catch (error) {
      console.error('[MessageOrchestrator] Error processing message:', error);
      await this.handleError();
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  }

  private createUserMessage(message: string | FileMessage): Message {
    if (typeof message === 'string') {
      return {
        id: generateUniqueId(),
        type: 'text',
        text: message,
        sender: 'user',
        createdAt: new Date().toISOString(),
      } as TextMessage;
    } else {
      return {
        id: generateUniqueId(),
        type: 'file',
        content: message.content,
        sender: message.sender,
        createdAt: new Date().toISOString(),
      } as FileMessage;
    }
  }

  private async handleError(): Promise<void> {
    const { setVisibleMessages } = this.config;

    const errorResponse: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: 'Sorry, there was an error processing your message.',
      sender: 'bot',
    };

    setVisibleMessages(prev => [...prev, errorResponse]);
  }
}
