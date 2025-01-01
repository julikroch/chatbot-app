import type { FC } from 'react';
import type { Chat } from '@/common/types';
import { Spinner } from '@/components/ui';
import { useUser } from '@/context';

import { ChatsCard } from './ChatsCard';
import { NewChatForm } from './NewChatForm';

interface IProps {
  isLoading: boolean;
  data?: {
    chats: Chat[] | null;
    error: string | null;
  };
}

export const ChatHistory: FC<IProps> = ({ isLoading, data }) => {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
              {data?.chats?.map(chat => <ChatsCard key={chat.chatName} chat={chat} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
