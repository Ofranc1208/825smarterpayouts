/**
 * Live Chat Service - Core Service for Live Chat Functionality
 *
 * Orchestrates live chat operations between users and specialists.
 * Integrates Firebase Realtime Database for real-time messaging
 * and Firestore for persistent session management.
 */

import { realtimeManager, type ChatSession, type ChatMessage } from '../../lib/firebase/realtime';
import { firestoreManager } from '../../lib/firebase/firestore';
import type { Specialist } from '../../lib/firebase/firestore';

export interface LiveChatSession {
  id: string;
  userId: string;
  specialistId?: string;
  status: 'waiting' | 'active' | 'completed' | 'transferred';
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  userInfo: {
    name?: string;
    email?: string;
    phone?: string;
    initialIntent: string;
  };
  context: {
    botTranscript: any[];
    settlementInfo?: any;
    priority: 'low' | 'medium' | 'high';
  };
  metadata: {
    source: 'specialist_button' | 'direct_url';
    userAgent: string;
    ipAddress?: string;
  };
}

export interface LiveChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'user' | 'specialist' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'file' | 'image';
  metadata?: {
    edited?: boolean;
    editedAt?: Date;
    deliveryStatus?: 'sent' | 'delivered' | 'read';
  };
}

/**
 * LiveChatService - Main service for managing live chat sessions
 */
export class LiveChatService {
  private realtimeManager = realtimeManager;
  private firestoreManager = firestoreManager;

  // ==================== SESSION MANAGEMENT ====================

  /**
   * Create a new live chat session
   */
  async createLiveChatSession(userInfo: LiveChatSession['userInfo'], context: LiveChatSession['context']): Promise<string> {
    try {
      const userId = `user_${Date.now()}`;
      const now = Date.now();
      
      // Create session in Firestore for persistence
      const sessionId = await this.firestoreManager.createChatSession({
        userId,
        status: 'waiting',
        userInfo,
        context,
        metadata: {
          source: 'specialist_button',
          userAgent: navigator.userAgent
        }
      });

      // Also create in Realtime DB for real-time messaging
      await this.realtimeManager.createChatSession({
        userId,
        status: 'waiting',
        userInfo,
        context,
        metadata: {
          source: 'specialist_button',
          userAgent: navigator.userAgent
        }
      });

      // Add to queue for specialist assignment
      await this.realtimeManager.addToQueue(sessionId);

      console.log(`[LiveChatService] Created live chat session: ${sessionId}`);
      return sessionId;

    } catch (error) {
      console.error('[LiveChatService] Error creating live chat session:', error);
      throw new Error('Failed to create live chat session');
    }
  }

  /**
   * Get live chat session details
   */
  async getLiveChatSession(sessionId: string): Promise<LiveChatSession | null> {
    try {
      const session = await this.firestoreManager.getChatSession(sessionId);
      if (session) {
        return {
          id: session.id,
          userId: session.userId,
          specialistId: session.specialistId,
          status: session.status,
          createdAt: session.createdAt.toDate(),
          updatedAt: session.updatedAt.toDate(),
          lastMessageAt: session.lastMessageAt.toDate(),
          userInfo: session.userInfo,
          context: session.context,
          metadata: session.metadata
        };
      }
      return null;
    } catch (error) {
      console.error('[LiveChatService] Error getting live chat session:', error);
      return null;
    }
  }

  /**
   * Assign specialist to live chat session
   */
  async assignSpecialist(sessionId: string): Promise<string | null> {
    try {
      // Get available specialists
      const availableSpecialists = await this.realtimeManager.getAvailableSpecialists();

      if (availableSpecialists.length === 0) {
        console.log('[LiveChatService] No specialists available');
        return null;
      }

      // For now, assign the first available specialist
      // In production, this would use more sophisticated matching logic
      const specialist = availableSpecialists[0];

      // Update session with specialist assignment
      await this.firestoreManager.updateChatSession(sessionId, {
        specialistId: specialist.id,
        status: 'active'
      });

      // Update realtime session
      await this.realtimeManager.assignSpecialist(sessionId, specialist.id);

      // Remove from queue
      await this.realtimeManager.removeFromQueue(sessionId);

      console.log(`[LiveChatService] Assigned specialist ${specialist.id} to session ${sessionId}`);
      return specialist.id;

    } catch (error) {
      console.error('[LiveChatService] Error assigning specialist:', error);
      return null;
    }
  }

