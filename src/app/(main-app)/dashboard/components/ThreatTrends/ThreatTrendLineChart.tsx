import React from 'react';
import CustomLineChart from '@/app/components/common/LineChart/CustomLineChart';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/common/Tabs/Tabs';

interface ThreatTrendLineChartProps {
  dailyData: unknown[];
  weeklyData: unknown[];
  monthlyData: unknown[];
}

const ThreatTrendLineChart: React.FC<ThreatTrendLineChartProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
}) => {
  return (
    <div className="border  flex flex-col flex-1 border-gray-300 bg-white rounded-[10px] p-6 transition-all animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl text-brand-primary font-bold">
          Threat Activity Trends
        </h2>
        <div className="mt-2 md:mt-0">
          <div className="flex flex-col  space-x-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FFA500]" />
              <span className="text-sm">Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ea384c]" />
              <span className="text-sm">Malicious</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Tabs defaultValue="daily">
          <TabsList className="mb-4 bg-gray-100  max-w-fit p-1 rounded-[10px] text-sm">
            <TabsTrigger value="daily" className="">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="h-[300px]">
            <CustomLineChart data={dailyData} />
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <CustomLineChart data={weeklyData} />
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <CustomLineChart data={monthlyData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ThreatTrendLineChart;
