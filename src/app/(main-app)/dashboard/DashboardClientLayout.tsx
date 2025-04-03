'use client';

import SideNav from '@/app/componets/navs/side-nav/SideNav';
import TopNav from '@/app/componets/navs/top-nav/TopNav';
import { useAppSelector } from '@/app/state/hook';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { overviewDetails } = useAppSelector((state) => state.dashboard);
  const { accountConnected } = overviewDetails;

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button (Visible on Mobile) */}
      <div className=" xl:hidden fixed top-7 left-5 z-50 ">
        <button
          onClick={toggleMobileMenu}
          className="border rounded-[10px] bg-brand-primary p-1 "
        >
          <Icon
            // amazonq-ignore-next-line
            icon={isMobileMenuOpen ? '' : 'fe:text-align-left'}
            className={`h-6 w-6 ${isMobileMenuOpen ? ' text-gray-200' : 'text-gray-200'}`}
          />
        </button>
      </div>

      <SideNav isMobileMenuOpen={isMobileMenuOpen} />

      <div
        className={`flex-1 ${
          isMobileMenuOpen ? 'overflow-hidden' : ''
        } xl:ml-64 lg:overflow-x-hidden  overflow-y-auto p-6 md:p-10 md:pt-7`}
      >
        <TopNav connectedAccountsCount={accountConnected} />
        <main className=" flex flex-col xl:max-w-[1338px]  mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Side Nav Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-20 xl:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
}
