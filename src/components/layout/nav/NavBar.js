import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import NavLinks from './NavLinks';
import logo from './testlogo.png';

function NavBar() {
  return (
    <Flex
      as="header"
      w="100%"
      px={7}
      h="7vh"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
      position="relative"
      bg="white"
      zIndex="1"
    >
      <HStack spacing={5}>
        <Image src={logo} boxSize="40px" />
        <Menu>
          <MenuButton
            as={Button}
            display="flex"
            variant="unstyled"
            rightIcon={<ChevronDownIcon />}
            p={2}
          >
            Projects
          </MenuButton>
          <MenuList>
            <MenuGroup
              title="Projects"
              fontWeight="normal"
              fontSize="xs"
              textAlign="center"
              my={0}
            >
              <MenuDivider />
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>

      <NavLinks />
    </Flex>
  );
}

export default NavBar;
