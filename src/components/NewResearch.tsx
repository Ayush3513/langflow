import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { langflowService } from "../services/langflowService";
import { useStateContext } from "../context/ParsedDataContext";
import { toast } from "sonner";
interface ResearchItem {
  id?: string;
  name?: string;
  insights?: string;
  traffic?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}
const suggestions = [
  "Analyze top tech YouTubers",
  "Social media trends 2023",
  "Competitor strategies in e-commerce",
  "AI impact on content creation",
  "Sustainable brand marketing",
];
export const NewResearch: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [researchData, setResearchData] = useState<ResearchItem[]>([]);
  const { setParsedData } = useStateContext();
  const parseDataToJson = (data: string): ResearchItem[] => {
    try {
      // First attempt: direct JSON parse
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.log("Direct JSON parse failed, trying alternative parsing");
      }
      // Second attempt: Convert string array to structured data
      if (Array.isArray(data)) {
        const items: ResearchItem[] = [];
        let currentItem: Partial<ResearchItem> = {};
        data.forEach((entry: string) => {
          if (typeof entry === "string") {
            const [key, value] = entry.replace(/['"]/g, "").split(": ");
            if (key === "id" && Object.keys(currentItem).length > 0) {
              items.push(currentItem as ResearchItem);
              currentItem = {};
            }
            if (key && value) {
              currentItem[key.toLowerCase()] = value;
            }
          }
        });
        if (Object.keys(currentItem).length > 0) {
          items.push(currentItem as ResearchItem);
        }
        return items;
      }
      // Third attempt: Parse as string and extract key-value pairs
      const lines = data.split("\n");
      const items: ResearchItem[] = [];
      let currentItem: Partial<ResearchItem> = {};
      lines.forEach((line) => {
        const match = line.match(/"([^"]+)"\s*:\s*"([^"]+)"/);
        if (match) {
          const [, key, value] = match;
          if (key === "id" && Object.keys(currentItem).length > 0) {
            items.push(currentItem as ResearchItem);
            currentItem = {};
          }
          currentItem[key.toLowerCase()] = value;
        }
      });
      if (Object.keys(currentItem).length > 0) {
        items.push(currentItem as ResearchItem);
      }
      return items;
    } catch (error) {
      console.error("Error parsing data:", error);
      throw new Error("Failed to parse research data");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLoading(true);
    setError(null);
    setResearchData([]);
    try {
      const data = await langflowService.fetchData(searchInput);
      const parsedData = parseDataToJson(data);
      if (parsedData && parsedData.length > 0) {
        setParsedData(parsedData);
        setResearchData(parsedData);
        toast.success("Research data retrieved successfully!");
      } else {
        throw new Error("No valid data found in the response");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create research. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const renderResearchItem = (item: ResearchItem) => (
    <div className="result-card">
      {(item.name || item.title) && (
        <h3 className="font-semibold text-xl mb-3 text-gray-800">
          {item.name || item.title}
        </h3>
      )}
      <div className="space-y-3">
        {Object.entries(item).map(([key, value]) => {
          if (key !== "id" && key !== "name" && key !== "title" && value) {
            return (
              <p key={key} className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium capitalize text-gray-800">
                  {key}:
                </span>{" "}
                {value}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Research Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your topic and get comprehensive research insights
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="search-container">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              placeholder="What would you like to research?"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3
                       bg-primary rounded-xl text-white hover:bg-primary/90
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       disabled:opacity-50 transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 text-sm text-center mb-8 p-4 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary"></div>
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary animation-delay-200"></div>
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary animation-delay-400"></div>
          </div>
        )}
        {researchData.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Research Results
            </h2>
            <div className="space-y-6">
              {researchData.map((item, index) => (
                <div key={item.id || index}>{renderResearchItem(item)}</div>
              ))}
            </div>
          </div>
        )}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Popular Research Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSearchInput(suggestion)}
                className="suggestion-button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
