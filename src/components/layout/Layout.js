import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './nav/NavBar';

function Layout() {
  return (
    <>
      <NavBar />

      <main>This will be the layout</main>

      <Outlet />
    </>
  );
}

export default Layout;
