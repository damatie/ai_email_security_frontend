import React from 'react';
import { Button } from '@/app/components/common/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FeedbackCardProps {
  title: string;
  subTitle?: React.ReactNode;
  nextAction: () => void;
  containerStyle?: string;
  label?: string;
  IconName?: string;
  textClass?: string;
  titleClass?: string;
  iconClassName?: string;
  hasAnimation?: boolean;
}

export function FeedbackCard({
  title,
  subTitle,
  nextAction,
  containerStyle,
  label = 'Continue',
  IconName = '',
  titleClass,
  textClass,
  iconClassName,
  hasAnimation = true,
}: FeedbackCardProps) {
  return (
    <div
      className={` ${
        hasAnimation && 'animate-fade-in-scale'
      }  mx-auto  w-full max-w-[420px] mt-[50px] lg:mt-[24px] ${containerStyle}`}
    >
      <span className=" flex flex-col  items-center w-full ">
        <Icon
          icon={IconName}
          className={`h-20 w-20 ${iconClassName}`}
          aria-hidden="true"
        />
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
