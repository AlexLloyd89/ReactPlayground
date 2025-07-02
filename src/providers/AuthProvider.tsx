import { type ReactNode, useState } from 'react';
import { type UserRole, AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('user');
  const [user, setUser] = useState<{ id: number; name: string; role: UserRole } | undefined>(
    undefined
  );

  const login = (data: { id: number; name: string; role: UserRole }) => {
    setRole(data?.role);
    setUser(data);
  };

  return <AuthContext.Provider value={{ role, login, user }}>{children}</AuthContext.Provider>;
};
