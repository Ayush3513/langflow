import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

interface OverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  change,
  icon,
}) => {
  const isPositive = change && change > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {change && (
          <span
            className={clsx(
              'flex items-center text-sm font-medium',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
};