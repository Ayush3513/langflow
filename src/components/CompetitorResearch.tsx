import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, BarChart2, Globe } from 'lucide-react';
import { langflowService } from '../services/langflowService';

export const CompetitorResearch: React.FC = () => {
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const data = await langflowService.fetchData('Generate competitor research data');
        setCompetitors(data.competitors);
      } catch (error) {
        console.error('Error fetching competitors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitors();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Competitor Research
      </h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add Competitor
          </h2>
          <form className="flex gap-4">
            <input
              type="text"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter competitor's website URL"
            />
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Competitor
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <div
            key={competitor.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                <a
                  href={`https://${competitor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {competitor.website}
                </a>
              </div>
              <Globe className="text-indigo-500" size={20} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart2 size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {competitor.metrics.traffic}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {competitor.metrics.keywords}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {competitor.metrics.backlinks}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {competitor.metrics.growth}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Key Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {competitor.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              View Detailed Analysis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};