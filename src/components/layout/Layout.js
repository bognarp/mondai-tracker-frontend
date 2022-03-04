import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Error from './Error';
import NavBar from './nav/NavBar';

function Layout() {
  return (
    <Flex direction="column" height="100%">
      <NavBar />
      <Error />

      {/* Dashboard | Project | Profile */}

      <Outlet />
    </Flex>
  );
}

export default Layout;
