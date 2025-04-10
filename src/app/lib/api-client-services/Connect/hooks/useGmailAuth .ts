'use client';

import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import {
  generateGmailConnectionUrl,
  getGmailToken,
} from '../connectGmailAccount';

interface OAuthCallbackData {
  state?: string;
  code?: string;
  error?: string;
}

/**
 * Hook for connecting with Gmail, handling OAuth popup flow
 */
export function useConnectWithGmail(
  options = {
    popupWidth: 400,
    popupHeight: 400,
    popupTitle: 'Choose Gmail Account',
  }
) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { handleApiError } = useApiErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);
  const [msg, setMsg] = useState('');

  // Function to fetch the Gmail authentication URL
  const fetchGmailUrl = useCallback(async () => {
    if (!token) {
      return null;
    }

    try {
      const result = await generateGmailConnectionUrl(token);
      return result;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  }, [token, handleApiError]);

  // Function to exchange the code for a token
  const exchangeCodeForToken = useCallback(
    async (code: string, state: string) => {
      if (!state || !code) {
        return null;
      }

      try {
        const result = await getGmailToken(code, state);
        return result;
      } catch (error) {
        handleApiError(error);
        return null;
      }
    },
    [handleApiError]
  );

  // Function to open the Gmail authorization popup
  const connectGmailAccount = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);
    // Initialize  for a new connection
    setIsAccessDenied(false);
    setIsConnected(false);
    setIsConnectionFailed(false);
    setMsg('');

    try {
      const result = await fetchGmailUrl();

      if (result?.data?.auth_url) {
        const { popupWidth, popupHeight, popupTitle } = options;

        // Calculate popup position for center of screen
        const left = (window.innerWidth - popupWidth) / 2;
        const top = (window.innerHeight - popupHeight) / 2;

        // Open the popup
        const popup = window.open(
          result.data.auth_url,
          popupTitle,
          `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );

        if (!popup) {
          console.error(
            'Failed to open popup window. It may have been blocked by the browser.'
          );
          setIsLoading(false);
          return;
        }

        // Check if popup was closed manually
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            setIsLoading(false);
          }
        }, 500);

        // Listen for messages from the popup
        const messageHandler = async (
          event: MessageEvent<OAuthCallbackData>
        ) => {
          if (event.source === popup) {
            const { code, state, error } = event.data;

            // Clean up regardless of outcome
            window.removeEventListener('message', messageHandler);
            clearInterval(checkClosed);
            popup?.close();

            if (code && state) {
              // Exchange code for token
              try {
                // Exchange code for token using await
                const result = await exchangeCodeForToken(code, state);

                if (result) {
                  setMsg(result?.msg);
                  setIsConnected(true);
                } else {
                  setIsConnectionFailed(true);
                  setMsg('Failed to connect with Gmail');
                }
              } catch {}
            } else if (error) {
              // Check for specific access denied error
              if (error === 'access_denied') {
                setIsAccessDenied(true);
                setMsg('User denied access to their Gmail account');
              } else {
                console.error('Authentication error:', error);
              }
            }

            setIsLoading(false);
          }
        };

        window.addEventListener('message', messageHandler);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to connect Gmail account:', error);
      handleApiError(error);
      setIsLoading(false);
    }
  }, [token, fetchGmailUrl, exchangeCodeForToken, options, handleApiError]);

  return {
    connectGmailAccount,
    setMsg,
    isLoading,
    isAccessDenied,
    isConnected,
    isConnectionFailed,
    msg,
  };
}

// Code for the callback page (to be included in the page that the OAuth provider redirects to)
export const handleOAuthCallback = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const error = urlParams.get('error');

  if (window.opener) {
    if (code && state) {
      // Success case - send code and state back
      window.opener.postMessage({ code, state }, window.opener.location.origin);
    } else if (error) {
      // Error case - including access denied
      window.opener.postMessage({ error }, window.opener.location.origin);
    } else {
      // Unexpected state
      window.opener.postMessage(
        { error: 'missing_parameters' },
        window.opener.location.origin
      );
    }
  } else {
    console.error('Missing opener window');
  }
};
