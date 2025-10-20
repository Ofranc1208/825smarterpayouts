/**
 * Message Manager - Handles Live Chat Message Operations
 * 
 * Manages sending, retrieving, and listening to messages.
 */

import { realtimeManager } from '../../../lib/firebase/realtime';
import { firestoreManager } from '../../../lib/firebase/firestore';
import type { LiveChatSession, LiveChatMessage } from '../LiveChatService';

export class MessageManager {
  private realtimeManager = realtimeManager;
  private firestoreManager = firestoreManager;

  /**
   * Send a message in the live chat
   */
  async sendMessage(
    sessionId: string, 
    content: string, 
    senderId: string, 
    senderType: 'user' | 'specialist' | 'system'
  ): Promise<string | null> {
    try {
      // Verify session exists
      const session = await this.firestoreManager.getChatSession(sessionId);
      if (!session) {
        console.error(`[MessageManager] Session not found: ${sessionId}`);
        return null;
      }

      const messageData = {
        sessionId,
        senderId,
        senderType,
        content,
        type: 'text' as const
      };

      // Send to realtime database for real-time sync
      const messageId = await this.realtimeManager.sendMessage(sessionId, messageData);

      console.log(`[MessageManager] Sent message ${messageId} in session ${sessionId}`);
      return messageId;

    } catch (error) {
      console.error('[MessageManager] Error sending message:', error);
      return null;
    }
  }

  /**
   * Get recent messages for a session
   */
  async getRecentMessages(sessionId: string, limit: number = 50): Promise<LiveChatMessage[]> {
    try {
      const messages = await this.realtimeManager.getRecentMessages(sessionId, limit);

      return messages.map(msg => ({
        id: msg.id,
        sessionId: msg.sessionId,
        senderId: msg.senderId,
        senderType: msg.senderType,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        type: msg.type,
        metadata: msg.metadata ? {
          edited: msg.metadata.edited,
          editedAt: msg.metadata.editedAt ? new Date(msg.metadata.editedAt) : undefined,
          deliveryStatus: msg.metadata.deliveryStatus
        } : undefined
      }));

    } catch (error) {
      console.error('[MessageManager] Error getting recent messages:', error);
      return [];
    }
  }

  /**
   * Listen for new messages in real-time
   */
  onMessage(sessionId: string, callback: (messages: LiveChatMessage) => void): () => void {
    const knownMessageIds = new Set<string>();

    return this.realtimeManager.onMessages(sessionId, (messages) => {
      const liveChatMessages = messages.map(msg => ({
        id: msg.id,
        sessionId: msg.sessionId,
        senderId: msg.senderId,
        senderType: msg.senderType,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        type: msg.type,
        metadata: msg.metadata ? {
          edited: msg.metadata.edited,
          editedAt: msg.metadata.editedAt ? new Date(msg.metadata.editedAt) : undefined,
          deliveryStatus: msg.metadata.deliveryStatus
        } : undefined
      }));

      liveChatMessages.forEach(message => {
        if (!knownMessageIds.has(message.id)) {
          knownMessageIds.add(message.id);
          callback(message);
        }
      });
    });
  }
}

