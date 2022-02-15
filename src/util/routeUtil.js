import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectSessionInfo } from '../reducers/sessionReducer';

export function AuthRoute({ children }) {
  const { isAuthenticated } = useSelector(selectSessionInfo);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(selectSessionInfo);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
