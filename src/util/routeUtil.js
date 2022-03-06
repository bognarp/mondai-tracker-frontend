import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectSessionInfo } from '../reducers/selector';

export function AuthRoute({ children }) {
  const { isAuthenticated } = useSelector(selectSessionInfo);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useSelector(selectSessionInfo);

  const currentTime = Date.now() / 1000;

  if (isAuthenticated && user.exp > currentTime) {
    return children;
  }

  return <Navigate to="/login" replace />;
}
