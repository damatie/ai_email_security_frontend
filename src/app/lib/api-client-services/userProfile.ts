import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { api, apiVersion, setAuthToken } from './axios-client';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import { useEffect } from 'react';

/**
 * Fetches the user profile details from the API.
 * The provided token is used to set the Authorization header.
 *
 * @param token - The access token from the NextAuth session.
 * @returns The API response data.
 */
export const getUserProfile = async (token: string) => {
  // Ensure the Authorization header is set for this request
  setAuthToken(token);
  const url = `${apiVersion.v1}/individual/dashboard/profile`;
  const response = await api.get(url);
  return response.data;
};

/**
 * Custom hook that uses React Query to fetch and cache user profile details.
 * The query only runs if a valid token exists.
 *
 * @returns The query object containing profile data, loading/error states, and a refetch function.
 */

export function useUserProfile() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { handleApiError } = useApiErrorHandler();

  const query = useQuery({
    queryKey: ['userProfile', token],
    queryFn: () => getUserProfile(token as string),
    enabled: !!token, // Only run the query if the token exists.
    staleTime: 60000, // Data remains fresh for 1 minute.
    refetchOnWindowFocus: false,
  });

  // Handle error outside the useQuery options
  useEffect(() => {
    if (query.error) {
      handleApiError(query.error);
    }
  }, [query.error, handleApiError]);

  return query;
}
