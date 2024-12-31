import { CommonEndpoints } from '../enums';
import type { Chat, User } from '../types';
import { logger } from '../utils';
import { apiClient } from './apiClient';

export const getUser = async (
  userName: string,
): Promise<{ user: User | null; error: string | null }> => {
  try {
    const response = await apiClient.get<User>(`${CommonEndpoints.Users}/${userName}`);

    const user: User = response.data;

    return { user, error: null };
  } catch (err) {
    logger.error(`Error fetching user: ${err as string}`);

    return { user: null, error: (err as Error).message };
  }
};

export const getChats = async (
  userName: string,
): Promise<{ chats: Chat[] | null; error: string | null }> => {
  try {
    const response = await apiClient.get<Chat[]>(`${CommonEndpoints.Chats}/${userName}`);

    const chats: Chat[] = response.data;

    return { chats, error: null };
  } catch (err) {
    logger.error(`Error fetching chats: ${err as string}`);

    return { chats: null, error: (err as Error).message };
  }
};

export const getChat = async (
  userName: string,
  chatName: string,
): Promise<{ chat: Chat | null; error: string | null }> => {
  try {
    const response = await apiClient.get<Chat>(`${CommonEndpoints.Chats}/${userName}/${chatName}`);

    const chat: Chat = response.data;

    return { chat, error: null };
  } catch (err) {
    logger.error(`Error fetching chat: ${err as string}`);

    return { chat: null, error: (err as Error).message };
  }
};
