import React, { useEffect, useState } from "react";
import { BarChart2, Users, TrendingUp, Target } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { ResearchTable } from "./ResearchTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts";
import { langflowService } from '../services/langflowService';
import { 
  mockDashboardTrendData, 
  mockDashboardPieData, 
  mockDashboardBarData 
} from '../mockData';

export const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    trendData: mockDashboardTrendData,
    pieData: mockDashboardPieData,
    barData: mockDashboardBarData
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const data = await langflowService.fetchData('Generate dashboard data including trends, pie chart data, and bar chart data');
  //       console.log('Fetched dashboard data:', data);
        
  //       if (!data?.pieData || !data?.trendData || !data?.barData) {
  //         console.warn('Invalid data structure received:', data);
  //         return;
  //       }

  //       setDashboardData(data);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //       setError('Failed to load dashboard data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  const renderPieChart = () => {
    if (!dashboardData.pieData?.length) {
      return <div>No pie chart data available</div>;
    }

    return (
      <Pie
        data={dashboardData.pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {dashboardData.pieData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.name === "Category A" ? "#ff7300" : "#0088FE"}
          />
        ))}
      </Pie>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard
          title="Total Research"
          value="156"
          change={12}
          icon={<BarChart2 size={20} />}
        />
        <OverviewCard
          title="Active Users"
          value="2.4k"
          change={8}
          icon={<Users size={20} />}
        />
        <OverviewCard
          title="Trending Topics"
          value="86"
          change={-5}
          icon={<TrendingUp size={20} />}
        />
        <OverviewCard
          title="Pain Points"
          value="24"
          change={15}
          icon={<Target size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="volume" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">
            Research Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              {renderPieChart()}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">
            Monthly Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-6">
            Active User Engagement
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Age" />
              <YAxis type="number" dataKey="y" name="Engagement" />
              <Tooltip />
              <Scatter
                name="User Engagement"
                data={[
                  { x: 20, y: 4000 },
                  { x: 30, y: 3000 },
                  { x: 40, y: 2000 },
                ]}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ResearchTable />
    </div>
  );
};