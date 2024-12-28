import { type ReactNode, useState } from 'react';
import type { User } from '@/common/types';
import { UserContext } from '@/context';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
