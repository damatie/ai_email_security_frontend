'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession, signOut } from 'next-auth/react';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { getUserProfile } from '../userProfile';

/**
 * Custom hook that uses React Query to fetch and cache user profile details.
 * The query only runs if a valid token exists.
 *
 * @returns The query object containing profile data, loading/error states, and a refetch function.
 */

export function useUserProfile() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;
  const { handleApiError } = useApiErrorHandler();

  const query = useQuery({
    queryKey: ['userProfile', token],
    queryFn: () => getUserProfile(token as string),
    enabled: !!token, // Only run the query if the token exists.
    staleTime: 60000, // Data remains fresh for 1 minute.
    refetchOnWindowFocus: true,
  });

  // Handle API errors
  useEffect(() => {
    if (query.error) {
      const { error } = query;

      if (
        (isAxiosError(error) && error?.response?.status === 401) ||
        status === 'unauthenticated'
      ) {
        signOut();
      }

      if (isAxiosError(error) && error?.response?.status !== 401)
        handleApiError(error);
    }
  }, [query.error, handleApiError, query, status]);

  return query;
}
