import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import NavLinks from './NavLinks';

function NavBar() {
  return (
    <Flex as="header" px={6} minH="6vh" justifyContent="space-between" boxShadow="md" position="relative">
      <Center >
        <Heading size="md">Mondai Tracker</Heading>
      </Center>
      <NavLinks />
    </Flex>
  );
}

export default NavBar;