  /**
   * End live chat session
   */
  async endLiveChatSession(sessionId: string, reason: string): Promise<void> {
    try {
      const session = await this.getLiveChatSession(sessionId);
      if (!session || !session.specialistId) return;

      // Update session status
      await this.firestoreManager.updateChatSession(sessionId, {
        status: 'completed',
        metadata: {
          ...session.metadata,
          closedReason: reason,
          closedAt: Date.now() as any
        }
      });

      // Update realtime session
      await this.realtimeManager.closeChatSession(sessionId, reason);

      // Remove specialist assignment
      await this.realtimeManager.removeSpecialistFromSession(sessionId, session.specialistId);

      // Archive for analytics
      await this.firestoreManager.archiveSession(sessionId);

      console.log(`[LiveChatService] Ended live chat session: ${sessionId}`);

    } catch (error) {
      console.error('[LiveChatService] Error ending live chat session:', error);
    }
  }

  // ==================== MESSAGE MANAGEMENT ====================

  /**
   * Send a message in the live chat
   */
  async sendMessage(sessionId: string, content: string, senderId: string, senderType: 'user' | 'specialist' | 'system'): Promise<string | null> {
    try {
      const session = await this.getLiveChatSession(sessionId);
      if (!session) {
        console.error(`[LiveChatService] Session not found: ${sessionId}`);
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

      console.log(`[LiveChatService] Sent message ${messageId} in session ${sessionId}`);
      return messageId;

    } catch (error) {
      console.error('[LiveChatService] Error sending message:', error);
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
      console.error('[LiveChatService] Error getting recent messages:', error);
      return [];
    }
  }

  /**
   * Listen for new messages in real-time
   */
  onMessage(sessionId: string, callback: (messages: LiveChatMessage[]) => void): () => void {
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

      callback(liveChatMessages);
    });
  }

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: 'online' | 'busy' | 'offline'): Promise<void> {
    await this.realtimeManager.updateSpecialistStatus(specialistId, status);
  }

  /**
   * Get specialist information
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    return await this.firestoreManager.getSpecialist(specialistId);
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    return await this.firestoreManager.getAllSpecialists();
  }

  // ==================== QUEUE MANAGEMENT ====================

  /**
   * Get current queue status
   */
  async getQueueStatus(): Promise<{ length: number; averageWaitTime: number }> {
    const length = await this.realtimeManager.getQueueLength();
    const averageWaitTime = await this.realtimeManager.calculateAverageWaitTime();

    return {
      length,
      averageWaitTime
    };
  }

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: { length: number; averageWaitTime: number }) => void): () => void {
    return this.realtimeManager.onQueueUpdate((queue) => {
      callback({
        length: queue.queueLength,
        averageWaitTime: queue.averageWaitTime
      });
    });
  }

  // ==================== SESSION LISTENERS ====================

  /**
   * Listen for session updates
   */
  onSessionUpdate(sessionId: string, callback: (session: LiveChatSession) => void): () => void {
    return this.realtimeManager.onSessionUpdate(sessionId, (session) => {
      const liveChatSession: LiveChatSession = {
        id: session.id,
        userId: session.userId,
        specialistId: session.specialistId,
        status: session.status,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        lastMessageAt: new Date(session.lastMessageAt),
        userInfo: session.userInfo,
        context: session.context,
        metadata: session.metadata
      };

      callback(liveChatSession);
    });
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: any) => void): () => void {
    return this.realtimeManager.onSpecialistStatusChange(specialistId, callback);
  }
}

// Export singleton instance
export const liveChatService = new LiveChatService();
