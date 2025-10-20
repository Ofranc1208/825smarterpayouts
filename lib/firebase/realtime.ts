/**
 * Firebase Realtime Database Utilities for Live Chat - Orchestra Pattern
 *
 * Refactored using orchestra pattern for better organization and debugging.
 * The main RealtimeManager now orchestrates specialized managers for different concerns.
 */

import {
  ref,
  push,
  set,
  get,
  onValue,
  off,
  query,
  orderByChild,
  limitToLast,
  update
} from 'firebase/database';
import type { DatabaseReference, Database } from 'firebase/database';

// Import specialized managers
import { realtimeSessionManager } from './managers/RealtimeSessionManager';
import { realtimeMessageManager } from './managers/RealtimeMessageManager';
import { realtimeSpecialistManager } from './managers/RealtimeSpecialistManager';
import { realtimeQueueManager } from './managers/RealtimeQueueManager';

// Lazy load Firebase to avoid SSR issues
let rtdb: Database | null = null;
const getRtdb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Realtime Database can only be used on the client side');
  }
  if (!rtdb) {
    const { rtdb: db } = require('../../app/utils/firebase');
    rtdb = db;
  }
  return rtdb;
};

// Types for live chat functionality
export interface ChatSession {
  id: string;
  userId: string;
  specialistId?: string;
  status: 'waiting' | 'active' | 'completed' | 'transferred';
  createdAt: number;
  updatedAt: number;
  lastMessageAt: number;
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

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'user' | 'specialist' | 'system';
  content: string;
  timestamp: number;
  type: 'text' | 'system' | 'file' | 'image';
  metadata?: {
    edited?: boolean;
    editedAt?: number;
    deliveryStatus?: 'sent' | 'delivered' | 'read';
  };
}

export interface Specialist {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: number;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
}

export interface ChatQueue {
  waitingUsers: string[];
  availableSpecialists: string[];
  averageWaitTime: number;
  queueLength: number;
}

/**
 * RealtimeManager - Core orchestrator for real-time database operations
 *
 * Now uses orchestra pattern to delegate to specialized managers:
 * - RealtimeSessionManager: Session operations
 * - RealtimeMessageManager: Message operations
 * - RealtimeSpecialistManager: Specialist operations
 * - RealtimeQueueManager: Queue operations
 */
export class RealtimeManager {
  // ==================== SESSION MANAGEMENT ====================

  /**
   * Create a new chat session
   */
  async createChatSession(sessionData: Omit<ChatSession, 'createdAt' | 'updatedAt' | 'lastMessageAt'> & { id?: string }): Promise<string> {
    return realtimeSessionManager.createChatSession(sessionData);
  }

  /**
   * Get a chat session by ID
   */
  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    return realtimeSessionManager.getChatSession(sessionId);
  }

  /**
   * Update chat session
   */
  async updateChatSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
    return realtimeSessionManager.updateChatSession(sessionId, updates);
  }

  /**
   * Close chat session
   */
  async closeChatSession(sessionId: string, reason: string): Promise<void> {
    return realtimeSessionManager.closeChatSession(sessionId, reason);
  }

  /**
   * Listen for session updates
   */
  onSessionUpdate(sessionId: string, callback: (session: ChatSession) => void): () => void {
    return realtimeSessionManager.onSessionUpdate(sessionId, callback);
  }

  /**
   * Listen for all sessions updates (for specialist dashboard)
   */
  onSessionsUpdate(callback: (sessions: Record<string, ChatSession>) => void): () => void {
    return realtimeSessionManager.onSessionsUpdate(callback);
  }

  // ==================== MESSAGE MANAGEMENT ====================

  /**
   * Send a message to a chat session
   */
  async sendMessage(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<string> {
    return realtimeMessageManager.sendMessage(sessionId, message);
  }

  /**
   * Listen for new messages in a session
   */
  onMessages(sessionId: string, callback: (messages: ChatMessage[]) => void): () => void {
    return realtimeMessageManager.onMessages(sessionId, callback);
  }

  /**
   * Get recent messages for a session
   */
  async getRecentMessages(sessionId: string, limit: number = 50): Promise<ChatMessage[]> {
    return realtimeMessageManager.getRecentMessages(sessionId, limit);
  }

  // ==================== SPECIALIST MANAGEMENT ====================

  /**
   * Update specialist status
   */
  async updateSpecialistStatus(specialistId: string, status: Specialist['status']): Promise<void> {
    return realtimeSpecialistManager.updateSpecialistStatus(specialistId, status);
  }

  /**
   * Get available specialists
   */
  async getAvailableSpecialists(): Promise<Specialist[]> {
    return realtimeSpecialistManager.getAvailableSpecialists();
  }

  /**
   * Assign specialist to chat session
   */
  async assignSpecialist(sessionId: string, specialistId: string): Promise<void> {
    return realtimeSpecialistManager.assignSpecialist(sessionId, specialistId);
  }

  /**
   * Remove specialist from chat session
   */
  async removeSpecialistFromSession(sessionId: string, specialistId: string): Promise<void> {
    return realtimeSpecialistManager.removeSpecialistFromSession(sessionId, specialistId);
  }

  /**
   * Listen for specialist status changes
   */
  onSpecialistStatusChange(specialistId: string, callback: (specialist: Specialist) => void): () => void {
    return realtimeSpecialistManager.onSpecialistStatusChange(specialistId, callback);
  }

  // ==================== QUEUE MANAGEMENT ====================

  /**
   * Add user to chat queue
   */
  async addToQueue(sessionId: string): Promise<void> {
    return realtimeQueueManager.addToQueue(sessionId);
  }

  /**
   * Remove user from chat queue
   */
  async removeFromQueue(sessionId: string): Promise<void> {
    return realtimeQueueManager.removeFromQueue(sessionId);
  }

  /**
   * Get current queue length
   */
  async getQueueLength(): Promise<number> {
    return realtimeQueueManager.getQueueLength();
  }

  /**
   * Calculate average wait time
   */
  async calculateAverageWaitTime(): Promise<number> {
    return realtimeQueueManager.calculateAverageWaitTime();
  }

  /**
   * Listen for queue updates
   */
  onQueueUpdate(callback: (queue: ChatQueue) => void): () => void {
    return realtimeQueueManager.onQueueUpdate(callback);
  }
}

// Export singleton instance (lazy initialization to avoid SSR issues)
let realtimeManagerInstance: RealtimeManager | null = null;
export const realtimeManager = (() => {
  if (typeof window === 'undefined') {
    // Return a proxy that throws helpful errors during SSR
    return new Proxy({} as RealtimeManager, {
      get() {
        throw new Error('RealtimeManager can only be used on the client side');
      }
    });
  }
  if (!realtimeManagerInstance) {
    realtimeManagerInstance = new RealtimeManager();
  }
  return realtimeManagerInstance;
})();
