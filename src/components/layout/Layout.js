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
      </main>
    </>
  );
}

export default Layout;
