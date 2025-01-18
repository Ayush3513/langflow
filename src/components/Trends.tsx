import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Trend } from '../types/research';
import { mockTrends } from '../mockData';

const categories = ['All', 'Design', 'Technology', 'Search', 'Environment'];

export const Trends: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTrends = mockTrends.filter(
    (trend) => selectedCategory === 'All' || trend.category === selectedCategory
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Trends</h1>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{trend.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {trend.category}
                </span>
              </div>
              <TrendingUp className="text-indigo-500" size={20} />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  {trend.growth > 0 ? (
                    <ArrowUpRight
                      size={16}
                      className="text-green-500"
                    />
                  ) : (
                    <ArrowDownRight
                      size={16}
                      className="text-red-500"
                    />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      trend.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {Math.abs(trend.growth)}% growth
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Search Volume</span>
                <p className="text-lg font-semibold text-gray-900">
                  {trend.volume.toLocaleString()}
                </p>
              </div>
            </div>

            <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};