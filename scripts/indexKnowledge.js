/**
 * Index Knowledge Script - Manual full re-indexing of knowledge base
 *
 * Usage: npm run index-knowledge
 * This script performs a complete re-index of all knowledge sources.
 */

const { knowledgeIndexer } = require('../lib/fileWatcher');

async function main() {
  console.log('🔄 Starting full knowledge base re-index...');
  console.log('📁 Scanning files and extracting knowledge...');

  const startTime = Date.now();

  try {
    await knowledgeIndexer.indexAllFiles();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Knowledge base re-index complete! (${duration}s)`);
    console.log('🤖 AI system now has fresh, up-to-date context.');

  } catch (error) {
    console.error('❌ Error during knowledge indexing:', error);
    process.exit(1);
  }
}

// Run the indexing process
main();
