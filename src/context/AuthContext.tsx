import { createContext } from 'react';

type AuthContextType = {
  role: UserRole;
  login: (newRole: UserRole) => void;
};

export type UserRole = 'admin' | 'user';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
