import {
  Button,
  Center,
  Image,
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

const ProjectsMenuList = ({ isLoading, data }) => {
  return (
    <MenuGroup
      title="Projects"
      fontWeight="normal"
      fontSize="xs"
      textAlign="center"
      m={0}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data && data.length > 0 && <MenuDivider />}
          {data &&
            data.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id}>
                <MenuItem gap={2}>
                  <Image
                    src={`${process.env.REACT_APP_SERVER_URL}/img/icon/${project.avatar}.svg`}
                    boxSize="26px"
                  />
                  {project.title}
                </MenuItem>
              </Link>
            ))}
        </>
      )}
    </MenuGroup>
  );
};

function ProjectsMenu({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(user.id);
  });

  return (
    <Menu>
      <MenuButton
        as={Button}
        display="flex"
        variant="unstyled"
        color="gray.100"
        fontSize={['sm', 'md']}
        fontWeight="300"
        fontFamily="heading"
        _hover={{
          background: 'blackAlpha.100',
        }}
        _active={{
          background: 'blackAlpha.100',
        }}
        rightIcon={<MdArrowDropDown />}
        p={3}
      >
        Projects
      </MenuButton>
      <MenuList>
        <ProjectsMenuList isLoading={isLoading} data={data} />

        <MenuDivider />
        <Center>
          <Button leftIcon={<MdAdd />} size="sm" onClick={onOpen}>
            Create project
          </Button>
        </Center>
      </MenuList>

      <ProjectCreateModal isOpen={isOpen} onClose={onClose} />
    </Menu>
  );
}

export default ProjectsMenu;
