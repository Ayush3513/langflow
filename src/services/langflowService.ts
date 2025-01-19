import {
  mockCompetitors,
  mockMentions,
  mockDashboardTrendData,
  mockDashboardPieData,
  mockDashboardBarData,
} from "../mockData";

export class LangflowClient {
  private baseURL: string;
  private applicationToken: string;
  private groqApiKey: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private retryDelay: number = 1000;

  constructor() {
    this.baseURL = import.meta.env.VITE_LANGFLOW_BASE_URL || "/lf";
    this.applicationToken = import.meta.env.VITE_APPLICATION_TOKEN || "";
    this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY || "";
    this.cache = new Map();
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getCachedData(prompt: string) {
    const cached = this.cache.get(prompt);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      // Cache valid for 5 minutes
      return cached.data;
    }
    return null;
  }

  private setCachedData(prompt: string, data: any) {
    this.cache.set(prompt, { data, timestamp: Date.now() });
  }

  async fetchData(prompt: string): Promise<any> {
    const flowId = "1491b3a8-1d44-41f7-985c-3881d5dc9b60";
    const langflowId = "66b56313-9903-4bf9-b4fc-26c217abc6c5";

    const headers = {
      Authorization: `Bearer ${this.applicationToken}`,
      'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                  'Access-Control-Allow-Credentials': true,
    };

    // Check cache first
    const cachedData = this.getCachedData(prompt);
    if (cachedData) {
      console.log("Returning cached data");
      return cachedData;
    }

    try {
      const response = await fetch(
        `${this.baseURL}/${langflowId}/api/v1/run/${flowId}`,
        {
          method: "POST",
          headers,
          mode: "cors",
          credentials: "omit",
          body: JSON.stringify({
            input_value: prompt,
            input_type: "chat",
            output_type: "chat",
            tweaks: {
              "ChatInput-NEW": {
                input: prompt,
                api_key: this.groqApiKey,
              },
              "GroqModel-NEW": {
                api_key: this.groqApiKey,
              },
              "ParseData-MI18w": {},
              "Prompt-FnjBo": {},
              "ChatOutput-NEW": {},
              "AstraDB-xVVKg": {},
              "File-lwiLu": {},
              "SplitText-NEW": {},
            },
          }),
        }
      );

      if (response.status === 500) {
        console.error("Server error response:", await response.text());
        return this.getMockData(prompt);
      }

      if (!response.ok) {
        console.warn("API request failed, falling back to mock data");
        return this.getMockData(prompt);
      }

      const data = await response.json();

      // Extract deeply nested data
      const extractedData = this.extractData(
        data?.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message
      );

      console.log("Extracted output message:", extractedData);

      // Cache the result
      this.setCachedData(prompt, extractedData);

      return extractedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return this.getMockData(prompt);
    }
  }

  private extractData(rawData: string): any {
    if (!rawData) {
      console.warn("No valid data to extract");
      return { message: "No valid data received from API" };
    }

    try {
      // Attempt to parse JSON data
      const jsonData = JSON.parse(rawData);

      console.log("Parsed JSON data:", jsonData);

      // Return JSON if parsing successful
      return jsonData;
    } catch (e) {
      console.error("Failed to parse JSON, falling back to regex", e);

      // Attempt to extract using regex as a fallback
      const regex = /(".*?":\s*".*?"|\[.*?\]|\{.*?\})/g;
      const matches = rawData.match(regex);

      if (matches) {
        console.log("Extracted data using regex:", matches);
        return matches;
      }

      console.error("Failed to extract data");
      return { message: "Failed to extract data from API response" };
    }
  }

  private getMockData(prompt: string) {
    if (prompt.includes("dashboard")) {
      return {
        trendData: mockDashboardTrendData,
        pieData: mockDashboardPieData,
        barData: mockDashboardBarData,
      };
    } else if (prompt.includes("competitor")) {
      return { competitors: mockCompetitors };
    } else if (prompt.includes("social")) {
      return { mentions: mockMentions };
    }
    return { message: "No mock data available for this prompt" };
  }
}

export const langflowService = new LangflowClient();
