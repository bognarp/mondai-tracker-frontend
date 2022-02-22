import { Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import NavLinks from './NavLinks';

function NavBar() {
  return (
    <Flex
      as="header"
      w="100%"
      px={6}
      h="7vh"
      justifyContent="space-between"
      boxShadow="md"
      position="relative"
    >
      <Center>
        <Heading size="md">Mondai Tracker</Heading>
      </Center>
      <NavLinks />
    </Flex>
  );
}

export default NavBar;
