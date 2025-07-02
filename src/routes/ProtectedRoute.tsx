import type { ReactNode } from 'react';
import { useAuth } from '../hooks/UseAuth';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { role } = useAuth();

  if (!role) return <Navigate to='/' replace />;

  if (role !== requiredRole) return <Navigate to='/' replace />;

  return <>{children}</>;
};
