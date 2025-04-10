'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { menuItems } from './exportData';
import mainLogo from '../../../../../public/img/logo-inverted.svg';
import { SideNavLoadingSkeleton } from './SideNavLoadingSkeleton';
import useInitials from '@/app/hooks/useInitials';
import CollapsedTooltip from './CollapsedTooltip';
import { useUserProfile } from '@/app/lib/api-client-services/Profile/hooks/useUserProfile';

interface SideNavProps {
  isMobileMenuOpen: boolean;
  isCollapsed?: boolean;
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  isMobileMenuOpen,
  isCollapsed = false,
  onToggleMobile,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const { data: fetchedProfile, isSuccess, isError } = useUserProfile();
  const fullName = `${fetchedProfile?.data?.first_name || ''} ${fetchedProfile?.data?.last_name || ''}`;
  const { initials } = useInitials({ name: fullName });

  // Handle user logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-30 flex flex-col w-[267px] h-full max-h-screen bg-brand-primary text-white transition-all duration-300 ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full xl:translate-x-0'
        } ${isCollapsed ? 'xl:w-20' : 'xl:w-64'}`}
      >
        {/* Header section - fixed height */}
        <div
          className={`flex-shrink-0 flex p-6 px-0 border-b relative border-brand-primary-light items-center ${isCollapsed ? 'justify-center' : 'justify-center'}`}
        >
          {isCollapsed ? (
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Image
                src={mainLogo}
                alt="Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          ) : (
            <>
              <Image src={mainLogo} alt="Logo" className="object-contain" />
              <button
                onClick={onToggleCollapse}
                className="hidden absolute cursor-pointer -right-4 xl:flex h-8 w-8 rounded-full bg-brand-primary items-center justify-center hover:bg-brand-primary transition-all duration-200"
                aria-label="Collapse sidebar"
              >
                <Icon
                  icon="heroicons:chevron-left"
                  className="h-5 w-5 text-white"
                />
              </button>
            </>
          )}
        </div>

        {/* Close button for mobile (top right inside sidenav) */}
        {isMobileMenuOpen && (
          <button
            onClick={onToggleMobile}
            className="absolute top-5 cursor-pointer right-5 h-8 w-8 rounded-full bg-brand-primary-light flex items-center justify-center xl:hidden hover:bg-brand-primary-dark transition-all duration-200"
            aria-label="Close mobile menu"
          >
            <Icon icon="heroicons:x-mark" className="h-5 w-5 text-white" />
          </button>
        )}

        {/* Content wrapper */}
        <div className="flex flex-col flex-grow h-0 overflow-hidden">
          {/* Scrollable navigation area */}
          <div className="flex-grow overflow-hidden overflow-y-auto  mini-scroll">
            <nav className="mt-6 px-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id} className="group">
                    <div className="relative">
                      <Link
                        href={item.path}
                        className={`flex items-center px-3 py-3 rounded-lg text-base transition-all duration-200 ${
                          pathname === item.path
                            ? 'text-white font-semibold bg-brand-primary-light shadow-inner'
                            : 'text-gray-300 hover:bg-brand-primary-light hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                        aria-current={
                          pathname === item.path ? 'page' : undefined
                        }
                      >
                        <span
                          className={`${isCollapsed ? '' : 'mr-3'}`}
                          aria-hidden="true"
                        >
                          <Icon
                            icon={item.icon.props.icon}
                            className="h-6 w-6"
                          />
                        </span>
                        {!isCollapsed && (
                          <span className=" min-w-[190px]">{item.name}</span>
                        )}

                        {/* Active indicator */}
                        {pathname === item.path && (
                          <span
                            className="absolute inset-y-0 left-0 w-1 bg-blue-400 rounded-r-full"
                            aria-hidden="true"
                          ></span>
                        )}
                      </Link>

                      {/* Using reusable tooltip component */}
                      {isCollapsed && <CollapsedTooltip text={item.name} />}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Settings and user profile section - fixed at bottom with known height */}
          <div className="flex-shrink-0">
            <div className="p-2 border-t border-brand-primary-light">
              <div className="group relative">
                <Link
                  href="/profile"
                  className={`flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-brand-primary-light hover:text-white transition-all duration-200 ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  }`}
                >
                  <Icon
                    icon="solar:settings-outline"
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                  {!isCollapsed && (
                    <span className="ml-3 min-w-[170px]">Settings</span>
                  )}
                </Link>

                {/* Using reusable tooltip component */}
                {isCollapsed && <CollapsedTooltip text="Settings" />}
              </div>
            </div>

            {/* User profile section */}
            {!isCollapsed ? (
              <div className="p-4 border-t border-brand-primary-light ">
                {isSuccess ? (
                  <div className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-gray-300 transition-colors">
                    <div className="flex flex-row items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-primary-light flex items-center justify-center mr-3">
                        <span className="font-semibold text-sm">
                          {initials}
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium min-w-[140px]">
                          {fullName}
                        </span>
                        <span className="text-xs font-medium text-brand-green">
                          Active
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 cursor-pointer hover:text-white p-1 rounded-full hover:bg-brand-primary-light transition-all duration-200"
                      aria-label="Logout"
                    >
                      <Icon
                        icon="material-symbols-light:logout-rounded"
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : isError ? (
                  <div className="text-sm text-red-300 px-2 py-1">
                    Failed to load profile
                  </div>
                ) : (
                  <SideNavLoadingSkeleton />
                )}
              </div>
            ) : (
              <div className="py-4 border-t border-brand-primary-light flex justify-center">
                <div className="group relative">
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 cursor-pointer hover:text-white p-2 rounded-full hover:bg-brand-primary-light transition-all duration-200"
                    aria-label="Logout"
                  >
                    <Icon
                      icon="material-symbols-light:logout-rounded"
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Using reusable tooltip component */}
                  <CollapsedTooltip text="Logout" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expand button when sidebar is collapsed - positioned at the edge */}
      {isCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="hidden xl:flex cursor-pointer fixed left-17 top-8 z-20 h-8 w-8 rounded-full bg-brand-primary shadow-lg items-center justify-center hover:bg-brand-primary-dark transition-all duration-200"
          aria-label="Expand sidebar"
        >
          <Icon icon="heroicons:chevron-right" className="h-5 w-5 text-white" />
        </button>
      )}
    </>
  );
};

export default SideNav;
