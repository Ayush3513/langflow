import React, { useState } from "react";
import { Search } from "lucide-react";
import { langflowService } from "../services/langflowService";
import { useStateContext } from "../context/ParsedDataContext";
import CompetitorTable from './CompetitorTable';

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
  const [rawData, setRawData] = useState<any>(null);
  const { parsedData, setParsedData } = useStateContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);
    setRawData(null);

    try {
      const { outputMessage, artifacts } = await langflowService.fetchData(searchInput);
      console.log("Output Message:", outputMessage);
      console.log("Artifacts:", artifacts);
      setParsedData(artifacts);
      setRawData(artifacts);
    } catch (err) {
      setError("Failed to create research. Please try again.");
      console.error("Error creating research:", err);
    } finally {
      setLoading(false);
    }
  };

  const competitors = parsedData?.Competitors || [];

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

        {loading && <p className="text-gray-600">Loading...</p>}

        {parsedData && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Competitors Data</h2>
            <CompetitorTable competitors={competitors} />
          </div>
        )}

        {/* Raw Data Section */}
        {rawData && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Raw API Response</h2>
            <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
