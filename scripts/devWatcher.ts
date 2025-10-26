#!/usr/bin/env node

/**
 * Development File Watcher Script
 *
 * This script starts the file watcher in development mode.
 * Run with: npm run dev-watcher
 */

import { knowledgeIndexer } from '../lib/fileWatcher';
import { DEFAULT_FEATURE_FLAGS } from '../types/vector';

console.log('🚀 Starting Development File Watcher...');

// Safety check - only run in development
if (process.env.NODE_ENV === 'production') {
  console.log('❌ File watcher not available in production mode');
  process.exit(1);
}

if (!DEFAULT_FEATURE_FLAGS.enableAutoIndexing) {
  console.log('❌ Auto-indexing disabled by feature flag');
  process.exit(1);
}

// Start the file watcher
knowledgeIndexer.start();

console.log('✅ File watcher started');
console.log('📁 Watching for changes in:');
console.log('  - src/components/Pages/');
console.log('  - src/prompts/');
console.log('  - src/data/');
console.log('  - src/types/');
console.log('');
console.log('🔄 Performing initial full index...');

// Initial indexing
knowledgeIndexer.indexAllFiles().then(() => {
  console.log('✅ Initial knowledge base ready!');
  console.log('👀 File watcher is now monitoring for changes...');
}).catch((error) => {
  console.error('❌ Error during initial indexing:', error);
  process.exit(1);
});

// Keep the script running
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping file watcher...');
  knowledgeIndexer.stop();
  process.exit(0);
});

console.log('Press Ctrl+C to stop the file watcher');
