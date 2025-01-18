export interface Keyword {
  id: string;
  term: string;
  searchVolume: number;
  difficulty: number;
  competition: number;
  ctr: number;
  trend: number[];
}

export interface KeywordTrend {
  date: string;
  volume: number;
}