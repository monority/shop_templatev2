import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';

interface UnAuthGuardProps {
  children: ReactNode;
}

const UnAuthGuard = ({ children }: UnAuthGuardProps) => {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const authLoading = useAppStore((s) => s.authLoading);

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default UnAuthGuard;