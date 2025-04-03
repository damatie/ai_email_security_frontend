/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Legend,
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

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-xs text-gray-600"
            style={{ color: entry.stroke }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom dot component for a modern look
const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={stroke}
      stroke="white"
      strokeWidth={2}
      className="transition-transform duration-200 hover:scale-125"
    />
  );
};

export interface CustomLineChartProps {
  data: any[];
  suspiciousKey?: string;
  maliciousKey?: string;
}

// amazonq-ignore-next-line
const MyLineChart: React.FC<CustomLineChartProps> = ({
  data,
  suspiciousKey = 'suspicious',
  maliciousKey = 'malicious',
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" className="text-gray-600" />
        <YAxis className="text-gray-600" />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey={suspiciousKey}
          stroke="#FFA500"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey={maliciousKey}
          stroke="#ea384c"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
