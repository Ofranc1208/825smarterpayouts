/**
 * Development Integration - Auto-start services in development mode
 *
 * This file integrates the knowledge indexing system with the development workflow
 * while maintaining safety and not affecting production builds.
 */

import { knowledgeIndexer } from './fileWatcher';
import { DEFAULT_FEATURE_FLAGS } from '../types/vector';

// Only auto-start in development mode for safety
if (process.env.NODE_ENV === 'development' && DEFAULT_FEATURE_FLAGS.enableAutoIndexing) {
  console.log('🚀 Starting development knowledge indexer...');

  // Start file watcher
  knowledgeIndexer.start();

  // Initial full index after a short delay
  setTimeout(async () => {
    try {
      console.log('🔄 Performing initial knowledge base index...');
      await knowledgeIndexer.indexAllFiles();
      console.log('✅ Initial knowledge base ready!');
    } catch (error) {
      console.error('❌ Error during initial indexing:', error);
    }
  }, 3000); // Wait 3 seconds for dev server to fully start

  console.log('🔒 Knowledge indexer running in development mode only');
} else {
  console.log('🔒 Knowledge indexer disabled (production mode or feature flag off)');
}

// Export for manual control if needed
export { knowledgeIndexer };