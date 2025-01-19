export interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { default: { url: string } };
    };
  }>;
  nextPageToken?: string;
}

export interface GoogleSearchResponse {
  items: Array<{
    title: string;
    link: string;
    snippet: string;
  }>;
}

export interface SocialMediaResponse {
  twitter?: Array<{
    text: string;
    user: string;
    engagement: number;
  }>;
  reddit?: Array<{
    title: string;
    content: string;
    subreddit: string;
    score: number;
  }>;
  facebook?: Array<{
    content: string;
    reactions: number;
    shares: number;
  }>;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface ProcessedData {
  insights: string[];
  keywords: string[];
  sentiment: number;
  recommendations: string[];
} 