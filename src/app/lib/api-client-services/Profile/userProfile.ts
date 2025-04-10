'use client';

import { api, apiVersion, setAuthToken } from '../axios-client';

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
