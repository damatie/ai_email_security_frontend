'use client';

import Overlay from '@/app/components/common/BgOverlay/Overlay';
import { FeedbackCard } from '@/app/components/common/FeedbackCard/FeedbackCard';
import LoadingScreen from '@/app/components/common/LoadingScreen/LoadingScreen';
import SideNav from '@/app/components/navs/side-nav/SideNav';
import TopNav from '@/app/components/navs/top-nav/TopNav';
import { setUserProfile } from '@/app/state/features/userProfile/UserProfileSlice';
import { useAppDispatch } from '@/app/state/hook';
import { isAxiosError } from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, useMemo } from 'react';
import { useUserProfile } from '@/app/lib/api-client-services/Profile/hooks/useUserProfile';

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    data: fetchedProfile,
    error,
    isLoading: profileLoading,
  } = useUserProfile();
  const dispatch = useAppDispatch();
  const { status } = useSession();

  // Calculate hasExpired once and memoize the result
  const hasExpired = useMemo(() => {
    return (
      status === 'unauthenticated' ||
      (isAxiosError(error) && error?.response?.status === 401)
    );
  }, [error, status]);

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
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSidebarCollapse = () => setIsCollapsed((prev) => !prev);

  const contentSidebarOffset = isCollapsed ? 'xl:ml-20' : 'xl:ml-64';

  // Show loading screen when session is loading
  if (status === 'loading') {
    return;
  }

  return (
    <div className="flex relative bg-gray-100 min-h-screen">
      {/* SideNav component */}
      <SideNav
        isMobileMenuOpen={isMobileMenuOpen}
        isCollapsed={isCollapsed}
        onToggleMobile={toggleMobileMenu}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${contentSidebarOffset} w-full`}
      >
        {/* Fixed TopNav */}
        <div className="sticky top-0 z-10 bg-gray-100 w-full">
          <TopNav
            onToggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1">
          <div className="p-6 md:p-10 md:pt-7">
            <main className="flex flex-col relative xl:max-w-[1338px] mx-auto pb-10  ">
              {/* Always show children, but add overlay when needed */}
              {profileLoading ? <LoadingScreen /> : children}
            </main>

            {/* Session expired overlay - only shows when hasExpired is true */}
            {/* This overlay doesn't hide the content, it just appears above it */}
            <Overlay isOpen={hasExpired}>
              <FeedbackCard
                IconName="iconoir:clock"
                title="Session Has Expired"
                subTitle="You don't have an active session"
                label="Login"
                nextAction={() => signOut()}
              />
            </Overlay>
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
