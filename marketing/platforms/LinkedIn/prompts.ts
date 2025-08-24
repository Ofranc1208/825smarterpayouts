import { OpenAIChatMessage } from '../../../lib/openai';

// LinkedIn-specific prompt builders for professional content

export function buildGenerateTopicsMessages(): OpenAIChatMessage[] {
  return [
    {
      role: 'system',
      content: `You are a professional content strategist specializing in LinkedIn content for financial services. Your task is to generate compelling, professional topics for a structured settlement company called SmarterPayouts.

The content should be:
- Professional and authoritative
- Educational and valuable to the target audience
- Suitable for LinkedIn's business-focused environment
- Relevant to structured settlements, financial planning, and legal settlements
- Engaging for professionals in finance, legal, and insurance industries

Target audience: Financial advisors, lawyers, settlement recipients, insurance professionals, and business decision makers.

Generate exactly 3 professional topics that would work well for LinkedIn posts. Return them as a JSON array of strings.

Do not mention any competitor companies or specific settlement companies.`
    },
    {
      role: 'user',
      content: 'Generate 3 professional LinkedIn topics about structured settlements and financial planning.'
    }
  ];
}

export function buildSocialContentMessages(topic: string): OpenAIChatMessage[] {
  return [
    {
      role: 'system',
      content: `You are a professional LinkedIn content creator for SmarterPayouts, a structured settlement company. Create engaging, professional LinkedIn posts that establish thought leadership and credibility in the financial services industry.

Guidelines:
- Professional, authoritative tone suitable for LinkedIn
- 200-500 words (optimal for LinkedIn engagement)
- Include relevant professional hashtags (3-5 max)
- Focus on educational value and industry insights
- Build trust and credibility
- Encourage professional engagement (comments, shares)
- Target audience: Financial professionals, lawyers, settlement recipients, insurance professionals
- No sales pitch - focus on valuable insights and education
- Use professional language and industry terminology appropriately
- Include a call-to-action that encourages professional discussion

Do not mention any competitor companies.

Format the content as a complete LinkedIn post ready to publish.`
    },
    {
      role: 'user',
      content: `Create a professional LinkedIn post about: ${topic}

The post should be informative, establish thought leadership, and encourage professional engagement in the structured settlement and financial planning space.`
    }
  ];
}

export function buildArticleContentMessages(topic: string): OpenAIChatMessage[] {
  return [
    {
      role: 'system',
      content: `You are a professional content writer creating LinkedIn articles for SmarterPayouts, a structured settlement company. Write comprehensive, professional articles that establish thought leadership and provide valuable insights to the financial services community.

Guidelines:
- Professional, authoritative tone for LinkedIn audience
- 800-1500 words (optimal length for LinkedIn articles)
- Well-structured with clear headings and sections
- Educational and informative content
- Include actionable insights and professional advice
- Target professionals in finance, legal, and insurance industries
- Focus on industry trends, best practices, and educational content
- No direct sales content - focus on thought leadership
- Use professional formatting with bullet points and numbered lists where appropriate
- Include a professional conclusion with key takeaways

Do not mention any competitor companies.

Format as a complete LinkedIn article with a compelling title and well-structured content.`
    },
    {
      role: 'user',
      content: `Write a comprehensive LinkedIn article about: ${topic}

The article should provide valuable professional insights and establish thought leadership in the structured settlement and financial planning industry.`
    }
  ];
}
