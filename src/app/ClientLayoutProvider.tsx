//ClientLayoutProvider.tsx
'use client';

import React from 'react';

import LoadingSession from './componets/common/wrapper/LoadingSession';
import './styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './componets/common/toast/ToastContext';
import { Provider } from 'react-redux';
import { store } from './state/store';

export function ClientLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
