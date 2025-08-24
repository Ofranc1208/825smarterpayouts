import { BRAND_NAME, PLATFORM_NAME, MD_TONE, MD_GUIDELINES } from './config';

export function buildGenerateTopicsMessages() {
  return [
    {
      role: 'system' as const,
      content:
        'You are a senior content strategist. Respond ONLY with strict JSON: {"topics":["..."]}. No commentary.',
    },
    {
      role: 'user' as const,
      content:
        'Generate three distinct, concise article topics for a structured settlement company. Audience: people seeking cash for payments. Return ONLY JSON: {"topics":["t1","t2","t3"]}.',
    },
  ];
}

export function buildArticleContentMessages(topic: string) {
  const guidelines = MD_GUIDELINES.map((g) => `- ${g}`).join('\n');
  return [
    {
      role: 'system' as const,
      content: `You are an expert article writer for ${BRAND_NAME} on ${PLATFORM_NAME}. Respond with plain text only. Tone: ${MD_TONE}.`,
    },
    {
      role: 'user' as const,
      content: `Draft a brief multi-paragraph article about "${topic}" for ${BRAND_NAME}.\n\nGuidelines:\n${guidelines}`,
    },
  ];
}


