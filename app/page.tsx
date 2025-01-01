import { ChevronRight } from 'lucide-react';
import { CommonPathnames } from '@/common/enums';
import { Link } from '@/components/ui';
import { UserLogin } from '@/components/UserLogin';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to ChatBot!</h1>
          <Link
            href={CommonPathnames.Admin}
            text={
              <span className="flex items-center">
                Go to admin panel <ChevronRight size={16} />
              </span>
            }
          />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <UserLogin />
        </div>
      </main>
    </div>
  );
}
