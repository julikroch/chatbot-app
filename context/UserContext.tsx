import { createContext, useContext } from 'react';
import type { User } from '@/common/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
