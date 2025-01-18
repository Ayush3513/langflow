import React from 'react';
import { BarChart2, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { OverviewCard } from './OverviewCard';
import { TrendChart } from './charts/TrendChart';
import { mockAnalytics } from '../mockData';

const trendData = mockAnalytics.dates.map((date, index) => ({
  date,
  views: mockAnalytics.views[index],
  engagement: mockAnalytics.engagement[index],
  sentiment: mockAnalytics.sentiment[index] * 100,
}));

export const Analytics: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard
          title="Total Views"
          value="10.3K"
          change={15}
          icon={<BarChart2 size={20} />}
        />
        <OverviewCard
          title="Engagement Rate"
          value="6.5%"
          change={8}
          icon={<TrendingUp size={20} />}
        />
        <OverviewCard
          title="Active Users"
          value="2.4K"
          change={12}
          icon={<Users size={20} />}
        />
        <OverviewCard
          title="Mentions"
          value="856"
          change={-3}
          icon={<MessageCircle size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">Views Trend</h3>
          <div className="h-[300px]">
            <TrendChart data={trendData.map(d => ({ date: d.date, volume: d.views }))} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">
            Engagement Trend
          </h3>
          <div className="h-[300px]">
            <TrendChart data={trendData.map(d => ({ date: d.date, volume: d.engagement }))} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-gray-900 font-semibold mb-6">
          Sentiment Analysis
        </h3>
        <div className="h-[300px]">
          <TrendChart data={trendData.map(d => ({ date: d.date, volume: d.sentiment }))} />
        </div>
      </div>
    </div>
  );
};