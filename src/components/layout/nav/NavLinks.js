import {
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';

function NavLinks() {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = session;

  if (isAuthenticated) {
    return (
      <Center as="nav" mr={0}>
        <Menu isLazy>
          <MenuButton
            boxShadow="md"
            w={8}
            h={8}
            as={Avatar}
            cursor="pointer"
          ></MenuButton>
          <MenuList>
            <MenuGroup title={`Hello ${user.username}!`}>
              <Link to={'/dashboard'}>
                <MenuItem>Dashboard</MenuItem>
              </Link>
              <Link to={'/profile'}>
                <MenuItem>Profile</MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={() => dispatch(logout())}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Center>
    );
  } else {
    return (
      <nav>
        <Link to={'/signup'}>Signup</Link> | <Link to={'login'}>Login</Link>
      </nav>
    );
  }
}

export default NavLinks;
