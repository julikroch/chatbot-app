import axios from 'axios';

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
  } catch (error) {
    logger.error(`Error fetching user: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { user: null, error: error.response.data.error };
    }

    return { user: null, error: (error as Error).message };
  }
};

export const getChats = async (
  userName: string,
): Promise<{ chats: Chat[] | null; error: string | null }> => {
  try {
    const response = await apiClient.get<Chat[]>(`${CommonEndpoints.Chats}/${userName}`);

    const chats: Chat[] = response.data;

    return { chats, error: null };
  } catch (error) {
    logger.error(`Error fetching chats: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { chats: null, error: error.response.data.error };
    }

    return { chats: null, error: (error as Error).message };
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
  } catch (error) {
    logger.error(`Error fetching chat: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { chat: null, error: error.response.data.error };
    }

    return { chat: null, error: (error as Error).message };
  }
};
