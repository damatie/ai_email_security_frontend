//providers.tsx
'use client';
import LoadingSession from './componets/common/wrapper/LoadingSession';
import './styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './componets/common/toast/ToastContext';

export function ClientLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LoadingSession>
        <ToastProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop
            closeButton={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            icon={false}
            pauseOnHover
            theme="light"
          />
        </ToastProvider>
      </LoadingSession>
    </SessionProvider>
  );
}
