// Facebook API service for posting to Facebook Pages
// Uses Facebook Graph API for publishing posts

interface FacebookApiConfig {
  pageAccessToken: string;
  pageId: string;
  apiVersion: string;
}

interface FacebookPostResponse {
  success: boolean;
  data?: {
    id: string;
    post_id?: string;
  };
  error?: string;
}

interface FacebookUserResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
  };
  error?: string;
}

let config: FacebookApiConfig | null = null;

function initConfig() {
  const { 
    FACEBOOK_PAGE_ACCESS_TOKEN, 
    FACEBOOK_PAGE_ID, 
    FACEBOOK_API_VERSION = 'v18.0' 
  } = process.env;

  if (FACEBOOK_PAGE_ACCESS_TOKEN && FACEBOOK_PAGE_ID) {
    config = {
      pageAccessToken: FACEBOOK_PAGE_ACCESS_TOKEN,
      pageId: FACEBOOK_PAGE_ID,
      apiVersion: FACEBOOK_API_VERSION,
    };
    console.log('[FacebookApiService] Facebook API config initialized.');
  } else {
    console.warn('[FacebookApiService] Facebook API credentials not configured. Posting will be disabled.');
    console.warn('[FacebookApiService] Missing:', {
      FACEBOOK_PAGE_ACCESS_TOKEN: !FACEBOOK_PAGE_ACCESS_TOKEN,
      FACEBOOK_PAGE_ID: !FACEBOOK_PAGE_ID,
    });
    config = null;
  }
}

// Initialize on module load
initConfig();

const facebookApiService = {
  /**
   * Check if Facebook API is ready to use
   */
  isReady: (): boolean => {
    return !!config;
  },

  /**
   * Test Facebook API connection by getting page info
   */
  testConnection: async (): Promise<FacebookUserResponse> => {
    if (!config) {
      return { 
        success: false, 
        error: 'Facebook API not configured' 
      };
    }

    try {
      const url = `https://graph.facebook.com/${config.apiVersion}/${config.pageId}?fields=id,name&access_token=${config.pageAccessToken}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        return { 
          success: false, 
          error: `HTTP ${response.status}: ${errorData.error?.message || 'Facebook API error'}` 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        user: {
          id: data.id,
          name: data.name,
        },
      };

    } catch (error: any) {
      console.error('[FacebookApiService] Connection test failed:', error);
      return { 
        success: false, 
        error: error.message || 'Connection test failed' 
      };
    }
  },

  /**
   * Post a text message to Facebook Page
   * @param text The text content to post
   * @param mediaUrl Optional media URL (image or video)
   * @param mediaType Type of media ('image' or 'video')
   */
  postToPage: async (
    text: string, 
    mediaUrl?: string, 
    mediaType?: 'image' | 'video'
  ): Promise<FacebookPostResponse> => {
    if (!config) {
      return { 
        success: false, 
        error: 'Facebook API not configured' 
      };
    }

    try {
      let endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.pageId}/feed`;
      let body: any = {
        message: text,
        access_token: config.pageAccessToken,
      };

      // Handle media attachments
      if (mediaUrl && mediaType) {
        if (mediaType === 'image') {
          // For images, use the photos endpoint
          endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.pageId}/photos`;
          body = {
            message: text,
            url: mediaUrl, // Facebook will fetch the image from this URL
            access_token: config.pageAccessToken,
          };
        } else if (mediaType === 'video') {
          // For videos, use the videos endpoint
          endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.pageId}/videos`;
          body = {
            description: text,
            file_url: mediaUrl, // Facebook will fetch the video from this URL
            access_token: config.pageAccessToken,
          };
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        return { 
          success: false, 
          error: `HTTP ${response.status}: ${errorData.error?.message || 'Facebook API error'}` 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        data: {
          id: data.id,
          post_id: data.post_id,
        },
      };

    } catch (error: any) {
      console.error('[FacebookApiService] Post failed:', error);
      return { 
        success: false, 
        error: error.message || 'Post failed' 
      };
    }
  },

  /**
   * Get configuration status for debugging
   */
  getStatus: () => {
    return {
      isConfigured: !!config,
      hasPageToken: !!(config?.pageAccessToken),
      hasPageId: !!(config?.pageId),
      apiVersion: config?.apiVersion || 'not set',
    };
  },
};

export default facebookApiService;
