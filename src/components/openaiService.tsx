import React, { useState, useEffect } from "react";
import axios from "axios";

interface FetchWithGroqProps {
  keyword: string;
  format: string;
  onDataFetched: (data: any) => void;
}

const FetchWithGroq: React.FC<FetchWithGroqProps> = ({
  keyword,
  format,
  onDataFetched,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword || !format) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace this URL with your Groq-compatible endpoint (e.g., Sanity API)
        const GROQ_API_URL =
          "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";
        const GROQ_QUERY = `
          *[_type == "marketingData" && keywords match "${keyword}"]{
            _id,
            competitors,
            research,
            analytics,
            trends,
            mentions,
            painPoints,
            channels,
            dashboardData
          }[0]
        `;

        const response = await axios.post(
          GROQ_API_URL!,
          { query: GROQ_QUERY },
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );

        const fetchedData = response.data.result;
        if (fetchedData) {
          onDataFetched(fetchedData);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        console.error("Error fetching data with Groq:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, format, onDataFetched]);

  if (loading) {
    return <p className="text-center">Fetching marketing data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return null;
};

export default FetchWithGroq;
