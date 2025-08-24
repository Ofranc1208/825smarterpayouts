// LinkedIn platform configuration
export const LINKEDIN_CONFIG = {
  PLATFORM_NAME: 'LinkedIn',
  MAX_POST_LENGTH: 3000, // LinkedIn allows up to 3000 characters
  MAX_TITLE_LENGTH: 120,
  CONTENT_TYPE: 'professional', // professional business content
  POSTING_FREQUENCY: 'daily', // recommended posting frequency
  OPTIMAL_TIMES: ['8:00-10:00', '12:00-14:00', '17:00-19:00'], // UTC optimal posting times
  HASHTAG_LIMIT: 5, // recommended hashtags per post
  MEDIA_REQUIREMENTS: {
    IMAGE: {
      MIN_WIDTH: 1200,
      MIN_HEIGHT: 627,
      RECOMMENDED_RATIO: '1.91:1',
      MAX_SIZE_MB: 10,
      FORMATS: ['JPG', 'PNG', 'GIF']
    },
    VIDEO: {
      MIN_WIDTH: 256,
      MIN_HEIGHT: 144,
      MAX_WIDTH: 4096,
      MAX_HEIGHT: 2304,
      MAX_SIZE_MB: 200,
      MAX_DURATION_SECONDS: 600, // 10 minutes
      FORMATS: ['MP4', 'MOV', 'WMV', 'AVI', 'ASF', 'FLV', 'F4V', 'MKV']
    }
  },
  TONE: 'professional', // Professional and authoritative
  TARGET_AUDIENCE: [
    'Financial professionals',
    'Legal professionals', 
    'Settlement recipients',
    'Insurance professionals',
    'Business decision makers'
  ]
} as const;
