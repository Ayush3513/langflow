export const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 250, y: 100 },
    data: {
      label: 'Input Node',
      description: 'Enter search terms and parameters',
      config: {
        searchTerms: '',
        filters: []
      }
    }
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 250, y: 300 },
    data: {
      label: 'Output Node',
      description: 'Configure output format and download',
      config: {
        format: 'pdf',
        includeData: ['problems', 'solutions', 'insights']
      }
    }
  }
]; 