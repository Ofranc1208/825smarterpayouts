/**
 * FileWatcher - Safe file monitoring for knowledge indexing
 *
 * This service only READS files and indexes them for AI context.
 * Completely safe - never modifies source code or disrupts development.
 *
 * Using Node.js native fs.watch for safety and compatibility with Next.js
 */

import fs from 'fs';
import path from 'path';
import { vectorManager } from './firebase/managers/VectorManager';
import { SmartContentParser } from './contentParser';
import { FileWatchEvent, DEFAULT_FEATURE_FLAGS } from '../types/vector';

export interface FileWatcherConfig {
  watchPaths: string[];
  ignorePatterns: string[];
  chunkSize: number;
  debounceMs: number;
  enableInProduction: boolean;
}

export class KnowledgeIndexer {
  private watchers: any[] = [];
  private isIndexing = false;
  private debounceTimers: Map<string, any> = new Map();

  private config: FileWatcherConfig = {
    watchPaths: [
      path.resolve('src/components/Pages'),
      path.resolve('src/prompts'),
      path.resolve('src/data'),
      path.resolve('src/types')
    ],
    ignorePatterns: [
      '**/node_modules/**',
      '**/.git/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.d.ts',
      '**/*.log',
      '**/*.tmp'
    ],
    chunkSize: 800,
    debounceMs: 2000, // Wait 2 seconds after changes stop
    enableInProduction: false // Only run in development by default
  };

  /**
   * Start file watching (safe - only in Node.js environment)
   */
  start(): void {
    // CRITICAL SAFETY CHECK: Only work in Node.js environment (not browser)
    if (typeof window !== 'undefined') {
      console.log('🔒 File watcher only available in Node.js environment - skipping browser context');
      return;
    }

    // Safety check: only enable in development or if explicitly allowed
    if (process.env.NODE_ENV === 'production' && !this.config.enableInProduction) {
      console.log('🔒 File watcher disabled in production for safety');
      return;
    }

    if (!DEFAULT_FEATURE_FLAGS.enableAutoIndexing) {
      console.log('🔒 Auto-indexing disabled by feature flag');
      return;
    }

    console.log('🚀 Starting Knowledge Indexer...');

    // Use native Node.js fs.watch for better Next.js compatibility
    this.config.watchPaths.forEach(watchPath => {
      try {
        // Watch directory for changes
        const watcher = fs.watch(watchPath, { recursive: true }, (event, filename) => {
          if (filename && this.shouldWatchFile(path.join(watchPath, filename))) {
            this.handleFileEvent(path.join(watchPath, filename), this.getEventType(event, path.join(watchPath, filename)));
          }
        });

        this.watchers.push(watcher);
        console.log(`📁 Watching: ${watchPath}`);
      } catch (error) {
        console.error(`❌ Error watching ${watchPath}:`, error);
      }
    });

    console.log('✅ Knowledge Indexer watching:', this.config.watchPaths);
    console.log('🔒 Safety: Read-only operations, no file modifications');
  }

  /**
   * Stop file watching
   */
  stop(): void {
    // Close all watchers
    this.watchers.forEach(watcher => {
      try {
        watcher.close();
      } catch (error) {
        console.error('❌ Error closing watcher:', error);
      }
    });
    this.watchers = [];
    console.log('🛑 Knowledge Indexer stopped');

    // Clear all debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
  }

  /**
   * Handle file events with debouncing to avoid excessive processing
   */
  private handleFileEvent(filePath: string, event: 'added' | 'modified' | 'deleted'): void {
    console.log(`📄 File ${event}: ${path.basename(filePath)}`);

    // Skip if not a file we should index
    if (!SmartContentParser.shouldIndexFile(filePath)) {
      return;
    }

    // Debounce to avoid processing during rapid file changes
    if (this.debounceTimers.has(filePath)) {
      clearTimeout(this.debounceTimers.get(filePath)!);
    }

    const timer = setTimeout(async () => {
      this.debounceTimers.delete(filePath);
      await this.processFileEvent(filePath, event);
    }, this.config.debounceMs);

    this.debounceTimers.set(filePath, timer);
  }

