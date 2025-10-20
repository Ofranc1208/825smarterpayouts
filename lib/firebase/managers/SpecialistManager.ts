/**
 * SpecialistManager - Handles all specialist operations
 *
 * Separated from main FirestoreManager for better organization and debugging.
 * Uses the orchestra pattern for clean separation of concerns.
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Lazy load Firebase to avoid SSR issues
let db: Firestore | null = null;
const getDb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used on the client side');
  }
  if (!db) {
    const { db: firestore } = require('../../../app/utils/firebase');
    db = firestore;
  }
  return db;
};

export interface Specialist {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline';
  lastSeen: Timestamp;
  skills: string[];
  currentChats: string[];
  maxConcurrentChats: number;
  responseTime: number;
  rating: number;
  totalChats: number;
  languages: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * SpecialistManager - Specialized manager for specialist operations
 */
export class SpecialistManager {
  private db: any;

  constructor() {
    this.db = getDb();
  }

  /**
   * Create or update specialist profile
   */
  async upsertSpecialist(specialistData: Omit<Specialist, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const specialistId = specialistData.email.replace('@', '_').replace('.', '_');
    const now = serverTimestamp();

    const specialist: any = {
      createdAt: now,
      updatedAt: now,
      ...specialistData
    };

    const specialistRef = doc(this.db, 'specialists', specialistId);
    await setDoc(specialistRef, specialist, { merge: true });

    console.log(`[SpecialistManager] Upserted specialist: ${specialistId}`);
    return specialistId;
  }

  /**
   * Get specialist by ID
   */
  async getSpecialist(specialistId: string): Promise<Specialist | null> {
    const specialistRef = doc(this.db, 'specialists', specialistId);
    const specialistSnap = await getDoc(specialistRef);

    if (specialistSnap.exists()) {
      const data = specialistSnap.data();
      return {
        id: specialistSnap.id,
        ...data
      } as Specialist;
    }
    return null;
  }

  /**
   * Get all specialists
   */
  async getAllSpecialists(): Promise<Specialist[]> {
    const specialistsRef = collection(this.db, 'specialists');
    const specialistsSnap = await getDocs(specialistsRef);

    return specialistsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Specialist[];
  }

  /**
   * Update specialist performance metrics
   */
  async updateSpecialistMetrics(specialistId: string, metrics: Partial<Specialist>): Promise<void> {
    const specialistRef = doc(this.db, 'specialists', specialistId);
    await updateDoc(specialistRef, {
      ...metrics,
      updatedAt: serverTimestamp() as any
    });

    console.log(`[SpecialistManager] Updated specialist metrics: ${specialistId}`);
  }
}

// Export singleton instance
let specialistManagerInstance: SpecialistManager | null = null;
export const specialistManager = (() => {
  if (typeof window === 'undefined') {
    return new Proxy({} as SpecialistManager, {
      get() {
        throw new Error('SpecialistManager can only be used on the client side');
      }
    });
  }
  if (!specialistManagerInstance) {
    specialistManagerInstance = new SpecialistManager();
  }
  return specialistManagerInstance;
})();
