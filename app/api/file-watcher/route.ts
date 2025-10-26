/**
 * File Watcher API Route - Server-side file watching for knowledge indexing
 *
 * This API route handles file watching operations server-side only,
 * avoiding Next.js bundling issues with Node.js fs operations.
 */

import { NextRequest, NextResponse } from 'next/server';
import { knowledgeIndexer } from '../../../lib/fileWatcher';
import { DEFAULT_FEATURE_FLAGS } from '../../../types/vector';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    // Safety check: only allow in development or if explicitly enabled
    if (process.env.NODE_ENV === 'production' && !DEFAULT_FEATURE_FLAGS.enableAutoIndexing) {
      return NextResponse.json(
        { error: 'File watching disabled in production' },
        { status: 403 }
      );
    }

    switch (action) {
      case 'start':
        console.log('🔄 Starting file watcher via API...');
        knowledgeIndexer.start();
        return NextResponse.json({
          message: 'File watcher started',
          status: knowledgeIndexer.getStatus()
        });

      case 'stop':
        console.log('🛑 Stopping file watcher via API...');
        knowledgeIndexer.stop();
        return NextResponse.json({
          message: 'File watcher stopped',
          status: knowledgeIndexer.getStatus()
        });

      case 'index':
        console.log('🔄 Triggering full re-index via API...');
        await knowledgeIndexer.indexAllFiles();
        return NextResponse.json({
          message: 'Full re-index completed',
          timestamp: new Date().toISOString()
        });

      case 'status':
        return NextResponse.json({
          status: knowledgeIndexer.getStatus(),
          featureFlags: DEFAULT_FEATURE_FLAGS
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: start, stop, index, or status' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[File Watcher API] Error:', error);
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
      timestamp: new Date().toISOString(),
      message: 'File watcher API is operational'
    });
  } catch (error) {
    console.error('[File Watcher API] Status error:', error);
    return NextResponse.json(
      { error: 'Unable to get status', status: 'unknown' },
      { status: 500 }
    );
  }
}
