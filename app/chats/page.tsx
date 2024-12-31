'use client';

import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useGetChats } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
import { Link } from '@/common/ui';
import { useUser } from '@/context/UserContext';

import { ChatHistory, EmptyChatHistory } from './components';

export default function Chats() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Home);
  }

  const { data, isLoading } = useGetChats(user, !!user);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Your chats</h1>
          <Link
            href={CommonPathnames.Home}
            text={
              <span className="flex items-center">
                Go back to home <ChevronRight size={16} />
              </span>
            }
          />
        </div>
      </header>
      <main>
        {!data?.chats?.length && !isLoading ? (
          <EmptyChatHistory />
        ) : (
          <ChatHistory isLoading={isLoading} data={data} />
        )}
      </main>
    </div>
  );
}
