import { ReactNode } from 'react';
import { useAppStore } from '../../store';

interface UserGuardProps {
  children: ReactNode;
  fallback?: boolean;
}

const UserGuard = ({ children, fallback = false }: UserGuardProps) => {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const loading = useAppStore((s) => s.authLoading);

  if (loading) {
    return null;
  }

  if (fallback) {
    return isAuthenticated ? null : children;
  }

  return isAuthenticated ? children : null;
};

export default UserGuard;