import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../state/Store';
const AuthGuard = ({ children }) => {
  const user = useStore((state) => state.user);

  if (!user || !user.uid) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default AuthGuard;