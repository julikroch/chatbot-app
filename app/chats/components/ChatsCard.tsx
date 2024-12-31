import Link from 'next/link';
import type { FC } from 'react';
import { CommonPathnames } from '@/common/enums';
import type { Chat } from '@/common/types';
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/common/ui';

interface IProps {
  chat: Chat;
}

export const ChatsCard: FC<IProps> = ({ chat }) => (
  <Link
    href={`${CommonPathnames.Chats}/[chatName]`}
    as={`${CommonPathnames.Chats}/${chat.chatName}`}
    passHref
    className="hover:opacity-50"
  >
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarFallback>{chat.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          {chat.chatName}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col py-3 gap-3">
          <span>
            <b>Last update:</b> {new Date(chat.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  </Link>
);
