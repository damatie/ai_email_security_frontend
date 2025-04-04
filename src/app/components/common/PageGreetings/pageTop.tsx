'use client';

interface PageTopProps {
  title?: string;
  subTitle?: string;
}

export default function PageTop({ title = '', subTitle = '' }: PageTopProps) {
  return (
    <div className="flex justify-between items-center w-full pt-7  lg:pt-4 mb-10 lg:mb-16">
      <div className=" flex flex-col w-full  ">
        <h1 className=" text-xl md:text-3xl lg:text-[34px] text-brand-primary font-bold capitalize">
          {title}
        </h1>
        <p className=" text-sm text-brand-secondary ">{subTitle}</p>
      </div>
    </div>
  );
}
