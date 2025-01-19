import React, { useState, useCallback, useRef, DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  NodeTypes,
  Panel,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/workflow/CustomNode';
import NodeSidebar from '../components/workflow/NodeSidebar';
import { initialNodes } from '../data/workflowNodes';
import { NodeService } from '../services/nodeService';
import { WorkflowNode, NodeConfig, NodeData, ProcessedData } from '../types/workflow';
import { NodeStatus } from '../types/workflow';
import { Button } from '../components/ui/button';
import { Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const nodeTypes: NodeTypes = {
  customNode: CustomNode,
};

interface WorkflowResults {
  [key: string]: ProcessedData;
}

// Create a separate component for the flow content
function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const navigate = useNavigate();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      let nodeData;
      
      try {
        nodeData = JSON.parse(event.dataTransfer.getData('application/json'));
      } catch (error) {
        console.error('Error parsing drag data:', error);
        return;
      }

      if (!reactFlowBounds || !nodeData) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<NodeData> = {
        id: `${nodeData.type}-${Date.now()}`,
        type: 'customNode',
        position,
        data: {
          label: nodeData.label,
          description: nodeData.description,
          type: nodeData.type,
          category: nodeData.category,
          config: nodeData.defaultConfig || {},
          status: 'idle',
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes],
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  const updateNodeStatus = (nodeId: string, status: NodeStatus) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, status },
          };
        }
        return node;
      })
    );
  };

  const checkRequiredApiKeys = (nodeType: string): boolean => {
    const keys = JSON.parse(localStorage.getItem('api_keys') || '{}');
    
    switch (nodeType) {
      case 'openai':
        return !!keys.OPENAI_API_KEY;
      case 'youtube':
        return !!keys.YOUTUBE_API_KEY;
      case 'google':
        return !!keys.GOOGLE_API_KEY;
      case 'social':
        return !!keys.TWITTER_API_KEY || !!keys.REDDIT_API_KEY;
      default:
        return true;
    }
  };

  const processNode = async (node: Node<NodeData>, inputData: ProcessedData): Promise<ProcessedData> => {
    if (!checkRequiredApiKeys(node.data.type)) {
      updateNodeStatus(node.id, 'error');
      throw new Error(`Missing required API keys for ${node.data.type} node. Please check Settings.`);
    }

    updateNodeStatus(node.id, 'running');
    try {
      let result: ProcessedData;
      const config = node.data.config || {};
      
      switch (node.data.type) {
        case 'youtube':
          const ytResult = await NodeService.processYouTubeNode(config);
          result = await NodeService.processParser(ytResult);
          break;
        case 'google':
          const googleResult = await NodeService.processGoogleSearch(config);
          result = await NodeService.processParser(googleResult);
          break;
        case 'social':
          const socialResult = await NodeService.processSocialMedia(config);
          result = await NodeService.processParser(socialResult);
          break;
        case 'openai':
          result = await NodeService.processOpenAI(inputData);
          break;
        default:
          throw new Error(`Unknown node type: ${node.data.type}`);
      }
      
      updateNodeStatus(node.id, 'completed');
      return result;
    } catch (error) {
      updateNodeStatus(node.id, 'error');
      console.error(`Error processing node ${node.id}:`, error);
      throw error;
    }
  };

  const handleStartAutomation = async () => {
    setIsRunning(true);
    try {
      const workflowNodes = nodes as Node<NodeData>[];
      const sortedNodes = topologicalSort(workflowNodes, edges);
      const previousResults: WorkflowResults = {};

      for (const node of sortedNodes) {
        const result = await processNode(node, previousResults[node.id]);
        previousResults[node.id] = result;
      }

      const outputNode = nodes.find((n) => n.data.type === 'output');
      if (outputNode && outputNode.data.config) {
        await generateOutput(previousResults, outputNode.data.config);
      }
    } catch (error) {
      console.error('Workflow execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const generateOutput = async (data: WorkflowResults, config: NodeConfig) => {
    const { format = 'pdf', includeData = [] } = config;
    console.log('Generating output in format:', format, 'with data:', includeData);
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Background />
          <Controls />
          <Panel position="top-right" className="flex gap-2">
            <Button
              onClick={() => navigate('/settings')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4" />
              API Settings
            </Button>
            <Button
              onClick={handleStartAutomation}
              disabled={isRunning}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {isRunning ? 'Running...' : 'Start Workflow'}
            </Button>
          </Panel>
        </ReactFlow>
      </div>
      <NodeSidebar />
    </div>
  );
}

// Main component that wraps the Flow with ReactFlowProvider
function WorkflowAutomation(): JSX.Element {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

function topologicalSort(nodes: Node<NodeData>[], edges: Edge[]): Node<NodeData>[] {
  const visited = new Set<string>();
  const temp = new Set<string>();
  const order: Node<NodeData>[] = [];
  const graph = new Map<string, string[]>();

  // Build adjacency list
  edges.forEach((edge) => {
    if (!graph.has(edge.source)) {
      graph.set(edge.source, []);
    }
    graph.get(edge.source)?.push(edge.target);
  });

  function visit(nodeId: string) {
    if (temp.has(nodeId)) {
      throw new Error('Workflow has a cycle');
    }
    if (!visited.has(nodeId)) {
      temp.add(nodeId);
      const neighbors = graph.get(nodeId) || [];
      neighbors.forEach(visit);
      temp.delete(nodeId);
      visited.add(nodeId);
      const node = nodes.find((n) => n.id === nodeId);
      if (node) order.unshift(node);
    }
  }

  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      visit(node.id);
    }
  });

  return order;
}

export default WorkflowAutomation; 