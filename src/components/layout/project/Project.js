import { Center, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import projectAPI from '../../../util/projectAPI';
import Sidebar from '../nav/Sidebar';
import WorkSpace from './Workspace';

function Project() {
  const params = useParams();
  const [workspace, setWorkspace] = useState(['current']);

  const {
    isLoading,
    data: project,
    isError,
    error,
  } = useQuery(['project', params.projectId], () => {
    return projectAPI.fetchProject(params.projectId);
  });

  if (isLoading) {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  if (isError) return <h3>{error.message}</h3>;

  const toggleWorkspace = (key) => () => {
    workspace.some((ws) => ws === key)
      ? setWorkspace(workspace.filter((ws) => ws !== key))
      : setWorkspace([...workspace, key]);
  };

  return (
    <Flex h="100%">
      <Sidebar
        title={project.title}
        navigation={toggleWorkspace}
        selectedWorkspaces={workspace}
      />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={1}
        pl={4}
        pr={3}
        py={2}
        bg="gray.800"
        w="100%"
      >
        {workspace.map((w) => (
          <GridItem colSpan={1} rowSpan={1} key={w}>
            <WorkSpace project={project} category={w} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

export default Project;
