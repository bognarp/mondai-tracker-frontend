import { Divider, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSessionInfo } from '../../../reducers/selector';
import userAPI from '../../../util/userAPI';
import { BsViewStacked } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <Flex
      direction="column"
      bg="white"
      rounded="lg"
      p={4}
      w="100%"
      boxShadow="xl"
    >
      <Flex
        direction="row"
        pb={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md">{project.title}</Heading>
        <Stack direction="row" spacing={1} alignItems="center">
          <FiUsers />
          <Text fontSize="sm">{project.members.length}</Text>
        </Stack>
      </Flex>

      <Link to={`/projects/${project._id}`} key={project._id}>
        {project.title}
      </Link>
    </Flex>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <Stack direction={['column', 'row']} spacing={3} w="100%">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </Stack>
  );
};

function Dashboard() {
  const sessionInfo = useSelector(selectSessionInfo);

  const { isLoading, data, isError, error } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(sessionInfo.user.id);
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <Flex direction="column" mt={12} alignItems="center">
      <Stack direction="column" spacing={4} w="80%">
        <Stack direction="row" alignItems="center">
          <BsViewStacked />
          <Heading as="h2" size="md">
            My Projects
          </Heading>
          <Divider orientation="vertical" borderColor="black" h="18px" />
          <Text> {data.length}</Text>
        </Stack>

        <ProjectList projects={data} />
      </Stack>
    </Flex>
  );
}

export default Dashboard;
