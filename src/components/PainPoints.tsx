import React from 'react';
import { Target, AlertTriangle, TrendingUp } from 'lucide-react';
import type { PainPoint } from '../types/research';
import { mockPainPoints } from '../mockData';

const SeverityBadge: React.FC<{ severity: PainPoint['severity'] }> = ({
  severity,
}) => {
  const colors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[severity]}`}
    >
      {severity}
    </span>
  );
};

export const PainPoints: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pain Points</h1>
        <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Target className="mr-2" size={16} />
          Add Pain Point
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPainPoints.map((painPoint) => (
          <div
            key={painPoint.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{painPoint.title}</h3>
                <SeverityBadge severity={painPoint.severity} />
              </div>
              <AlertTriangle
                className={`${
                  painPoint.severity === 'high'
                    ? 'text-red-500'
                    : painPoint.severity === 'medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
                size={20}
              />
            </div>

            <p className="text-sm text-gray-500 mb-4">{painPoint.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {painPoint.frequency}% frequency
                </span>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};