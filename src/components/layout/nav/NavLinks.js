import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';

function NavLinks() {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = session;

  if (isAuthenticated) {
    return (
      <nav>
        <Link to={'/dashboard'}>Dashboard</Link> {'| '}
        <Link to={'/profile'}>{user.username}</Link> {'| '}
        <button onClick={() => dispatch(logout())}>Sign Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to={'/signup'}>Signup</Link> | <Link to={'login'}>Login</Link>
      </nav>
    );
  }
}

export default NavLinks;
