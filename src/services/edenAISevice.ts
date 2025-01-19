const EDEN_AI_API_KEY = process.env.NEXT_PUBLIC_EDEN_AI_API_KEY;

export const edenAIService = {
  generateCode: async (input: string) => {
    console.log("API Key:", "");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmE5NGQ1OGYtMTZhZC00ZDE1LTgyMzMtN2RkZDIzZjVkYWFiIiwidHlwZSI6ImFwaV90b2tlbiJ9.LiueO9Oa450VPHwyoVghdEILqIbOIDzEBJZLjvyWkrQ`,
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_base_64: true,
        show_original_response: false,
        temperature: 0,
        max_tokens: 1000,
        text: input,
        providers: "openai",
      }),
    };

    try {
      const response = await fetch(
        "https://api.edenai.run/v2/text/code_generation",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch from Eden AI");
      }
      return await response.json();
    } catch (error) {
      console.error("Error calling Eden AI:", error);
      throw error;
    }
  },
};
