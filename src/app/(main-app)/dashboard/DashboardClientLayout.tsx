'use client';

import LoadingScreen from '@/app/components/common/LoadingScreen/LoadingScreen';
import SideNav from '@/app/components/navs/side-nav/SideNav';
import TopNav from '@/app/components/navs/top-nav/TopNav';
import { useUserProfile } from '@/app/lib/api-client-services/userProfile';
import { setUserProfile } from '@/app/state/features/userProfile/UserProfileSlice';
import { useAppDispatch, useAppSelector } from '@/app/state/hook';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { overviewDetails } = useAppSelector((state) => state.dashboard);
  const { accountConnected } = overviewDetails;
  const { data: fetchedProfile, isLoading, isSuccess } = useUserProfile();
  const dispatch = useAppDispatch();

  // Save fetched profile to redux state when updated.
  useEffect(() => {
    if (fetchedProfile?.data) {
      try {
        dispatch(setUserProfile(fetchedProfile.data));
      } catch (err) {
        console.error('Failed to set user profile:', err);
      }
    }
  }, [dispatch, fetchedProfile]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button (Visible on Mobile) */}
      <div className="xl:hidden fixed top-7 left-5 z-50">
        <button
          onClick={toggleMobileMenu}
          className=" flex border rounded-[10px] bg-brand-primary h-9 w-9 items-center justify-center"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Icon
            icon={isMobileMenuOpen ? '' : 'fe:text-align-left'}
            className="h-7 w-7 text-gray-200"
          />
        </button>
      </div>

      <SideNav isMobileMenuOpen={isMobileMenuOpen} />

      <div
        className={`flex-1 relative ${
          isMobileMenuOpen ? 'overflow-hidden' : ''
        } xl:ml-64 lg:overflow-x-hidden overflow-y-auto p-6 md:p-10 md:pt-7`}
      >
        <TopNav connectedAccountsCount={accountConnected} />
        {isLoading && <LoadingScreen />}
        {isSuccess && (
          <main className="flex flex-col relative  xl:max-w-[1338px] mx-auto mb-10 ">
            {children}
          </main>
        )}
      </div>

      {/* Mobile Side Nav Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-20 xl:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
