'use client';

import React from 'react';

export interface AuthFormWrapperProps {
  children: React.ReactNode;
  mainTitle: string;
  subContent: React.ReactNode;
}

export default function AuthFormWrapper({
  children,
  mainTitle,
  subContent,
}: AuthFormWrapperProps) {
  return (
    <main className="w-full flex flex-col gap-[32px] row-start-2 text-br sm:items-start">
      <div className="flex flex-col gap-[3px]">
        <h2 className="text-[24px] text-brand-primary font-semibold p-0">
          {mainTitle}
        </h2>
        <p className="text-base text-brand-secondary">{subContent}</p>
      </div>
      <div className="w-full text-4xl text-gray-200">{children}</div>
    </main>
  );
}
