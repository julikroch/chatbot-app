import { createContext, useContext } from 'react';

interface UserContextType {
  user: string | null;
  setUser(userName: string): void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
