export const mockCompetitors = [
  {
    id: '1',
    name: 'CompetitorA',
    website: 'www.competitora.com',
    metrics: {
      traffic: '1.2M',
      keywords: '15.4K',
      backlinks: '45.2K',
      growth: '+12%',
    },
    strengths: ['Content Marketing', 'SEO', 'Social Media'],
  },
  {
    id: '2',
    name: 'CompetitorB',
    website: 'www.competitorb.com',
    metrics: {
      traffic: '850K',
      keywords: '12.1K',
      backlinks: '32.8K',
      growth: '+8%',
    },
    strengths: ['Product Features', 'Customer Support', 'Pricing'],
  },
  {
    id: '3',
    name: 'CompetitorC',
    website: 'www.competitorc.com',
    metrics: {
      traffic: '650K',
      keywords: '8.9K',
      backlinks: '28.5K',
      growth: '+15%',
    },
    strengths: ['User Experience', 'Mobile App', 'Integration'],
  },
];

export const mockResearch = [
  {
    id: '1',
    title: 'Competitor Content Strategy Analysis',
    source: 'competitor',
    date: '2024-03-15',
    insights: ['Strong focus on video content', 'Regular posting schedule'],
    metrics: {
      views: 15000,
      engagement: 8.5,
    },
  },
  {
    id: '2',
    title: 'Social Media Sentiment Analysis',
    source: 'social',
    date: '2024-03-14',
    insights: ['Positive brand perception', 'High engagement on tutorials'],
    metrics: {
      sentiment: 0.8,
      engagement: 12.3,
    },
  },
  {
    id: '3',
    title: 'YouTube Channel Performance Review',
    source: 'youtube',
    date: '2024-03-13',
    insights: ['Growing subscriber base', 'High watch time'],
    metrics: {
      views: 25000,
      engagement: 9.2,
    },
  },
];

export const mockAnalytics = {
  views: [1200, 1350, 1500, 1800, 2100, 2400],
  engagement: [5.2, 5.8, 6.1, 5.9, 6.5, 7.2],
  sentiment: [0.65, 0.72, 0.68, 0.75, 0.82, 0.85],
  dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
};

export const mockTrends = [
  {
    id: '1',
    name: 'Mobile-First Design',
    growth: 45,
    category: 'Design',
    volume: 125000,
  },
  {
    id: '2',
    name: 'AI Integration',
    growth: 85,
    category: 'Technology',
    volume: 250000,
  },
  {
    id: '3',
    name: 'Voice Search',
    growth: -12,
    category: 'Search',
    volume: 75000,
  },
  {
    id: '4',
    name: 'Sustainable Tech',
    growth: 32,
    category: 'Environment',
    volume: 95000,
  },
];

export const mockMentions = [
  {
    id: '1',
    platform: 'Twitter',

    content: 'Love the new features in the latest update! #ProductName',
    sentiment: 'positive',
    engagement: 245,
    date: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    platform: 'LinkedIn',
    content: 'Interesting case study on how #ProductName improved our workflow',
    sentiment: 'positive',
    engagement: 189,
    date: '2024-03-15T09:15:00Z',
  },
  {
    id: '3',
    platform: 'Reddit',
    content: 'Having issues with the mobile app. Anyone else experiencing this?',
    sentiment: 'negative',
    engagement: 56,
    date: '2024-03-15T08:45:00Z',
  },
];

export const mockPainPoints = [
  {
    id: '1',
    title: 'Mobile App Performance',
    description: 'Users reporting slow loading times and crashes on the mobile app',
    severity: 'high',
    frequency: 85,
  },
  {
    id: '2',
    title: 'Complex Onboarding',
    description: 'New users finding it difficult to set up their accounts',
    severity: 'medium',
    frequency: 65,
  },
  {
    id: '3',
    title: 'Limited Integration Options',
    description: 'Customers requesting more third-party integrations',
    severity: 'low',
    frequency: 45,
  },
];

export const mockChannels = [
  {
    id: '1',
    name: 'Tech Reviews Pro',
    subscribers: '1.2M',
    views: '25M',
    engagement: '8.5%',
    topics: ['Technology', 'Reviews', 'Tutorials'],
  },
  {
    id: '2',
    name: 'Digital Marketing Hub',
    subscribers: '850K',
    views: '15M',
    engagement: '7.2%',
    topics: ['Marketing', 'SEO', 'Social Media'],
  },
  {
    id: '3',
    name: 'Startup Success',
    subscribers: '500K',
    views: '8M',
    engagement: '9.1%',
    topics: ['Startups', 'Business', 'Entrepreneurship'],
  },

]; 

export const mockDashboardTrendData = [
    { date: "Jan", volume: 65 },
    { date: "Feb", volume: 72 },
    { date: "Mar", volume: 68 },
    { date: "Apr", volume: 85 },
    { date: "May", volume: 78 },
    { date: "Jun", volume: 90 },
  ];
  
  export const mockDashboardPieData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
  ];
  
  export const mockDashboardBarData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  ];

  