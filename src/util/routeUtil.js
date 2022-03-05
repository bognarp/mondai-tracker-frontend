import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../actions/sessionActions';
import { selectSessionInfo } from '../reducers/selector';

export function AuthRoute({ children }) {
  const { isAuthenticated } = useSelector(selectSessionInfo);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(selectSessionInfo);

  const currentTime = Date.now() / 1000;

  if (!isAuthenticated || user.exp < currentTime) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
}
