/**
 * Session Manager - Handles Live Chat Session Operations
 * 
 * Manages session creation, retrieval, assignment, and closure.
 */

import { realtimeManager } from '../../../lib/firebase/realtime';
import { firestoreManager } from '../../../lib/firebase/firestore';
import type { LiveChatSession } from '../LiveChatService';

export class SessionManager {
  private realtimeManager = realtimeManager;
  private firestoreManager = firestoreManager;

  /**
   * Create a new live chat session
   */
  async createLiveChatSession(
    userInfo: LiveChatSession['userInfo'], 
    context: LiveChatSession['context'],
    customerId: string // The customer's original sessionId
  ): Promise<string> {
    try {
      const userId = customerId; // Use the provided customerId as the userId
      const now = Date.now();
      
      console.log(`[SessionManager] 🚀 Starting session creation for customer: ${userId}`);
      
      // Create session in Firestore for persistence
      console.log('[SessionManager] 📝 Creating Firestore session...');
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
      console.log('[SessionManager] ✅ Firestore session created:', sessionId);

      // Also create in Realtime DB for real-time messaging (use same session ID)
      console.log('[SessionManager] 📝 Creating Realtime DB session with ID:', sessionId);
      await this.realtimeManager.createChatSession({
        id: sessionId, // Use the same ID from Firestore
        userId,
        status: 'waiting',
        userInfo,
        context,
        metadata: {
          source: 'specialist_button',
          userAgent: navigator.userAgent
        }
      });
      console.log('[SessionManager] ✅ Realtime DB session created with matching ID');

      // Add to queue for specialist assignment
      console.log('[SessionManager] 📝 Adding to queue...');
      await this.realtimeManager.addToQueue(sessionId);
      console.log('[SessionManager] ✅ Added to queue');

      console.log(`[SessionManager] 🎉 Created live chat session: ${sessionId}`);
      return sessionId;

    } catch (error) {
      console.error('[SessionManager] ❌ Error creating live chat session:', error);
      console.error('[SessionManager] ❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
      console.error('[SessionManager] ❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
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
      console.error('[SessionManager] Error getting live chat session:', error);
      return null;
    }
  }

  /**
   * Assign specialist to live chat session
   */
  async assignSpecialist(sessionId: string, specialistId?: string): Promise<string | null> {
    try {
      let specialist;

      if (specialistId) {
        // If a specific specialist ID is provided, use it
        specialist = { id: specialistId };
      } else {
        // Otherwise, get available specialists and assign the first one
        const availableSpecialists = await this.realtimeManager.getAvailableSpecialists();

        if (availableSpecialists.length === 0) {
          console.log('[SessionManager] No specialists available');
          return null;
        }

        specialist = availableSpecialists[0];
      }

      // Update session with specialist assignment in Firestore
      // If the document is missing (e.g., RTDB created first), upsert it
      try {
        await this.firestoreManager.updateChatSession(sessionId, {
          specialistId: specialist.id,
          status: 'active'
        });
      } catch (err) {
        console.warn('[SessionManager] Firestore update failed, attempting upsert...', err);
        await this.firestoreManager.upsertChatSession(sessionId, {
          userId: `user_${Date.now()}` as any,
          specialistId: specialist.id as any,
          status: 'active' as any,
          userInfo: { initialIntent: 'live_chat_request' } as any,
          context: { botTranscript: [], priority: 'medium' } as any,
          metadata: { source: 'specialist_button', userAgent: navigator.userAgent } as any
        } as any);
      }

      // Update realtime session
      await this.realtimeManager.assignSpecialist(sessionId, specialist.id);

      // Remove from queue
      await this.realtimeManager.removeFromQueue(sessionId);

      console.log(`[SessionManager] Assigned specialist ${specialist.id} to session ${sessionId}`);
      return specialist.id;

    } catch (error) {
      console.error('[SessionManager] Error assigning specialist:', error);
      return null;
    }
  }

  /**
   * End live chat session
   */
  async endLiveChatSession(sessionId: string, reason: string): Promise<void> {
    try {
      // Get session first
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

      console.log(`[SessionManager] Ended live chat session: ${sessionId}`);

    } catch (error) {
      console.error('[SessionManager] Error ending live chat session:', error);
    }
  }

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
}

