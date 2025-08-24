import { NextRequest, NextResponse } from 'next/server';
import { callOpenAIChat, OpenAIChatMessage } from '../../../lib/openai';
import { buildGenerateTopicsMessages as buildXTopics, buildSocialContentMessages as buildXSocial } from '../../platforms/PlatformX/prompts';
import { buildGenerateTopicsMessages as buildFBTopics, buildSocialContentMessages as buildFBSocial } from '../../platforms/Facebook/prompts';
import { buildGenerateTopicsMessages as buildMDTopics, buildArticleContentMessages as buildMDArticle } from '../../platforms/Medium/prompts';
import { buildGenerateTopicsMessages as buildLITopics, buildSocialContentMessages as buildLISocial, buildArticleContentMessages as buildLIArticle } from '../../platforms/LinkedIn/prompts';

// Input validation and sanitization
function sanitizeText(input: string, maxLen: number): string {
  const noCtrl = input.replace(/[\u0000-\u001F\u007F]/g, '');
  return noCtrl.trim().slice(0, maxLen);
}

// Simple rate limiting (in-memory)
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 15; // requests per window
const rateMap: Map<string, { count: number; windowStart: number }> = new Map();

function getClientKey(req: NextRequest): string {
  const xf = req.headers.get('x-forwarded-for') || '';
  const ip = xf.split(',')[0].trim();
  return ip || req.headers.get('user-agent') || 'anon';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateMap.get(key);
  
  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    rateMap.set(key, { count: 1, windowStart: now });
    return true;
  }
  
  if (record.count < RATE_MAX) {
    record.count += 1;
    return true;
  }
  
  return false;
}

