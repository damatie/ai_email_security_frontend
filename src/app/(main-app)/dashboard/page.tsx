'use client';

import PageTop from '@/app/components/common/PageGreetings/pageTop';
import MetricCard from './components/MetricCard/MetricCard';
import ThreatSummary from './components/ThreatSummary/ThreatSummary';
import ThreatTrendBarChart from './components/ThreatTrends/ThreatTrendBarChart';
import RecentActivityCard from './components/RecentActivity/RecentActivityCard';
import { useTimeOfDay } from '@/app/hooks/useDateTime';
import { useUserProfile } from '@/app/lib/api-client-services/Profile/hooks/useUserProfile';
import { ConnectPrompt } from '@/app/components/common/ConnectPrompt/ConnectPrompt';

export default function OverviewPage() {
  const timeOfDay = useTimeOfDay();
  const { data: fetchedProfile } = useUserProfile();
  const name = fetchedProfile?.data?.first_name || '';
  const connectedAccount = fetchedProfile?.data?.connectedAccount || 0;

  const dailyActivityData = [
    { name: 'Mon', suspicious: 32, malicious: 27 },
    { name: 'Tue', suspicious: 38, malicious: 32 },
    { name: 'Wed', suspicious: 45, malicious: 40 },
    { name: 'Thu', suspicious: 23, malicious: 15 },
    { name: 'Fri', suspicious: 30, malicious: 20 },
    { name: 'Sat', suspicious: 16, malicious: 10 },
    { name: 'Sun', suspicious: 12, malicious: 8 },
  ];

  const weeklyActivityData = [
    { name: 'Week 1', suspicious: 120, malicious: 80 },
    { name: 'Week 2', suspicious: 150, malicious: 95 },
    { name: 'Week 3', suspicious: 180, malicious: 110 },
    { name: 'Week 4', suspicious: 90, malicious: 60 },
  ];

  const monthlyActivityData = [
    { name: 'Jan', suspicious: 400, malicious: 300 },
    { name: 'Feb', suspicious: 520, malicious: 380 },
    { name: 'Mar', suspicious: 600, malicious: 420 },
    { name: 'Apr', suspicious: 380, malicious: 290 },
    { name: 'May', suspicious: 450, malicious: 320 },
    { name: 'Jun', suspicious: 520, malicious: 370 },
  ];
  if (connectedAccount === 0) {
    return <ConnectPrompt />;
  }

  return (
    <main className=" animate-fade-up flex flex-col w-full">
      <PageTop
        title={`Good ${timeOfDay}, ${name}!`}
        subTitle="Here’s what happening in your email"
      />
      <div className=" flex flex-col gap-y-8">
        <section className="flex flex-col md:flex-row w-full gap-y-[10px] md:gap-x-[22px] ">
          <MetricCard
            iconName={'fluent:mail-48-regular'}
            title={'Total Emails Scanned'}
            data={'350'}
            dataClassName="text-2xl"
          />
          <MetricCard
            iconName={'fluent:clock-20-regular'}
            title={'Last Scanned'}
            data={'Feb 19, 2025 08:50 AM'}
            dataClassName=""
          />
        </section>
        <section className="flex flex-col xl:flex-row w-full gap-y-8 md:gap-x-[22px] ">
          <ThreatSummary />
          <ThreatTrendBarChart
            dailyData={dailyActivityData}
            weeklyData={weeklyActivityData}
            monthlyData={monthlyActivityData}
          />
        </section>
        <section className="flex flex-row w-full md:gap-x-[22px] ">
          <RecentActivityCard />
        </section>
      </div>
    </main>
  );
}
