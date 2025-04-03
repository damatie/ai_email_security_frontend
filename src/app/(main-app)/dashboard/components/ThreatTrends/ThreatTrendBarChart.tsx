import CustomBarChart from '@/app/componets/common/BarChart/BarChart';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/componets/common/Tabs/Tabs';
import React from 'react';

interface ThreatTrendBarChartProps {
  dailyData: unknown[];
  weeklyData: unknown[];
  monthlyData: unknown[];
}

const ThreatTrendBarChart: React.FC<ThreatTrendBarChartProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
}) => {
  return (
    <div className="border  flex flex-col flex-1 border-gray-300 bg-white rounded-[10px] p-6 transition-all animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl font-bold text-brand-primary">
          Threat Activity Trends
        </h2>
        <div className="mt-2 md:mt-0">
          <div className="flex flex-col  text-brand-secondary space-x-4">
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
            <CustomBarChart data={dailyData} />
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <CustomBarChart data={weeklyData} />
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <CustomBarChart data={monthlyData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ThreatTrendBarChart;
