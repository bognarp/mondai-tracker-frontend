import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

function NavBar() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '0.5rem',
        borderBottom: 'solid 1px',
      }}
    >
      <Link to={'/'}>Mondai Tracker</Link>
      <NavLinks />
    </header>
  );
}

export default NavBar;
