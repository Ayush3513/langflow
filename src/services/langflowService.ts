export class LangflowClient {
  private baseURL: string;
  private applicationToken: string;
  private groqApiKey: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_LANGFLOW_BASE_URL || "/lf";
    this.applicationToken = import.meta.env.VITE_APPLICATION_TOKEN || "";
    this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY || "";
  }

  async fetchData(prompt: string): Promise<any> {
    const flowId = "1491b3a8-1d44-41f7-985c-3881d5dc9b60";
    const langflowId = "66b56313-9903-4bf9-b4fc-26c217abc6c5";

    const headers = {
      Authorization: `Bearer ${this.applicationToken}`,
      "Content-Type": "application/json",
    };

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

      const data = await response.json();

      // Log the full response to inspect structure
      console.log("Full response:", data);

      // Access the nested message content
      const outputMessage = data.outputs[0].outputs[0].artifacts.message;
      console.log("Output message:", outputMessage);

      // If you need to parse JSON from the message that's wrapped in code blocks
      const jsonMatch = outputMessage.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        const parsedData = JSON.parse(jsonMatch[1]);
        console.log("Parsed JSON data:", parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export const langflowService = new LangflowClient();
