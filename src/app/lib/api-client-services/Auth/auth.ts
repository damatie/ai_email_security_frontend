import { api, apiVersion } from '../axios-client';
import { CreateAccountValues } from '@/app/(main-app)/(auth)/register/page';
import { ForgotPasswordValues } from '@/app/(main-app)/(auth)/forgot-password/page';
import { ResetPasswordValues } from '@/app/(main-app)/(auth)/reset-password/page';
import { VerifyEmailValues } from '@/app/(main-app)/(auth)/verify-email/page';

// Create account
export const creatAccount = async (payload: CreateAccountValues) => {
  const url = `${apiVersion.v1}/auth/register`;
  return await api.post(url, payload);
};

//Verify email
export const verifyEmail = async (payload: VerifyEmailValues) => {
  const url = `${apiVersion.v1}/auth/verify-email/complete`;
  return await api.post(url, payload);
};

// User resend verification email
export const resendVerificationEmail = async (payload: {
  email: string | undefined;
}) => {
  const url = `${apiVersion.v1}/auth/email-verification/resend`;
  return await api.post(url, payload);
};

// Forgot password
export const forgotPassword = async (payload: ForgotPasswordValues) => {
  const url = `${apiVersion.v1}/auth/forgot-password`;
  return await api.post(url, payload);
};

// Reset password
export const resetPassword = async (payload: ResetPasswordValues) => {
  const url = `${apiVersion.v1}/auth/reset-password`;
  return await api.post(url, payload);
};
