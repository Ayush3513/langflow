import React, { useState, memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { NodeData, CustomNodeProps, NodeStatus } from '../../types/workflow';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Settings2 } from 'lucide-react';

const CustomNode = memo(({ data, selected, id }: CustomNodeProps) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const getStatusColor = (status: NodeStatus | undefined): string => {
    switch (status) {
      case 'running':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getNodeBorderColor = (type: string): string => {
    switch (type) {
      case 'input':
        return 'border-blue-400';
      case 'output':
        return 'border-green-400';
      case 'openai':
        return 'border-purple-400';
      case 'youtube':
      case 'google':
        return 'border-red-400';
      case 'social':
        return 'border-yellow-400';
      case 'parser':
        return 'border-orange-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="react-flow__node-custom" data-id={id}>
      <Handle type="target" position={Position.Top} />
      <Card 
        className={`
          shadow-lg p-4 min-w-[200px] border-2 
          ${getNodeBorderColor(data.type)}
          ${selected ? 'ring-2 ring-primary' : ''}
        `}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-semibold">{data.label}</div>
            <div className="text-sm text-muted-foreground">{data.description}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className="h-8 w-8"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
        
        {data.status && (
          <Badge 
            variant="secondary" 
            className={`mt-2 ${getStatusColor(data.status)}`}
          >
            {data.status}
          </Badge>
        )}

        {isConfigOpen && data.config && (
          <Card className="mt-2 p-2 bg-muted/50">
            <div className="font-medium mb-1 text-sm">Configuration</div>
            {Object.entries(data.config).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-mono">
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
              </div>
            ))}
          </Card>
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode; 