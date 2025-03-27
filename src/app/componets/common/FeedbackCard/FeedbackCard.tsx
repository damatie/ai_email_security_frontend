import React from 'react';
import Image from 'next/image';
import CheckList from '../../../../../public/icons/check.svg';
import { Button } from '@/app/componets/common/Button/Button';

interface FeedbackCardProps {
  title: string;
  subTitle?: string;
  nextAction: () => void;
  containerStyle?: string;
  label?: string;
  Icon?: string;
  textClass?: string;
  titleClass?: string;
  hasAnimation?: boolean;
}

export function FeedbackCard({
  title,
  subTitle,
  nextAction,
  containerStyle,
  label = 'Continue',
  Icon,
  titleClass,
  textClass,
  hasAnimation = true,
}: FeedbackCardProps) {
  return (
    <div
      className={` ${
        hasAnimation && 'animate-fade-in-scale'
      }  mx-auto  w-full max-w-[420px] mt-[50px] lg:mt-[24px] ${containerStyle}`}
    >
      <span className=" flex flex-col  items-center w-full ">
        <Image src={Icon ?? CheckList} alt="CheckList" className=" w-[80px]" />
      </span>
      <h3
        className={`font-Rubik text-center font-medium mt-[19px] text-[24px] text-brand-primary dark:text-secondaryGray ${titleClass}`}
      >
        {title}
      </h3>
      <p
        className={`mt-[8px] text-center   text-base text-brand-secondary dark:text-inputBorder ${textClass}`}
      >
        {subTitle}
      </p>
      <Button
        onClick={() => {
          nextAction();
        }}
        label={label}
        type="button"
        className=" mt-[16px] w-full"
      />
    </div>
  );
}
