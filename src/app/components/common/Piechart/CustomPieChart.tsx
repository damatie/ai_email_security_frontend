import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from 'recharts';

export type PieData = {
  name: string;
  value: number;
  color?: string;
};

export interface CustomPieChartProps {
  data: PieData[];
  innerRadius?: number;
  outerRadius?: number;
  label?: string;
}

interface CustomPieTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    fill?: string;
    payload?: {
      color?: string;
    };
  }>;
  label?: string;
}

// Custom tooltip for the pie chart using Tailwind CSS
const CustomPieTooltip: React.FC<CustomPieTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3">
        <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={`item-${index}`} className="text-xs text-gray-600">
            <span
              className="inline-block mr-2 w-3 h-3 rounded-full"
              style={{
                backgroundColor: item.fill || item.payload?.color || '#000',
              }}
            ></span>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// amazonq-ignore-next-line
const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  innerRadius = 60,
  outerRadius = 90,
  label,
}) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            isAnimationActive={true}
            animationDuration={800}
            // Use a custom label formatter with subtle styling
            // label={({ name, percent }) =>
            //   `${name} ${(percent * 100).toFixed(0)}%`
            // }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || '#8884d8'}
                stroke="#fff"
                strokeWidth={1}
                // Add a subtle shadow effect using inline style (optional)
                // style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))' }}
              />
            ))}
            {label && (
              <Label
                value={label}
                position="center"
                style={{
                  fontSize: '1rem',
                  fill: '#333',
                  fontWeight: 'bold',
                  textAnchor: 'middle',
                }}
              />
            )}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
