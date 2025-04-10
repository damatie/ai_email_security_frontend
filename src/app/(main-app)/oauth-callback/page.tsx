'use client';

import LoadingScreen from '@/app/components/common/LoadingScreen/LoadingScreen';
import { handleOAuthCallback } from '@/app/lib/api-client-services/Connect/hooks/useGmailAuth ';
import React from 'react';

const OAuthCallbackPage: React.FC = () => {
  // Call this function when the callback page loads
  if (window.location.pathname.includes('/oauth-callback')) {
    handleOAuthCallback();
  }

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 bg-white z-40 w-auto flex items-center justify-center h-full ">
      <LoadingScreen showLoadingText={false} />
    </div>
  );
};

export default OAuthCallbackPage;
