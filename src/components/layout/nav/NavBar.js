import { Center, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import NavLinks from './NavLinks';
import logo from './testlogo.png';

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
      <Center ml={12}>
        <Image src={logo} boxSize='40px'/>
      </Center>
      <NavLinks />
    </Flex>
  );
}

export default NavBar;
