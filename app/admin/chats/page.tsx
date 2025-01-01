'use client';

import { redirect } from 'next/navigation';
import { useGetChats } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
import { ChatsHistory } from '@/components/ChatsHistory';
import { EmptyChatsHistory } from '@/components/EmptyChatsHistory';
import { useUser } from '@/context';

export default function ChatsAdminPage() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Admin);
  }

  const { data, isLoading } = useGetChats(user, !!user);

  return (
    <main>
      {!data?.chats?.length && !isLoading ? (
        <EmptyChatsHistory isEditable={false} />
      ) : (
        <ChatsHistory isEditable={false} isLoading={isLoading} data={data} />
      )}
    </main>
  );
}
