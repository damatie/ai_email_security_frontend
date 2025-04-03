import React from 'react';
import { Icon } from '@iconify/react';

interface MetricCardProps {
  iconName: string;
  title: string;
  data: string | number;
  className?: string;
  dataClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  iconName,
  title,
  data,
  className,
  dataClassName,
}) => {
  return (
    <div
      className={`flex items-center p-4 rounded-[10px] md:w-[285px] border border-gray-200 h-[140px] bg-white ${className}`}
    >
      <div className="min-w-12 min-h-12 rounded-full bg-brand-primary-light flex items-center justify-center mr-4">
        <Icon icon={iconName} className="text-white text-2xl" />
      </div>
      <div>
        <p className="text-sm text-brand-secondary">{title}</p>
        <p className={`font-semibold text-brand-secondary ${dataClassName}`}>
          {data}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
