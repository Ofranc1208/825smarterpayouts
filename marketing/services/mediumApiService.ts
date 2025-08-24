// Medium API service for publishing articles to Medium
// Uses Medium's Integration API for publishing posts

interface MediumApiConfig {
  integrationToken: string;
  authorId: string;
  publicationId?: string; // Optional: for publishing to a publication
}

interface MediumPostResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    authorId: string;
    url: string;
    publishStatus: string;
  };
  error?: string;
}

interface MediumUserResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    name: string;
    url: string;
  };
  error?: string;
}

let config: MediumApiConfig | null = null;

function initConfig() {
  const { 
    MEDIUM_INTEGRATION_TOKEN, 
    MEDIUM_AUTHOR_ID,
    MEDIUM_PUBLICATION_ID 
  } = process.env;

  if (MEDIUM_INTEGRATION_TOKEN && MEDIUM_AUTHOR_ID) {
    config = {
      integrationToken: MEDIUM_INTEGRATION_TOKEN,
      authorId: MEDIUM_AUTHOR_ID,
      publicationId: MEDIUM_PUBLICATION_ID,
    };
    console.log('[MediumApiService] Medium API config initialized.');
  } else {
    console.warn('[MediumApiService] Medium API credentials not configured. Publishing will be disabled.');
    console.warn('[MediumApiService] Missing:', {
      MEDIUM_INTEGRATION_TOKEN: !MEDIUM_INTEGRATION_TOKEN,
      MEDIUM_AUTHOR_ID: !MEDIUM_AUTHOR_ID,
    });
    config = null;
  }
}

// Initialize on module load
initConfig();

const mediumApiService = {
  /**
   * Check if Medium API is ready to use
   */
  isReady: (): boolean => {
    return !!config;
  },

  /**
   * Test Medium API connection by getting user info
   */
  testConnection: async (): Promise<MediumUserResponse> => {
    if (!config) {
      return { 
        success: false, 
        error: 'Medium API not configured' 
      };
    }

    try {
      const response = await fetch('https://api.medium.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.integrationToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ errors: [{ message: 'Unknown error' }] }));
        return { 
          success: false, 
          error: `HTTP ${response.status}: ${errorData.errors?.[0]?.message || 'Medium API error'}` 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        user: {
          id: data.data.id,
          username: data.data.username,
          name: data.data.name,
          url: data.data.url,
        },
      };

    } catch (error: any) {
      console.error('[MediumApiService] Connection test failed:', error);
      return { 
        success: false, 
        error: error.message || 'Connection test failed' 
      };
    }
  },

  /**
   * Publish an article to Medium
   * @param title The article title
   * @param content The article content (Markdown or HTML)
   * @param contentFormat The format of the content ('markdown' or 'html')
   * @param tags Optional array of tags
   * @param publishStatus Publication status ('public', 'draft', or 'unlisted')
   */
  publishArticle: async (
    title: string,
    content: string,
    contentFormat: 'markdown' | 'html' = 'markdown',
    tags: string[] = [],
    publishStatus: 'public' | 'draft' | 'unlisted' = 'draft'
  ): Promise<MediumPostResponse> => {
    if (!config) {
      return { 
        success: false, 
        error: 'Medium API not configured' 
      };
    }

    try {
      // Determine the endpoint (user or publication)
      const endpoint = config.publicationId 
        ? `https://api.medium.com/v1/publications/${config.publicationId}/posts`
        : `https://api.medium.com/v1/users/${config.authorId}/posts`;

      const body = {
        title: title.trim(),
        contentFormat: contentFormat,
        content: content.trim(),
        tags: tags.filter(tag => tag.trim().length > 0).slice(0, 5), // Medium allows max 5 tags
        publishStatus: publishStatus,
        notifyFollowers: false, // Conservative default
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.integrationToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ errors: [{ message: 'Unknown error' }] }));
        return { 
          success: false, 
          error: `HTTP ${response.status}: ${errorData.errors?.[0]?.message || 'Medium API error'}` 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        data: {
          id: data.data.id,
          title: data.data.title,
          authorId: data.data.authorId,
          url: data.data.url,
          publishStatus: data.data.publishStatus,
        },
      };

    } catch (error: any) {
      console.error('[MediumApiService] Publish failed:', error);
      return { 
        success: false, 
        error: error.message || 'Publish failed' 
      };
    }
  },

  /**
   * Get configuration status for debugging
   */
  getStatus: () => {
    return {
      isConfigured: !!config,
      hasIntegrationToken: !!(config?.integrationToken),
      hasAuthorId: !!(config?.authorId),
      hasPublicationId: !!(config?.publicationId),
      publishingTo: config?.publicationId ? 'publication' : 'personal',
    };
  },
};

export default mediumApiService;
