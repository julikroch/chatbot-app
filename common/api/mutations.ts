import { CommonEndpoints } from '../enums';
import type { Chat, User } from '../types';
import { logger } from '../utils';

export const createUser = async (values: {
  userName: string;
}): Promise<{ user: User | null; error: string | null }> => {
  try {
    const response = await fetch(CommonEndpoints.Users, {
      body: JSON.stringify(values),
      method: 'POST',
    });

    if (!response.ok) {
      const { error } = await response.json();

      throw new Error(error);
    }

    const user: User = await response.json();

    return { user, error: null };
  } catch (error) {
    logger.error(`Error creating user: ${error as string}`);

    return { user: null, error: (error as Error).message };
  }
};

export const createNewChat = async (values: {
  userName: string;
  chatName: string;
}): Promise<{ chat: Chat | null; error: string | null }> => {
  try {
    const response = await fetch(CommonEndpoints.Chat, {
      body: JSON.stringify(values),
      method: 'POST',
    });

    if (!response.ok) {
      const { error } = await response.json();

      throw new Error(error);
    }

    const chat: Chat = await response.json();

    return { chat, error: null };
  } catch (error) {
    logger.error(`Error creating chat: ${error as string}`);

    return { chat: null, error: (error as Error).message };
  }
};
