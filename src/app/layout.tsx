import type { Metadata } from 'next';
import { ClientLayoutProvider } from './ClientLayoutProvider';

export const metadata: Metadata = {
  title: 'Inqlo',
  description: 'Intelligent email security',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutProvider>{children}</ClientLayoutProvider>
      </body>
    </html>
  );
}
