/**
 * VectorManager - Handles all knowledge vector operations
 *
 * Follows the same pattern as other Firebase managers in the project.
 * Uses lazy loading to avoid SSR issues and proper error handling.
 */

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { KnowledgeVector, VectorSearchResult, DEFAULT_FEATURE_FLAGS } from '../../../types/vector';

// Lazy load Firebase to avoid SSR issues (following existing pattern)
let db: Firestore | null = null;
const getDb = () => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used on the client side');
  }
  if (!db) {
    const { db: firestore } = require('../../../app/utils/firebase');
    db = firestore;
  }
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  return db;
};

// Feature flag check (safe by default)
const isVectorEnabled = () => {
  // Check environment variable first, then fallback to feature flags
  if (process.env.NEXT_PUBLIC_ENABLE_VECTOR_AI !== undefined) {
    return process.env.NEXT_PUBLIC_ENABLE_VECTOR_AI === 'true';
  }
  return DEFAULT_FEATURE_FLAGS.enableVectorAI;
};

export class VectorManager {
  private collection = 'knowledge_vectors';

  /**
   * Store a knowledge vector in Firebase
   * Only executes if vector system is enabled
   */
  async storeVector(vector: KnowledgeVector): Promise<string> {
    if (!isVectorEnabled()) {
      console.log('🔒 Vector system disabled - skipping storage');
      return vector.id;
    }

    try {
      await setDoc(doc(getDb(), this.collection, vector.id), {
        ...vector,
        metadata: {
          ...vector.metadata,
          updatedAt: Timestamp.now()
        }
      });

      console.log(`✅ Stored vector: ${vector.id} (${vector.metadata.type})`);
      return vector.id;
    } catch (error) {
      console.error('❌ Error storing vector:', error);
      // Don't throw - gracefully handle errors
      return vector.id;
    }
  }

  /**
   * Search for similar vectors
   * Returns empty array if vector system is disabled (safe fallback)
   */
  async searchSimilar(queryEmbedding: number[], maxResults: number = 5): Promise<VectorSearchResult[]> {
    if (!isVectorEnabled()) {
      console.log('🔒 Vector system disabled - returning empty results');
      return [];
    }

    try {
      // For MVP, get all vectors and calculate similarity client-side
      // In production, use Firebase vector search or external vector DB
      const snapshot = await getDocs(collection(getDb(), this.collection));

      const results: VectorSearchResult[] = [];
      snapshot.forEach(doc => {
        const vector = doc.data() as KnowledgeVector;
        const similarity = this.calculateCosineSimilarity(queryEmbedding, vector.embedding);

        if (similarity > 0.7) { // Threshold for relevant results
          results.push({
            vector,
            similarity,
            source: vector.metadata.source,
            contentType: vector.metadata.type
          });
        }
      });

      // Sort by similarity and limit results
      return results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, maxResults);

    } catch (error) {
      console.error('❌ Error searching vectors:', error);
      // Return empty array on error (safe fallback)
      return [];
    }
  }

  /**
   * Remove vectors by source file
   * Safe operation that only removes if system is enabled
   */
  async clearBySource(source: string): Promise<void> {
    if (!isVectorEnabled()) {
      console.log('🔒 Vector system disabled - skipping cleanup');
      return;
    }

    try {
      const q = query(collection(getDb(), this.collection), where('metadata.source', '==', source));
      const snapshot = await getDocs(q);

      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      console.log(`🗑️ Cleared ${snapshot.docs.length} vectors for source: ${source}`);
    } catch (error) {
      console.error('❌ Error clearing vectors:', error);
      // Don't throw - gracefully handle errors
    }
  }

  /**
   * Get all vectors (for debugging and monitoring)
   */
  async getAllVectors(): Promise<KnowledgeVector[]> {
    if (!isVectorEnabled()) {
      return [];
    }

    try {
      const snapshot = await getDocs(collection(getDb(), this.collection));
      const vectors: KnowledgeVector[] = [];

      snapshot.forEach(doc => {
        vectors.push(doc.data() as KnowledgeVector);
      });

      return vectors;
    } catch (error) {
      console.error('❌ Error getting vectors:', error);
      return [];
    }
  }

  /**
   * Calculate cosine similarity between two embeddings
   */
  private calculateCosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  /**
   * Get vector storage statistics
   */
  async getStats(): Promise<{
    totalVectors: number;
    byType: Record<string, number>;
    recentActivity: Date | null;
  }> {
    if (!isVectorEnabled()) {
      return { totalVectors: 0, byType: {}, recentActivity: null };
    }

    try {
      const vectors = await this.getAllVectors();
      const byType: Record<string, number> = {};
      let recentActivity: Date | null = null;

      vectors.forEach(vector => {
        byType[vector.metadata.type] = (byType[vector.metadata.type] || 0) + 1;

        if (vector.metadata.updatedAt && (!recentActivity || vector.metadata.updatedAt > recentActivity)) {
          recentActivity = vector.metadata.updatedAt instanceof Timestamp
            ? vector.metadata.updatedAt.toDate()
            : new Date(vector.metadata.updatedAt);
        }
      });

      return {
        totalVectors: vectors.length,
        byType,
        recentActivity
      };
    } catch (error) {
      console.error('❌ Error getting vector stats:', error);
      return { totalVectors: 0, byType: {}, recentActivity: null };
    }
  }
}

// Export singleton instance (following existing manager pattern)
export const vectorManager = new VectorManager();
