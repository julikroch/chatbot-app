import { type ReactNode, useState } from 'react';
import { UserContext } from '@/context';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
