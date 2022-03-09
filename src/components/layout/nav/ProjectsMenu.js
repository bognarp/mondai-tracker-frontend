import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import userAPI from '../../../util/userAPI';
import { MdAdd, MdArrowDropDown } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ProjectCreateModal from '../project/ProjectCreateModal';

function ProjectsMenu({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(user.id);
  });

  return (
    <>
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
            <Button leftIcon={<MdAdd />} size="sm" onClick={onOpen}>
              Create project
            </Button>
          </Center>
        </MenuList>
      </Menu>
      <ProjectCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ProjectsMenu;
