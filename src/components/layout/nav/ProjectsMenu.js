import {
  Button,
  Center,
  Flex,
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
                    src={`/img/icon/${project.avatar}.svg`}
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
          <ProjectsMenuList isLoading={isLoading} data={data} />

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
