import { WorkflowNode } from '../types/workflow';

export const initialNodes: WorkflowNode[] = [
  {
    id: 'input-1',
    type: 'customNode',
    position: { x: 250, y: 50 },
    data: {
      label: 'Input Node',
      description: 'Enter search terms and parameters',
      type: 'input',
      category: 'input',
      config: {
        searchTerms: '',
        filters: [],
        targetAudience: ''
      }
    }
  },
  {
    id: 'output-1',
    type: 'customNode',
    position: { x: 250, y: 350 },
    data: {
      label: 'Output Node',
      description: 'Configure output format and download',
      type: 'output',
      category: 'output',
      config: {
        format: 'pdf',
        includeData: ['problems', 'solutions', 'insights', 'trends'],
        sortBy: 'relevance'
      }
    }
  }
]; 