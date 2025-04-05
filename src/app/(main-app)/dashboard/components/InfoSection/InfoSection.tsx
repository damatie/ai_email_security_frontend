import React from 'react';
import { Icon } from '@iconify/react';

interface InfoSectionProps {
  icon: string;
  title: string;
  description: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center w-full md:w-64">
      <div className="text-blue-400 mb-4">
        <Icon icon={icon} width="40" height="40" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm  max-w-[355px]">{description}</p>
    </div>
  );
};

export default InfoSection;
