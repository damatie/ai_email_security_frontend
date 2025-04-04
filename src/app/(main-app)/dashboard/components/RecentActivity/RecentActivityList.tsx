import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/app/components/common/Button/Button';
import { useFormatTime } from '@/app/hooks/useDateTime';

export interface Activity {
  id: number;
  sender: string;
  subject: string;
  threatType: string;
  severity: string;
  timestamp: string;
}

interface RecentActivityListProps {
  activities: Activity[];
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'Malware':
    case 'Phishing':
      return (
        <Icon
          icon="fluent:alert-on-16-filled"
          className="h-5 w-5 text-brand-red"
        />
      );
    case 'Suspicious':
      return (
        <Icon
          icon="fluent:alert-on-16-filled"
          className="h-5 w-5 text-brand-yellow opacity-70"
        />
      );
    case 'Safe':
      return (
        <Icon icon="mdi:shield-check" className="h-5 w-5 text-brand-green" />
      );
    default:
      return <Icon icon="mdi:shield" className="h-5 w-5" />;
  }
};

const RecentActivityList: React.FC<RecentActivityListProps> = ({
  activities,
}) => {
  const formatTime = useFormatTime;
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-4  rounded-[10px] border border-gray-300"
        >
          <div className="flex items-start gap-3">
            {getSeverityIcon(activity.threatType)}
            <div>
              <div className="font-semibold text-sm line-clamp-1 ">
                {activity.subject}
              </div>
              <div className="text-xs text-brand-secondary line-clamp-1">
                From: {activity.sender}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-4 py-1 text-blue-400 bg-blue-50 rounded-full">
                  {activity.threatType}
                </span>
                <span className="text-xs text-brand-secondary">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center  gap-2">
            <Button
              variant="outline"
              fullWidth={false}
              className=" hidden md:flex !h-auto"
              label="Details"
              customVariantClasses={{
                outline:
                  ' border border-gray-200 hover:bg-gray-200 text-brand-primary text-base',
              }}
            />

            <Button
              variant="ghost"
              fullWidth={false}
              className=" flex md:hidden !h-auto !p-0"
              customVariantClasses={{
                ghost: ' bg-gray-50',
              }}
            >
              <Icon
                icon="iconamoon:arrow-right-2-light"
                className="h-6 w-6 text-brand-secondary"
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;
