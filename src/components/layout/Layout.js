import React from 'react';
import { Outlet } from 'react-router-dom';
import Error from './Error';
import NavBar from './nav/NavBar';

function Layout() {
  return (
    <>
      <NavBar />

      <main>
        <Error />
        <Outlet />
        <br />
        <small style={{ color: 'red' }}>layout (outlet)</small>
      </main>
    </>
  );
}

export default Layout;
