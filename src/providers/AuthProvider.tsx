import { type ReactNode, useState } from 'react';
import { type UserRole, AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('user');

  const login = (newRole: UserRole) => {
    setRole(newRole);
  };

  return <AuthContext.Provider value={{ role, login }}>{children}</AuthContext.Provider>;
};
