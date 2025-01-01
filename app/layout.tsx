'use client';

import { Inter } from 'next/font/google';
import { cn } from '@/common/utils';
import { Toaster } from '@/components/ui';
import { ReactQueryProvider, UserProvider } from '@/provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <UserProvider>
            <main className="container mx-auto px-4">{children}</main>
            <Toaster />
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
