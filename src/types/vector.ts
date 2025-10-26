/**
 * 🎯 Vector System Types - Safe TypeScript Interfaces
 *
 * These types define the structure for the hybrid RAG system
 * without affecting any existing functionality.
 */

export interface KnowledgeVector {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    source: string;
    type: 'company_info' | 'faq_content' | 'process_content' | 'knowledge_base' | 'general_content';
    filePath: string;
    chunkIndex: number;
    updatedAt: Date;
    tokens?: number;
  };
}

export interface VectorSearchResult {
  vector: KnowledgeVector;
  similarity: number;
  source: string;
  contentType: string;
}

export interface FileWatchEvent {
  filePath: string;
  event: 'added' | 'modified' | 'deleted';
  timestamp: Date;
}

export interface ContentChunk {
  content: string;
  metadata: KnowledgeVector['metadata'];
  tokens: number;
}

export interface VectorStoreConfig {
  maxChunkSize: number;
  similarityThreshold: number;
  maxResults: number;
  enableAutoIndex: boolean;
}

export interface IndexProgress {
  filesProcessed: number;
  chunksCreated: number;
  errors: string[];
  currentFile?: string;
  startTime: Date;
  estimatedCompletion?: Date;
}

// Feature flag types for safe rollout
export interface FeatureFlags {
  enableVectorAI: boolean;
  enableAutoIndexing: boolean;
  enableContextRetrieval: boolean;
  maxDailyEmbeddings: number;
  similarityThreshold: number;
}

export const DEFAULT_VECTOR_CONFIG: VectorStoreConfig = {
  maxChunkSize: 800, // tokens
  similarityThreshold: 0.7,
  maxResults: 5,
  enableAutoIndex: true
};

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableVectorAI: true, // Enabled for development/testing
  enableAutoIndexing: true, // Enabled for development/testing
  enableContextRetrieval: true, // Enabled for development/testing
  maxDailyEmbeddings: 1000,
  similarityThreshold: 0.75
};
