'use client';

import { redirect } from 'next/navigation';
import { CommonPathnames } from '@/common/enums';
import { useUser } from '@/context/UserContext';

import { ChatsCard, EmptyChatHistory, NewChatForm } from './components';

export default function Chats() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Home);
  }

  if (!user?.chats?.length) {
    return <EmptyChatHistory />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{user.userName}&apos;s previous chats</h2>
      <NewChatForm />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {user?.chats.map(chat => <ChatsCard key={chat.chatName} chat={chat} />)}
      </div>
    </div>
  );
}
