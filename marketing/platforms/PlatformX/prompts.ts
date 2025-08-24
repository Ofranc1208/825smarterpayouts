import { BRAND_NAME, PLATFORM_NAME, X_TONE, X_CONSTRAINTS } from './config';

export function buildGenerateTopicsMessages() {
  return [
    {
      role: 'system' as const,
      content:
        'You are a senior social media strategist for a structured settlement company. Respond ONLY with strict JSON: {"topics":["..."]}. No commentary.',
    },
    {
      role: 'user' as const,
      content:
        'Generate three distinct, compelling social media topics for a structured settlement company. Each topic should be concise and relevant to someone seeking cash for their payments. Return ONLY JSON: {"topics":["t1","t2","t3"]}.',
    },
  ];
}

export function buildSocialContentMessages(topic: string) {
  const constraints = X_CONSTRAINTS.map((c) => `- ${c}`).join('\n');
  return [
    {
      role: 'system' as const,
      content: `You are an expert marketing copywriter for ${BRAND_NAME} on ${PLATFORM_NAME}. Respond with plain text only. Tone: ${X_TONE}.`,
    },
    {
      role: 'user' as const,
      content: `Write a short, engaging ${PLATFORM_NAME} post about "${topic}" for ${BRAND_NAME}.\n\nConstraints:\n${constraints}`,
    },
  ];
}


