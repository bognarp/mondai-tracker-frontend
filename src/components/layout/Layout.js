import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Error from './Error';
import NavBar from './nav/NavBar';

function Layout() {
  return (
    <>
      <NavBar />

      <Box minH="94vh" bg="gray.100">
        <Error />
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
