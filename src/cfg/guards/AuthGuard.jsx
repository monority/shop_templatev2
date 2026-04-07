import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';

const AuthGuard = ({ children }) => {
  const user = useAppStore((state) => state.user);

  if (!user || !user.uid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;