type GenerateBody = {
  topic?: string;
  task?: 'social' | 'article' | 'generate_topic' | 'generate_topics' | 'generate_image' | string;
  platform?: 'x' | 'facebook' | 'medium' | 'linkedin' | string;
  content?: string; // For image generation based on content
};

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientKey = getClientKey(req);
    if (!checkRateLimit(clientKey)) {
      return NextResponse.json(
        { ok: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    let body: GenerateBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Extract and validate inputs
    const rawTopic = (body.topic || '').toString();
    const platformRaw = (body.platform || 'x').toString().toLowerCase();
    const platform: 'x' | 'facebook' | 'medium' | 'linkedin' =
      platformRaw === 'facebook' ? 'facebook' : 
      platformRaw === 'medium' ? 'medium' : 
      platformRaw === 'linkedin' ? 'linkedin' : 'x';
    
    // Sanitize topic with length limit
    const topic = sanitizeText(rawTopic, 120);
    
    const taskRaw = (body.task || '').toString().trim().toLowerCase();
    const validTasks = ['social', 'article', 'generate_topic', 'generate_topics', 'generate_image'];
    const task = validTasks.includes(taskRaw) ? taskRaw : '';

    // Task validation
    const isGenerateTopic = task === 'generate_topic';
    const isGenerateTopics = task === 'generate_topics';
    const isGenerateImage = task === 'generate_image';
    const needsTopic = !isGenerateTopic && !isGenerateTopics && !isGenerateImage;

    if (needsTopic && !topic) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: 'topic'" },
        { status: 400 }
      );
    }

    if (isGenerateImage) {
      const content = sanitizeText((body.content || '').toString(), 500);
      if (!content && !topic) {
        return NextResponse.json(
          { ok: false, error: "Missing required field: 'content' or 'topic' for image generation" },
          { status: 400 }
        );
      }
    }

    if (!task) {
      return NextResponse.json(
        { ok: false, error: "Invalid 'task'. Must be: social, article, generate_topic, generate_topics, or generate_image" },
        { status: 400 }
      );
    }

    // Build platform-specific prompts
    let messages: OpenAIChatMessage[] = [];

    if (task === 'generate_topic') {
      // Legacy single topic (kept for backward compatibility)
      messages = [
        {
          role: 'system',
          content: 'You are a senior social media strategist for a structured settlement company. Respond with a single topic line only.'
        },
        {
          role: 'user',
          content: 'Generate a single, compelling social media topic for a structured settlement company. The topic should be engaging and relevant to someone looking to get cash for their payments.'
        }
      ];
    } else if (task === 'generate_topics') {
      // Platform-specific topic generation
      messages =
        platform === 'facebook'
          ? (buildFBTopics() as OpenAIChatMessage[])
          : platform === 'medium'
          ? (buildMDTopics() as OpenAIChatMessage[])
          : platform === 'linkedin'
          ? (buildLITopics() as OpenAIChatMessage[])
          : (buildXTopics() as OpenAIChatMessage[]);
    } else if (task === 'social') {
      // Platform-specific social content
      messages =
        platform === 'facebook'
          ? (buildFBSocial(topic) as OpenAIChatMessage[])
          : platform === 'linkedin'
          ? (buildLISocial(topic) as OpenAIChatMessage[])
          : (buildXSocial(topic) as OpenAIChatMessage[]);
    } else if (task === 'article') {
      // Article content (for Medium and LinkedIn)
      messages = platform === 'medium'
        ? (buildMDArticle(topic) as OpenAIChatMessage[])
        : platform === 'linkedin'
        ? (buildLIArticle(topic) as OpenAIChatMessage[])
        : [
            {
              role: 'system',
              content: 'You are an expert marketing copywriter for SmarterPayouts focused on structured settlements. Respond with plain text only.'
            },
            {
              role: 'user',
              content: `Draft a brief multi-paragraph article about "${topic}" for SmarterPayouts.\n\nGuidelines:\n- 3 to 5 short paragraphs.\n- Clear intro, helpful body, concise next-steps.\n- Friendly, trustworthy, and plain language.\n- Avoid asking for sensitive personal information; emphasize instant quotes and privacy.`
            }
          ];
    } else if (task === 'generate_image') {
      // Handle image generation separately since it uses a different API
      const content = sanitizeText((body.content || '').toString(), 500);
      const imagePrompt = content || topic;
      
      try {
        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: `Create a professional, clean business graphic for social media about "${imagePrompt}". Style: modern, minimalist, financial/business theme. Colors: professional blue and green tones. No text overlays. High quality, 1024x1024 pixels.`,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
          }),
        });

        if (!imageResponse.ok) {
          const errorText = await imageResponse.text();
          throw new Error(`Image generation failed: ${errorText}`);
        }

        const imageData = await imageResponse.json();
        const imageUrl = imageData.data?.[0]?.url;

        if (!imageUrl) {
          throw new Error('No image URL returned from OpenAI');
        }

        return NextResponse.json({
          ok: true,
          imageUrl,
          platform,
          task,
          prompt: imagePrompt
        });

      } catch (error: any) {
        console.error('[marketing/generate] Image generation error:', error);
        return NextResponse.json(
          { ok: false, error: `Image generation failed: ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Call OpenAI with timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    let content: string;
    try {
      content = await callOpenAIChat(messages);
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { ok: false, error: 'Request timeout. Please try again.' },
          { status: 408 }
        );
      }
      throw error;
    }

    // Process response based on task type
    if (task === 'generate_topics') {
      try {
        const parsed = JSON.parse(content);
        const topics = Array.isArray(parsed?.topics)
          ? parsed.topics.slice(0, 3).map((t: any) => sanitizeText(String(t), 120)).filter(Boolean)
          : [];
        
        if (topics.length === 0) throw new Error('No valid topics found');
        
        return NextResponse.json({
          ok: true,
          topics,
          platform,
          task
        });
      } catch {
        // Fallback: parse as lines
        const topics = content
          .split('\n')
          .map((line) => sanitizeText(line.replace(/^[-*\d.\s]+/, ''), 120))
          .filter(Boolean)
          .slice(0, 3);
        
        return NextResponse.json({
          ok: true,
          topics,
          platform,
          task
        });
      }
    }

    // Regular content response
    let finalContent = content.trim();
    
    // Platform-specific length constraints
    if (task === 'social') {
      const maxLen = platform === 'x' ? 280 : 750; // X has stricter limits
      finalContent = sanitizeText(finalContent, maxLen);
    }

    return NextResponse.json({
      ok: true,
      content: finalContent,
      platform,
      task,
      topic: topic || undefined
    });

  } catch (error: any) {
    console.error('[marketing/generate] Error:', {
      message: error?.message,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
    
    return NextResponse.json(
      { ok: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
