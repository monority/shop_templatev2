import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';

const UnAuthGuard = ({ children }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const authLoading = useAppStore((state) => state.authLoading);

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default UnAuthGuard;