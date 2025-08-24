import { NextRequest, NextResponse } from 'next/server';
import { publishToSocialMedia } from '../../../../marketing/services/socialPublisher';
import { publishToCMS } from '../../../../marketing/services/articlePublisher';

export async function GET(req: NextRequest) {
  // Simple auth token protection
  const authToken = req.nextUrl.searchParams.get('token');
  const expectedToken = process.env.MARKETING_CRON_TOKEN || 'dev-token-change-in-prod';
  
  if (authToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const topics = [
      'The Pros and Cons of Selling Your Structured Settlement',
      'How to Choose the Best Company to Buy Your Payments',
      'What is the Court Approval Process?',
    ];

    // Pick a random topic
    const chosenTopic = topics[Math.floor(Math.random() * topics.length)];

    // Build internal URL to our public API endpoint
    const origin = req.nextUrl.origin;
    const generateUrl = `${origin}/api/marketing/generate`;

    // Request both social post and article from the marketing agent
    const [socialRes, articleRes] = await Promise.all([
      fetch(generateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: chosenTopic, task: 'social' }),
        cache: 'no-store',
      }),
      fetch(generateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: chosenTopic, task: 'article' }),
        cache: 'no-store',
      }),
    ]);

    if (!socialRes.ok) {
      const text = await socialRes.text();
      throw new Error(`Social generation failed: ${text || socialRes.statusText}`);
    }
    if (!articleRes.ok) {
      const text = await articleRes.text();
      throw new Error(`Article generation failed: ${text || articleRes.statusText}`);
    }

    const socialData = (await socialRes.json()) as { content?: string };
    const articleData = (await articleRes.json()) as { content?: string };

    const socialContent = socialData?.content || '';
    const articleContent = articleData?.content || '';

    // Call publishing services with platform context
    if (socialContent) {
      await publishToSocialMedia(socialContent, 'x', undefined, undefined); // Default to X for cron, no media
    }
    if (articleContent) {
      await publishToCMS({ title: chosenTopic, content: articleContent });
    }

    return NextResponse.json({
      status: 'success',
      task: `Ran daily marketing agent for topic: ${chosenTopic}`,
    });
  } catch (error: any) {
    console.error('[marketing/cron] Error:', error);
    const message = typeof error?.message === 'string' ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, content, platform, topic, mediaUrl, mediaType } = body;

    if (action === 'publish_single') {
      if (!content || !platform) {
        return NextResponse.json({ error: 'Missing content or platform' }, { status: 400 });
      }

      // Publish the content
      if (platform === 'x') {
        await publishToSocialMedia(content, 'x', mediaUrl, mediaType);
        return NextResponse.json({ 
          success: true, 
          message: 'Content published successfully',
          url: 'https://x.com' // This will be the actual post URL in production
        });
      } else if (platform === 'facebook') {
        await publishToSocialMedia(content, 'facebook', mediaUrl, mediaType);
        return NextResponse.json({ 
          success: true, 
          message: 'Content published successfully',
          url: 'https://facebook.com' // This will be the actual post URL in production
        });
      } else if (platform === 'linkedin') {
        await publishToSocialMedia(content, 'linkedin', mediaUrl, mediaType);
        return NextResponse.json({ 
          success: true, 
          message: 'Content published successfully',
          url: 'https://linkedin.com' // This will be the actual post URL in production
        });
      } else if (platform === 'medium') {
        if (!topic) {
          return NextResponse.json({ error: 'Missing topic for Medium article' }, { status: 400 });
        }
        await publishToCMS({ title: topic, content }, 'medium', mediaUrl, mediaType);
        return NextResponse.json({ 
          success: true, 
          message: 'Article published successfully',
          url: 'https://medium.com' // This will be the actual article URL in production
        });
      } else {
        return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('[marketing/cron] POST Error:', error);
    const message = typeof error?.message === 'string' ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


