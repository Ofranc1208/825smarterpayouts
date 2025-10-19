/**
 * Twilio Chat Service - Client-side Twilio Chat Integration
 *
 * Handles Twilio Chat client operations for live chat functionality.
 * Provides WebSocket connections, message sending, and real-time updates.
 */

// Dynamic import for Twilio Chat client to avoid SSR issues
// Note: Twilio Chat SDK is deprecated. For production, use Twilio Conversations API
// For now, we rely on Firebase Realtime Database for client-side messaging
let TwilioChatClient: any = null;

export interface TwilioChatConfig {
  token: string;
  serviceSid: string;
  sessionId: string;
}

export interface TwilioMessage {
  sid: string;
  body: string;
  author: string;
  timestamp: Date;
  type: string;
}

/**
 * TwilioChatService - Client-side service for Twilio Chat integration
 */
export class TwilioChatService {
  private client: any | null = null;
  private channel: any = null;
  private messageListeners: Array<(message: TwilioMessage) => void> = [];
  private statusListeners: Array<(status: 'connecting' | 'connected' | 'disconnected' | 'error') => void> = [];

  /**
   * Initialize Twilio Chat client
   */
  async initialize(config: TwilioChatConfig): Promise<void> {
    try {
      this.updateStatus('connecting');

      // Check if Twilio Chat client is available (client-side only)
      if (!TwilioChatClient) {
        throw new Error('Twilio Chat client not available in server environment');
      }

      // Initialize Twilio Chat client
      this.client = new TwilioChatClient(config.token);

      // Wait for client to be ready
      await new Promise((resolve, reject) => {
        this.client!.on('initialized', resolve);
        this.client!.on('initFailed', reject);

        // Timeout after 10 seconds
        setTimeout(() => reject(new Error('Twilio Chat initialization timeout')), 10000);
      });

      // Get or create channel for this session
      await this.getOrCreateChannel(config.sessionId);

      this.updateStatus('connected');
      console.log(`[TwilioChatService] Initialized for session: ${config.sessionId}`);

    } catch (error) {
      console.error('[TwilioChatService] Initialization error:', error);
      this.updateStatus('error');
      throw error;
    }
  }

  /**
   * Get or create chat channel for session
   */
  private async getOrCreateChannel(sessionId: string): Promise<void> {
    if (!this.client) {
      throw new Error('Chat client not initialized');
    }

    try {
      // Try to get existing channel
      this.channel = await this.client.getChannelByUniqueName(sessionId);

      if (!this.channel) {
        // Create new channel if it doesn't exist
        this.channel = await this.client.createChannel({
          uniqueName: sessionId,
          friendlyName: `Live Chat Session ${sessionId}`,
          isPrivate: true
        });

        console.log(`[TwilioChatService] Created new channel for session: ${sessionId}`);
      } else {
        console.log(`[TwilioChatService] Joined existing channel for session: ${sessionId}`);
      }

      // Set up message listener
      this.channel.on('messageAdded', (message: any) => {
        this.handleIncomingMessage(message);
      });

      // Join the channel
      await this.channel.join();

    } catch (error) {
      console.error('[TwilioChatService] Error getting/creating channel:', error);
      throw error;
    }
  }

  /**
   * Send a message
   */
  async sendMessage(message: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Chat channel not initialized');
    }

    try {
      await this.channel.sendMessage(message);
      console.log(`[TwilioChatService] Sent message: ${message}`);
    } catch (error) {
      console.error('[TwilioChatService] Error sending message:', error);
      throw error;
    }
  }

  /**
   * Handle incoming messages
   */
  private handleIncomingMessage(message: any): void {
    const twilioMessage: TwilioMessage = {
      sid: message.sid,
      body: message.body,
      author: message.author,
      timestamp: new Date(message.timestamp),
      type: message.type
    };

    // Notify all message listeners
    this.messageListeners.forEach(listener => {
      try {
        listener(twilioMessage);
      } catch (error) {
        console.error('[TwilioChatService] Error in message listener:', error);
      }
    });
  }

  /**
   * Listen for new messages
   */
  onMessage(callback: (message: TwilioMessage) => void): () => void {
    this.messageListeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.messageListeners.indexOf(callback);
      if (index > -1) {
        this.messageListeners.splice(index, 1);
      }
    };
  }

  /**
   * Listen for connection status changes
   */
  onStatusChange(callback: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void): () => void {
    this.statusListeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.statusListeners.indexOf(callback);
      if (index > -1) {
        this.statusListeners.splice(index, 1);
      }
    };
  }

  /**
   * Update connection status and notify listeners
   */
  private updateStatus(status: 'connecting' | 'connected' | 'disconnected' | 'error'): void {
    this.statusListeners.forEach(listener => {
      try {
        listener(status);
      } catch (error) {
        console.error('[TwilioChatService] Error in status listener:', error);
      }
    });
  }

  /**
   * Get chat history
   */
  async getMessageHistory(limit: number = 50): Promise<TwilioMessage[]> {
    if (!this.channel) {
      throw new Error('Chat channel not initialized');
    }

    try {
      const messages = await this.channel.getMessages(limit);
      return messages.items.map((msg: any) => ({
        sid: msg.sid,
        body: msg.body,
        author: msg.author,
        timestamp: new Date(msg.timestamp),
        type: msg.type
      }));
    } catch (error) {
      console.error('[TwilioChatService] Error getting message history:', error);
      return [];
    }
  }

  /**
   * Leave the chat channel
   */
  async leaveChannel(): Promise<void> {
    if (this.channel) {
      try {
        await this.channel.leave();
        console.log('[TwilioChatService] Left chat channel');
      } catch (error) {
        console.error('[TwilioChatService] Error leaving channel:', error);
      }
    }
  }

  /**
   * Shutdown the chat client
   */
  async shutdown(): Promise<void> {
    try {
      if (this.channel) {
        await this.leaveChannel();
      }

      if (this.client) {
        this.client.removeAllListeners();
        // Note: Twilio Chat client doesn't have a explicit shutdown method
        // but we can clean up our listeners
      }

      // Clear all listeners
      this.messageListeners = [];
      this.statusListeners = [];

      this.updateStatus('disconnected');
      console.log('[TwilioChatService] Shutdown complete');

    } catch (error) {
      console.error('[TwilioChatService] Error during shutdown:', error);
    }
  }

  /**
   * Get current connection status
   */
  getStatus(): 'connecting' | 'connected' | 'disconnected' | 'error' {
    if (!this.client) return 'disconnected';
    // Note: Twilio Chat client doesn't expose connection status directly
    // We'll infer it from whether we have a channel
    return this.channel ? 'connected' : 'connecting';
  }
}

// Export singleton instance
export const twilioChatService = new TwilioChatService();
