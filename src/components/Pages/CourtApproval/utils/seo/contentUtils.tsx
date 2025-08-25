// Content processing SEO utilities

// Extract text content from HTML
export const extractTextFromHTML = (html: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: simple regex approach
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  
  // Client-side: use DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Calculate reading time
export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Optimize content for SEO
export const optimizeContentForSEO = (content: string, targetKeywords: string[]): string => {
  let optimizedContent = content;
  
  // Ensure keywords appear naturally in content
  targetKeywords.forEach(keyword => {
    const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = optimizedContent.match(keywordRegex);
    
    // If keyword appears less than 2 times, suggest adding it
    if (!matches || matches.length < 2) {
      console.log(`💡 SEO Suggestion: Consider adding "${keyword}" more naturally to the content`);
    }
  });
  
  return optimizedContent;
};

// Check content length for SEO
export const checkContentLength = (content: string): {
  wordCount: number;
  characterCount: number;
  isOptimal: boolean;
  suggestions: string[];
} => {
  const wordCount = content.split(/\s+/).length;
  const characterCount = content.length;
  const suggestions: string[] = [];
  
  let isOptimal = true;
  
  if (wordCount < 300) {
    isOptimal = false;
    suggestions.push('Content is too short. Aim for at least 300 words for better SEO.');
  }
  
  if (wordCount > 2000) {
    suggestions.push('Content is quite long. Consider breaking it into sections or multiple pages.');
  }
  
  if (characterCount > 10000) {
    suggestions.push('Consider adding more headings and bullet points to improve readability.');
  }
  
  return {
    wordCount,
    characterCount,
    isOptimal,
    suggestions
  };
};
