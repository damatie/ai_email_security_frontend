import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/app/components/common/Button/Button';

interface ConnectCardProps {
  logo: string;
  title: string;
  description: string;
  buttonText: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const ConnectCard: React.FC<ConnectCardProps> = ({
  logo,
  title,
  description,
  buttonText,
  onClick,
  isDisabled,
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:border-brand-primary-light transition-all duration-300 ease-in-out transform w-full lg:w-64">
      <div className="mb-4">
        <Icon icon={logo} width="48" height="48" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-center text-gray-600 mb-6 text-sm">{description}</p>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        variant="primary"
        label={buttonText}
        fullWidth={false}
        className="!h-auto !font-normal"
        customVariantClasses={{
          primary:
            'bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-primary-light transition-colors',
        }}
      ></Button>
    </div>
  );
};

export default ConnectCard;
