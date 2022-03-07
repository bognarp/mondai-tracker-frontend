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
  Spinner,
} from '@chakra-ui/react';
import { MdAdd, MdArrowDropDown } from 'react-icons/md';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/sessionActions';
import userAPI from '../../../util/userAPI';

const ProjectsMenu = ({ user }) => {
  const { isLoading, data } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(user.id);
  });

  return (
    <Menu>
      <MenuButton
        as={Button}
        display="flex"
        variant="unstyled"
        color="white"
        fontWeight="500"
        fontFamily="heading"
        _hover={{
          background: 'whiteAlpha.400',
        }}
        _active={{
          background: 'whiteAlpha.400',
        }}
        rightIcon={<MdArrowDropDown />}
        p={3}
      >
        Projects
      </MenuButton>
      <MenuList>
        <MenuGroup
          title="Projects"
          fontWeight="normal"
          fontSize="xs"
          textAlign="center"
          m={0}
        >
          <MenuDivider />
          {isLoading ? (
            <Spinner />
          ) : (
            data.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id}>
                <MenuItem>{project.title}</MenuItem>
              </Link>
            ))
          )}
        </MenuGroup>
        <MenuDivider />
        <Center>
          <Button leftIcon={<MdAdd />} size="sm" variant="ghost">
            Create project
          </Button>
        </Center>
      </MenuList>
    </Menu>
  );
};

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
                <MenuItem>Dashboard</MenuItem>
              </Link>
              <Link to={'/profile'}>
                <MenuItem>Profile</MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
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
