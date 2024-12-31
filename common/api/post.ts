import axios from 'axios';

import { CommonEndpoints } from '../enums';
import type { Chat, Message, User } from '../types';
import { logger } from '../utils';
import { apiClient } from './apiClient';

export const createUser = async (values: {
  userName: string;
}): Promise<{ user: User | null; error: string | null }> => {
  try {
    const response = await apiClient.post(CommonEndpoints.Users, values);

    const user: User = response.data;

    return { user, error: null };
  } catch (error) {
    logger.error(`Error creating user: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { user: null, error: error.response.data.error };
    }

    return { user: null, error: (error as Error).message };
  }
};

export const createNewChat = async (values: {
  userName: string;
  chatName: string;
}): Promise<{ chat: Chat | null; error: string | null }> => {
  try {
    const response = await axios.post(CommonEndpoints.Chats, values);

    const chat: Chat = response.data;

    return { chat, error: null };
  } catch (error) {
    logger.error(`Error creating chat: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { chat: null, error: error.response.data.error };
    }

    return { chat: null, error: (error as Error).message };
  }
};

export const createNewMessage = async (
  userName: string,
  chatName: string,
  content: string,
): Promise<{ message: string | null; error: string | null }> => {
  try {
    // Need to add content as body
    const response = await apiClient.post<Message[]>(
      `${CommonEndpoints.Chats}/${userName}/${chatName}`,
      { content },
    );

    const message: string = JSON.stringify(response);

    return { message, error: null };
  } catch (error) {
    logger.error(`Error creating message: ${error as string}`);

    if (axios.isAxiosError(error) && error.response) {
      return { message: null, error: error.response.data.error };
    }

    return { message: null, error: (error as Error).message };
  }
};
