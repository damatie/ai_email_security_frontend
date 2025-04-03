import React from 'react';
import CustomPieChart from '@/app/componets/common/Piechart/CustomPieChart';

const ThreatSummary: React.FC = () => {
  // Example data
  const data = [
    { name: 'Malicious', value: 15, color: '#FF4C4C' },
    { name: 'Suspicious', value: 25, color: '#FFA500' },
    { name: 'Safe', value: 60, color: '#00C49F' },
  ];

  return (
    <div className="w-full xl:w-[400px] border border-gray-200 rounded-[10px] p-8 bg-white ">
      <h2 className="text-center mb-8 text-xl text-brand-primary font-bold">
        Threat Summary
      </h2>
      <div className=" flex  flex-col w-full ">
        <CustomPieChart
          data={data}
          innerRadius={60}
          outerRadius={100}
          label="Mailbox"
        />

        {/* Below the chart, display a summary legend */}
        <div className="flex justify-around  text-brand-primary space-x-1 md:space-x-0 md:space-y-4 w-full  text-base   rounded-[15px] font-medium ">
          <div className=" flex flex-col text-center">
            <span className=" font-semibold text-2xl text-brand-secondary ">
              60
            </span>
            <span className=" text-brand-green">● Safe</span>
          </div>
          <div className=" flex flex-col text-center space-x-2">
            <span className="font-semibold text-2xl text-brand-secondary ">
              25
            </span>
            <span className=" text-brand-yellow">● Suspicious</span>
          </div>
          <div className=" flex flex-col text-center space-x-2">
            <span className=" font-semibold text-2xl text-brand-secondary">
              15
            </span>
            <span className=" text-brand-red">● Malicious</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatSummary;
