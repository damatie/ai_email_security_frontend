'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface TopNavProps {
  connectedAccountsCount: number;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const TopNav: React.FC<TopNavProps> = ({
  connectedAccountsCount,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-6">
      <div className="flex items-center">
        {/* Mobile menu toggle button moved to TopNav */}
        <button
          onClick={onToggleMobileMenu}
          className="xl:hidden mr-4 flex border rounded-lg bg-brand-primary h-10 w-10 items-center justify-center shadow-md hover:bg-brand-primary-dark transition-all duration-200"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Icon
            icon={isMobileMenuOpen ? 'heroicons:x-mark' : 'fe:text-align-left'}
            className="h-6 w-6 text-white"
          />
        </button>

        {/* <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Dashboard
        </h1> */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Connected accounts indicator */}
        <div className="hidden md:flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
          <Icon icon="heroicons:link" className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-600">
            {connectedAccountsCount}{' '}
            {connectedAccountsCount === 1 ? 'Account' : 'Accounts'} Connected
          </span>
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
          <Icon icon="heroicons:bell" className="h-5 w-5 text-gray-600" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Help/support button */}
        <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
          <Icon
            icon="heroicons:question-mark-circle"
            className="h-5 w-5 text-gray-600"
          />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
