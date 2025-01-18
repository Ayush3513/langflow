import React from 'react';
import { MessageCircle, TrendingUp, Users, BarChart2 } from 'lucide-react';
import { OverviewCard } from './OverviewCard';
import { mockMentions } from '../mockData';

export const SocialListening: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Social Listening</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard
          title="Total Mentions"
          value="1,234"
          change={12}
          icon={<MessageCircle size={20} />}
        />
        <OverviewCard
          title="Sentiment Score"
          value="8.5"
          change={5}
          icon={<TrendingUp size={20} />}
        />
        <OverviewCard
          title="Reach"
          value="45.2K"
          change={-3}
          icon={<Users size={20} />}
        />
        <OverviewCard
          title="Engagement Rate"
          value="6.8%"
          change={2}
          icon={<BarChart2 size={20} />}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Mentions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockMentions.map((mention) => (
            <div key={mention.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {mention.platform}
                  </span>
                  <p className="mt-2 text-sm text-gray-900">{mention.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(mention.date).toLocaleString()}</span>
                    <span>
                      {mention.engagement} {mention.engagement === 1 ? 'engagement' : 'engagements'}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    mention.sentiment === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {mention.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};