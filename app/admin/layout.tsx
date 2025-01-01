import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { CommonPathnames } from '@/common/enums';
import { Link } from '@/components/ui';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin dashboard</h1>
          <Link
            href={CommonPathnames.Home}
            text={
              <span className="flex items-center">
                Home <ChevronRight size={16} />
              </span>
            }
          />
        </div>
      </header>
      <main>
        <div className="max-w-8xl mx-auto py-6">{children}</div>
      </main>
    </div>
  );
}
