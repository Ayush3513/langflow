import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlaySquare, Users, ThumbsUp, MessageCircle } from "lucide-react";

const mockCampaignData = [
  { date: "Jan 1", impressions: 15000, clicks: 820, conversion: 45 },
  { date: "Jan 7", impressions: 25000, clicks: 960, conversion: 52 },
  { date: "Jan 14", impressions: 18000, clicks: 780, conversion: 38 },
  { date: "Jan 21", impressions: 32000, clicks: 1180, conversion: 64 },
  { date: "Jan 28", impressions: 28000, clicks: 940, conversion: 58 },
];

const mockAdTypes = [
  { type: "In-Stream Ads", spend: 4500, conversions: 280 },
  { type: "Discovery Ads", spend: 3500, conversions: 320 },
  { type: "Bumper Ads", spend: 2500, conversions: 180 },
  { type: "Display Ads", spend: 2000, conversions: 220 },
];

const mockAudienceEngagement = [
  { time: "0:00", completion: 100 },
  { time: "0:05", completion: 85 },
  { time: "0:10", completion: 75 },
  { time: "0:15", completion: 68 },
  { time: "0:20", completion: 62 },
  { time: "0:30", completion: 55 },
];

const mockTargetDistribution = [
  { name: "18-24", reach: 28.5, color: "#60A5FA" },
  { name: "25-34", reach: 35.2, color: "#3B82F6" },
  { name: "35-44", reach: 22.8, color: "#2563EB" },
  { name: "45+", reach: 13.5, color: "#1D4ED8" },
];

export const YoutubeAnalysis = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Ad Campaign Performance
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Campaign Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockCampaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="impressions"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="clicks"
                    stroke="#60A5FA"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Ad Format Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAdTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Ad View Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAudienceEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Audience Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockTargetDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="reach"
                  >
                    {mockTargetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Top Performing Ad Creatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Product Feature Spotlight",
                    views: "125K",
                    ctr: "4.2%",
                    duration: "0:30",
                  },
                  {
                    title: "Customer Testimonial",
                    views: "98K",
                    ctr: "3.7%",
                    duration: "0:45",
                  },
                  {
                    title: "Brand Story",
                    views: "86K",
                    ctr: "3.1%",
                    duration: "1:00",
                  },
                ].map((ad, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <PlaySquare className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{ad.title}</p>
                        <p className="text-sm text-gray-500">
                          Duration: {ad.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{ad.views}</p>
                        <p className="text-sm text-gray-500">Views</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{ad.ctr}</p>
                        <p className="text-sm text-gray-500">CTR</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default YoutubeAnalysis;
