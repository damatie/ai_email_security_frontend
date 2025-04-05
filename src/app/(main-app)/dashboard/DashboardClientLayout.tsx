'use client';

import LoadingScreen from '@/app/components/common/LoadingScreen/LoadingScreen';
import SideNav from '@/app/components/navs/side-nav/SideNav';
import TopNav from '@/app/components/navs/top-nav/TopNav';
import { useUserProfile } from '@/app/lib/api-client-services/userProfile';
import { setUserProfile } from '@/app/state/features/userProfile/UserProfileSlice';
import { useAppDispatch, useAppSelector } from '@/app/state/hook';
import { useEffect, useState } from 'react';

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { overviewDetails } = useAppSelector((state) => state.dashboard);
  const { accountConnected } = overviewDetails;
  const { data: fetchedProfile, isSuccess, isError } = useUserProfile();
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

  // Handle mobile menu toggle and prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle sidebar collapse toggle
  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SideNav component */}
      <SideNav
        isMobileMenuOpen={isMobileMenuOpen}
        isCollapsed={isCollapsed}
        onToggleMobile={toggleMobileMenu}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isCollapsed ? 'xl:ml-20' : 'xl:ml-64'
        } w-full overflow-hidden`}
      >
        {/* Fixed TopNav */}
        <div className="sticky top-0 z-10 bg-gray-100 w-full">
          <TopNav
            connectedAccountsCount={accountConnected}
            onToggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-safe">
          <div className="p-6 md:p-10 md:pt-7">
            {isSuccess ? (
              <main className="flex flex-col relative xl:max-w-[1338px] mx-auto pb-10">
                {children}
              </main>
            ) : isError ? (
              <div className="text-center text-red-500">
                <p>Failed to load user profile.</p>
              </div>
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Side Nav Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 xl:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
