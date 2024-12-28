import type { FC } from 'react';
import type { Chat } from '@/common/types';
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';

interface IProps {
  chat: Chat;
}

export const ChatsCard: FC<IProps> = ({ chat }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">{chat.chatName}</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent>
      <div className="flex flex-col py-3 gap-3">
        <span>
          <b>Total messages:</b> {chat?.messages?.length ?? 0}
        </span>
        <span>
          <b>Last update:</b> {new Date().toDateString()}
        </span>
      </div>
    </CardContent>
  </Card>
);
