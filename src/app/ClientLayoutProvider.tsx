//ClientLayoutProvider.tsx
'use client';

import React from 'react';

import LoadingSession from './components/common/wrapper/LoadingSession';
import './styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './components/common/toast/ToastContext';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function ClientLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <LoadingSession>
            <ToastProvider>
              {children}
              <ToastContainer
                position="bottom-right"
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
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}
