'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useGetChat } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
import { ChatHistory } from '@/components/ChatHistory';
import { EmptyChat } from '@/components/EmptyChat';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
  Spinner,
} from '@/components/ui';
import { useUser } from '@/context';

export default function ChatAdminPage() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Home);
  }

  const params = useParams();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const decodedChatName = params.chatName ? decodeURIComponent(params.chatName as string) : '';

  const { data, isLoading: isLoadingMessages } = useGetChat(
    user,
    decodedChatName,
    !!user && !!decodedChatName,
  );

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data?.chat?.messages]);

  if (isLoadingMessages) {
    return (
      <div className="w-full max-w-7xl mx-auto flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Chat&apos;s name: {decodedChatName}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[60vh] w-full pr-4">
          {!data?.chat?.messages.length ? (
            <EmptyChat />
          ) : (
            data.chat.messages.map((message, index) => (
              <div
                key={message.id}
                ref={index === (data.chat?.messages?.length ?? 0) - 1 ? lastMessageRef : null}
              >
                <ChatHistory message={message} userName={user} />
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
    </Card>
  );
}
