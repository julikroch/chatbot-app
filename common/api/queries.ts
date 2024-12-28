import { CommonEndpoints } from '../enums';
import type { User } from '../types';
import { logger } from '../utils';

export const getAllUsers = async (): Promise<{ users: User[]; error: string | null }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${CommonEndpoints.Users}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const { error } = await response.json();

      throw new Error(error);
    }

    const users: User[] = await response.json();

    return { users, error: null };
  } catch (err) {
    logger.error(`Error fetching users: ${err as string}`);

    return { users: [], error: (err as Error).message };
  }
};
