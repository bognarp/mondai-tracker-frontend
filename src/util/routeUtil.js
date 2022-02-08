import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function AuthRoute({ children }) {
  const session = useSelector((state) => state.session);

  if (session.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedRoute({ children }) {
  const session = useSelector((state) => state.session);

  if (!session.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
