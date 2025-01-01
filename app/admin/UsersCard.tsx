'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { CommonPathnames } from '@/common/enums';
import type { User } from '@/common/types';
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
import { useUser } from '@/context';

interface IProps {
  user: User;
}

export const UsersCard: FC<IProps> = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleClickedUser = () => {
    setUser(user.userName);
    router.push(`${CommonPathnames.Admin}/${CommonPathnames.Chats}`);
  };

  return (
    <Card className="cursor-pointer hover:opacity-50" onClick={handleClickedUser}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          {user.userName}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col py-3 gap-3">
          <span>
            <b>Created at:</b> {customDateFormat(user.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
