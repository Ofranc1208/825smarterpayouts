import crypto from 'crypto';
import mediumApiService from './mediumApiService';

// Simple in-memory deduplication cache
const recentArticles = new Map<string, number>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function generateContentHash(title: string, content: string): string {
  return crypto.createHash('sha256').update(`${title.trim().toLowerCase()}:${content.trim().toLowerCase()}`).digest('hex').slice(0, 16);
}

function isDuplicate(title: string, content: string): boolean {
  const hash = generateContentHash(title, content);
  const posted = recentArticles.get(hash);
  const now = Date.now();
  
  if (posted && now - posted < CACHE_TTL) {
    return true;
  }
  
  // Clean old entries while we're here
  const keysToDelete: string[] = [];
  recentArticles.forEach((timestamp, key) => {
    if (now - timestamp > CACHE_TTL) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => recentArticles.delete(key));
  
  recentArticles.set(hash, now);
  return false;
}

export async function publishToCMS(
  article: { title: string; content: string }, 
  platform: string = 'medium',
  mediaUrl?: string,
  mediaType?: 'image' | 'video'
): Promise<void> {
  const DRY_RUN = process.env.MARKETING_DRY_RUN !== 'false'; // Default to dry run
  
  // Audit log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    platform,
    title: article.title,
    contentLength: article.content.length,
    contentPreview: article.content.slice(0, 150) + (article.content.length > 150 ? '...' : ''),
    mediaUrl: mediaUrl || 'none',
    mediaType: mediaType || 'none',
    dryRun: DRY_RUN,
    action: 'publishToCMS'
  };
  
  // Check for duplicates
  if (isDuplicate(article.title, article.content)) {
    console.log('[articlePublisher] Duplicate article detected, skipping:', logEntry);
    return;
  }
  
  if (DRY_RUN) {
    console.log('[articlePublisher] DRY RUN - Would publish article to CMS:', logEntry);
    
    // Test Medium connection in DRY_RUN mode
    if (platform === 'medium' && mediumApiService.isReady()) {
      const connectionTest = await mediumApiService.testConnection();
      if (connectionTest.success) {
        console.log('[articlePublisher] DRY RUN - Medium API connection verified:', connectionTest.user);
      } else {
        console.log('[articlePublisher] DRY RUN - Medium API connection failed:', connectionTest.error);
      }
    }
  } else {
    console.log('[articlePublisher] Publishing article to CMS:', logEntry);
    
    // Real publishing logic
    if (platform === 'medium') {
      // For Medium, we'll add the media as part of the content if provided
      let finalContent = article.content;
      if (mediaUrl && mediaType === 'image') {
        finalContent = `![Featured Image](${mediaUrl})\n\n${article.content}`;
      }
      
      const result = await mediumApiService.publishArticle(
        article.title,
        finalContent,
        'markdown',
        ['structured settlement', 'finance', 'SmarterPayouts'], // Default tags
        'draft' // Start as draft for safety
      );
      
      if (result.success) {
        console.log('[articlePublisher] Successfully published to Medium:', result.data);
      } else {
        console.error('[articlePublisher] Failed to publish to Medium:', result.error);
        throw new Error(`Medium API Error: ${result.error}`);
      }
    } else {
      console.log('[articlePublisher] Unknown platform:', platform);
    }
  }
}