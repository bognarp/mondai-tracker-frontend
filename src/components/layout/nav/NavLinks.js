import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdOutlineSpaceDashboard,
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';
import Notifications from './Notifications';
import ProjectsMenu from './ProjectsMenu';

function NavLinks({ session }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { colorMode, toggleColorMode } = useColorMode();

  const { isAuthenticated, user } = session;

  const handleLogout = (e) => {
    queryClient.invalidateQueries();
    dispatch(logout());
  };

  if (isAuthenticated) {
    return (
      <Center as="nav" mr={0} justifyContent="space-between" w="100%">
        <ProjectsMenu user={user} />
        <Flex gap={4}>
          <Notifications />
          <Menu isLazy>
            <MenuButton>
              <Avatar
                name={user.name || user.username}
                size="sm"
                bg="red.500"
                textColor="white"
              />
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
              <MenuItem onClick={toggleColorMode}>
                <HStack>
                  {colorMode === 'light' ? (
                    <MdOutlineDarkMode />
                  ) : (
                    <MdOutlineLightMode />
                  )}
                  <Text fontWeight="thin">
                    {colorMode === 'light' ? 'Dark' : 'Light'}
                  </Text>
                </HStack>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <HStack>
                  <MdLogout />
                  <Text fontWeight="thin">Log out</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
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
