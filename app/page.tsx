import { ChevronRight } from 'lucide-react';
import { getAllUsers } from '@/common/api/queries';
import { CommonPathnames } from '@/common/enums';
import { Link } from '@/components/ui';
import { UserLogin } from '@/components/UserLogin';

export default async function Home() {
  const { users, error } = await getAllUsers();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-8">An error ocurred, please try again later.</p>
      </div>
    );
  }

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
        <UserLogin users={users} />
      </main>
    </div>
  );
}
