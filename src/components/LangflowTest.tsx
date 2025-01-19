// import React, { useEffect, useState } from 'react';
// import { langflowService } from '../services/langflowService';

// export const LangflowTest: React.FC = () => {
//   const [apiResponse, setApiResponse] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [rawResponse, setRawResponse] = useState<any>(null);

//   useEffect(() => {
//     const fetchTestData = async () => {
//       try {
//         setLoading(true);
//         const data = await langflowService.fetchData('Generate test data for dashboard');
//         setApiResponse(data);
//         console.log('Raw API Response:', data);
//       } catch (error) {
//         console.error('Error fetching test data:', error);
//         setError(error instanceof Error ? error.message : 'Unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-8">
//         <h2 className="text-xl font-bold mb-4">Loading Langflow Data...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <h2 className="text-xl font-bold mb-4 text-red-500">Error Loading Data</h2>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <h2 className="text-xl font-bold mb-4">Langflow Test Response</h2>
      
//       <div className="grid gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4">Parsed Response</h3>
//           <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96">
//             {JSON.stringify(apiResponse, null, 2)}
//           </pre>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4">Response Structure</h3>
//           <div className="space-y-2">
//             <p><strong>Type:</strong> {typeof apiResponse}</p>
//             <p><strong>Has trendData:</strong> {Boolean(apiResponse?.trendData).toString()}</p>
//             <p><strong>Has pieData:</strong> {Boolean(apiResponse?.pieData).toString()}</p>
//             <p><strong>Has barData:</strong> {Boolean(apiResponse?.barData).toString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }; 