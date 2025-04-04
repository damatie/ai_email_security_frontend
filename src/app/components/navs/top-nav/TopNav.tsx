'use client';

import { Icon } from '@iconify/react';

interface TopNavProps {
  connectedAccountsCount?: number;
}

export default function TopNav({ connectedAccountsCount = 1 }: TopNavProps) {
  return (
    <nav className="flex justify-end items-center w-full">
      <div className=" flex max-w-60 gap-x-4  items-center justify-center rounded-4xl bg- text-brand-secondary border border-gray-300 text-xs p-2 px-4">
        <Icon
          icon="lets-icons:bell-pin-light"
          className="h-6 w-6 text-red-500 cursor-pointer font-semibold"
        />
        <p className=" font-semibold">
          {connectedAccountsCount} Account connected
        </p>
      </div>
    </nav>
  );
}
