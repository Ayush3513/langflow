export interface Research {
  id: string;
  title: string;
  source: 'youtube' | 'social' | 'competitor';
  date: string;
  insights: string[];
  metrics: {
    views?: number;
    engagement?: number;
    sentiment?: number;
  };
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  frequency: number;
}

export interface Trend {
  id: string;
  name: string;
  growth: number;
  category: string;
  volume: number;
}

export interface Analytics {
  views: number[];
  engagement: number[];
  sentiment: number[];
  dates: string[];
}