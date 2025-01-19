import React from 'react';
import { NodeCategory } from '../../types/workflow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import {
  Youtube,
  Search,
  Share2,
  Brain,
  Database,
  FileInput,
  FileOutput,
} from 'lucide-react';

interface NodeConfig {
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

interface NodeType {
  type: string;
  label: string;
  description: string;
  category: NodeCategory;
  icon: React.ReactNode;
  apiRequired?: boolean;
  defaultConfig?: NodeConfig;
}

function NodeSidebar(): JSX.Element {
  const nodeTypes: NodeType[] = [
    {
      type: 'input',
      label: 'Input Node',
      description: 'Enter search terms and parameters',
      category: 'input',
      icon: <FileInput className="h-4 w-4" />,
      defaultConfig: {
        searchTerms: '',
        filters: [],
        targetAudience: ''
      }
    },
    {
      type: 'youtube',
      label: 'YouTube Analysis',
      description: 'Search and analyze YouTube videos',
      category: 'search',
      icon: <Youtube className="h-4 w-4" />,
      apiRequired: true,
      defaultConfig: {
        maxResults: 50,
        includeComments: true,
        sortBy: 'relevance'
      }
    },
    {
      type: 'google',
      label: 'Google Search',
      description: 'Search and analyze Google results',
      category: 'search',
      icon: <Search className="h-4 w-4" />,
      apiRequired: true,
      defaultConfig: {
        maxResults: 10,
        sortBy: 'relevance'
      }
    },
    {
      type: 'social',
      label: 'Social Media',
      description: 'Analyze social media platforms',
      category: 'social',
      icon: <Share2 className="h-4 w-4" />,
      apiRequired: true,
      defaultConfig: {
        platforms: ['twitter', 'reddit', 'facebook'],
        dataPoints: ['sentiment', 'keywords', 'engagement']
      }
    },
    {
      type: 'openai',
      label: 'OpenAI Processing',
      description: 'Process data using OpenAI',
      category: 'processing',
      icon: <Brain className="h-4 w-4" />,
      apiRequired: true,
      defaultConfig: {
        model: 'gpt-4',
        maxTokens: 1000
      }
    },
    {
      type: 'parser',
      label: 'Data Parser',
      description: 'Parse and structure collected data',
      category: 'processing',
      icon: <Database className="h-4 w-4" />,
      defaultConfig: {
        extractFields: ['keywords', 'sentiment', 'topics']
      }
    },
    {
      type: 'output',
      label: 'Output Node',
      description: 'Configure output format and download',
      category: 'output',
      icon: <FileOutput className="h-4 w-4" />,
      defaultConfig: {
        format: 'pdf',
        includeData: ['insights', 'recommendations']
      }
    }
  ];

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: NodeType) => {
    // Create a simplified version of the node data without the icon
    const dragData = {
      type: node.type,
      label: node.label,
      description: node.description,
      category: node.category,
      defaultConfig: node.defaultConfig,
      apiRequired: node.apiRequired,
    };
    
    event.dataTransfer.setData('application/json', JSON.stringify(dragData));
    event.dataTransfer.effectAllowed = 'move';

    // Create a custom drag preview
    const preview = document.createElement('div');
    preview.className = 'bg-background border rounded-md shadow-lg p-3 pointer-events-none fixed -left-full';
    preview.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="text-primary">${node.label}</div>
      </div>
    `;
    document.body.appendChild(preview);

    // Set the drag image
    event.dataTransfer.setDragImage(preview, 0, 0);

    // Clean up the preview element
    requestAnimationFrame(() => {
      preview.remove();
    });
  };

  const nodeCategories = {
    input: 'Input Nodes',
    search: 'Search & Analysis',
    social: 'Social Media',
    processing: 'Data Processing',
    output: 'Output Nodes'
  };

  return (
    <Card className="w-80 border-none rounded-none h-screen">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Available Nodes</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-5rem)] px-4">
        <div className="space-y-6">
          {(Object.keys(nodeCategories) as NodeCategory[]).map((category) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {nodeCategories[category]}
              </h4>
              <div className="space-y-2">
                {nodeTypes
                  .filter((node) => node.category === category)
                  .map((node) => (
                    <Card
                      key={node.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, node)}
                      className="cursor-grab hover:border-primary transition-colors duration-200 hover:shadow-md active:cursor-grabbing"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {node.icon}
                            <span className="font-medium">{node.label}</span>
                          </div>
                          {node.apiRequired && (
                            <Badge variant="secondary" className="text-xs">
                              API
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {node.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

export default NodeSidebar; 