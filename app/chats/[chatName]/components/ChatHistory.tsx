import type { FC } from 'react';
import { MessageAuthor } from '@/common/enums';
import type { Message } from '@/common/types';
import { Avatar, AvatarFallback } from '@/common/ui';

interface IProps {
  message: Message;
  userName: string;
}

export const ChatHistory: FC<IProps> = ({ message, userName }) => {
  const { id, author } = message;

  return (
    <div
      key={id}
      className={`flex my-4 ${author === MessageAuthor.User ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-end ${author === MessageAuthor.User ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            {author === MessageAuthor.User ? userName[0].toUpperCase() : 'B'}
          </AvatarFallback>
        </Avatar>
        <div
          className={`mx-2 py-3 px-4 rounded-lg ${
            message.author === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
