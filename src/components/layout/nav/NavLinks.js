import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  Link,
} from '@chakra-ui/react';
import {
  MdOutlineSpaceDashboard,
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdLock,
} from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';
import { BsGithub } from 'react-icons/bs';
import Notifications from './Notifications';
import ProjectsMenu from './ProjectsMenu';

function NavLinks({ session }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { colorMode, toggleColorMode } = useColorMode();

  const { isAuthenticated, user } = session;

  const handleLogout = () => {
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
                <Link as={ReactRouterLink} to={'/dashboard'}>
                  <MenuItem>
                    <HStack>
                      <MdOutlineSpaceDashboard />
                      <Text>Dashboard</Text>
                    </HStack>
                  </MenuItem>
                </Link>
                <Link as={ReactRouterLink} to={'/profile'}>
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
        <Link
          href="https://github.com/bognarp/mondai-tracker-frontend"
          isExternal
          display={'flex'}
        >
          <Icon as={BsGithub} m={3} w={5} h={5} />
        </Link>
        <Button
          leftIcon={<MdLock />}
          _hover={{ textColor: 'gray.900', textDecoration: 'underline' }}
          color="gray.700"
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
