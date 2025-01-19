import React from 'react';

interface Competitor {
  id: string;
  name: string;
  website: string;
  metrics: {
    traffic: string;
    keywords: string;
    backlinks: string;
    growth: string;
  };
  strengths: string;
}

interface CompetitorTableProps {
  competitors: Competitor[];
}

const CompetitorTable: React.FC<CompetitorTableProps> = ({ competitors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Website</th>
            <th className="py-2 px-4 border-b">Traffic</th>
            <th className="py-2 px-4 border-b">Keywords</th>
            <th className="py-2 px-4 border-b">Backlinks</th>
            <th className="py-2 px-4 border-b">Growth</th>
            <th className="py-2 px-4 border-b">Strengths</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((competitor) => (
            <tr key={competitor.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{competitor.id}</td>
              <td className="py-2 px-4 border-b">{competitor.name}</td>
              <td className="py-2 px-4 border-b">
                <a href={competitor.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  {competitor.website}
                </a>
              </td>
              <td className="py-2 px-4 border-b">{competitor.metrics.traffic}</td>
              <td className="py-2 px-4 border-b">{competitor.metrics.keywords}</td>
              <td className="py-2 px-4 border-b">{competitor.metrics.backlinks}</td>
              <td className="py-2 px-4 border-b">{competitor.metrics.growth}</td>
              <td className="py-2 px-4 border-b">{competitor.strengths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorTable; 