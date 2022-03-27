import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsViewStacked } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { selectSessionInfo } from '../../../reducers/selector';
import userAPI from '../../../util/userAPI';
import ProjectCreateModal from '../project/ProjectCreateModal';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`} key={project._id}>
      <Flex
        direction={['row', 'row', 'column']}
        p={4}
        gap={3}
        bgGradient="linear(to-t, white 65%, gray.100 65%)"
        rounded="md"
        boxShadow="xl"
      >
        <Flex direction="column" gap={2}>
          <Image src={`/img/icon/${project.avatar}.svg`} boxSize="32px" />
          <Heading size="sm" textAlign="center">
            {project.title}
          </Heading>
        </Flex>
      </Flex>
    </Link>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
};

function Dashboard() {
  const sessionInfo = useSelector(selectSessionInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data, isError } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(sessionInfo.user.id);
  });

  if (isError) return null;

  if (isLoading) {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  return (
    <Flex direction="column" mt={12} alignItems="center">
      <Stack direction="column" spacing={4} w="80%">
        <Flex
          direction="row"
          wrap="wrap"
          gap={3}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <BsViewStacked />
            <Heading as="h2" size="md">
              My Projects
            </Heading>
            <Divider orientation="vertical" borderColor="black" h="18px" />
            <Text>{data.length}</Text>
          </Stack>

          <Button
            leftIcon={<MdAdd />}
            onClick={onOpen}
            size="sm"
            variant="solid"
            colorScheme="green"
          >
            Create project
          </Button>
        </Flex>
        <Flex
          direction={['column', 'column', 'row']}
          gap={2}
        >
          <ProjectList projects={data} />
        </Flex>
      </Stack>
      <ProjectCreateModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Dashboard;
