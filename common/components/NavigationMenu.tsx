'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { cn } from '@/common/utils';

export const NavigationMenu: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={cn('hover:opacity-85', pathname === '/' && 'bg-gray-900 text-white')}
              >
                <span className="text-white text-lg font-bold">ChatBot!</span>
              </Link>
            </div>
            <div className="sm:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={cn(
                    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/' && 'bg-gray-900 text-white',
                  )}
                >
                  Home
                </Link>

                <Link
                  href="/admin"
                  className={cn(
                    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/admin' && 'bg-gray-900 text-white',
                  )}
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
