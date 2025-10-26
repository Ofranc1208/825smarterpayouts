/**
 * Re-index API Route - Manual trigger for knowledge base updates
 *
 * Safe API that allows manual re-indexing of the knowledge base
 * without affecting the main chat functionality.
 */

import { NextRequest, NextResponse } from 'next/server';
import { knowledgeIndexer } from '../../../lib/fileWatcher';
import { DEFAULT_FEATURE_FLAGS } from '../../../types/vector';

export async function POST(request: NextRequest) {
  try {
    const { action, source } = await request.json();

    // Safety check: only allow in development or if explicitly enabled
    if (process.env.NODE_ENV === 'production' && !DEFAULT_FEATURE_FLAGS.enableAutoIndexing) {
      return NextResponse.json(
        { error: 'Re-indexing disabled in production' },
        { status: 403 }
      );
    }

    switch (action) {
      case 'full-index':
        console.log('🔄 Starting full knowledge base re-index...');
        await knowledgeIndexer.indexAllFiles();
        return NextResponse.json({
          message: 'Full re-index completed successfully',
          timestamp: new Date().toISOString()
        });

      case 'start-watcher':
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json(
            { error: 'File watcher not available in production' },
            { status: 403 }
          );
        }

        knowledgeIndexer.start();
        return NextResponse.json({
          message: 'File watcher started',
          status: knowledgeIndexer.getStatus()
        });

      case 'stop-watcher':
        knowledgeIndexer.stop();
        return NextResponse.json({
          message: 'File watcher stopped',
          status: knowledgeIndexer.getStatus()
        });

      case 'status':
        return NextResponse.json({
          status: knowledgeIndexer.getStatus(),
          featureFlags: DEFAULT_FEATURE_FLAGS
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: full-index, start-watcher, stop-watcher, or status' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[Re-index API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint for status checking
export async function GET() {
  try {
    return NextResponse.json({
      status: knowledgeIndexer.getStatus(),
      featureFlags: DEFAULT_FEATURE_FLAGS,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Re-index API] Status error:', error);
    return NextResponse.json(
      { error: 'Unable to get status', status: 'unknown' },
      { status: 500 }
    );
  }
}