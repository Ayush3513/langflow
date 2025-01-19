import { Node, NodeProps } from '@xyflow/react';

export type NodeCategory = 'input' | 'search' | 'social' | 'processing' | 'output';
export type NodeStatus = 'idle' | 'running' | 'completed' | 'error';

export interface NodeConfig {
  [key: string]: unknown;
  searchTerms?: string;
  filters?: string[];
  targetAudience?: string;
  maxResults?: number;
  includeComments?: boolean;
  sortBy?: string;
  platforms?: string[];
  dataPoints?: string[];
  model?: string;
  maxTokens?: number;
  extractFields?: string[];
  format?: string;
  includeData?: string[];
}

export interface NodeData {
  [key: string]: unknown;
  label: string;
  description: string;
  type: string;
  category: NodeCategory;
  config?: NodeConfig;
  status?: NodeStatus;
}

export type WorkflowNode = Node<NodeData>;

export type CustomNodeProps = NodeProps<NodeData>;

export interface ProcessedData {
  insights: string[];
  keywords: string[];
  sentiment: string;
  recommendations: string[];
} 