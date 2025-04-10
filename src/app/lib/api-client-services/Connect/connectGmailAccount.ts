import { api, apiVersion, setAuthToken } from '../axios-client';

// Generate Gmail connection URL
export const generateGmailConnectionUrl = async (token: string) => {
  // Set authorization token for the request
  setAuthToken(token);
  const url = `${apiVersion.v1}/email/integration/gmail/auth-url`;
  const response = await api.get(url);
  return response.data;
};

// Get token from  Gmail
export const getGmailToken = async (code: string, state: string) => {
  const url = `${apiVersion.v1}/email/integration/gmail/token?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`;
  const response = await api.get(url);
  return response.data;
};
