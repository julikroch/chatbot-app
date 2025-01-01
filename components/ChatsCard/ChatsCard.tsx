import Link from 'next/link';
import type { FC } from 'react';
import { CommonPathnames } from '@/common/enums';
import type { Chat } from '@/common/types';
import { customDateFormat } from '@/common/utils';
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';

interface IProps {
  chat: Chat;
  isEditable: boolean;
}

export const ChatsCard: FC<IProps> = ({ chat, isEditable }) => {
  const path = isEditable
    ? `${CommonPathnames.Chats}`
    : `${CommonPathnames.Admin}/${CommonPathnames.Chats}`;

  return (
    <Link
      href={`${path}/[chatName]`}
      as={`${path}/${chat.chatName}`}
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
              <b>Last update:</b> {customDateFormat(chat.updatedAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
