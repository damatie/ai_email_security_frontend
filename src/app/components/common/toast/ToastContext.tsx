'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { toast, ToastOptions as ReactToastifyOptions } from 'react-toastify';
import '@/app/styles/toast-styles.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextType {
  showToast: (
    message: string,
    type?: ToastType,
    options?: ReactToastifyOptions
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    options?: ReactToastifyOptions
  ) => {
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warning(message, options);
        break;
      case 'info':
      default:
        toast.info(message, options);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Re-export the ToastOptions type from react-toastify
export type ToastOptions = ReactToastifyOptions;
