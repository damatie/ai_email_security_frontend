import type { Metadata } from 'next';
import AuthClientLayout from './AuthClientLayout';

export const metadata: Metadata = {
  title: 'Inqlo: Login',
  description: 'Login to your dashboard',
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthClientLayout>{children}</AuthClientLayout>;
}
