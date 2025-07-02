import { createContext } from 'react';

type AuthContextType = {
  role: UserRole;
  user?: { id: number; name: string; role: UserRole };
  login: (user: { id: number; name: string; role: UserRole }) => void;
};

export type UserRole = 'admin' | 'user';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
