import { NodeConfig,  } from '../types/workflow';
import { 
  YouTubeSearchResponse, 
  GoogleSearchResponse, 
  SocialMediaResponse, 
  OpenAIResponse,
  ProcessedData 
} from '../types/api';

export class NodeService {
  static async processYouTubeNode(config: NodeConfig): Promise<YouTubeSearchResponse> {
    const { searchTerms, maxResults = 50, includeComments = true } = config;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerms}&maxResults=${maxResults}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      
      if (includeComments && data.items?.length > 0) {
        // Fetch comments for each video
        const videoIds = data.items.map((item: any) => item.id.videoId);
        const commentsPromises = videoIds.map((videoId: string) =>
          fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
            .then(res => res.json())
        );
        const comments = await Promise.all(commentsPromises);
        data.comments = comments;
      }
      
      return data;
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }

  static async processGoogleSearch(config: NodeConfig): Promise<GoogleSearchResponse> {
    const { searchTerms, maxResults = 10 } = config;
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${searchTerms}&num=${maxResults}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_CX}`
      );
      return response.json();
    } catch (error) {
      console.error('Google Search API Error:', error);
      throw error;
    }
  }

  static async processSocialMedia(config: NodeConfig): Promise<SocialMediaResponse> {
    const { platforms = [], searchTerms } = config;
    const results: SocialMediaResponse = {};

    try {
      for (const platform of platforms) {
        switch (platform) {
          case 'twitter':
            const twitterResponse = await fetch(
              `https://api.twitter.com/2/tweets/search/recent?query=${searchTerms}`,
              {
                headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TWITTER_API_KEY}`
                }
              }
            );
            results.twitter = await twitterResponse.json();
            break;

          case 'reddit':
            const redditResponse = await fetch(
              `https://oauth.reddit.com/search?q=${searchTerms}`,
              {
                headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_REDDIT_API_KEY}`
                }
              }
            );
            results.reddit = await redditResponse.json();
            break;

          case 'facebook':
            // Facebook Graph API integration
            const fbResponse = await fetch(
              `https://graph.facebook.com/v16.0/search?q=${searchTerms}&type=post&access_token=${import.meta.env.VITE_FACEBOOK_APP_TOKEN}`
            );
            results.facebook = await fbResponse.json();
            break;
        }
      }
      return results;
    } catch (error) {
      console.error('Social Media API Error:', error);
      throw error;
    }
  }

  static async processParser(data: any): Promise<ProcessedData> {
    try {
      // Implement data parsing logic
      const insights: string[] = [];
      const keywords: string[] = [];
      let sentiment = 0;

      // Process text content
      if (typeof data === 'string') {
        // Basic keyword extraction
        const words = data.toLowerCase().split(/\W+/);
        const wordFreq: Record<string, number> = {};
        words.forEach(word => {
          if (word.length > 3) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
          }
        });
        keywords.push(...Object.entries(wordFreq)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([word]) => word));
      }

      // Process structured data
      if (typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (typeof value === 'string') {
            insights.push(`${key}: ${value}`);
          }
        });
      }

      return {
        insights,
        keywords,
        sentiment,
        recommendations: []
      };
    } catch (error) {
      console.error('Parser Error:', error);
      throw error;
    }
  }

  static async processOpenAI(data: ProcessedData): Promise<OpenAIResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that analyzes marketing research data and provides insights."
            },
            {
              role: "user",
              content: JSON.stringify({
                task: "Analyze this research data and provide key insights and recommendations",
                data: data
              })
            }
          ]
        })
      });
      return response.json();
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  static async generateOutput(data: ProcessedData, config: NodeConfig): Promise<Blob> {
    const { format = 'pdf', includeData = [] } = config;
    
    try {
      // Format the data based on includeData configuration
      const formattedData = includeData.reduce((acc: any, key: string) => {
        if (data[key as keyof ProcessedData]) {
          acc[key] = data[key as keyof ProcessedData];
        }
        return acc;
      }, {});

      // Generate output in specified format
      switch (format) {
        case 'pdf':
          // Implement PDF generation
          // You might want to use a library like pdfmake
          return new Blob(['PDF content'], { type: 'application/pdf' });
        
        case 'csv':
          // Implement CSV generation
          const csvContent = Object.entries(formattedData)
            .map(([key, value]) => `${key},${value}`)
            .join('\n');
          return new Blob([csvContent], { type: 'text/csv' });
        
        case 'json':
          return new Blob([JSON.stringify(formattedData, null, 2)], { type: 'application/json' });
        
        default:
          throw new Error(`Unsupported output format: ${format}`);
      }
    } catch (error) {
      console.error('Output Generation Error:', error);
      throw error;
    }
  }
} 