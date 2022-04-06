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
  useColorModeValue,
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
        bgGradient={useColorModeValue(
          'linear(to-t, white 65%, gray.200 65%)',
          'linear(to-t, gray.500 65%, gray.800 65%)'
        )}
        rounded="md"
        boxShadow="xl"
        minW="200px"
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
    <Flex
      direction="column"
      pt={12}
      alignItems="center"
      h="94vh"
      bg="blackAlpha.200"
    >
      <Stack direction="column" spacing={4} w="80%">
        <Flex
          direction="row"
          wrap="wrap"
          gap={3}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <BsViewStacked color="white" />
            <Heading as="h2" size="md" textColor="white">
              My Projects
            </Heading>
            <Divider orientation="vertical" borderColor="white" h="18px" />
            <Text textColor="white">{data.length}</Text>
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
        <Flex direction={['column', 'column', 'row']} gap={2}>
          <ProjectList projects={data} />
        </Flex>
      </Stack>
      <ProjectCreateModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Dashboard;
