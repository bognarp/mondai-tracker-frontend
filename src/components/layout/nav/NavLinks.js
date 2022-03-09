import {
  Avatar,
  Button,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {
  MdOutlineSpaceDashboard,
  MdLogout,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';
import ProjectsMenu from './ProjectsMenu';

function NavLinks({ session }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = session;

  if (isAuthenticated) {
    return (
      <Center as="nav" mr={0} justifyContent="space-between" w="100%">
        <ProjectsMenu user={user} />
        <Menu isLazy>
          <MenuButton>
            <Avatar name={user.username} size="sm" bg="red.500" />
          </MenuButton>
          <MenuList>
            <MenuGroup title={`Signed in as ${user.username}`}>
              <MenuDivider />
              <Link to={'/dashboard'}>
                <MenuItem>
                  <HStack>
                    <MdOutlineSpaceDashboard />
                    <Text>Dashboard</Text>
                  </HStack>
                </MenuItem>
              </Link>
              <Link to={'/profile'}>
                <MenuItem>
                  <HStack>
                    <MdOutlineAccountCircle />
                    <Text>Profile</Text>
                  </HStack>
                </MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />

            <MenuItem onClick={() => dispatch(logout())}>
              <HStack>
                <MdLogout />
                <Text fontWeight="thin">Log out</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
    );
  } else {
    return (
      <HStack as="nav" spacing={4}>
        <Button
          _hover={{ textDecoration: 'underline', textColor: 'blue.800' }}
          color="blue.600"
          size="sm"
          onClick={() => {
            navigate('/login');
          }}
          variant="unstyled"
        >
          Log in
        </Button>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign up
        </Button>
      </HStack>
    );
  }
}

export default NavLinks;
