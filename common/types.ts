import type { MessageAuthor } from '@/common/enums';

export interface Message {
  id: string;
  chatName: string;
  content: string;
  author: MessageAuthor;
  createdAt: string;
}

export interface Chat {
  chatName: string;
  userName: User;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  userName: string;
  createdAt: string;
  updatedAt: string;
  chats: Chat[];
}

export type LoggerMessages = string | Error;
