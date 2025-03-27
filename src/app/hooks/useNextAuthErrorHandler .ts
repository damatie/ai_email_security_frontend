import { useCallback } from 'react';
import { useToast } from '../componets/common/toast/ToastContext';

// Define a type for toast options to improve type checking
type ToastOptions = Parameters<ReturnType<typeof useToast>['showToast']>[2];

// Centralize toast configuration
const defaultErrorToastOptions: ToastOptions = {
  className: 'custom-toast custom-toast-error',
};

// Handle error returned from next-auth
enum AuthErrorType {
  FORBIDDEN = 'FORBIDDEN:',
  UNAUTHORIZED = 'UNAUTHORIZED:',
  NOTFOUND = 'NOTFOUND',
  ERROR = 'ERROR:',
}

export const useNextAuthErrorHandler = () => {
  const { showToast } = useToast();

  const handleNextAuthError = useCallback(
    (error: string | undefined) => {
      // Early return if no error
      if (!error) return null;

      // Use a switch statement for more readable and potentially more performant error handling
      switch (true) {
        case error.startsWith(AuthErrorType.FORBIDDEN):
          return 403;

        case error.startsWith(AuthErrorType.UNAUTHORIZED):
          showToast(
            'Please check your email and password and try again.',
            'error',
            defaultErrorToastOptions
          );
          return 401;

        case error.startsWith(AuthErrorType.NOTFOUND):
          showToast(
            'No user found with this email. Create an account!',
            'error',
            defaultErrorToastOptions
          );
          return 404;

        case error.startsWith(AuthErrorType.ERROR):
          showToast('Authentication failed', 'error', defaultErrorToastOptions);
          return 500; // Generic server error

        default:
          showToast(
            'An unexpected error occurred. Please try again later or contact support',
            'error',
            defaultErrorToastOptions
          );
          return null;
      }
    },
    [showToast]
  );
  return { handleNextAuthError };
};
