import { BRAND_NAME, PLATFORM_NAME, FB_TONE, FB_CONSTRAINTS } from './config';

export function buildGenerateTopicsMessages() {
  return [
    {
      role: 'system' as const,
      content:
        'You are a senior social strategist. Respond ONLY with strict JSON: {"topics":["..."]}. No commentary.',
    },
    {
      role: 'user' as const,
      content:
        'Generate three distinct, concise Facebook post topics for a structured settlement company. Audience: people seeking cash for payments. Return ONLY JSON: {"topics":["t1","t2","t3"]}.',
    },
  ];
}

export function buildSocialContentMessages(topic: string) {
  const constraints = FB_CONSTRAINTS.map((c) => `- ${c}`).join('\n');
  return [
    {
      role: 'system' as const,
      content: `You are an expert copywriter for ${BRAND_NAME} on ${PLATFORM_NAME}. Respond with plain text only. Tone: ${FB_TONE}.`,
    },
    {
      role: 'user' as const,
      content: `Write a short, engaging ${PLATFORM_NAME} post about "${topic}" for ${BRAND_NAME}.\n\nConstraints:\n${constraints}`,
    },
  ];
}


