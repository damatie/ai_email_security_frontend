import type { Metadata } from 'next';
import DashboardClientLayout from './DashboardClientLayout';

export const metadata: Metadata = {
  title: 'Inqlo: Dashboard',
  description: 'Welcome to your dashboard',
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
