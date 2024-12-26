import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/common/utils';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}>
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
