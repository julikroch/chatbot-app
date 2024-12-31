'use client';

import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useGetChats } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
import { Link, Spinner } from '@/components/ui';
import { useUser } from '@/context/UserContext';

import { ChatsCard, EmptyChatHistory, NewChatForm } from './components';

export default function Chats() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Home);
  }

  const { data, isLoading } = useGetChats(user, !!user);

  if (!data?.chats?.length) {
    return <EmptyChatHistory />;
  }

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
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {' '}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{user}&apos;s previous chats</h2>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <NewChatForm />
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.chats.map(chat => <ChatsCard key={chat.chatName} chat={chat} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
