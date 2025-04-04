/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Custom tooltip with Tailwind styling
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    stroke: string;
  }>;
  label?: string;
}
// Custom tooltip using Tailwind CSS for a modern look.
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3">
        <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={`item-${index}`} className="text-xs text-gray-600">
            <span
              className="inline-block mr-2 w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            ></span>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface CustomBarChartProps {
  data: any[];
  suspiciousKey?: string;
  maliciousKey?: string;
}

const MyBarChart: React.FC<CustomBarChartProps> = ({
  data,
  suspiciousKey = 'suspicious',
  maliciousKey = 'malicious',
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#4B5563" />
        <YAxis stroke="#4B5563" />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey={suspiciousKey}
          fill="#FFA500"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
        />
        <Bar
          dataKey={maliciousKey}
          fill="#ea384c"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