  /**
   * Process a single file event
   */
  private async processFileEvent(filePath: string, event: 'added' | 'modified' | 'deleted'): Promise<void> {
    if (this.isIndexing) {
      console.log('⏳ Indexing already in progress, queuing...');
      // Simple queue - just retry after a delay
      setTimeout(() => this.processFileEvent(filePath, event), 1000);
      return;
    }

    this.isIndexing = true;

    try {
      if (event === 'deleted') {
        await this.removeFileFromIndex(filePath);
      } else {
        await this.indexFile(filePath);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    } finally {
      this.isIndexing = false;
    }
  }

  /**
   * Index a single file
   */
  private async indexFile(filePath: string): Promise<void> {
    try {
      console.log(`🔍 Indexing: ${path.basename(filePath)}`);

      // Parse file into chunks
      const chunks = SmartContentParser.parseFile(filePath);

      if (chunks.length === 0) {
        console.log(`⚠️ No content to index in ${path.basename(filePath)}`);
        return;
      }

      // Clear existing vectors for this file
      await vectorManager.clearBySource(filePath);

      // Store new chunks
      for (const chunk of chunks) {
        const vector: any = {
          id: `${filePath}-${chunk.metadata.chunkIndex}-${Date.now()}`,
          content: chunk.content,
          embedding: [], // Will be set by OpenAI API
          metadata: chunk.metadata
        };

        await vectorManager.storeVector(vector);
      }

      console.log(`✅ Indexed ${chunks.length} chunks from ${path.basename(filePath)}`);

    } catch (error) {
      console.error(`❌ Error indexing ${filePath}:`, error);
    }
  }

  /**
   * Remove file from index
   */
  private async removeFileFromIndex(filePath: string): Promise<void> {
    console.log(`🗑️ Removing ${path.basename(filePath)} from index`);
    await vectorManager.clearBySource(filePath);
  }

  /**
   * Handle watcher errors
   */
  private handleError(error: Error): void {
    console.error('❌ File watcher error:', error);
    // Don't crash - just log and continue
  }

  /**
   * Full re-index of all watched files
   */
  async indexAllFiles(): Promise<void> {
    // Safety check: only work in Node.js environment
    if (typeof window !== 'undefined') {
      console.log('🔒 File indexing only available in Node.js environment');
      return;
    }

    if (this.isIndexing) {
      console.log('⏳ Full index already in progress');
      return;
    }

    console.log('🔄 Starting full knowledge base re-index...');
    this.isIndexing = true;

    try {
      let totalFiles = 0;
      let totalChunks = 0;

      for (const watchPath of this.config.watchPaths) {
        await this.walkDirectory(watchPath, (filePath) => {
          totalFiles++;
          const chunks = SmartContentParser.parseFile(filePath);
          totalChunks += chunks.length;
        });
      }

      console.log(`✅ Full re-index complete: ${totalFiles} files, ${totalChunks} chunks`);
    } catch (error) {
      console.error('❌ Error during full re-index:', error);
    } finally {
      this.isIndexing = false;
    }
  }

  /**
   * Walk directory tree and process files
   */
  private async walkDirectory(dirPath: string, callback: (filePath: string) => void): Promise<void> {
    try {
      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !this.shouldIgnorePath(fullPath)) {
          await this.walkDirectory(fullPath, callback);
        } else if (stat.isFile() && SmartContentParser.shouldIndexFile(fullPath)) {
          callback(fullPath);
          await this.indexFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`❌ Error walking directory ${dirPath}:`, error);
    }
  }

  /**
   * Check if path should be ignored
   */
  private shouldIgnorePath(fullPath: string): boolean {
    return this.config.ignorePatterns.some(pattern => fullPath.includes(pattern));
  }

  /**
   * Get current indexing status
   */
  getStatus(): {
    isRunning: boolean;
    isIndexing: boolean;
    activeTimers: number;
    config: FileWatcherConfig;
  } {
    return {
      isRunning: this.watchers.length > 0,
      isIndexing: this.isIndexing,
      activeTimers: this.debounceTimers.size,
      config: this.config
    };
  }

  /**
   * Check if a file should be watched
   */
  private shouldWatchFile(filePath: string): boolean {
    return SmartContentParser.shouldIndexFile(filePath);
  }

  /**
   * Convert fs.watch event to our event type
   */
  private getEventType(event: string, filename: string | null): 'added' | 'modified' | 'deleted' {
    switch (event) {
      case 'rename':
        // For rename events, check if file exists to determine if it's add or delete
        return filename && fs.existsSync(filename) ? 'added' : 'deleted';
      case 'change':
        return 'modified';
      default:
        return 'modified'; // Default to modified for safety
    }
  }
}

// Export singleton instance
export const knowledgeIndexer = new KnowledgeIndexer();
