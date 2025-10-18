import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { fileId, threadId } = await request.json();

    const cleanupPromises = [];

    // Clean up thread
    if (threadId) {
      cleanupPromises.push(
        openai.beta.threads.delete(threadId)
          .catch((err: any) => console.warn('Thread cleanup failed:', err))
      );
    }

    // Clean up file
    if (fileId) {
      cleanupPromises.push(
        openai.files.delete(fileId)
          .catch((err: any) => console.warn('File cleanup failed:', err))
      );
    }

    await Promise.allSettled(cleanupPromises);

    return NextResponse.json({
      success: true,
      message: 'Cleanup completed'
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}
