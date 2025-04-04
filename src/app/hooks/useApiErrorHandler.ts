/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import axios from 'axios';
import { useToast } from '../components/common/toast/ToastContext';

// Define a type for toast options to improve type checking
type ToastOptions = Parameters<ReturnType<typeof useToast>['showToast']>[2];

// Centralize toast configuration
const defaultErrorToastOptions: ToastOptions = {
  className: 'custom-toast custom-toast-error',
};

// Handle errors returned from API
export function useApiErrorHandler() {
  const { showToast } = useToast();

  const handleApiError = useCallback(
    (error: unknown, customMessage?: string) => {
      // Check if the error is an Axios error

      if (axios.isAxiosError(error)) {
        // Get the error message from response data or use error.message

        const errorMessage =
          error?.response?.data?.detail?.msg ||
          error?.message ||
          'An error occurred try again later';

        showToast(
          customMessage || errorMessage,
          'error',
          defaultErrorToastOptions
        );
      } else {
        // Check if the error might be a response object from create_response()
        const errorObj = error as { data?: { msg?: string } };

        const errorMessage =
          errorObj.data?.msg || customMessage || 'An unexpected error occurred';

        showToast(errorMessage, 'error', defaultErrorToastOptions);
      }
    },
    []
  );

  return { handleApiError };
}
