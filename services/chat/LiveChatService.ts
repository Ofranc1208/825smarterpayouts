/**
 * Live Chat Service - Core Service for Live Chat Functionality
 *
 * Orchestrates live chat operations between users and specialists.
 * Delegates specific operations to specialized managers.
 * 
 * Architecture: Orchestra Pattern
 * - SessionManager: Handles session lifecycle
 * - MessageManager: Handles message operations
 * - SpecialistManager: Handles specialist operations
 * - QueueManager: Handles queue operations
 */

import { SessionManager, MessageManager, SpecialistManager, QueueManager } from './LiveChat';
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
 * LiveChatService - Orchestrator for Live Chat Operations
 * 
 * Delegates operations to specialized managers following the Orchestra Pattern.
 */
export class LiveChatService {
  private sessionManager = new SessionManager();
  private messageManager = new MessageManager();
  private specialistManager = new SpecialistManager();
  private queueManager = new QueueManager();

  // ==================== SESSION MANAGEMENT ====================

  /**
   * Create a new live chat session
   */
  async createLiveChatSession(userInfo: LiveChatSession['userInfo'], context: LiveChatSession['context'], customerId: string): Promise<string> {
    return this.sessionManager.createLiveChatSession(userInfo, context, customerId);
  }

  /**
   * Get live chat session details
   */
  async getLiveChatSession(sessionId: string): Promise<LiveChatSession | null> {
    return this.sessionManager.getLiveChatSession(sessionId);
  }

  /**
   * Assign specialist to live chat session
   */
  async assignSpecialist(sessionId: string, specialistId?: string): Promise<string | null> {
    return this.sessionManager.assignSpecialist(sessionId, specialistId);
  }

  /**
   * End live chat session
   */
  async endLiveChatSession(sessionId: string, reason: string): Promise<void> {
    return this.sessionManager.endLiveChatSession(sessionId, reason);
  }

  /**
   * Listen for session updates
   */
  onSessionUpdate(sessionId: string, callback: (session: LiveChatSession) => void): () => void {
    return this.sessionManager.onSessionUpdate(sessionId, callback);
  }

  // ==================== MESSAGE MANAGEMENT ====================

  /**
   * Send a message in the live chat
   */
  async sendMessage(sessionId: string, content: string, senderId: string, senderType: 'user' | 'specialist' | 'system'): Promise<string | null> {
    return this.messageManager.sendMessage(sessionId, content, senderId, senderType);
  }

  /**
   * Get recent messages for a session
   */
  async getRecentMessages(sessionId: string, limit: number = 50): Promise<LiveChatMessage[]> {
    return this.messageManager.getRecentMessages(sessionId, limit);
  }

  /**
   * Listen for new messages in real-time
   */
  onMessage(sessionId: string, callback: (message: LiveChatMessage) => void): () => void {
    return this.messageManager.onMessage(sessionId, callback);
  }

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: 'online' | 'busy' | 'offline'): Promise<void> {
    return this.specialistManager.updateSpecialistStatus(specialistId, status);
  }

  /**
   * Get specialist information
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    return this.specialistManager.getSpecialist(specialistId);
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    return this.specialistManager.getAllSpecialists();
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: any) => void): () => void {
    return this.specialistManager.onSpecialistStatusChange(specialistId, callback);
  }

  // ==================== QUEUE MANAGEMENT ====================

  /**
   * Get current queue status
   */
  async getQueueStatus(): Promise<{ length: number; averageWaitTime: number }> {
    return this.queueManager.getQueueStatus();
  }

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: { length: number; averageWaitTime: number }) => void): () => void {
    return this.queueManager.onQueueUpdate(callback);
  }
}

// Export singleton instance
export const liveChatService = new LiveChatService();
