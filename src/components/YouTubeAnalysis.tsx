import React from 'react';
import { BarChart2, Eye, ThumbsUp, MessageSquare } from 'lucide-react';
import { mockChannels } from '../mockData';

export const YouTubeAnalysis: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">YouTube Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockChannels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {channel.subscribers} subscribers
                </p>
              </div>
              <BarChart2 className="text-indigo-500" size={20} />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{channel.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {channel.engagement} engagement
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {channel.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Analyze Channel
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Channel
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Channel URL
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter YouTube channel URL"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Channel
          </button>
        </form>
      </div>
    </div>
  );
};