import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-label="Checking authentication" role="status">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-brand rounded-full animate-spin" aria-hidden="true" />
        <span className="sr-only">Checking authentication…</span>
      </div>
    );
  }

  if (!user?.uid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;