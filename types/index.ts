import type { MessageAuthorEnum } from '@/enums';

export interface Message {
  id: string;
  content: string;
  author: MessageAuthorEnum;
  createdAt: string;
}

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
}

export interface ChatComponentProps {
  initialMessages?: Message[];
}
