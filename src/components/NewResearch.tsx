import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { langflowService } from "../services/langflowService";
import { useStateContext } from "../context/ParsedDataContext";

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
  const { setParsedData, parsedData } = useStateContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await langflowService.fetchData(searchInput);

      console.log("Processed research data:", data);
      setParsedData(data);
      // Handle successful response
      // You could add navigation here or show success message
    } catch (err) {
      setError("Failed to create research. Please try again.");
      console.error("Error creating research:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(parsedData);
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          New Research
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-3 pr-10 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your research topic..."
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Related Suggestions
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSearchInput(suggestion)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
