import React from 'react';
import RecentActivityList, { Activity } from './RecentActivityList';
import { Icon } from '@iconify/react';
import { Button } from '@/app/componets/common/Button/Button';

const recentActivity: Activity[] = [
  {
    id: 1,
    sender: 'marketing@company-updates.com',
    subject: 'Special offer just for you!',
    threatType: 'Safe',
    severity: 'low',
    timestamp: '2023-06-15T07:45:00Z',
  },
  {
    id: 2,
    sender: 'newsletter@tech-news.com',
    subject: 'Your Weekly Tech Digest',
    threatType: 'Suspicious',
    severity: 'medium',
    timestamp: '2023-06-15T06:30:00Z',
  },
  {
    id: 3,
    sender: 'support@cloud-storage.com',
    subject: 'Action Required: Verify Your Account',
    threatType: 'Phishing',
    severity: 'high',
    timestamp: '2023-06-14T23:15:00Z',
  },
  {
    id: 4,
    sender: 'team@project-management.com',
    subject: 'Project Update: Q2 Goals',
    threatType: 'Malware',
    severity: 'critical',
    timestamp: '2023-06-14T18:20:00Z',
  },
  {
    id: 5,
    sender: 'team@project-management.com',
    subject: 'Project Update: Q2 Goals',
    threatType: 'Suspicious',
    severity: 'low',
    timestamp: '2023-06-14T18:20:00Z',
  },
];

const RecentActivityCard: React.FC = () => {
  return (
    <div
      className={`
      flex flex-col w-full col-span-1 lg:col-span-2 bg-white rounded-[10px] p-6
      border border-gray-300 transition-all animate-fade-in
    `}
    >
      <div className="flex flex-row items-center justify-between pb-7">
        <div>
          <h2 className="text-xl font-bold text-brand-primary flex items-center gap-2">
            Recent Threat Activity
          </h2>
          <p className="text-sm text-brand-secondary">
            Recently detected threats requiring attention
          </p>
        </div>
      </div>
      <div>
        <RecentActivityList activities={recentActivity} />
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          fullWidth
          label="View All Activity"
          customVariantClasses={{
            outline:
              ' border border-gray-200 hover:bg-gray-100 text-brand-primary',
          }}
        >
          <Icon icon="mdi:open-in-new" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityCard;
